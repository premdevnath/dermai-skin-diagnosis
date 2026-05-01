// ═══════════════════════════════════════════════════
// DermAI — Main Page Script
// ═══════════════════════════════════════════════════

// ── Starfield Animation ──
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function createStars() {
    stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.6 + 0.2
      });
    }
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.o})`;
      ctx.fill();
      s.x += s.dx; s.y += s.dy;
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;
    });
    requestAnimationFrame(draw);
  }
  resize(); createStars(); draw();
  window.addEventListener('resize', () => { resize(); createStars(); });
})();

// ── Scroll to Top Button ──
window.addEventListener('scroll', () => {
  const btn = document.getElementById('scrollTopBtn');
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
});

// ── Testimonials Carousel ──
(function initTestimonials() {
  const testimonials = [
    { name: 'Priya S.', loc: 'Jaipur', init: 'P', stars: '★★★★★', text: 'DermAI identified my rosacea pattern in seconds. It suggested I see a dermatologist and was 100% correct. Saved me weeks of confusion.' },
    { name: 'Rohit M.', loc: 'Delhi', init: 'R', stars: '★★★★★', text: 'I had a weird rash for months. DermAI flagged it as possibly fungal and urged me to see a doctor urgently. Turned out to be ringworm — caught early because of this app.' },
    { name: 'Anjali K.', loc: 'Mumbai', init: 'A', stars: '★★★★☆', text: 'Simple, fast and clear. The AI explained my acne type and gave me safe tips. The nearby doctor list was really helpful.' },
    { name: 'Suresh T.', loc: 'Bangalore', init: 'S', stars: '★★★★★', text: 'As a parent, this was a lifesaver. My child had a sudden rash and DermAI\'s red alert told me to go to the ER immediately. It was correct — it was an allergic reaction.' },
    { name: 'Meena R.', loc: 'Hyderabad', init: 'M', stars: '★★★★★', text: 'Very professional UI. The AI gave a clear severity rating and even told me what NOT to do with my eczema. Impressed.' }
  ];
  const track = document.getElementById('testimonialTrack');
  if (!track) return;
  // Duplicate for infinite scroll
  const all = [...testimonials, ...testimonials];
  track.innerHTML = all.map(t => `
    <div class="testimonial-card">
      <div class="tc-header">
        <div class="tc-avatar">${t.init}</div>
        <div><div class="tc-name">${t.name}</div><div class="tc-loc">${t.loc}</div></div>
        <div class="tc-stars" style="margin-left:auto">${t.stars}</div>
      </div>
      <div class="tc-text">"${t.text}"</div>
    </div>
  `).join('');
})();

// ── Image Upload ──
const uploadArea = document.getElementById('uploadArea');
const skinImageInput = document.getElementById('skinImage');
const uploadPreview = document.getElementById('uploadPreview');
const previewImg = document.getElementById('previewImg');
const fileNameEl = document.getElementById('fileName');

if (uploadArea) {
  uploadArea.addEventListener('click', () => skinImageInput.click());
  uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
  uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
  uploadArea.addEventListener('drop', e => {
    e.preventDefault(); uploadArea.classList.remove('drag-over');
    if (e.dataTransfer.files.length) { skinImageInput.files = e.dataTransfer.files; handleFileSelect(); }
  });
}
if (skinImageInput) skinImageInput.addEventListener('change', handleFileSelect);

function handleFileSelect() {
  const file = skinImageInput.files[0];
  if (!file) return;
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.type)) { showToast('Please upload a JPG, PNG or WEBP image.'); skinImageInput.value = ''; return; }
  if (file.size > 10 * 1024 * 1024) { showToast('File too large. Maximum 10MB allowed.'); skinImageInput.value = ''; return; }
  const reader = new FileReader();
  reader.onload = e => {
    previewImg.src = e.target.result;
    fileNameEl.textContent = file.name + ' (' + (file.size / 1024 / 1024).toFixed(1) + ' MB)';
    uploadPreview.style.display = 'flex';
    uploadArea.style.borderColor = 'var(--green)';
  };
  reader.readAsDataURL(file);
}

// ── Form Submit ──
const skinForm = document.getElementById('skinForm');
if (skinForm) {
  skinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate symptoms
    const checkedSymptoms = document.querySelectorAll('#symptomsGroup input:checked');
    if (checkedSymptoms.length === 0) { showToast('Please select at least one symptom.'); return; }

    // Validate image
    if (!skinImageInput.files[0]) { showToast('Please upload a skin photo.'); return; }

    // Build FormData
    const formData = new FormData();
    formData.append('name', document.getElementById('fname').value.trim());
    formData.append('age', document.getElementById('age').value);
    formData.append('gender', document.querySelector('input[name="gender"]:checked').value);
    formData.append('phone', document.getElementById('phone').value.trim());
    formData.append('city', document.getElementById('city').value.trim());
    formData.append('body_location', document.getElementById('bodyLoc').value);
    formData.append('duration', document.getElementById('duration').value);
    formData.append('symptoms', JSON.stringify(Array.from(checkedSymptoms).map(c => c.value)));
    formData.append('existing_conditions', document.getElementById('conditions').value.trim());
    formData.append('previous_treatments', document.getElementById('treatments').value.trim());
    formData.append('skinImage', skinImageInput.files[0]);

    // Store image for result page
    try {
      const reader = new FileReader();
      reader.onload = ev => sessionStorage.setItem('dermaiImage', ev.target.result);
      reader.readAsDataURL(skinImageInput.files[0]);
    } catch(e) {}

    await submitDiagnosis(formData);
  });
}

async function submitDiagnosis(formData) {
  showLoadingOverlay();
  try {
    const response = await fetch('/api/analyze', { method: 'POST', body: formData });
    const result = await response.json();
    if (result.success) {
      sessionStorage.setItem('dermaiResult', JSON.stringify(result));
      window.location.href = '/result.html';
    } else {
      hideLoadingOverlay();
      showToast(result.error || 'Analysis failed. Please try again.');
    }
  } catch (err) {
    hideLoadingOverlay();
    showToast('Network error. Please check your connection and try again.');
  }
}

// ── Loading Overlay ──
const loadingMessages = [
  'Uploading image...', 'Analyzing skin patterns...', 'Checking severity...',
  'Finding nearby doctors...', 'Preparing your report...'
];
let loadingInterval;

function showLoadingOverlay() {
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.add('active');
  let idx = 0;
  document.getElementById('loaderText').textContent = loadingMessages[0];
  loadingInterval = setInterval(() => {
    idx = (idx + 1) % loadingMessages.length;
    document.getElementById('loaderText').textContent = loadingMessages[idx];
  }, 3000);
}

function hideLoadingOverlay() {
  document.getElementById('loadingOverlay').classList.remove('active');
  clearInterval(loadingInterval);
}

// ── Toast ──
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = '❌ ' + msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 5000);
}
