// doctor-panel.js
const API_TOKEN_KEY = 'dermai_doctor_token';

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem(API_TOKEN_KEY);
  if (token) {
    showPanel();
    loadAppointments();
    loadSlots();
  } else {
    document.getElementById('loginSection').style.display = 'block';
  }
  
  // Set min date for slot picker
  document.getElementById('newSlotDate').min = new Date().toISOString().split('T')[0];
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errDiv = document.getElementById('loginError');
  errDiv.textContent = '';
  
  try {
    const res = await fetch('/api/doctor/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    
    localStorage.setItem(API_TOKEN_KEY, data.token);
    document.getElementById('docName').textContent = `Dr. ${data.name}`;
    
    showPanel();
    loadAppointments();
    loadSlots();
  } catch(err) {
    errDiv.textContent = err.message || 'Login failed';
  }
});

function logout() {
  localStorage.removeItem(API_TOKEN_KEY);
  window.location.reload();
}

function showPanel() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('panelSection').style.display = 'block';
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-doctor-token': localStorage.getItem(API_TOKEN_KEY)
  };
}

async function loadAppointments() {
  const list = document.getElementById('appointmentsList');
  try {
    const res = await fetch('/api/doctor/bookings', { headers: authHeaders() });
    if (res.status === 401) return logout();
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    
    if (!data.bookings.length) {
      list.innerHTML = '<div style="color:var(--text-muted);">No upcoming appointments.</div>';
      return;
    }
    
    list.innerHTML = data.bookings.map(b => {
      let aiReportHtml = '';
      if (b.skin_analyses) {
        const a = b.skin_analyses;
        aiReportHtml = `
          <div style="background:rgba(201,168,76,0.1); padding:0.8rem; border-radius:6px; margin:0.8rem 0; font-size:0.9rem;">
            <strong>AI Report:</strong> ${a.detected_condition || 'N/A'} 
            <span style="color:${a.severity_level==='severe'?'var(--red)':a.severity_level==='moderate'?'var(--amber)':'var(--green)'}; margin-left:0.5rem; font-weight:bold;">[${(a.severity_level||'').toUpperCase()}]</span>
            <div style="margin-top:0.4rem; color:var(--text-muted);">${a.condition_description || ''}</div>
          </div>
        `;
      }
      
      const timeStr = b.time_slots ? `${new Date(b.time_slots.slot_date).toLocaleDateString()} at ${b.time_slots.slot_time}` : 'TBD';
      
      return `
        <div class="appointment-card">
          <div class="apt-header">
            <strong>${b.patient_name} (${b.patient_age}${b.patient_gender?.[0]||''})</strong>
            <span style="color:var(--gold);">${timeStr}</span>
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted);">
            📞 <a href="tel:${b.patient_phone}" style="color:inherit;">${b.patient_phone}</a> | 💬 <a href="https://wa.me/${b.patient_phone.replace(/\D/g,'')}?text=Hi, this is Dr. DermAI." target="_blank" style="color:var(--green);">WhatsApp</a>
          </div>
          ${aiReportHtml}
          
          <div style="margin-top:1rem;">
            <textarea id="presc_${b.id}" class="prescription-box" placeholder="Write prescription / advice here...">${b.prescription || ''}</textarea>
            <div style="text-align:right; margin-top:0.5rem;">
              <button class="btn-small" onclick="savePrescription('${b.id}')">${b.prescription ? 'Update' : 'Save'} Prescription</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
    
  } catch(err) {
    list.innerHTML = `<div style="color:var(--red);">Failed to load: ${err.message}</div>`;
  }
}

async function savePrescription(bookingId) {
  const text = document.getElementById(`presc_${bookingId}`).value.trim();
  if (!text) { alert('Prescription cannot be empty'); return; }
  
  try {
    const res = await fetch(`/api/doctor/bookings/${bookingId}/prescription`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ prescription: text })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    alert('Prescription saved successfully!');
    loadAppointments();
  } catch(err) {
    alert(err.message || 'Error saving prescription');
  }
}

// Slots management
document.getElementById('addSlotsForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const date = document.getElementById('newSlotDate').value;
  const timesStr = document.getElementById('newSlotTimes').value;
  const msgDiv = document.getElementById('slotMsg');
  
  const times = timesStr.split(',').map(t => t.trim()).filter(t => t);
  if (!times.length) return;
  
  const slots = times.map(t => ({ slot_date: date, slot_time: t }));
  
  try {
    const res = await fetch('/api/doctor/slots', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ slots })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    
    msgDiv.style.color = 'var(--green)';
    msgDiv.textContent = data.message;
    document.getElementById('newSlotTimes').value = '';
    loadSlots();
    setTimeout(() => msgDiv.textContent = '', 3000);
  } catch(err) {
    msgDiv.style.color = 'var(--red)';
    msgDiv.textContent = err.message;
  }
});

async function loadSlots() {
  const list = document.getElementById('availableSlotsList');
  try {
    const res = await fetch('/api/doctor/slots', { headers: authHeaders() });
    if (res.status === 401) return logout();
    const data = await res.json();
    
    if (!data.slots?.length) {
      list.innerHTML = '<span style="color:var(--text-muted);">No slots defined.</span>';
      return;
    }
    
    // Group by date
    const byDate = {};
    data.slots.forEach(s => {
      if (!byDate[s.slot_date]) byDate[s.slot_date] = [];
      byDate[s.slot_date].push(s);
    });
    
    list.innerHTML = Object.keys(byDate).map(d => {
      const slots = byDate[d].map(s => 
        `<span style="display:inline-block; padding:0.2rem 0.5rem; margin:0.2rem; border-radius:4px; background:${s.is_booked?'var(--surface2)':'rgba(201,168,76,0.1)'}; color:${s.is_booked?'var(--text-muted)':'var(--gold)'}; text-decoration:${s.is_booked?'line-through':'none'};">
          ${s.slot_time}
        </span>`
      ).join('');
      return `<div style="margin-bottom:0.8rem;"><strong>${new Date(d).toLocaleDateString()}</strong><br>${slots}</div>`;
    }).join('');
    
  } catch(err) {
    list.innerHTML = `<span style="color:var(--red);">Error loading slots</span>`;
  }
}
