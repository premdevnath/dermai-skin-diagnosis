# 🔬 DermAI — AI Skin Diagnosis & Professional Platform

> **Your Skin. Our AI. Professional Doctors.**
> Upload a photo for a free instant AI skin check, and seamlessly connect with certified dermatologists for professional treatment.

## ✨ Features

- **Free AI Skin Check** — Powered by Google Gemini 2.5 Flash
- **3-Stage User Journey**:
  1. **Free AI Scan**: Get immediate insights and severity assessment.
  2. **Paid Consultation**: Book available dermatologists using Razorpay.
  3. **Prescriptions**: Receive digital prescriptions post-consultation.
- **50+ Skin Conditions** — Comprehensive detection database via Medical Skills.
- **Doctor & Admin Portals** — Manage bookings, schedules, and revenue securely.
- **100% Private** — Images processed in memory via Multer, never stored permanently.

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/premdevnath/dermai-skin-diagnosis.git
cd dermai-skin-diagnosis
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env
# Edit .env with your actual keys
```

### 3. Get API Keys

| Service | URL | What to Get |
|---------|-----|-------------|
| Gemini API | https://aistudio.google.com/app/apikey | GEMINI_API_KEY |
| Supabase | https://supabase.com | SUPABASE_URL + SERVICE_ROLE_KEY |
| Razorpay | https://dashboard.razorpay.com/app/keys | RAZORPAY_KEY_ID + SECRET |

### 4. Set Up Database
Run the following SQL in your Supabase SQL Editor to create the **full 5-table schema**:

```sql
-- ═══════════════════════════════
-- TABLE 1: skin_analyses
-- ═══════════════════════════════
create table skin_analyses (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  age integer,
  gender text,
  phone text,
  city text,
  body_location text,
  duration text,
  symptoms text[] default '{}',
  detected_condition text,
  condition_description text,
  severity_level text default 'normal',
  severity_score integer default 5,
  ai_confidence integer default 50,
  care_tips text[] default '{}',
  emergency_flag boolean default false,
  raw_ai_response jsonb,
  image_filename text,
  created_at timestamptz default timezone('Asia/Kolkata', now())
);

-- ═══════════════════════════════
-- TABLE 2: doctors
-- ═══════════════════════════════
create table doctors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  specialization text default 'Dermatologist',
  qualification text,              -- MBBS, MD Dermatology etc.
  experience_years integer,
  city text,
  languages text[] default '{"Hindi", "English"}',
  consultation_fee integer not null, -- in rupees (e.g. 299)
  bio text,
  profile_photo_url text,
  available_days text[] default '{"Mon","Tue","Wed","Thu","Fri"}',
  slot_duration_minutes integer default 15,
  is_active boolean default true,
  doctor_login_email text unique,
  doctor_login_password_hash text,
  total_consultations integer default 0,
  rating numeric(3,1) default 5.0,
  created_at timestamptz default now()
);

-- ═══════════════════════════════
-- TABLE 3: time_slots
-- ═══════════════════════════════
create table time_slots (
  id uuid default gen_random_uuid() primary key,
  doctor_id uuid references doctors(id) on delete cascade,
  slot_date date not null,
  slot_time text not null,         -- e.g. "10:00 AM"
  is_booked boolean default false,
  created_at timestamptz default now()
);

-- ═══════════════════════════════
-- TABLE 4: bookings
-- ═══════════════════════════════
create table bookings (
  id uuid default gen_random_uuid() primary key,
  patient_name text not null,
  patient_phone text not null,
  patient_email text,
  patient_age integer,
  patient_gender text,
  doctor_id uuid references doctors(id),
  slot_id uuid references time_slots(id),
  analysis_id uuid references skin_analyses(id), -- AI report link
  consultation_fee integer,
  payment_status text default 'pending',  -- pending|paid|failed|refunded
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_signature text,
  booking_status text default 'pending',  -- pending|confirmed|completed|cancelled
  prescription text,                      -- doctor writes here
  prescription_created_at timestamptz,
  doctor_notes text,
  whatsapp_sent boolean default false,
  created_at timestamptz default timezone('Asia/Kolkata', now())
);

-- ═══════════════════════════════
-- TABLE 5: admin_sessions
-- ═══════════════════════════════
create table admin_sessions (
  id uuid default gen_random_uuid() primary key,
  token text not null unique,
  session_type text default 'admin',  -- admin | doctor
  doctor_id uuid references doctors(id),
  created_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '8 hours')
);

-- Indexes
create index idx_bookings_doctor on bookings(doctor_id);
create index idx_bookings_status on bookings(booking_status);
create index idx_slots_doctor_date on time_slots(doctor_id, slot_date);
create index idx_analyses_created on skin_analyses(created_at desc);

-- RLS
alter table skin_analyses enable row level security;
alter table doctors enable row level security;
alter table bookings enable row level security;
alter table time_slots enable row level security;
create policy "service" on skin_analyses for all using (true);
create policy "service" on doctors for all using (true);
create policy "service" on bookings for all using (true);
create policy "service" on time_slots for all using (true);
```

### 5. Start Server
```bash
npm run dev
```
- **Frontend:** http://localhost:3000
- **Admin:** http://localhost:3000/admin-dermai-x92
- **Doctor Panel:** http://localhost:3000/doctor-panel

### 6. 🚀 Deploying to Railway
To deploy this project to [Railway.app](https://railway.app/):
1. **Create an account** and log in to Railway.
2. Click **New Project** -> **Deploy from GitHub repo** and select this repository.
3. Once the project is created, navigate to the **Variables** tab in your Railway project settings.
4. Add the following environment variables (from your `.env`):
   - `GEMINI_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `ADMIN_PASSWORD`
   - `DOCTOR_INVITE_CODE`
   - `APP_URL`
5. Railway will automatically detect the `package.json` config and deploy your backend.
6. Check your deployments tab for the public URL.

## 🏗️ Tech Stack

- **Frontend:** HTML, CSS, Vanilla JS
- **Backend:** Node.js + Express
- **AI Engine:** Google Gemini 2.5 Flash + Custom Skill Logic
- **Payments:** Razorpay API
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Railway.app

## ⚠️ Medical Disclaimer

DermAI is an AI-powered skin screening platform. The AI component is **NOT** a licensed medical diagnosis. The platform serves as a triage to connect users to certified dermatologists for professional treatment.

## 📄 License

MIT License — For educational, clinical integration, and informational use.
