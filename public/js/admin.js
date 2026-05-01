// ═══════════════════════════════════════════════════
// DermAI — Admin Panel Logic
// ═══════════════════════════════════════════════════
const API = '';
let token = localStorage.getItem('dermai_admin_token');
let currentPage = 0;
const PAGE_SIZE = 25;
let searchTimeout;

if (token) { showDashboard(); } else { document.getElementById('loginScreen').style.display = 'flex'; }

async function adminLogin() {
  const pass = document.getElementById('adminPass').value;
  const err = document.getElementById('loginErr');
  if (!pass) { err.textContent = '❌ Enter password'; return; }
  try {
    const res = await fetch(`${API}/api/admin/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pass })
    });
    const data = await res.json();
    if (data.success) {
      token = data.token;
      localStorage.setItem('dermai_admin_token', token);
      showDashboard();
    } else { err.textContent = '❌ ' + (data.error || 'Wrong password'); }
  } catch (e) { err.textContent = '❌ Server connection failed'; }
}

function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboard').style.display = 'flex';
  loadStats(); loadAnalyses();
}

function adminLogout() { localStorage.removeItem('dermai_admin_token'); location.reload(); }

function showSection(type) {
  document.querySelectorAll('.sb-link').forEach(l => l.classList.remove('active'));
  event.target.classList.add('active');
  if (type === 'severe') {
    document.getElementById('severityFilter').value = 'severe';
    document.getElementById('section-title').textContent = '🚨 Red Alert Cases';
  } else if (type === 'stats') {
    document.getElementById('section-title').textContent = '📊 Statistics Overview';
    document.getElementById('severityFilter').value = '';
  } else {
    document.getElementById('severityFilter').value = '';
    document.getElementById('section-title').textContent = 'All Skin Analyses';
  }
  loadAnalyses(0);
}

async function loadStats() {
  try {
    const res = await fetch(`${API}/api/admin/stats`, { headers: { 'x-admin-token': token } });
    if (res.status === 401) { adminLogout(); return; }
    const data = await res.json();
    document.getElementById('statTotal').textContent = data.total;
    document.getElementById('statToday').textContent = data.today;
    document.getElementById('statMild').textContent = data.mild;
    document.getElementById('statModerate').textContent = data.moderate;
    document.getElementById('statSevere').textContent = data.severe;
  } catch (e) { console.error('Stats error:', e); }
}

async function loadAnalyses(page = 0) {
  currentPage = page;
  const search = document.getElementById('searchInput').value;
  const severity = document.getElementById('severityFilter').value;
  const params = new URLSearchParams({ limit: PAGE_SIZE, offset: page * PAGE_SIZE, ...(search && { search }), ...(severity && { severity }) });
  try {
    const res = await fetch(`${API}/api/admin/analyses?${params}`, { headers: { 'x-admin-token': token } });
    if (res.status === 401) { adminLogout(); return; }
    const { data, total } = await res.json();
    renderTable(data, total);
  } catch (e) {
    document.getElementById('analysesBody').innerHTML = '<tr><td colspan="10" class="loading-cell">⚠ Failed to load data</td></tr>';
  }
}

function renderTable(rows, total) {
  const tbody = document.getElementById('analysesBody');
  if (!rows || rows.length === 0) { tbody.innerHTML = '<tr><td colspan="10" class="loading-cell">No records found</td></tr>'; return; }
  tbody.innerHTML = rows.map((r, i) => `
    <tr class="${r.severity_level === 'severe' ? 'row-severe' : ''}">
      <td>${currentPage * PAGE_SIZE + i + 1}</td>
      <td class="td-date">${formatDate(r.created_at)}</td>
      <td><strong>${esc(r.name)}</strong></td>
      <td>${r.age || '—'} / ${r.gender || '—'}</td>
      <td><a href="tel:${r.phone}" class="link-gold">${r.phone}</a><br><a href="https://wa.me/91${(r.phone || '').replace(/\D/g, '')}" target="_blank" class="link-wa">WhatsApp ↗</a></td>
      <td>${esc(r.city || '—')}</td>
      <td><strong>${esc(r.detected_condition || '—')}</strong></td>
      <td><span class="badge badge-${r.severity_level}">${r.severity_level === 'severe' ? '🚨 ' : ''}${(r.severity_level || '').toUpperCase()}${r.severity_score ? ` (${r.severity_score}/10)` : ''}</span></td>
      <td><div class="confidence-bar"><div class="confidence-fill" style="width:${r.ai_confidence || 0}%;background:${r.ai_confidence > 70 ? '#38A169' : r.ai_confidence > 40 ? '#D69E2E' : '#E53E3E'}"></div><span>${r.ai_confidence || 0}%</span></div></td>
      <td><button onclick="viewDetail('${r.id}')" class="btn-view">👁 View</button> <button onclick="deleteRecord('${r.id}')" class="btn-del">🗑</button></td>
    </tr>`).join('');
  renderPagination(total);
}

async function viewDetail(id) {
  const res = await fetch(`${API}/api/admin/analyses/${id}`, { headers: { 'x-admin-token': token } });
  const { data: r } = await res.json();
  document.getElementById('detailContent').innerHTML = `
    <h2>Patient: ${esc(r.name)}</h2>
    <p>${r.age} years | ${r.gender} | ${r.city || 'City not provided'} | ${r.phone}</p><hr>
    <h3>AI Analysis Result</h3>
    <p><strong>Detected Condition:</strong> ${r.detected_condition}</p>
    <p><strong>Severity:</strong> <span class="badge badge-${r.severity_level}">${(r.severity_level || '').toUpperCase()} (${r.severity_score}/10)</span></p>
    <p><strong>AI Confidence:</strong> ${r.ai_confidence}%</p>
    <p><strong>Description:</strong> ${r.condition_description}</p><hr>
    <h3>Patient Reported</h3>
    <p><strong>Area:</strong> ${r.body_location} | <strong>Duration:</strong> ${r.duration}</p>
    <p><strong>Symptoms:</strong> ${(r.symptoms || []).join(', ')}</p>
    <p><strong>Known Conditions:</strong> ${r.existing_conditions || 'None'}</p>
    <p><strong>Previous Treatments:</strong> ${r.previous_treatments || 'None'}</p><hr>
    <p class="muted">Analyzed: ${formatDate(r.created_at)}</p>`;
  document.getElementById('detailModal').style.display = 'block';
}

function closeModal() { document.getElementById('detailModal').style.display = 'none'; }

async function deleteRecord(id) {
  if (!confirm('Permanently delete this record?')) return;
  const res = await fetch(`${API}/api/admin/analyses/${id}`, { method: 'DELETE', headers: { 'x-admin-token': token } });
  if (res.ok) { loadAnalyses(currentPage); loadStats(); }
}

function searchAnalyses() { clearTimeout(searchTimeout); searchTimeout = setTimeout(() => loadAnalyses(0), 400); }
function filterBySeverity() { loadAnalyses(0); }

function renderPagination(total) {
  const pages = Math.ceil(total / PAGE_SIZE);
  const div = document.getElementById('pagination');
  if (pages <= 1) { div.innerHTML = ''; return; }
  div.innerHTML = Array.from({ length: pages }, (_, i) => `<button onclick="loadAnalyses(${i})" class="${i === currentPage ? 'active' : ''}">${i + 1}</button>`).join('');
}

async function exportCSV() {
  const res = await fetch(`${API}/api/admin/analyses?limit=9999`, { headers: { 'x-admin-token': token } });
  const { data } = await res.json();
  const headers = ['Name', 'Age', 'Gender', 'Phone', 'City', 'Condition', 'Severity', 'Score', 'Confidence', 'Duration', 'Body Location', 'Symptoms', 'Date'];
  const rows = data.map(r => [r.name, r.age, r.gender, r.phone, r.city, r.detected_condition, r.severity_level, r.severity_score, r.ai_confidence + '%', r.duration, r.body_location, (r.symptoms || []).join(' | '), formatDate(r.created_at)].map(v => `"${(v || '').toString().replace(/"/g, '""')}"`));
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `dermai-analyses-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
}

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
function esc(str) { return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

document.getElementById('adminPass')?.addEventListener('keydown', e => { if (e.key === 'Enter') adminLogin(); });
