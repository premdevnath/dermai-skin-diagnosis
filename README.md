# 🔬 DermAI — AI Skin Diagnosis

> **Your Skin. Our AI. Instant Answers.**
> Upload a photo. Get a smart skin health check in seconds.

## ✨ Features

- **AI Skin Analysis** — Powered by Google Gemini 2.5 Flash
- **50+ Skin Conditions** — Comprehensive detection database
- **3-Tier Severity System** — Green (mild), Amber (moderate), Red Alert (severe)
- **Nearest Doctors** — Find dermatologists near you
- **Admin Dashboard** — Full analytics and patient management
- **100% Private** — Images processed in memory, never stored permanently

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

### 4. Set Up Database
Run the following SQL in your Supabase SQL Editor to create the required tables:

```sql
-- 1. Table for Skin Analyses
CREATE TABLE skin_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT,
  body_location TEXT,
  duration TEXT,
  symptoms JSONB,
  existing_conditions TEXT,
  previous_treatments TEXT,
  detected_condition TEXT,
  condition_description TEXT,
  severity_level TEXT,
  severity_score INTEGER,
  ai_confidence INTEGER,
  care_tips JSONB,
  what_not_to_do JSONB,
  raw_ai_response JSONB,
  image_filename TEXT
);

-- 2. Table for Admin Sessions
CREATE TABLE admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '1 day'
);
```

### 5. Start Server
```bash
npm run dev
```
- **Frontend:** http://localhost:3000
- **Admin:** http://localhost:3000/admin-ds-x92

### 6. 🚀 Deploying to Railway
To deploy this project to [Railway.app](https://railway.app/):
1. **Create an account** and log in to Railway.
2. Click **New Project** -> **Deploy from GitHub repo** and select this repository.
3. Once the project is created, navigate to the **Variables** tab in your Railway project settings.
4. Add the following environment variables (from your `.env`):
   - `GEMINI_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
5. Railway will automatically detect the `railway.toml` config file and deploy your backend.
6. Check your deployments tab for the public URL.

## 🏗️ Tech Stack

- **Frontend:** HTML, CSS, Vanilla JS
- **Backend:** Node.js + Express
- **AI:** Google Gemini 2.5 Flash
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Railway.app

## ⚠️ Medical Disclaimer

DermAI is an AI-powered skin screening tool. It is **NOT** a licensed medical diagnosis. Always consult a certified dermatologist for proper diagnosis and treatment.

## 📄 License

MIT License — For educational and informational use only.
