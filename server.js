// server.js — DermAI Skin Diagnosis Backend
const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// ── Load Skill File ──
const SKILL_PATH = path.join(__dirname, 'skills', 'SKILL.md');
let SKILL_CONTENT = '';
try {
  SKILL_CONTENT = fs.readFileSync(SKILL_PATH, 'utf8');
  console.log('✅ Skill file loaded successfully');
} catch (err) {
  console.error('❌ FATAL: Skill file not found at', SKILL_PATH);
  console.error('   Please ensure /skills/SKILL.md exists.');
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// ── Multer: memory storage (never write images to disk) ──
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only JPEG, PNG and WEBP images allowed'), false);
  }
});

// ── Supabase client (service role) ──
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ── Gemini AI client ──
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ════════════════════════════════════════════════════
// ROUTE 1: POST /api/analyze — Main AI diagnosis
// ════════════════════════════════════════════════════
app.post('/api/analyze', upload.single('skinImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Skin image is required' });
    }

    const { name, age, gender, phone, city, body_location,
            duration, symptoms, existing_conditions, previous_treatments } = req.body;

    if (!name || !age || !gender || !phone) {
      return res.status(400).json({ success: false, error: 'Name, age, gender and phone are required' });
    }

    // Parse symptoms (sent as JSON string or array)
    let symptomsList = [];
    try {
      symptomsList = typeof symptoms === 'string' ? JSON.parse(symptoms) : (symptoms || []);
    } catch { symptomsList = []; }

    const patientData = {
      name, age: parseInt(age), gender, phone, city,
      body_location, duration,
      symptoms: symptomsList,
      existing_conditions, previous_treatments
    };

    // Convert image to base64
    const imageBase64 = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;

    // Call Gemini AI
    const aiResult = await analyzeSkinImage(imageBase64, mimeType, patientData);

    // Save to Supabase (no image stored — only metadata)
    let record = null;
    try {
      const { data: dbRecord, error: dbError } = await supabase
        .from('skin_analyses')
        .insert([{
          name, age: parseInt(age), gender, phone, city,
          body_location, duration, symptoms: symptomsList,
          existing_conditions, previous_treatments,
          detected_condition: aiResult.detected_condition,
          condition_description: aiResult.condition_description,
          severity_level: aiResult.severity_level,
          severity_score: aiResult.severity_score,
          ai_confidence: aiResult.confidence,
          care_tips: aiResult.care_tips,
          what_not_to_do: aiResult.what_not_to_do,
          raw_ai_response: aiResult,
          image_filename: `${Date.now()}_${req.file.originalname}`
        }])
        .select('id')
        .single();

      if (dbError) console.error('DB save error:', dbError);
      record = dbRecord;
    } catch (dbErr) {
      console.error('Database connection error:', dbErr.message);
    }

    // Return full result to frontend
    res.json({
      success: true,
      record_id: record?.id || null,
      patient: { name, age, gender, city },
      analysis: aiResult,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Analysis failed. Please try again.'
    });
  }
});

// ════════════════════════════════════════════════════
// Gemini analysis function — uses SKILL.md
// ════════════════════════════════════════════════════
async function analyzeSkinImage(imageBase64, mimeType, patientData) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
${SKILL_CONTENT}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Now, using the above skill file knowledge, analyze the following patient's skin image and data.
Follow all rules from the skill file strictly. Never suggest specific medicines.
Only output valid JSON — no markdown, no extra text.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Patient Information:
- Name: ${patientData.name}
- Age: ${patientData.age}
- Gender: ${patientData.gender}
- Body location affected: ${patientData.body_location || 'not specified'}
- Duration: ${patientData.duration || 'not specified'}
- Symptoms: ${(patientData.symptoms || []).join(', ') || 'none listed'}
- Known conditions/allergies: ${patientData.existing_conditions || 'None mentioned'}
- Previous treatments tried: ${patientData.previous_treatments || 'None mentioned'}
- City: ${patientData.city || 'Not specified'}

ANALYSIS RULES:
1. Identify the most likely skin condition from the image
2. Rate severity from 1 (very mild) to 10 (emergency/severe)
3. NEVER suggest specific drug names, creams, or dosages
4. ALWAYS recommend consulting a certified dermatologist
5. Be medically conservative — when in doubt, rate severity higher
6. If image is blurry or unrelated to skin, set confidence below 30%
7. Be compassionate and clear in language
8. Use hedged language: "appears to be", "may indicate", "consistent with"

Return this exact JSON structure:
{
  "detected_condition": "Primary condition name",
  "alternate_conditions": ["possible condition 2", "possible condition 3"],
  "confidence": 75,
  "severity_score": 4,
  "severity_level": "moderate",
  "condition_description": "Plain-English 2-3 sentence description of the condition",
  "what_this_means": [
    "Bullet point 1 about the condition",
    "Bullet point 2 about causes",
    "Bullet point 3 about typical progression"
  ],
  "care_tips": [
    "Keep the area clean and dry",
    "Avoid touching or scratching",
    "Use gentle unscented products on the area"
  ],
  "what_not_to_do": [
    "Do not pop or squeeze any lesions",
    "Avoid harsh chemical products",
    "Do not self-medicate without doctor advice"
  ],
  "urgency_message": "Specific urgency message based on severity",
  "doctor_suggestion": "Type of doctor to consult (e.g., Dermatologist, General Physician)",
  "emergency_flag": false,
  "image_quality": "good",
  "nearby_doctors": [
    {
      "name": "Doctor name relevant to patient city",
      "specialty": "Dermatologist",
      "location": "Area, City",
      "phone": "Phone number"
    }
  ],
  "disclaimer": "This is AI-based visual screening only. Not a medical diagnosis. Please consult a certified dermatologist for proper treatment."
}

If emergency_flag is true, severity_score must be 7 or above.
If image quality is poor, set image_quality to "poor" and confidence below 30%.
`;

  const result = await model.generateContent([
    prompt,
    { inlineData: { data: imageBase64, mimeType } }
  ]);

  const text = result.response.text();
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('AI returned invalid JSON format');
  return JSON.parse(match[0]);
}

// ════════════════════════════════════════════════════
// ADMIN ROUTES
// ════════════════════════════════════════════════════

// Admin login
app.post('/api/admin/login', async (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, error: 'Incorrect password' });
  }
  const token = crypto.randomBytes(32).toString('hex');
  try {
    await supabase.from('admin_sessions').insert([{ token }]);
  } catch (e) {
    console.error('Admin session save error:', e);
  }
  res.json({ success: true, token });
});

// Auth middleware
async function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const { data } = await supabase
      .from('admin_sessions')
      .select('*')
      .eq('token', token)
      .gt('expires_at', new Date().toISOString())
      .single();
    if (!data) return res.status(401).json({ error: 'Session expired. Please log in again.' });
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Session validation failed' });
  }
}

// Get all analyses
app.get('/api/admin/analyses', requireAdmin, async (req, res) => {
  const { search, severity, limit = 50, offset = 0 } = req.query;
  let query = supabase
    .from('skin_analyses')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(Number(offset), Number(offset) + Number(limit) - 1);

  if (search) {
    query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,detected_condition.ilike.%${search}%`);
  }
  if (severity) query = query.eq('severity_level', severity);

  const { data, error, count } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data, total: count });
});

// Get stats
app.get('/api/admin/stats', requireAdmin, async (req, res) => {
  try {
    const [total, mild, moderate, severe, today] = await Promise.all([
      supabase.from('skin_analyses').select('*', { count: 'exact', head: true }),
      supabase.from('skin_analyses').select('*', { count: 'exact', head: true }).eq('severity_level', 'mild'),
      supabase.from('skin_analyses').select('*', { count: 'exact', head: true }).eq('severity_level', 'moderate'),
      supabase.from('skin_analyses').select('*', { count: 'exact', head: true }).eq('severity_level', 'severe'),
      supabase.from('skin_analyses').select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(new Date().setHours(0,0,0,0)).toISOString())
    ]);
    res.json({
      success: true,
      total: total.count || 0,
      mild: mild.count || 0,
      moderate: moderate.count || 0,
      severe: severe.count || 0,
      today: today.count || 0
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// View single record
app.get('/api/admin/analyses/:id', requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('skin_analyses')
    .select('*')
    .eq('id', req.params.id)
    .single();
  if (error) return res.status(404).json({ error: 'Record not found' });
  res.json({ success: true, data });
});

// Delete record
app.delete('/api/admin/analyses/:id', requireAdmin, async (req, res) => {
  const { error } = await supabase.from('skin_analyses').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ════════════════════════════════════════════════════
// PAGE ROUTES
// ════════════════════════════════════════════════════

app.get('/admin-ds-x92', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ════════════════════════════════════════════════════
// START SERVER
// ════════════════════════════════════════════════════
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🔬 DermAI Server running on port ${PORT}`);
  console.log(`   Frontend: http://0.0.0.0:${PORT}`);
  console.log(`   Admin:    http://0.0.0.0:${PORT}/admin-ds-x92\n`);
});
