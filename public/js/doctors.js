async function loadDoctors() {
  const grid = document.getElementById('doctorsGrid');
  const cityFilter = document.getElementById('filterCity').value;
  
  try {
    const url = cityFilter ? `/api/doctors?city=${encodeURIComponent(cityFilter)}` : '/api/doctors';
    const res = await fetch(url);
    const data = await res.json();
    
    if (!data.success) throw new Error(data.error);
    
    const docs = data.doctors;
    if (docs.length === 0) {
      grid.innerHTML = '<div style="text-align:center; grid-column:1/-1; padding: 4rem; color: var(--text-muted);">No doctors found matching your criteria.</div>';
      return;
    }
    
    // Check if we came from result page with analysis_id
    const urlParams = new URLSearchParams(window.location.search);
    const analysisId = urlParams.get('analysis_id') || '';
    
    grid.innerHTML = docs.map(doc => `
      <div class="doctor-card">
        <div class="doctor-photo" style="background-image: url('${doc.profile_photo_url || ''}'); background-size: cover; background-position: center;">
          ${!doc.profile_photo_url ? '<span style="display:flex;align-items:center;justify-content:center;height:100%;font-size:2.5rem;">👨‍⚕️</span>' : ''}
        </div>
        <div class="doctor-name">Dr. ${doc.name}</div>
        <div class="doctor-spec">${doc.qualification || doc.specialization} — ${doc.experience_years} yrs</div>
        <div class="doctor-loc">📍 ${doc.city}</div>
        <div class="doctor-lang">🗣 ${doc.languages ? doc.languages.join(', ') : 'Hindi, English'}</div>
        <div class="doctor-stars">★★★★☆ (${doc.total_consultations} consultations)</div>
        <div class="doctor-fee">Consultation Fee: ₹${doc.consultation_fee}</div>
        <button class="btn-block" onclick="window.location.href='/booking.html?doctor_id=${doc.id}&analysis_id=${analysisId}'">Book Now →</button>
      </div>
    `).join('');
    
  } catch (err) {
    grid.innerHTML = `<div style="text-align:center; grid-column:1/-1; padding: 4rem; color: var(--red);">Error loading doctors: ${err.message}</div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadDoctors();
  
  document.getElementById('filterCity').addEventListener('input', (e) => {
    // Simple debounce
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(loadDoctors, 500);
  });
});
