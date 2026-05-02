// ═══════════════════════════════════════════════════
// DermAI — Result Page Rendering
// ═══════════════════════════════════════════════════

(function() {
  const raw = sessionStorage.getItem('dermaiResult');
  if (!raw) { window.location.href = '/'; return; }

  const result = JSON.parse(raw);
  const p = result.patient;
  const a = result.analysis;
  const img = sessionStorage.getItem('dermaiImage');

  // Escape HTML
  function esc(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // Patient Bar
  document.getElementById('patientBar').innerHTML = `<div class="container">
    <span class="pb-item"><strong>${esc(p.name)}</strong></span>
    <span class="pb-item">Age: <strong>${p.age}</strong></span>
    <span class="pb-item">Gender: <strong>${esc(p.gender)}</strong></span>
    <span class="pb-item">Location: <strong>${esc(p.city||'Not provided')}</strong></span>
    <span class="pb-item">Analyzed: <strong>${new Date(result.timestamp).toLocaleString('en-IN')}</strong></span>
  </div>`;

  // Determine severity
  const score = a.severity_score || 1;
  const level = (a.severity_level || 'mild').toLowerCase();
  const isSevere = score >= 7 || level === 'severe';
  const isModerate = !isSevere && (score >= 4 || level === 'moderate');

  let html = '';

  // ── Severity Banner ──
  if (isSevere) {
    html += `<div class="red-alert-full">
      <div class="ra-icon">🚨</div>
      <h2>⚠ RED ALERT — SEEK MEDICAL ATTENTION NOW</h2>
      <p><strong>Our AI has detected signs of a potentially serious skin condition. Please visit a dermatologist or emergency clinic TODAY. Do not delay.</strong></p>
      <button class="btn-emergency" onclick="window.open('https://www.google.com/maps/search/dermatologist+hospital+near+${encodeURIComponent(p.city||'me')}','_blank')">
        🏥 FIND NEAREST HOSPITAL NOW →
      </button>
    </div>`;
  } else if (isModerate) {
    html += `<div class="severity-banner severity-moderate">
      <div class="severity-icon">⚠️</div>
      <div><div class="severity-title" style="color:var(--amber)">MODERATE — DOCTOR VISIT RECOMMENDED</div>
      <div class="severity-msg">Your condition may need medical attention soon. Book a dermatologist appointment within 1-2 weeks.</div></div>
    </div>`;
  } else {
    html += `<div class="severity-banner severity-mild">
      <div class="severity-icon">✅</div>
      <div><div class="severity-title" style="color:var(--green)">LOW RISK — MANAGEABLE AT HOME</div>
      <div class="severity-msg">Your skin condition appears mild. Follow the care tips below. Monitor for changes and see a doctor if it worsens.</div></div>
    </div>`;
  }

  // ── AI Analysis Card ──
  html += `<div class="analysis-card">`;

  // Section 1: Detected Condition
  html += `<div class="ac-section">
    <div class="ac-label">Detected Skin Condition</div>
    <div class="ac-condition gold-text">${esc(a.detected_condition)}</div>
    <div class="confidence-wrap">
      <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.25rem">
        <span style="font-size:.85rem;color:var(--text-muted)">AI Confidence:</span>
        <span style="font-weight:600;color:${a.confidence>70?'var(--green)':a.confidence>40?'var(--amber)':'var(--red)'}">${a.confidence}%</span>
      </div>
      <div class="confidence-bar"><div class="confidence-fill" style="width:${a.confidence}%;background:${a.confidence>70?'var(--green)':a.confidence>40?'var(--amber)':'var(--red)'}"></div></div>
    </div>
    ${(a.alternate_conditions && a.alternate_conditions.length) ? `<div class="ac-alts">Other possibilities: ${a.alternate_conditions.map(c=>esc(c)).join(', ')}</div>` : ''}
    <div class="ac-desc">${esc(a.condition_description)}</div>
  </div>`;

  // Section 2: What This Means
  if (a.what_this_means && a.what_this_means.length) {
    html += `<div class="ac-section">
      <div class="ac-label">What This Means</div>
      <ul class="ac-bullets">${a.what_this_means.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
    </div>`;
  }

  // Section 3: Care Tips
  if (a.care_tips && a.care_tips.length) {
    html += `<div class="ac-section">
      <div class="ac-label">${isSevere ? 'While Waiting for the Doctor' : isModerate ? 'In the Meantime' : 'What You Can Do Now'}</div>
      <ul class="care-list">${a.care_tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      ${isSevere ? '<p style="color:var(--red);font-weight:600;margin-top:.75rem">⚠ GO TO A DOCTOR TODAY.</p>' : ''}
      ${isModerate ? '<p style="color:var(--amber);margin-top:.75rem">📋 Book a doctor appointment soon.</p>' : ''}
    </div>`;
  }

  // Section 4: What Not To Do
  if (a.what_not_to_do && a.what_not_to_do.length) {
    html += `<div class="ac-section">
      <div class="ac-label">What NOT To Do</div>
      <ul class="dont-list">${a.what_not_to_do.map(d => `<li>❌ ${esc(d)}</li>`).join('')}</ul>
    </div>`;
  }

  // Section 5: Uploaded Image
  if (img) {
    html += `<div class="ac-section">
      <div class="ac-label">Uploaded Image Analysis</div>
      <div class="image-analysis">
        <img src="${img}" alt="Analyzed skin image">
        <div class="ia-info">
          <p>AI analyzed this image for visual skin patterns</p>
          <p style="margin-top:.4rem;font-size:.8rem">⚠ Image processed and not permanently stored</p>
        </div>
      </div>
    </div>`;
  }

  html += `</div>`; // close analysis-card

  // ── Nearest Doctors / Book Doctor ──
  html += `<div class="doctors-section" style="text-align:center; padding: 2rem; background: rgba(201,168,76,0.1); border-radius: 12px; margin-bottom: 2rem; border: 1px solid var(--gold);">
    <h2 style="font-size:1.6rem; margin-bottom: 0.5rem;">🩺 <span class="gold-text">Want a real doctor's opinion?</span></h2>
    <p style="color:var(--text-muted); font-size:1rem; margin-bottom: 1.5rem;">Get a verified diagnosis and prescription from a certified dermatologist.</p>
    <button onclick="window.location.href='/doctors.html?analysis_id=${result.record_id || ''}'" class="share-btn primary" style="font-size: 1.1rem; padding: 1rem 2rem; border-radius: 8px; width:100%; max-width: 400px; display:inline-block; font-weight: bold;">Book a Dermatologist — ₹99 onwards →</button>
  </div>`;

  // Emergency Contacts
  html += `<div class="emergency-card">
    <h4>🚨 EMERGENCY CONTACTS</h4>
    <div class="ec-item"><span>National Health Emergency</span><a href="tel:112" class="ec-num">112</a></div>
    <div class="ec-item"><span>AIIMS Helpline</span><a href="tel:01126589142" class="ec-num">011-26589142</a></div>
    <div class="ec-item"><span>Medical Helpline</span><a href="tel:104" class="ec-num">104</a></div>
  </div>
  </div>`;

  // ── Share / Save ──
  const shareText = `DermAI Analysis: ${a.detected_condition} (Severity: ${score}/10). AI recommends consulting a dermatologist.`;
  html += `<div class="share-section">
    <div class="share-row">
      <button class="share-btn primary" onclick="window.print()">📥 Download Report (PDF)</button>
      <a href="/" class="share-btn">🔁 Analyze Another Photo</a>
      <a href="https://wa.me/?text=${encodeURIComponent(shareText)}" target="_blank" class="share-btn">📤 Share via WhatsApp</a>
    </div>
  </div>`;

  // ── Disclaimer ──
  html += `<div class="result-disclaimer">
    ⚠️ <strong>Medical Disclaimer:</strong> This AI analysis is for educational purposes only and does not constitute a medical diagnosis. Always consult a qualified dermatologist or healthcare professional for proper diagnosis and treatment. In case of emergency, call 112 immediately.
  </div>`;

  document.getElementById('resultContent').innerHTML = html;
})();
