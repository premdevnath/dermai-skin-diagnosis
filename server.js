'use strict';
const express   = require('express');
const cors      = require('cors');
const path      = require('path');
const crypto    = require('crypto');
const fs        = require('fs');
const multer    = require('multer');
const Razorpay  = require('razorpay');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '15mb' }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Multer (RAM only — image kabhi disk pe nahi) ────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    ['image/jpeg','image/png','image/webp'].includes(file.mimetype)
      ? cb(null, true) : cb(new Error('JPEG/PNG/WEBP only'));
  }
});

// ─── Supabase ────────────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── Razorpay ────────────────────────────────────────────────────
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ─── Skill File Loader ────────────────────────────────────────────
function loadSkills() {
  const s2 = path.join(__dirname, 'skills', 'SKILL_2.md');
  const s3 = path.join(__dirname, 'skills', 'SKILL_3.md');
  if (!fs.existsSync(s2) || !fs.existsSync(s3)) {
    console.error('FATAL: Skill files missing in /skills/ folder');
    console.error('Please add SKILL_2.md and SKILL_3.md');
    process.exit(1); // Server band ho jaye agar skills nahi hain
  }
  const skill2 = fs.readFileSync(s2, 'utf8');
  const skill3 = fs.readFileSync(s3, 'utf8');
  console.log(`✅ SKILL_2 loaded: ${skill2.length} chars`);
  console.log(`✅ SKILL_3 loaded: ${skill3.length} chars`);
  return { skill2, skill3 };
}
const { skill2: S2, skill3: S3 } = loadSkills();

// ════════════════════════════════════════════════════════════════
// GEMINI FUNCTION — Both skills injected
// ════════════════════════════════════════════════════════════════
async function callGemini(imageBase64, mimeType, patient) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/`
    + `gemini-2.5-flash-preview-05-20:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const systemPrompt = `
═══════════════════════════════════════════════════
DERMAI SYSTEM — SKILL KNOWLEDGE BASE
═══════════════════════════════════════════════════

SKILL FILE 1 — DERMATOLOGY KNOWLEDGE:
${S2}

SKILL FILE 2 — ANALYZER RULES & WORKFLOW:
${S3}

═══════════════════════════════════════════════════
PATIENT TO ANALYZE:
Age: ${patient.age}, Gender: ${patient.gender}
Area: ${patient.body_location}, Duration: ${patient.duration}
Symptoms: ${(patient.symptoms||[]).join(', ')||'none'}
Known conditions: ${patient.existing_conditions||'none'}
City: ${patient.city||'not given'}

RULES:
- Apply BOTH skill files fully
- NEVER suggest medicine names or dosages
- ALWAYS recommend consulting a real dermatologist
- Severity: NORMAL / MODERATE / SEVERE (from Skill 3)
- If image unclear → confidence < 25, ask for better photo
- Return ONLY valid JSON, nothing else

RETURN THIS JSON:
{
  "conditionName": "string",
  "severity": "NORMAL|MODERATE|SEVERE",
  "severityScore": 1-10,
  "confidence": 0-100,
  "explanation": "2-3 sentence plain Hindi/English description",
  "visibleSymptoms": ["what AI sees in image"],
  "selfCareTips": ["only if NORMAL — 3 safe tips"],
  "warningSignsToWatch": ["3 warning signs"],
  "urgencyMessage": "clear action message",
  "doctorType": "Dermatologist / Emergency",
  "emergencyFlag": true|false,
  "imageQuality": "good|fair|poor",
  "disclaimer": "AI screening only. Not a medical diagnosis."
}
`;

  const body = {
    contents: [{
      parts: [
        { text: systemPrompt },
        { inline_data: { mime_type: mimeType, data: imageBase64 } }
      ]
    }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 1500,
      responseMimeType: 'application/json'
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 429) throw new Error('AI rate limit. Wait 1 minute.');
    if (res.status === 403) throw new Error('Gemini API key invalid.');
    throw new Error(err?.error?.message || 'Gemini API error');
  }

  const data = await res.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) throw new Error('Empty AI response');

  try { return JSON.parse(raw); }
  catch {
    const m = raw.match(/\{[\s\S]*\}/);
    if (!m) throw new Error('AI returned non-JSON');
    return JSON.parse(m[0]);
  }
}

// ════════════════════════════════════════════════════════════════
// ROUTE 1 — POST /api/analyze (Free AI skin check)
// ════════════════════════════════════════════════════════════════
app.post('/api/analyze', upload.single('skinImage'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success:false, error:'Image required' });
    const { name, age, gender, phone } = req.body;
    if (!name||!age||!gender||!phone)
      return res.status(400).json({ success:false, error:'Name, age, gender, phone required' });

    let symptoms = [];
    try { symptoms = JSON.parse(req.body.symptoms||'[]'); } catch {}

    const patient = {
      name, age: +age, gender, phone,
      city: req.body.city||'',
      body_location: req.body.body_location||'',
      duration: req.body.duration||'',
      symptoms,
      existing_conditions: req.body.existing_conditions||''
    };

    const aiResult = await callGemini(
      req.file.buffer.toString('base64'),
      req.file.mimetype,
      patient
    );

    const { data: record } = await supabase
      .from('skin_analyses')
      .insert([{
        name, age:+age, gender, phone,
        city: patient.city,
        body_location: patient.body_location,
        duration: patient.duration,
        symptoms,
        detected_condition: aiResult.conditionName,
        condition_description: aiResult.explanation,
        severity_level: (aiResult.severity||'NORMAL').toLowerCase(),
        severity_score: aiResult.severityScore||5,
        ai_confidence: aiResult.confidence||50,
        care_tips: aiResult.selfCareTips||[],
        emergency_flag: aiResult.emergencyFlag||false,
        raw_ai_response: aiResult,
        image_filename: `${Date.now()}_${req.file.originalname}`
      }])
      .select('id').single();

    res.json({
      success: true,
      record_id: record?.id||null,
      patient: { name, age:+age, gender, city:patient.city },
      analysis: aiResult,
      timestamp: new Date().toISOString()
    });
  } catch(err) {
    console.error('Analyze error:', err.message);
    res.status(500).json({ success:false, error: err.message });
  }
});

// ════════════════════════════════════════════════════════════════
// ROUTE 2 — GET /api/doctors (List available doctors)
// ════════════════════════════════════════════════════════════════
app.get('/api/doctors', async (req, res) => {
  const { city } = req.query;
  let query = supabase
    .from('doctors')
    .select('id,name,specialization,qualification,experience_years,city,languages,consultation_fee,bio,profile_photo_url,available_days,rating,total_consultations')
    .eq('is_active', true)
    .order('rating', { ascending: false });

  if (city) query = query.ilike('city', `%${city}%`);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, doctors: data });
});

// ════════════════════════════════════════════════════════════════
// ROUTE 3 — GET /api/doctors/:id/slots (Available time slots)
// ════════════════════════════════════════════════════════════════
app.get('/api/doctors/:id/slots', async (req, res) => {
  const { date } = req.query; // YYYY-MM-DD
  const { data, error } = await supabase
    .from('time_slots')
    .select('id, slot_time, is_booked')
    .eq('doctor_id', req.params.id)
    .eq('slot_date', date || new Date().toISOString().slice(0,10))
    .eq('is_booked', false)
    .order('slot_time');
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, slots: data });
});

// ════════════════════════════════════════════════════════════════
// ROUTE 4 — POST /api/payment/create-order (Razorpay order)
// ════════════════════════════════════════════════════════════════
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { doctor_id, slot_id, patient_name, patient_phone,
            patient_email, patient_age, patient_gender, analysis_id } = req.body;

    if (!doctor_id || !slot_id || !patient_name || !patient_phone)
      return res.status(400).json({ error: 'Missing required fields' });

    // Get doctor fee
    const { data: doctor } = await supabase
      .from('doctors')
      .select('consultation_fee, name')
      .eq('id', doctor_id)
      .single();

    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    // Check slot still available
    const { data: slot } = await supabase
      .from('time_slots')
      .select('is_booked, slot_date, slot_time')
      .eq('id', slot_id)
      .single();

    if (!slot || slot.is_booked)
      return res.status(400).json({ error: 'Slot no longer available. Please choose another.' });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: doctor.consultation_fee * 100,  // paise mein
      currency: 'INR',
      receipt: `DERM_${Date.now()}`,
      notes: {
        doctor_name: doctor.name,
        patient_name,
        patient_phone
      }
    });

    // Save booking (payment_status: pending)
    const { data: booking } = await supabase
      .from('bookings')
      .insert([{
        patient_name,
        patient_phone,
        patient_email,
        patient_age,
        patient_gender,
        doctor_id,
        slot_id,
        analysis_id: analysis_id || null,
        consultation_fee: doctor.consultation_fee,
        payment_status: 'pending',
        razorpay_order_id: razorpayOrder.id,
        booking_status: 'pending'
      }])
      .select('id')
      .single();

    res.json({
      success: true,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: 'INR',
      booking_id: booking.id,
      doctor_name: doctor.name,
      key_id: process.env.RAZORPAY_KEY_ID   // Frontend ko sirf key_id chahiye, secret nahi
    });

  } catch(err) {
    console.error('Razorpay order error:', err);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

// ════════════════════════════════════════════════════════════════
// ROUTE 5 — POST /api/payment/verify (Razorpay payment verify)
// ════════════════════════════════════════════════════════════════
app.post('/api/payment/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id,
            razorpay_signature, booking_id, slot_id } = req.body;

    // HMAC signature verify — tampering detect karta hai
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      // Signature mismatch — possible fraud
      await supabase.from('bookings').update({ payment_status: 'failed' })
        .eq('id', booking_id);
      return res.status(400).json({ success: false, error: 'Payment verification failed. Possible fraud.' });
    }

    // Payment genuine — update booking + mark slot as booked
    await Promise.all([
      supabase.from('bookings').update({
        payment_status: 'paid',
        booking_status: 'confirmed',
        razorpay_payment_id,
        razorpay_signature
      }).eq('id', booking_id),

      supabase.from('time_slots').update({ is_booked: true }).eq('id', slot_id)
    ]);

    // Fetch booking details for confirmation page
    const { data: booking } = await supabase
      .from('bookings')
      .select(`
        *,
        doctors ( name, specialization, city ),
        time_slots ( slot_date, slot_time )
      `)
      .eq('id', booking_id)
      .single();

    res.json({
      success: true,
      message: 'Booking confirmed!',
      booking
    });

  } catch(err) {
    console.error('Payment verify error:', err);
    res.status(500).json({ success: false, error: 'Verification failed' });
  }
});

// ════════════════════════════════════════════════════════════════
// ROUTE 6 — GET /api/booking/:id (Booking details)
// ════════════════════════════════════════════════════════════════
app.get('/api/booking/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`*, doctors(name,specialization,city), time_slots(slot_date,slot_time)`)
    .eq('id', req.params.id)
    .single();
  if (error) return res.status(404).json({ error: 'Booking not found' });
  res.json({ success: true, booking: data });
});

// ════════════════════════════════════════════════════════════════
// DOCTOR PANEL ROUTES
// ════════════════════════════════════════════════════════════════

// Doctor login
app.post('/api/doctor/login', async (req, res) => {
  const { email, password } = req.body;
  const { data: doctor } = await supabase
    .from('doctors')
    .select('id, name, doctor_login_password_hash')
    .eq('doctor_login_email', email)
    .eq('is_active', true)
    .single();

  if (!doctor) return res.status(401).json({ error: 'Doctor not found' });

  const hash = crypto.createHash('sha256').update(password).digest('hex');
  if (hash !== doctor.doctor_login_password_hash)
    return res.status(401).json({ error: 'Wrong password' });

  const token = crypto.randomBytes(32).toString('hex');
  await supabase.from('admin_sessions').insert([{
    token, session_type: 'doctor', doctor_id: doctor.id
  }]);

  res.json({ success: true, token, doctor_id: doctor.id, name: doctor.name });
});

// Doctor auth middleware
async function requireDoctor(req, res, next) {
  const token = req.headers['x-doctor-token'];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const { data } = await supabase
    .from('admin_sessions')
    .select('doctor_id')
    .eq('token', token)
    .eq('session_type', 'doctor')
    .gt('expires_at', new Date().toISOString())
    .single();
  if (!data) return res.status(401).json({ error: 'Session expired' });
  req.doctorId = data.doctor_id;
  next();
}

// Doctor: get their bookings (with patient AI report)
app.get('/api/doctor/bookings', requireDoctor, async (req, res) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id, patient_name, patient_phone, patient_age, patient_gender,
      booking_status, payment_status, consultation_fee,
      prescription, created_at,
      time_slots ( slot_date, slot_time ),
      skin_analyses ( detected_condition, severity_level, ai_confidence,
                      condition_description, symptoms, city, raw_ai_response )
    `)
    .eq('doctor_id', req.doctorId)
    .eq('payment_status', 'paid')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, bookings: data });
});

// Doctor: write prescription
app.patch('/api/doctor/bookings/:id/prescription', requireDoctor, async (req, res) => {
  const { prescription, doctor_notes } = req.body;
  if (!prescription) return res.status(400).json({ error: 'Prescription text required' });

  const { error } = await supabase
    .from('bookings')
    .update({
      prescription,
      doctor_notes,
      booking_status: 'completed',
      prescription_created_at: new Date().toISOString()
    })
    .eq('id', req.params.id)
    .eq('doctor_id', req.doctorId); // Security: doctor sirf apne bookings update kare

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, message: 'Prescription saved' });
});

// Doctor: get their slot availability
app.get('/api/doctor/slots', requireDoctor, async (req, res) => {
  const { data } = await supabase
    .from('time_slots')
    .select('*')
    .eq('doctor_id', req.doctorId)
    .gte('slot_date', new Date().toISOString().slice(0,10))
    .order('slot_date, slot_time');
  res.json({ success: true, slots: data });
});

// Doctor: add available slots
app.post('/api/doctor/slots', requireDoctor, async (req, res) => {
  const { slots } = req.body; // Array of { slot_date, slot_time }
  if (!slots?.length) return res.status(400).json({ error: 'No slots provided' });

  const inserts = slots.map(s => ({
    doctor_id: req.doctorId,
    slot_date: s.slot_date,
    slot_time: s.slot_time,
    is_booked: false
  }));

  const { error } = await supabase.from('time_slots').insert(inserts);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, message: `${slots.length} slots added` });
});

// ════════════════════════════════════════════════════════════════
// ADMIN ROUTES
// ════════════════════════════════════════════════════════════════

app.post('/api/admin/login', async (req, res) => {
  if (req.body.password !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ error: 'Wrong password' });
  const token = crypto.randomBytes(32).toString('hex');
  await supabase.from('admin_sessions').insert([{ token, session_type:'admin' }]);
  res.json({ success:true, token });
});

async function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token) return res.status(401).json({ error:'Unauthorized' });
  const { data } = await supabase
    .from('admin_sessions').select('id')
    .eq('token', token).eq('session_type','admin')
    .gt('expires_at', new Date().toISOString()).single();
  if (!data) return res.status(401).json({ error:'Session expired' });
  next();
}

// Admin: full stats
app.get('/api/admin/stats', requireAdmin, async (req, res) => {
  const today = new Date(); today.setHours(0,0,0,0);
  const [analyses, bookings, revenue, doctors, todayAnal, alerts] = await Promise.all([
    supabase.from('skin_analyses').select('*',{count:'exact',head:true}),
    supabase.from('bookings').select('*',{count:'exact',head:true}).eq('payment_status','paid'),
    supabase.from('bookings').select('consultation_fee').eq('payment_status','paid'),
    supabase.from('doctors').select('*',{count:'exact',head:true}).eq('is_active',true),
    supabase.from('skin_analyses').select('*',{count:'exact',head:true}).gte('created_at',today.toISOString()),
    supabase.from('skin_analyses').select('*',{count:'exact',head:true}).eq('emergency_flag',true)
  ]);
  const totalRevenue = (revenue.data||[]).reduce((sum,r)=>sum+(r.consultation_fee||0),0);
  res.json({
    total_analyses: analyses.count||0,
    paid_bookings: bookings.count||0,
    total_revenue_inr: totalRevenue,
    active_doctors: doctors.count||0,
    today_analyses: todayAnal.count||0,
    emergency_alerts: alerts.count||0
  });
});

// Admin: all bookings
app.get('/api/admin/bookings', requireAdmin, async (req, res) => {
  const { limit=50, offset=0 } = req.query;
  const { data, count } = await supabase
    .from('bookings')
    .select('*,doctors(name),time_slots(slot_date,slot_time)',{count:'exact'})
    .order('created_at',{ascending:false})
    .range(+offset, +offset + +limit -1);
  res.json({ success:true, data, total:count });
});

// Admin: add doctor
app.post('/api/admin/doctors', requireAdmin, async (req, res) => {
  const { name,specialization,qualification,experience_years,city,
          languages,consultation_fee,bio,available_days,
          doctor_login_email,doctor_login_password } = req.body;
  const hash = crypto.createHash('sha256').update(doctor_login_password).digest('hex');
  const { data, error } = await supabase.from('doctors').insert([{
    name,specialization,qualification,experience_years,city,
    languages,consultation_fee,bio,available_days,
    doctor_login_email, doctor_login_password_hash:hash
  }]).select('id').single();
  if (error) return res.status(500).json({ error:error.message });
  res.json({ success:true, doctor_id:data.id });
});

// Admin: all analyses
app.get('/api/admin/analyses', requireAdmin, async (req, res) => {
  const { severity, limit=50, offset=0 } = req.query;
  let q = supabase.from('skin_analyses').select('*',{count:'exact'})
    .order('created_at',{ascending:false}).range(+offset,+offset+(+limit)-1);
  if (severity) q = q.eq('severity_level',severity);
  const { data, count } = await q;
  res.json({ success:true, data, total:count });
});

// ════════════════════════════════════════════════════════════════
// PAGE ROUTES
// ════════════════════════════════════════════════════════════════

// Skill status check (debug)
app.get('/api/skill-status', (_, res) => res.json({
  skill2_loaded: S2.length > 100,
  skill3_loaded: S3.length > 100,
  model: 'gemini-2.5-flash-preview-05-20',
  razorpay_configured: !!process.env.RAZORPAY_KEY_ID
}));

// Secret admin path — apna path rakho
app.get('/admin-dermai-x92', (_,res) =>
  res.sendFile(path.join(__dirname,'public','admin.html')));

// Secret doctor path
app.get('/doctor-panel', (_,res) =>
  res.sendFile(path.join(__dirname,'public','doctor-panel.html')));

app.get('*', (_,res) =>
  res.sendFile(path.join(__dirname,'public','index.html')));

const PORT = process.env.PORT||3000;
app.listen(PORT, () => {
  console.log(`\n🔬 DermAI Platform Running on port ${PORT}`);
  console.log(`   Frontend    : http://localhost:${PORT}`);
  console.log(`   Admin       : http://localhost:${PORT}/admin-dermai-x92`);
  console.log(`   Doctor Panel: http://localhost:${PORT}/doctor-panel`);
  console.log(`   Skill check : http://localhost:${PORT}/api/skill-status\n`);
});
