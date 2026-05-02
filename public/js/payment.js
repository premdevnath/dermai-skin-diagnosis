let selectedDoctor = null;
let selectedSlotId = null;
let analysisId = null;

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// Extract query params
const params = new URLSearchParams(window.location.search);
const docId = params.get('doctor_id');
analysisId = params.get('analysis_id');

if (!docId) {
  window.location.href = '/doctors.html';
}

// Prefill patient details from sessionStorage
const rawResult = sessionStorage.getItem('dermaiResult');
if (rawResult) {
  try {
    const p = JSON.parse(rawResult).patient;
    if (p) {
      if (p.name) document.getElementById('pName').value = p.name;
      if (p.age) document.getElementById('pAge').value = p.age;
      // Note: phone wasn't saved in patient object in previous version, so user might need to enter it
    }
  } catch(e) {}
}

// Initialize date picker (min date = today)
const dateInput = document.getElementById('slotDate');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;
dateInput.value = today;

// Load doctor details and slots
async function loadDoctorInfo() {
  try {
    // Actually, we don't have a single doctor route in the provided server.js!
    // But we can fetch all and filter, or just rely on the order creation to get fee.
    // Let's fetch all doctors and find ours.
    const res = await fetch('/api/doctors');
    const data = await res.json();
    selectedDoctor = data.doctors.find(d => d.id === docId);
    
    if (!selectedDoctor) throw new Error('Doctor not found');
    
    document.getElementById('docSummary').innerHTML = `
      <div class="doc-photo" style="background-image: url('${selectedDoctor.profile_photo_url || ''}'); background-size: cover; background-position: center;">
        ${!selectedDoctor.profile_photo_url ? '<span style="display:flex;align-items:center;justify-content:center;height:100%;font-size:3rem;">👨‍⚕️</span>' : ''}
      </div>
      <h2 style="margin-bottom: 0.5rem;">Dr. ${selectedDoctor.name}</h2>
      <p style="color:var(--text-muted); margin-bottom: 0.5rem;">${selectedDoctor.qualification || selectedDoctor.specialization}</p>
      <p style="color:var(--text-muted); font-size:0.9rem;">📍 ${selectedDoctor.city}</p>
      <div class="doc-fee">Consultation Fee: ₹${selectedDoctor.consultation_fee}</div>
    `;
    
    loadSlots(today);
  } catch(err) {
    document.getElementById('docSummary').innerHTML = `<div style="color:var(--red);">${err.message}</div>`;
  }
}

async function loadSlots(date) {
  const grid = document.getElementById('slotGrid');
  grid.innerHTML = '<div style="color:var(--text-muted); font-size:0.9rem;">Loading slots...</div>';
  selectedSlotId = null;
  updatePayButton();
  
  try {
    const res = await fetch(`/api/doctors/${docId}/slots?date=${date}`);
    const data = await res.json();
    
    if (!data.slots || data.slots.length === 0) {
      grid.innerHTML = '<div style="color:var(--text-muted); font-size:0.9rem;">No slots available on this date.</div>';
      return;
    }
    
    grid.innerHTML = data.slots.map(s => `
      <button type="button" class="slot-btn" onclick="selectSlot('${s.id}', this)">${s.slot_time}</button>
    `).join('');
  } catch(err) {
    grid.innerHTML = '<div style="color:var(--red); font-size:0.9rem;">Error loading slots</div>';
  }
}

function selectSlot(id, btnEl) {
  selectedSlotId = id;
  document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
  btnEl.classList.add('selected');
  updatePayButton();
}

function updatePayButton() {
  const btn = document.getElementById('payBtn');
  if (selectedSlotId && selectedDoctor) {
    btn.textContent = `Pay ₹${selectedDoctor.consultation_fee} & Confirm →`;
    btn.disabled = false;
  } else {
    btn.textContent = 'Select a Slot to Pay';
    btn.disabled = true;
  }
}

dateInput.addEventListener('change', (e) => {
  loadSlots(e.target.value);
});

// Razorpay Payment Flow
async function handlePayClick() {
  const name = document.getElementById('pName').value.trim();
  const phone = document.getElementById('pPhone').value.trim();
  const age = document.getElementById('pAge').value.trim();
  
  if (!name || !phone || !age) {
    showToast('Please fill all patient details');
    return;
  }
  
  if (!selectedSlotId) {
    showToast('Please select a time slot');
    return;
  }

  const btn = document.getElementById('payBtn');
  btn.textContent = 'Processing...';
  btn.disabled = true;

  const bookingData = {
    doctor_id: docId,
    slot_id: selectedSlotId,
    patient_name: name,
    patient_phone: phone,
    patient_age: parseInt(age),
    analysis_id: analysisId
  };

  try {
    // Step 1: Create Razorpay order on backend
    const orderRes = await fetch('/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    const order = await orderRes.json();
    
    if (!orderRes.ok || !order.success) {
      throw new Error(order.error || 'Failed to create order');
    }

    // Step 2: Open Razorpay checkout modal
    const options = {
      key: order.key_id,
      amount: order.amount,
      currency: order.currency,
      name: 'DermAI Skin Consultation',
      description: `Consult with ${order.doctor_name}`,
      order_id: order.order_id,
      theme: { color: '#C9A84C' },
      prefill: {
        name: name,
        contact: phone
      },
      modal: {
        ondismiss: function() {
          showToast('Payment cancelled. Your slot is still available.');
          updatePayButton();
        }
      },
      handler: async function(response) {
        btn.textContent = 'Verifying...';
        
        // Step 3: Verify payment on backend
        try {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: order.booking_id,
              slot_id: selectedSlotId
            })
          });
          const result = await verifyRes.json();

          if (result.success) {
            sessionStorage.setItem('dermaiBooking', JSON.stringify(result.booking));
            window.location.href = '/confirmation.html';
          } else {
            showToast(result.error || 'Payment verification failed.');
            updatePayButton();
          }
        } catch(err) {
          showToast('Network error during verification. Contact support.');
          updatePayButton();
        }
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch(err) {
    showToast(err.message || 'Payment initiation failed.');
    updatePayButton();
  }
}

document.addEventListener('DOMContentLoaded', loadDoctorInfo);
