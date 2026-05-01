---
name: skin-analyzer-ultramaster-v4
version: 4.0-FINAL
description: |
  ULTRAMASTER MERGED SKILL — Use for ANY task related to:
  • Building an AI-powered skin analyzer website or app
  • Skin condition analysis, lesion evaluation, rash identification
  • Patient intake form design for dermatology
  • Red-alert triage logic + nearest doctor suggestion
  • Gemini 2.5 Flash API integration (FREE tier)
  • Clinical differential diagnosis (50 conditions)
  • ABCDE + Seven-Point dermoscopy scoring
  • Full React app architecture + deployment

  Trigger words: "skin analyzer banana hai", "skin problem AI", "dermatology AI app",
  "skin disease detect", "skin scan website", "skin checker", "mole check", "rash AI",
  skin problem, rash, lesion, mole, acne, eczema, psoriasis, blisters, dark patch,
  itching, burning, skin image upload — Hindi, Hinglish, ya English mein.

  Built on: Fitzpatrick · Bolongia · Habif · Rook · Andrews · BAD Handbook
  Datasets: ISIC · HAM10000 · DermNet · DDI · SCIN · Derm7pt · Fitzpatrick17k
  AI Engine: Google Gemini 2.5 Flash (Free Tier)
  Safety: AAD + Mayo Clinic + WHO triage guidelines
---

# 🩺 SKIN ANALYZER ULTRAMASTER v4.0 — FINAL MERGED SKILL

> Ye skill teen skill files ka complete merger hai. Isme clinical accuracy, full app
> building code, live search protocol, red-alert logic, aur 50-condition diagnosis
> engine — sab ek jagah hai. Copy-paste ready.

---

## 📋 TABLE OF CONTENTS

```
SECTION 1  — Knowledge Base (Books + Datasets + All Public Links)
SECTION 2  — System Architecture
SECTION 3  — FREE API Setup (Gemini 2.5 Flash)
SECTION 4  — Patient Intake Form (Complete Fields A–E)
SECTION 5  — Red-Alert + Amber Flag Logic (RF-1 to RF-15)
SECTION 6  — Differential Diagnosis Engine (50 Conditions)
SECTION 7  — ABCDE + Seven-Point Dermoscopy Scoring
SECTION 8  — Master Gemini API Function (Full Code)
SECTION 9  — Image Preprocessing + Compression
SECTION 10 — 3-Tier Output System (NORMAL / MODERATE / SEVERE)
SECTION 11 — Red Alert UI Component (Full Code + CSS)
SECTION 12 — Nearest Doctor System (India Static + Maps)
SECTION 13 — Loading Scanner Animation
SECTION 14 — Full React App File Structure
SECTION 15 — Environment Setup + Quick Start
SECTION 16 — Error Handling Table
SECTION 17 — Safety & Legal Rules (Non-Negotiable)
SECTION 18 — Deployment Checklist
SECTION 19 — Live Search Protocol (Auto-Trigger Rules)
```

---

## 📚 SECTION 1 — KNOWLEDGE BASE

### 1A. Reference Books (Clinical Foundation)

| Book | Authors | Key Contribution |
|------|---------|-----------------|
| Fitzpatrick's Dermatology (9th Ed) | Goldsmith et al. | Primary morphology terminology, ABCDE criteria, Fitzpatrick skin scale |
| Dermatology (4th Ed) | Bolongia, Schaffer, Cerroni | Differential diagnosis trees, systemic associations, treatment context |
| Rook's Textbook of Dermatology | Griffiths et al. | Rare conditions, immunological patterns, global disease prevalence |
| Andrews' Diseases of the Skin | Odom, James, Berger | Common conditions, clinical descriptions, primary care pearls |
| Habif's Clinical Dermatology (6th Ed) | Habif | Triage guidance, patient communication, primary care framing |
| BAD Student Handbook | British Assoc. of Dermatologists | Red flag rules, GP referral criteria, triage logic |

### 1B. Open Datasets — ALL Public Links (Copy-Ready)

| Dataset | Images | Key Feature | Direct Link |
|---------|--------|-------------|-------------|
| ISIC Archive | 400,000+ | Dermoscopic labeled images, multi-year | https://www.isic-archive.com/ |
| ISIC 2020 Challenge | 33,126 | Melanoma vs benign, gold-standard benchmark | https://challenge2020.isic-archive.com/ |
| ISIC SLICE-3D 2024 | 401,059 | Age, sex, anatomic site, patient ID metadata | https://challenge.isic-archive.com/landing/2024/ |
| HAM10000 | 10,015 | 7 lesion classes, classic ML benchmark, Harvard Dataverse | https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/DBW86T |
| Fitzpatrick17k | 16,577 | Skin tone diversity, Fitzpatrick I–VI annotations | https://github.com/mattgroh/fitzpatrick17k |
| DDI (Diverse Derm Images) | 656 | Pathology-confirmed, diverse skin tones, fairness testing | https://ddi-dataset.github.io/ |
| SCIN (Google Research) | 10,000+ | Self-reported symptoms + dermatologist labels, consent-based | https://github.com/google-research-datasets/scin |
| Derm7pt | 2,000+ | 7-point checklist, clinical + dermoscopic, SFU Canada | https://derm.cs.sfu.ca/Welcome.html |
| DermNet Image Library | 25,000+ | Clinical + educational, 2,500+ topics | https://dermnetnz.org/image-library/ |

### 1C. Free Clinical Reference Links

```
BAD Student Handbook (FREE PDF)  → https://www.bad.org.uk/healthcare-professionals/clinical-standards/dermatology-handbook-for-medical-students/
NCBI StatPearls Dermoscopy       → https://www.ncbi.nlm.nih.gov/books/NBK537026/
DermNet — All Clinical Topics    → https://dermnetnz.org/topics/
AAD — Public Disease Library     → https://www.aad.org/public/diseases
Mayo Clinic — Skin Conditions    → https://www.mayoclinic.org/diseases-conditions/index?letter=A
WHO Skin NTD Resources           → https://www.who.int/teams/control-of-neglected-tropical-diseases/skin-nlt
PubMed Open ML Papers            → https://pubmed.ncbi.nlm.nih.gov/?term=skin+lesion+classification+deep+learning&filter=simsearch2.ffrft
PMC Free Full-Text Papers        → https://www.ncbi.nlm.nih.gov/pmc/search/?term=skin+lesion+classification
```

### 1D. Dataset Use Strategy — 4-Bucket System

```
Bucket 1 — IMAGE DIVERSITY    : Fitzpatrick17k + DDI + SCIN
  → Skin tone fairness (Fitzpatrick I–VI), diverse demographics

Bucket 2 — LESION LABELS      : HAM10000 + ISIC 2020
  → 7-class classification: mel / nv / bcc / akiec / bkl / df / vasc

Bucket 3 — MELANOMA FEATURES  : ISIC Archive + Derm7pt
  → ABCDE criteria + 7-point dermoscopy scoring

Bucket 4 — CLINICAL LANGUAGE  : DermNet + BAD Handbook + NCBI
  → Medical terminology, triage rules, referral criteria
```

---

## 🏗️ SECTION 2 — SYSTEM ARCHITECTURE

```
PATIENT
  │
  ├─ [1] Image Upload (skin photo — compressed to <800px)
  ├─ [2] Patient Intake Form (Sections A–E — 4-step wizard)
  │
  ▼
RED-FLAG PRE-SCREEN (runs BEFORE Gemini call)
  │
  ├─ If RF detected → Show RED ALERT immediately → STOP
  ├─ If AF detected → Note AMBER status → Continue
  │
  ▼
GEMINI 2.5 FLASH API
  │
  ├─ Image Analysis (visual lesion scan)
  ├─ Patient Context Understanding (all form data)
  ├─ ABCDE Scoring + 7-Point Dermoscopy
  ├─ Differential Diagnosis (Top 3 conditions)
  ├─ Severity Classification (NORMAL / MODERATE / SEVERE)
  │
  ▼
OUTPUT LAYER (3-Tier)
  ├─ 🟢 NORMAL   → Green card + self-care tips + nearby dermatologist
  ├─ 🟡 MODERATE → Amber card + doctor referral (2-3 days)
  └─ 🔴 SEVERE   → Red Alert modal + nearest hospital + emergency 112

ALWAYS SHOW: Disclaimer + Doctor recommendation + Nearest doctors
NEVER SHOW:  Specific medication names, definitive diagnosis
```

---

## 🔑 SECTION 3 — FREE API SETUP (Gemini 2.5 Flash)

### How to Get Free API Key

```
Step 1: Go to → https://aistudio.google.com/app/apikey
Step 2: Login with Google account
Step 3: Click "Create API Key"
Step 4: Copy the key → paste in .env file
```

### Free Tier Limits

```
Requests per minute : 15 RPM
Tokens per day      : 1,000,000 (1 million)
Image analysis      : ✅ Supported (multimodal)
Cost                : $0 — completely free
```

### API Endpoint

```
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=YOUR_KEY
```

---

## 📋 SECTION 4 — PATIENT INTAKE FORM (Complete A–E Fields)

### All Form Fields (Structured)

```
SECTION A — PATIENT DEMOGRAPHICS
─────────────────────────────────
A1. Age                    : [number] years  — REQUIRED
A2. Biological Sex         : Male / Female / Other  — REQUIRED
A3. Fitzpatrick Skin Type  : I / II / III / IV / V / VI
    I = Always burns, never tans (very fair)
    III = Sometimes burns, sometimes tans (medium)
    VI = Never burns, darkest brown/black
    → Auto-detect from image if patient unsure
A4. Ethnicity / Region     : [string] — affects disease prevalence & risk
A5. Occupation             : [string] — sun/chemical exposure risk factor

SECTION B — LESION DESCRIPTION (ABCDE + Morphology)
──────────────────────────────────────────────────────
B1.  Body Location    : Face / Neck / Scalp / Chest / Back / Abdomen /
                        Upper arm / Forearm / Hand / Groin / Leg / Foot /
                        Nail / Mucosa (mouth or genital) / Other
B2.  Lesion Type      : macule / patch / papule / plaque / vesicle / bulla /
                        pustule / nodule / tumor / wheal / crust / scale /
                        erosion / ulcer / fissure / atrophy / scar / burrow /
                        telangiectasia / comedone / umbilicated papule
B3.  Color(s)         : [all visible: pink / red / brown / black / white /
                        yellow / blue / gray / orange — note ALL colors]
B4.  Size             : [in mm/cm OR: pinpoint / pea-sized / coin-sized / palm-sized]
B5.  Border           : well-defined / ill-defined / irregular / rolled / elevated
B6.  Surface          : smooth / rough / scaly / crusted / ulcerated /
                        verrucous / shiny / umbilicated / matte
B7.  Distribution     : single / multiple / localized / widespread / symmetric /
                        dermatomal / photodistributed / follicular / linear /
                        acral / flexural / sebaceous areas / pressure points
B8.  ABCDE-A Asymmetry     : Symmetric / Asymmetric
B9.  ABCDE-B Border        : Regular / Irregular / Notched / Satellite lesions
B10. ABCDE-C Color         : Uniform / Multiple colors present
B11. ABCDE-D Diameter      : Less than 6mm / 6mm or larger / Unknown
B12. ABCDE-E Evolution     : Stable / Growing / Changing color / Changing shape /
                             New bleeding or pain

SECTION C — SYMPTOMS
──────────────────────
C1. Itch (Pruritus)  : None / Mild / Moderate / Severe / Nocturnal (worse at night)
C2. Pain             : None / Mild / Moderate / Severe / Burning / Stabbing
C3. Burning          : Yes / No
C4. Bleeding         : Spontaneous / Only when scratched / No
C5. Discharge        : None / Pus / Clear fluid / Blood / Serous
C6. Duration         : [exact: X days / X weeks / X months / X years]
C7. Onset            : Sudden (under 48h) / Gradual / Chronic (over 6 weeks)
C8. Progression      : Getting worse rapidly / Getting worse slowly /
                       Stable / Improving / Cyclical (comes and goes)
C9. Systemic symptoms: Fever / Fatigue / Joint pain / Weight loss /
                       Swollen glands / None

SECTION D — HISTORY & RISK FACTORS
─────────────────────────────────────
D1.  Personal skin cancer history     : Yes / No / Unknown
D2.  Family melanoma history          : Yes / No / Unknown
D3.  Lifetime sun exposure            : Low / Moderate / High / Extreme (outdoor)
D4.  Recent sunburn                   : Yes / No
D5.  History of eczema / psoriasis    : Yes / No / Childhood only
D6.  Known allergies (contact / drug) : [list or None]
D7.  New medications in last 8 weeks  : [list or None — important for drug rash]
D8.  Recent illness / fever           : Yes / No — specify illness if yes
D9.  Travel to tropics / subtropics   : [country or None]
D10. Chemical / occupational exposure : [describe or None]
D11. Immunosuppression                : Yes / No
     Types: HIV / Organ transplant / Long-term steroids / Chemo
D12. Diabetes                         : Yes / No / Pre-diabetic
D13. Pregnancy / hormonal changes     : Yes / No / Recently postpartum
D14. Smoking / alcohol use            : Neither / Smoker / Drinker / Both

SECTION E — IMAGE DATA
───────────────────────
E1. Image type         : Clinical smartphone / Dermoscopy / Macro
E2. Image quality      : Good / Blurry / Partially visible / Over-exposed
E3. Lighting           : Natural daylight / Artificial / Flash
E4. Dermoscopy features (only if dermoscopic image — skip for phone photos):
    Pigment network    : Typical / Atypical / Absent
    Dots/globules      : Regular / Irregular / Absent
    Streaks            : Present / Absent
    Blue-white veil    : Present / Absent
    Regression areas   : Present / Absent
    Vascular pattern   : Dotted / Irregular / Linear / Absent
    Milia-like cysts   : Present / Absent
    Comedo openings    : Present / Absent
    Shiny white lines  : Present / Absent
```

### 4-Step Wizard UI Logic

```
Step 1: Demographics (A1–A5) — Age, gender, skin type, occupation
Step 2: Lesion Details (B1–B12 + C1–C9) — Location, type, ABCDE, symptoms
Step 3: Medical History (D1–D14) — All Yes/No toggles, no medication names asked
Step 4: Image Upload (E1–E4) — Upload, preview, quality check + dermoscopy if applicable

Top: Progress bar showing current step (1 of 4, 2 of 4 etc.)
```

---

## 🚨 SECTION 5 — RED-ALERT + AMBER FLAG LOGIC

> ⚠️ CRITICAL: Run ALL flag checks BEFORE sending to Gemini.
> If any RED flag is triggered → show alert → STOP — do not call API.

### 5A. RED FLAGS (Any 1 = Immediate Emergency Alert)

```
🔴 RF-1  : Rapidly growing lesion — size doubled in under 3 months
🔴 RF-2  : Spontaneous bleeding from lesion (not caused by scratching)
🔴 RF-3  : Fever over 38°C occurring together with skin condition
🔴 RF-4  : Signs of spreading infection — pus, extreme warmth, red streaking (cellulitis)
🔴 RF-5  : Mucous membrane involvement — inside mouth, genitals, or eyes
🔴 RF-6  : Widespread blistering or skin peeling affecting over 10% body surface
🔴 RF-7  : ABCDE score 3 or more positive + diameter 6mm or larger
🔴 RF-8  : Lesion on face or genitals in immunocompromised patient
🔴 RF-9  : Painless ulcerated nodule over 2cm (suspicious for SCC or BCC)
🔴 RF-10 : Child with vesicles + fever + widespread distribution (chickenpox / HSV)
🔴 RF-11 : Drug rash + mucosal erosions + fever (possible SJS / TEN — life-threatening)
🔴 RF-12 : New lesion in patient with personal or family history of melanoma
🔴 RF-13 : Angioedema — deep swelling of lips, tongue, or throat (airway risk)
🔴 RF-14 : Purpuric rash that does NOT blanch on pressing with glass (possible meningococcemia)
🔴 RF-15 : Sudden widespread painful red skin (toxic shock syndrome / SSSS in children)
```

### 5B. AMBER FLAGS (Doctor visit within 2 weeks)

```
🟡 AF-1  : Lesion unchanged for over 6 weeks with no clear diagnosis
🟡 AF-2  : Lesion changing slowly over months (color, size, or shape)
🟡 AF-3  : Nail changes — dystrophy, separation, dark longitudinal streak under nail
🟡 AF-4  : Widespread unexplained rash with unexplained weight loss
🟡 AF-5  : Chronic non-healing wound or ulcer present for over 4 weeks
🟡 AF-6  : Herpes zoster (shingles) — antivirals needed within 72 hours of onset
🟡 AF-7  : Impetigo in child — antibiotic needed, highly contagious
🟡 AF-8  : Any unexplained rash in pregnancy — needs urgent OB review
🟡 AF-9  : Lichen planus — may have oral component, specialist needed
🟡 AF-10 : Urticaria (hives) lasting over 6 weeks — chronic urticaria evaluation needed
```

### 5C. Alert Check Logic (JavaScript)

```javascript
// services/alertLogic.js

export function checkAllFlags(patientData) {
  const redFlags = [];
  const amberFlags = [];

  // RF-1: Rapidly growing
  if (patientData.abcde_E === "Growing" && patientData.durationMonths < 3)
    redFlags.push({ code: "RF-1", message: "Rapidly growing lesion — size change under 3 months" });

  // RF-2: Spontaneous bleeding
  if (patientData.bleeding === "Spontaneous")
    redFlags.push({ code: "RF-2", message: "Spontaneous bleeding from skin lesion" });

  // RF-3: Fever with rash
  if (patientData.systemicSymptoms?.includes("Fever"))
    redFlags.push({ code: "RF-3", message: "Fever accompanying the skin condition" });

  // RF-4: Infection signs
  if (patientData.discharge === "Pus" || patientData.symptoms?.includes("Red streaking"))
    redFlags.push({ code: "RF-4", message: "Signs of spreading skin infection (cellulitis risk)" });

  // RF-5: Mucosal involvement
  if (patientData.location === "Mucosa (mouth or genital)")
    redFlags.push({ code: "RF-5", message: "Mucous membrane involvement detected" });

  // RF-7: ABCDE high score
  const abcdePositive = [
    patientData.abcde_A === "Asymmetric",
    patientData.abcde_B === "Irregular" || patientData.abcde_B === "Notched",
    patientData.abcde_C === "Multiple colors present",
    patientData.abcde_D === "6mm or larger",
    patientData.abcde_E !== "Stable"
  ].filter(Boolean).length;

  if (abcdePositive >= 3 && patientData.abcde_D === "6mm or larger")
    redFlags.push({ code: "RF-7", message: `ABCDE Score ${abcdePositive}/5 — High melanoma concern` });

  // RF-11: Drug rash + mucosal + fever (SJS/TEN)
  if (patientData.recentMedications && patientData.location === "Mucosa (mouth or genital)"
      && patientData.systemicSymptoms?.includes("Fever"))
    redFlags.push({ code: "RF-11", message: "Possible SJS/TEN — LIFE THREATENING — go to emergency now" });

  // RF-12: New lesion + melanoma history
  if ((patientData.personalSkinCancerHistory || patientData.familyMelanomaHistory)
      && patientData.onset === "Sudden (under 48h)")
    redFlags.push({ code: "RF-12", message: "New lesion with personal or family melanoma history" });

  // RF-13: Angioedema
  if (patientData.symptoms?.includes("Throat swelling") || patientData.symptoms?.includes("Tongue swelling"))
    redFlags.push({ code: "RF-13", message: "Possible angioedema — airway risk — call 112 NOW" });

  // RF-14: Non-blanching purpura
  if (patientData.symptoms?.includes("Non-blanching rash"))
    redFlags.push({ code: "RF-14", message: "Non-blanching purpura — possible meningococcemia — call 112" });

  // AMBER FLAGS
  if (patientData.durationWeeks > 6 && !patientData.previousDiagnosis)
    amberFlags.push({ code: "AF-1", message: "Lesion unchanged for over 6 weeks without diagnosis" });

  if (patientData.abcde_E !== "Stable" && patientData.durationMonths > 1)
    amberFlags.push({ code: "AF-2", message: "Slowly changing lesion over months" });

  if (patientData.pregnancy)
    amberFlags.push({ code: "AF-8", message: "Unexplained rash during pregnancy — OB review needed" });

  return {
    redFlags,
    amberFlags,
    isRed: redFlags.length > 0,
    isAmber: amberFlags.length > 0 && redFlags.length === 0
  };
}
```

---

## 🧠 SECTION 6 — DIFFERENTIAL DIAGNOSIS ENGINE (50 CONDITIONS)

### HAM10000 7-Class Reference (Primary Classes)

```
mel    = Melanoma (malignant)
nv     = Melanocytic Nevus (common mole)
bcc    = Basal Cell Carcinoma
akiec  = Actinic Keratosis / Intraepithelial Carcinoma
bkl    = Benign Keratosis (seborrheic keratosis / solar lentigo)
df     = Dermatofibroma
vasc   = Vascular Lesion (angioma, pyogenic granuloma)
```

### Master Condition Lookup Table (50 Conditions)

| Condition | Key Clinical Features | Primary Look-alikes | Urgency |
|-----------|----------------------|---------------------|---------|
| Melanoma | Asymmetric, multicolor (brown/black/red/white/blue), irregular border, over 6mm, evolving | Dysplastic nevus, pigmented BCC | 🔴 Urgent |
| Basal Cell Carcinoma | Pearly/translucent nodule, rolled border, telangiectasia, face/neck, sun-damaged skin | Dermal nevus, molluscum, SCC | 🟡 2 weeks |
| Squamous Cell Carcinoma | Hyperkeratotic plaque or nodule, ulcerated center, sun-exposed areas, elderly patients | Keratoacanthoma, actinic keratosis | 🟡 2 weeks |
| Actinic Keratosis | Rough sandpaper-feel patch, sun-exposed areas, age over 50, pre-cancerous | SCC in situ, psoriasis, eczema | 🟡 2 weeks |
| Seborrheic Keratosis | Stuck-on warty appearance, horn cysts on dermoscopy, multiple lesions, over 40 years | Melanoma, BCC, pigmented lesion | 🟢 Monitor |
| Common Nevus (mole) | Symmetric, uniform brown/tan, under 6mm, stable for years, well-defined | Melanoma, blue nevus, dermatofibroma | 🟢 Monitor |
| Dysplastic Nevus | Irregular border, color variation within lesion, over 6mm, atypical | Melanoma, solar lentigo | 🟡 6-month dermatology review |
| Atopic Dermatitis (Eczema) | Flexural distribution (elbow/knee folds), intense itch, dry skin, personal or family atopy history | Psoriasis, contact dermatitis, seborrhoeic | 🟢 Manage |
| Psoriasis | Silvery-white scale, sharply defined plaques, extensor surfaces (elbows/knees), Auspitz sign on scale removal | Eczema, pityriasis rosea, seborrhoeic | 🟢 Manage |
| Contact Dermatitis | Geometric or sharp-edged border matching exposure area, trigger history, allergic or irritant type | Eczema, tinea, psoriasis | 🟢 Identify and remove trigger |
| Tinea Corporis (Ringworm) | Annular with scaling advancing border, central clearing, KOH microscopy positive | Eczema, psoriasis, granuloma annulare | 🟢 Treat |
| Tinea Versicolor | Hypo- or hyperpigmented patches on trunk, KOH shows spaghetti-and-meatballs pattern | Vitiligo, pityriasis rosea, seborrhoeic | 🟢 Treat |
| Tinea Pedis | Interdigital maceration, white peeling, scaling on foot sole, itch | Contact dermatitis, dyshidrotic eczema | 🟢 Treat |
| Onychomycosis | Nail dystrophy, subungual debris, yellow-brown discoloration, crumbling nail edge | Psoriatic nail, nail trauma, lichen planus nail | 🟢 Treat |
| Candidiasis | Satellite lesions beyond main rash, moist flexural areas, erythema with white plaques | Intertrigo, inverse psoriasis, seborrhoeic | 🟢 Treat |
| Impetigo | Honey-yellow crusted erosions, face and limbs, children, highly contagious, Staphylococcal or Streptococcal | Herpes simplex, eczema, bullous impetigo | 🟡 Treat promptly |
| Cellulitis | Warm, tender, spreading erythema with poorly defined border, possible fever, unilateral limb | DVT, lipodermatosclerosis, contact dermatitis | 🔴 Urgent |
| Folliculitis | Perifollicular papules and pustules, itchy, back and thighs and beard area, staph or pseudomonas | Acne vulgaris, pseudofolliculitis, keratosis pilaris | 🟢 Treat |
| Hidradenitis Suppurativa | Recurrent painful nodules and abscesses, axillae and groin, interconnected tunnels, scarring | Furuncles, Crohn's cutaneous manifestation | 🟡 Dermatology specialist |
| Rosacea | Centrofacial erythema, flushing, telangiectasia, inflammatory papules, no comedones | Acne vulgaris, seborrhoeic dermatitis, lupus | 🟢 Manage |
| Acne Vulgaris | Comedones (blackheads and whiteheads) + papules + pustules, sebaceous areas (face, chest, back), adolescents | Rosacea, folliculitis, perioral dermatitis | 🟢 Treat |
| Herpes Simplex (HSV) | Grouped vesicles on erythematous base, recurrent at same site, prodromal tingling, lip or genital | Impetigo, contact dermatitis, zoster | 🟡 Antiviral treatment |
| Herpes Zoster (Shingles) | Dermatomal vesicles strictly unilateral, severe burning pain precedes rash by days | Contact dermatitis, herpes simplex | 🟡 Urgent — antivirals within 72h |
| Varicella (Chickenpox) | Generalized, all stages simultaneously (macule to vesicle to crust), central distribution, fever | Impetigo, insect bites, hand-foot-mouth | 🟡 Monitor + isolate from others |
| Scabies | Interdigital burrows, nocturnal itch worst at night, web spaces of fingers, household contacts affected | Eczema, contact dermatitis, urticaria | 🟢 Treat all contacts simultaneously |
| Pediculosis (Lice) | Scalp itch, nits firmly attached to hair shaft, excoriations at nape and behind ears | Dandruff, seborrhoeic dermatitis | 🟢 Treat |
| Urticaria (Hives) | Migratory wheals that fully resolve under 24h per lesion, dermographism, intense itch | Urticarial vasculitis, bullous pemphigoid | 🟡 — 🔴 if angioedema present |
| Angioedema | Deep subcutaneous swelling of lips or tongue or throat, rapid onset, possible airway compromise | Cellulitis, contact reaction, hereditary angioedema | 🔴 Emergency — 112 |
| Vitiligo | Well-defined depigmented white macules, Wood's lamp shows bright fluorescence, autoimmune etiology | Pityriasis alba, tinea versicolor, chemical leukoderma | 🟢 Manage cosmetically and medically |
| Melasma | Symmetric hyperpigmented patches, face (cheeks, upper lip, forehead), women, sun and hormones trigger | PIH, solar lentigo, freckles | 🟢 Treat |
| Post-inflammatory Hyperpigmentation | History of prior skin lesion at exact same site, flat macule only, no active inflammation | Melanoma, melasma, fixed drug eruption | 🟢 Monitor |
| Lichen Planus | Purple flat-topped pruritic polygonal papules, Wickham's striae on surface, wrists and ankles, may have oral lesions | Psoriasis, lichen sclerosus, drug eruption | 🟡 Dermatology specialist |
| Pityriasis Rosea | Herald patch appears first, then Christmas tree distribution on trunk, self-limiting 6–8 weeks | Secondary syphilis, tinea corporis, guttate psoriasis | 🟢 Monitor — rule out syphilis |
| Granuloma Annulare | Annular non-scaly skin-colored or pink papules and plaques, hands and feet, no scale | Tinea corporis, sarcoidosis, necrobiosis lipoidica | 🟢 Monitor |
| Dermatofibroma | Firm papule that dimples on lateral squeeze (Fitzpatrick pinch sign), legs predominantly, women | Melanoma, blue nevus, BCC | 🟢 Monitor |
| Lipoma | Soft, mobile, compressible, subcutaneous, rubbery, non-tender, very slow growing | Epidermal cyst, lymph node, liposarcoma if large and hard | 🟢 Monitor |
| Epidermal Cyst | Firm dome-shaped nodule with central punctum, cheesy keratin content on expression, slow-growing | Lipoma, pilar cyst, lymph node | 🟢 If infected — treat promptly |
| Molluscum Contagiosum | Umbilicated pearly papules 2–5mm, children or immunocompromised, sexually transmitted in adults | Flat warts, milia, folliculitis | 🟢 Treat |
| Verruca Vulgaris (Wart) | Rough hyperkeratotic surface, thrombosed capillaries visible as black dots, HPV, fingers and feet | SCC, molluscum, corns | 🟢 Treat |
| Sebaceous Hyperplasia | Yellow papule with central dell (pit), face, middle-aged to elderly adults, multiple | BCC, milia, fibrous papule of nose | 🟢 Monitor |
| Milia | Small white keratin-filled cysts 1–2mm, periorbital area, no central punctum | Sebaceous hyperplasia, closed comedones, syringoma | 🟢 Monitor |
| Alopecia Areata | Smooth circular or oval hair loss patches, exclamation mark hairs at periphery, autoimmune | Tinea capitis, traction alopecia, trichotillomania | 🟡 Dermatology specialist |
| Androgenetic Alopecia | Patterned hair loss, Hamilton-Norwood scale in men, Ludwig scale in women, gradual, genetic | Diffuse alopecia from thyroid, iron deficiency alopecia | 🟢 Manage |
| Keratosis Pilaris | Rough follicular papules, upper arms and thighs and cheeks, young adults, harmless | Folliculitis, milia, ichthyosis vulgaris | 🟢 Manage |
| Seborrhoeic Dermatitis | Greasy or waxy scale on scalp, face, chest, and flexures, Malassezia-related, dandruff variant | Psoriasis, rosacea, tinea versicolor | 🟢 Manage |
| Nummular Eczema | Coin-shaped oozing and crusting plaques, legs mainly, triggered by dry air and wool | Tinea corporis, psoriasis, contact dermatitis | 🟢 Treat |
| Pompholyx (Dyshidrotic Eczema) | Deep-seated tapioca vesicles on palms and soles and lateral fingers, intensely pruritic | Contact dermatitis, tinea pedis, scabies | 🟢 Treat |
| Bullous Pemphigoid | Tense bullae on erythematous skin, elderly, eosinophilia, IgG anti-basement membrane | Pemphigus vulgaris, TEN, linear IgA | 🔴 Urgent specialist |
| Pemphigus Vulgaris | Flaccid bullae, Nikolsky sign positive, mucosal erosions, autoimmune, IgG anti-desmoglein | Bullous pemphigoid, TEN, SJS | 🔴 Urgent hospital admission |
| Stevens-Johnson Syndrome / TEN | Drug-induced, mucosal erosions at two or more sites, epidermal detachment, fever, ICU required | Other drug rashes, pemphigus | 🔴 Emergency ICU |
| Erythema Multiforme | Target lesions with three concentric zones, acral distribution, post-HSV or Mycoplasma | Urticaria, SJS, bullous pemphigoid | 🟡 Treat |
| Fixed Drug Eruption | Returns at exact same anatomic site with each drug exposure, residual hyperpigmentation between episodes | Melanoma, bruise, PIH | 🟡 Stop causative drug immediately |

---

## 📊 SECTION 7 — ABCDE + SEVEN-POINT SCORING

### 7A. ABCDE Criteria (Melanoma Risk)

```
A — Asymmetry       : One half does not match the other → +1 risk point
B — Border          : Irregular, notched, or ragged edges → +1 risk point
C — Color           : Multiple colors within the lesion → +1 risk point
D — Diameter        : 6mm or larger (size of pencil eraser) → +1 risk point
E — Evolution       : Any change in size, shape, color, or new symptom → +1 risk point

Score 0–1 : Low concern — routine monitoring
Score 2   : Moderate — dermatology review recommended
Score 3+  : HIGH — urgent dermatology referral needed
```

### 7B. Seven-Point Dermoscopy Checklist (for pigmented lesions only)

```
MAJOR CRITERIA — 2 points each:
  Atypical pigment network    → +2
  Blue-white veil             → +2
  Atypical vascular pattern   → +2

MINOR CRITERIA — 1 point each:
  Irregular streaks           → +1
  Irregular pigmentation      → +1
  Irregular dots/globules     → +1
  Regression structures       → +1

Score Interpretation:
  0–2 : Likely benign — monitor annually
  3   : Borderline — refer within 2 weeks
  4+  : High melanoma suspicion — URGENT referral
```

---

## 🔌 SECTION 8 — MASTER GEMINI API FUNCTION (Full Code)

```javascript
// services/geminiApi.js

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

const MASTER_SYSTEM_PROMPT = `You are a world-class AI dermatology assistant trained on
Fitzpatrick's Dermatology (9th Ed), Bolongia's Dermatology (4th Ed), and Habif's Clinical
Dermatology, and calibrated against HAM10000, ISIC 2020, DermNet, SCIN, DDI, and
Fitzpatrick17k datasets covering diverse skin tones from Fitzpatrick Type I through VI.

YOUR ROLE: Provide a structured differential diagnosis and triage recommendation based on
the skin image and patient intake data provided.

MANDATORY SAFETY RULES:
1. NEVER prescribe specific medications, drugs, creams, or pharmaceutical treatments
2. NEVER give a definitive certain diagnosis — always say "consistent with", "appears to
   be", or "may indicate"
3. ALWAYS recommend consulting a certified dermatologist regardless of severity
4. Apply RED FLAG logic FIRST — if any red flag is present, set severityLevel to SEVERE
5. If image quality is poor, note it and ask for a clearer photo rather than guessing
6. NEVER claim over 85% confidence — always acknowledge the limits of AI assessment
7. Account for Fitzpatrick skin type — pigmented lesions present differently on darker skin
8. Use ABCDE criteria for pigmented lesions
9. Use Seven-Point Checklist if dermoscopy features are visible
10. List supporting AND contradicting features for each differential

OUTPUT: Respond ONLY with valid JSON — no markdown, no preamble, no backticks:
{
  "redAlertStatus": "NONE" | "AMBER" | "RED",
  "triggeredRedFlags": ["RF-7"] or [],
  "triggeredAmberFlags": ["AF-1"] or [],
  "emergencyMessage": "Full urgent message if RED status — null otherwise",
  "severityLevel": "NORMAL" | "MODERATE" | "SEVERE",
  "abcdeScore": {
    "A": true,
    "B": false,
    "C": true,
    "D": false,
    "E": true,
    "total": 3
  },
  "sevenPointScore": 4,
  "primaryMorphology": "Annular scaly plaque with advancing border",
  "fitzpatrickDetected": "IV",
  "differentialDiagnosis": [
    {
      "rank": 1,
      "condition": "Tinea Corporis",
      "confidence": "HIGH",
      "supportingFeatures": ["annular shape", "scaling advancing border", "central clearing"],
      "contradictingFeatures": ["no KOH test available to confirm"],
      "clinicalReference": "Fitzpatrick Chapter 188 / DermNet tinea-corporis"
    },
    {
      "rank": 2,
      "condition": "Eczema (Nummular)",
      "confidence": "MODERATE",
      "supportingFeatures": ["coin-shaped lesion", "visible crusting"],
      "contradictingFeatures": ["lacks typical flexural distribution"],
      "clinicalReference": "Bolongia Chapter 12 / DermNet nummular-eczema"
    },
    {
      "rank": 3,
      "condition": "Psoriasis",
      "confidence": "LOW",
      "supportingFeatures": ["scaling present"],
      "contradictingFeatures": ["no silvery scale", "not on extensor surface"],
      "clinicalReference": "Fitzpatrick Chapter 18"
    }
  ],
  "selfCareSteps": ["Keep area clean and dry", "Avoid scratching", "Use fragrance-free gentle soap"],
  "warningSignsToWatch": ["Spreading of the red border", "Development of fever", "Increasing pain"],
  "followUpRecommendation": "See a dermatologist within 7 days if no improvement",
  "doctorTypeNeeded": "Dermatologist",
  "knowledgeBaseUsed": ["Fitzpatrick", "DermNet", "HAM10000"],
  "imageQualityNote": "Good quality image — full lesion visible in natural light",
  "disclaimer": "This AI assessment is for educational purposes only and does not constitute a medical diagnosis. Always consult a qualified dermatologist."
}`;

export async function analyzeSkin(patientData, imageBase64) {

  const patientContext = `
PATIENT INTAKE DATA:
Age: ${patientData.age} years
Sex: ${patientData.gender}
Fitzpatrick Skin Type: ${patientData.fitzpatrickType || "Not specified"}
Affected Area: ${patientData.problemArea}
Duration: ${patientData.duration}
Lesion Type: ${patientData.lesionType || "Not specified"}
Color: ${patientData.color || "Not specified"}
Border: ${patientData.border || "Not specified"}
Distribution: ${patientData.distribution || "Not specified"}
ABCDE — A(Asymmetry): ${patientData.abcde_A} | B(Border): ${patientData.abcde_B} | C(Color): ${patientData.abcde_C} | D(Diameter): ${patientData.abcde_D} | E(Evolution): ${patientData.abcde_E}
Symptoms: ${patientData.symptoms?.join(", ") || "None reported"}
Systemic symptoms: ${patientData.systemicSymptoms?.join(", ") || "None"}
Allergies: ${patientData.allergies || "None"}
Recent medications (last 8 weeks): ${patientData.recentMedications || "None"}
Sun exposure: ${patientData.sunExposure || "Not specified"}
Immunosuppressed: ${patientData.immunosuppressed || "No"}
Diabetes: ${patientData.diabetes || "No"}
Family history of melanoma: ${patientData.familyMelanomaHistory || "No"}
Personal skin cancer history: ${patientData.personalSkinCancerHistory || "No"}
Travel history: ${patientData.travelHistory || "None"}
Pregnancy: ${patientData.pregnancy || "No"}
Occupation: ${patientData.occupation || "Not specified"}

Please analyze the skin image in context of all the above patient data.`;

  const requestBody = {
    contents: [{
      parts: [
        { text: MASTER_SYSTEM_PROMPT + "\n\n" + patientContext },
        { inline_data: { mime_type: "image/jpeg", data: imageBase64.split(",")[1] } }
      ]
    }],
    generationConfig: {
      temperature: 0.15,
      maxOutputTokens: 2000,
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || "Gemini API call failed");
  }

  const data = await response.json();
  const rawText = data.candidates[0].content.parts[0].text;

  try {
    return JSON.parse(rawText);
  } catch {
    // Fallback: strip possible markdown fences
    const clean = rawText.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  }
}
```

---

## 🖼️ SECTION 9 — IMAGE PREPROCESSING + COMPRESSION

```javascript
// utils/imageUtils.js

export async function compressImage(file, maxWidthPx = 800, qualityPct = 0.75) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const img = new Image();

    img.onerror = () => reject(new Error("Failed to load image"));
    img.onload = () => {
      const scale = Math.min(maxWidthPx / img.width, 1);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result); // base64 data URL
          reader.onerror = () => reject(new Error("FileReader failed"));
          reader.readAsDataURL(blob);
        },
        "image/jpeg",
        qualityPct
      );
    };
    img.src = URL.createObjectURL(file);
  });
}

export function validateImageFile(file) {
  const MAX_SIZE_MB = 10;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
  if (!ALLOWED_TYPES.includes(file.type)) return "Please upload a JPG, PNG, or WebP image.";
  if (file.size > MAX_SIZE_MB * 1024 * 1024) return `File too large. Maximum size is ${MAX_SIZE_MB}MB.`;
  return null;
}
```

---

## 📊 SECTION 10 — 3-TIER OUTPUT SYSTEM

### Tier Logic

```
🟢 NORMAL — Minor, manageable skin issues
──────────────────────────────────────────
Conditions : Mild rash, dry skin, minor irritation, small pimple, heat rash, KP
Show       : Green card + what condition appears to be + 3-4 self-care tips
Self-care  : Gentle tips ONLY — "Keep area clean and dry", "Avoid scratching",
             "Use fragrance-free soap" — NO medication names ever
Doctor     : "If no improvement within 7-10 days, visit a dermatologist"
Nearby doc : Show optional nearby dermatologist list

🟡 MODERATE — Needs professional attention soon
─────────────────────────────────────────────────
Conditions : Eczema, fungal infection, contact dermatitis, spreading acne, psoriasis
Show       : Amber card + condition info + why doctor is needed
NO self-care steps — encourage doctor visit, don't suggest home treatment
Doctor     : "Please consult a certified dermatologist within 2-3 days"
Nearby doc : Show top 3 nearest dermatologists

🔴 SEVERE — RED ALERT — Urgent care required
──────────────────────────────────────────────
Conditions : Spreading cellulitis, widespread blistering, suspicious mole, SJS/TEN,
             angioedema, non-blanching purpura
Show       : Full-screen RED ALERT modal with pulsing border animation
Message    : "This requires urgent medical attention — see a doctor TODAY"
NO AI diagnosis shown — stop here
Show       : Emergency 112 button + Nearest Hospital + Nearest Dermatologist
Disclaimer : Prominent, clear
```

### Output Display Logic

```javascript
// App.jsx — main display function

function displayResults(result, alertStatus) {
  // Always show
  showDisclaimer();
  showDoctorRecommendation(result.doctorTypeNeeded);
  showNearestDoctors();

  if (alertStatus.isRed) {
    showRedAlertModal(alertStatus.redFlags);
    return; // STOP — no AI diagnosis shown
  }

  // Show condition info always (for non-RED)
  showPrimaryMorphology(result.primaryMorphology);
  showABCDEScore(result.abcdeScore);
  if (result.sevenPointScore !== null) showSevenPointScore(result.sevenPointScore);
  showDifferentialDiagnosis(result.differentialDiagnosis);
  showWarningSignsToWatch(result.warningSignsToWatch);
  showImageQualityNote(result.imageQualityNote);

  if (result.severityLevel === "NORMAL") {
    showGreenCard(result);
    showSelfCareSteps(result.selfCareSteps); // ONLY here
  }

  if (result.severityLevel === "MODERATE" || alertStatus.isAmber) {
    showAmberCard(result);
    // NO self-care steps
  }

  if (result.severityLevel === "SEVERE") {
    showRedAlertModal(alertStatus.redFlags || [{ code: "AI-SEVERE", message: result.emergencyMessage }]);
    showNearestHospitals(); // Hospitals first
  }
}
```

---

## 🚨 SECTION 11 — RED ALERT UI COMPONENT

```jsx
// components/results/SevereRedAlert.jsx

import { useEffect } from "react";

export function RedAlertSplash({ flags, onFindHospital, onFindDoctor }) {

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(220, 0, 0, 0.12)",
      zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px"
    }}>
      <div className="red-alert-card" style={{
        background: "white",
        border: "4px solid #dc2626",
        borderRadius: "20px",
        padding: "32px",
        maxWidth: "500px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto"
      }}>

        {/* Alert Header */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div style={{ fontSize: "56px" }}>🚨</div>
          <h1 style={{ color: "#dc2626", fontSize: "22px", fontWeight: "bold", margin: "8px 0" }}>
            Urgent Medical Attention Required
          </h1>
          <p style={{ color: "#7f1d1d", fontSize: "14px" }}>
            Please see a doctor or go to emergency TODAY. Do not delay.
          </p>
        </div>

        {/* Triggered Flags */}
        <div style={{ background: "#fef2f2", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
          <p style={{ fontWeight: "bold", color: "#991b1b", marginBottom: "8px" }}>Warning signs detected:</p>
          {flags.map(f => (
            <div key={f.code} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "20px", flexShrink: 0 }}>🔴</span>
              <div>
                <span style={{ fontWeight: "bold", color: "#dc2626" }}>[{f.code}]</span>{" "}
                <span style={{ color: "#374151", fontSize: "14px" }}>{f.message}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={() => window.open("tel:112")}
            style={{ background: "#dc2626", color: "white", padding: "16px", borderRadius: "12px",
                     fontSize: "17px", fontWeight: "bold", border: "none", cursor: "pointer" }}>
            📞 Call Emergency: 112
          </button>
          <button
            onClick={onFindHospital}
            style={{ background: "#1d4ed8", color: "white", padding: "14px", borderRadius: "12px",
                     fontSize: "15px", border: "none", cursor: "pointer" }}>
            🏥 Find Nearest Hospital
          </button>
          <button
            onClick={onFindDoctor}
            style={{ background: "#065f46", color: "white", padding: "14px", borderRadius: "12px",
                     fontSize: "15px", border: "none", cursor: "pointer" }}>
            👨‍⚕️ Nearest Skin Specialist
          </button>
        </div>

        {/* Disclaimer */}
        <p style={{ fontSize: "11px", color: "#6b7280", marginTop: "20px", textAlign: "center", lineHeight: "1.5" }}>
          ⚠️ This AI assessment is for educational purposes only and does not constitute a
          medical diagnosis. Always consult a qualified dermatologist or emergency services.
        </p>
      </div>
    </div>
  );
}

/* Add to index.css:
@keyframes pulseBorder {
  0%, 100% { border-color: #dc2626; box-shadow: 0 0 20px rgba(220,38,38,0.4); }
  50%       { border-color: #ff0000; box-shadow: 0 0 60px rgba(255,0,0,0.8); }
}
.red-alert-card { animation: pulseBorder 1.5s ease-in-out infinite; }
*/
```

---

## 🏥 SECTION 12 — NEAREST DOCTOR SYSTEM

### 12A. India Static Data (Jodhpur + Major Cities — No API Needed)

```javascript
// data/indianDermatologists.js

export const INDIA_DERMATOLOGISTS = {
  "Jodhpur": [
    { name: "AIIMS Jodhpur — Dermatology Dept.", type: "Government", address: "Basni Phase-2, Jodhpur", phone: "0291-2740741", emergency: true },
    { name: "Mahatma Gandhi Hospital — Skin Dept.", type: "Government", address: "Shastri Nagar, Jodhpur", phone: "0291-2434374", emergency: true },
    { name: "Umaid Hospital", type: "Government", address: "Umaid Hospital Road, Jodhpur", phone: "0291-2544000", emergency: true }
  ],
  "Jaipur": [
    { name: "SMS Hospital — Dermatology Dept.", type: "Government", address: "JLN Marg, Jaipur", phone: "0141-2518385", emergency: true },
    { name: "NIMS University Hospital", type: "Private", address: "Shobha Nagar, Jaipur", phone: "0141-2215999", emergency: false }
  ],
  "Delhi": [
    { name: "AIIMS New Delhi — Dermatology", type: "Government", address: "Ansari Nagar East, New Delhi", phone: "011-26588500", emergency: true },
    { name: "RML Hospital — Skin Dept.", type: "Government", address: "Baba Kharak Singh Marg, New Delhi", phone: "011-23365525", emergency: true },
    { name: "Safdarjung Hospital", type: "Government", address: "Ansari Nagar West, New Delhi", phone: "011-26707444", emergency: true }
  ],
  "Mumbai": [
    { name: "KEM Hospital — Dermatology Dept.", type: "Government", address: "Acharya Donde Marg, Parel, Mumbai", phone: "022-24107000", emergency: true },
    { name: "Lokmanya Tilak Hospital (Sion)", type: "Government", address: "Sion, Mumbai", phone: "022-24076381", emergency: true }
  ],
  "Bangalore": [
    { name: "Victoria Hospital — Skin Dept.", type: "Government", address: "Fort Road, Bengaluru", phone: "080-26701150", emergency: true },
    { name: "Bowring & Lady Curzon Hospital", type: "Government", address: "Shivajinagar, Bengaluru", phone: "080-25320532", emergency: true }
  ],
  "Chennai": [
    { name: "Government General Hospital — Skin Dept.", type: "Government", address: "Park Town, Chennai", phone: "044-25305000", emergency: true }
  ],
  "Hyderabad": [
    { name: "Osmania General Hospital — Dermatology", type: "Government", address: "Afzalgunj, Hyderabad", phone: "040-24600125", emergency: true }
  ]
};
```

### 12B. Geolocation + Maps Link (Free)

```javascript
// utils/locationUtils.js

export function openNearestDoctors(type = "dermatologist") {
  const searchTerm = type === "emergency"
    ? "nearest hospital emergency room"
    : "dermatologist skin specialist near me";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const url = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm)}/@${coords.latitude},${coords.longitude},14z`;
        window.open(url, "_blank");
      },
      () => {
        // Fallback without coordinates
        window.open(`https://www.google.com/maps/search/${encodeURIComponent(searchTerm)}`, "_blank");
      }
    );
  } else {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(searchTerm)}`, "_blank");
  }
}
```

---

## ⏳ SECTION 13 — LOADING SCANNER ANIMATION

```jsx
// components/shared/LoadingScanner.jsx

export function LoadingScanner({ imageUrl }) {
  return (
    <div style={{ position: "relative", maxWidth: "340px", margin: "0 auto", textAlign: "center" }}>

      {/* Scanning Image Box */}
      <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: "2px solid #10b981" }}>
        <img src={imageUrl} alt="Analyzing skin..." style={{ width: "100%", display: "block" }} />

        {/* Green scan line sweeping down */}
        <div className="scan-line" style={{
          position: "absolute", left: 0, right: 0, height: "3px",
          background: "linear-gradient(90deg, transparent, #10b981, transparent)"
        }} />
      </div>

      <p style={{ marginTop: "16px", fontWeight: "bold", color: "#065f46" }}>
        🔬 AI analyzing your skin image...
      </p>
      <p style={{ fontSize: "13px", color: "#6b7280" }}>
        Cross-referencing with HAM10000 · ISIC · DermNet · Fitzpatrick datasets
      </p>
      <p style={{ fontSize: "12px", color: "#9ca3af" }}>Please wait 10–20 seconds</p>
    </div>
  );
}

/* CSS to add in index.css:
@keyframes scanDown {
  0%   { top: 0%; }
  100% { top: 100%; }
}
.scan-line { animation: scanDown 2s linear infinite; }
*/
```

---

## 📁 SECTION 14 — FULL REACT APP FILE STRUCTURE

```
skin-analyzer/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── intake/
│   │   │   ├── Step1_Demographics.jsx      (A1–A5: age, gender, Fitzpatrick, occupation)
│   │   │   ├── Step2_LesionDetails.jsx     (B1–B12: location, type, ABCDE, distribution)
│   │   │   ├── Step3_Symptoms.jsx          (C1–C9: symptoms checkboxes)
│   │   │   ├── Step3_MedicalHistory.jsx    (D1–D14: all Yes/No toggles)
│   │   │   └── Step4_ImageUpload.jsx       (E1–E4: upload, preview, quality check)
│   │   ├── results/
│   │   │   ├── NormalResult.jsx            (green card + self-care tips)
│   │   │   ├── ModerateResult.jsx          (amber card + doctor advice)
│   │   │   └── SevereRedAlert.jsx          (full-screen red alert modal + 112)
│   │   ├── doctors/
│   │   │   ├── DoctorCard.jsx              (name, type, phone, directions button)
│   │   │   └── NearestDoctors.jsx          (list from static data + maps link)
│   │   └── shared/
│   │       ├── ABCDEScoreDisplay.jsx       (visual A/B/C/D/E tick display)
│   │       ├── SevenPointScore.jsx         (score bar + risk level)
│   │       ├── DifferentialList.jsx        (top 3 conditions with confidence)
│   │       ├── Disclaimer.jsx              (always-visible disclaimer footer)
│   │       ├── LoadingScanner.jsx          (scan animation during API call)
│   │       └── ProgressWizard.jsx          (step 1-2-3-4 progress bar)
│   ├── services/
│   │   ├── geminiApi.js                    (master API function — Section 8)
│   │   └── alertLogic.js                  (RF-1 to RF-15 checking — Section 5C)
│   ├── data/
│   │   ├── indianDermatologists.js         (city-wise doctor/hospital data)
│   │   ├── conditionLookup.js             (50-condition reference table)
│   │   └── redFlagRules.js                (RF + AF definitions)
│   ├── utils/
│   │   ├── imageUtils.js                  (compress + validate)
│   │   └── locationUtils.js              (geolocation + maps)
│   ├── App.jsx
│   └── main.jsx
├── .env                                   (VITE_GEMINI_API_KEY=...)
├── .gitignore                             (.env must be in here!)
├── tailwind.config.js
└── package.json
```

---

## ⚙️ SECTION 15 — ENVIRONMENT SETUP + QUICK START

```bash
# 1. Create project
npm create vite@latest skin-analyzer -- --template react
cd skin-analyzer
npm install

# 2. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Add API key to .env
echo "VITE_GEMINI_API_KEY=paste_your_key_here" > .env

# 4. Make sure .env is in .gitignore (SECURITY)
echo ".env" >> .gitignore

# 5. Start dev server
npm run dev

# 6. Deploy to Vercel (free)
npm install -g vercel
vercel deploy
```

### Access API Key in Code

```javascript
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
```

### Tech Stack Summary

```
Frontend  : React (Vite) + Tailwind CSS
API       : Google Gemini 2.5 Flash (Free Tier)
Maps      : Google Maps link via navigator.geolocation (Free)
Auth      : Firebase Auth (if needed — Free tier)
Storage   : Firebase Storage (if scan history needed — Free tier)
Hosting   : Vercel (Free) — frontend
Backend   : Not needed for prototype (API call from frontend)
            Node.js / Express on Railway (if API key must be hidden server-side)
```

---

## 🐞 SECTION 16 — ERROR HANDLING TABLE

| Error | Cause | Fix |
|-------|-------|-----|
| `API_KEY_INVALID` | Wrong or expired key | Create new key at aistudio.google.com |
| `RESOURCE_EXHAUSTED` | 15 RPM free tier limit hit | Show "Please wait 60 seconds" + retry button |
| Image too large | Base64 over 4MB | Run compressImage() before sending — 800px / 75% quality |
| JSON parse error | Gemini returned non-JSON text | Fallback: strip backticks + retry parse; show "Analysis unavailable" |
| CORS error | Direct API call blocked in some environments | Move API call to backend Express server |
| `imageQualityNote !== "Good"` | Blurry or dark image | Show "Please retake photo in good natural lighting" |
| No geolocation | Browser permission denied | Fallback to Google Maps open search without coordinates |
| Image is not skin | User uploaded wrong image | Add pre-validation prompt: "Please ensure image shows the skin area clearly" |

---

## 🛡️ SECTION 17 — SAFETY & LEGAL RULES (NON-NEGOTIABLE)

### What AI MUST Always Do

```
✅ Use hedged language: "appears to be" / "may indicate" / "consistent with"
✅ Recommend dermatologist on every single output — all 3 tiers
✅ Show disclaimer on every screen — not just results
✅ Run RED FLAG logic BEFORE any Gemini API call
✅ Show ABCDE score and confidence level transparently
✅ Acknowledge when image quality is insufficient
✅ Consider skin tone (Fitzpatrick type) in visual assessment
```

### What AI Must Never Do

```
❌ Suggest specific medications (no "apply hydrocortisone", no "take cetirizine")
❌ Give definitive diagnosis ("You HAVE eczema" — never)
❌ Tell user they do not need a doctor
❌ Store patient images without explicit written consent
❌ Process images of minors without parental consent noted
❌ Claim accuracy over 85% for any prediction
❌ Show differential diagnosis if all 3 have LOW confidence — show "insufficient data" instead
```

### Mandatory Disclaimer Text (Every Screen)

```
⚠️ Medical Disclaimer: This AI analysis is for educational purposes only and does
not constitute a medical diagnosis. Always consult a qualified dermatologist or
healthcare professional for proper diagnosis and treatment.
In case of emergency, call 112 immediately.
```

---

## ✅ SECTION 18 — DEPLOYMENT CHECKLIST

```
PRE-BUILD
- [ ] Gemini API key created at aistudio.google.com (free)
- [ ] .env file created with VITE_GEMINI_API_KEY=...
- [ ] .env added to .gitignore (never commit the key!)

FORM & INTAKE
- [ ] 4-step wizard working (Demographics / Lesion / History / Image)
- [ ] All ABCDE fields collected in Step 2
- [ ] Progress bar visible on top

IMAGE HANDLING
- [ ] Image upload working with file type validation
- [ ] compressImage() runs before API call (max 800px / 75% quality)
- [ ] Image preview shown before submission

LOGIC
- [ ] checkAllFlags() runs BEFORE Gemini call (RF-1 to RF-15)
- [ ] RED flag → Red Alert modal shown → API call SKIPPED
- [ ] AMBER flag → noted in results — API call proceeds

RESULTS
- [ ] 3 result tiers display correctly (Normal / Moderate / Severe)
- [ ] Red Alert modal with pulsing border animation ✅
- [ ] selfCareSteps shown ONLY for NORMAL tier
- [ ] ABCDE score displayed visually
- [ ] Top 3 differentials with confidence and references shown
- [ ] Nearest doctor section working (static + Google Maps link)

SAFETY
- [ ] Disclaimer shown on every screen
- [ ] NO medication names in any output
- [ ] Emergency 112 button visible on RED tier

TESTING
- [ ] Tested with light skin tones (Fitzpatrick I–II)
- [ ] Tested with dark skin tones (Fitzpatrick IV–VI)
- [ ] Tested mobile responsive (most users will be on phone)
- [ ] Tested slow network (show loading states)

DEPLOYMENT
- [ ] Build passes: npm run build
- [ ] Deployed on Vercel: vercel deploy
- [ ] API key set as Vercel environment variable (not in code)
```

---

## 🔍 SECTION 19 — LIVE SEARCH PROTOCOL

### Auto-Search Triggers

Claude should call web_search automatically when:
- Condition is rare or not in the 50-condition lookup table
- Patient is under age 5 or over age 85 with atypical presentation
- Tropical travel history mentioned (possible exotic disease)
- Immunosuppression + unusual presentation
- Drug rash with mucosal + systemic features (possible SJS/TEN update)
- Outbreak pattern — multiple family members affected
- Nail-only involvement with no skin lesions

### Search Query Templates

```
DermNet clinical info:
→ site:dermnetnz.org [condition name] clinical features diagnosis

AAD patient guidelines:
→ site:aad.org [condition name] signs symptoms treatment

NCBI latest research:
→ site:pubmed.ncbi.nlm.nih.gov [condition name] classification 2024

Mayo Clinic triage:
→ site:mayoclinic.org skin [condition name] when to see doctor

ISIC dataset condition:
→ site:isic-archive.com [condition name] dermoscopy features

HAM10000 class reference:
→ HAM10000 [mel / nv / bcc / akiec / bkl / df / vasc] classification dataset
```

---

## 📎 SECTION 20 — ALL PUBLIC LINKS (FINAL COPY-READY LIST)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 IMAGE DATASETS (Open Access, Free)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ISIC Archive (400K+ images)      → https://www.isic-archive.com/
ISIC 2020 Challenge              → https://challenge2020.isic-archive.com/
ISIC SLICE-3D 2024               → https://challenge.isic-archive.com/landing/2024/
HAM10000 (Harvard Dataverse)     → https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/DBW86T
Fitzpatrick17k (GitHub)          → https://github.com/mattgroh/fitzpatrick17k
DDI — Diverse Derm Images        → https://ddi-dataset.github.io/
SCIN — Google Research           → https://github.com/google-research-datasets/scin
Derm7pt — SFU Canada             → https://derm.cs.sfu.ca/Welcome.html
DermNet Image Library (25K+)     → https://dermnetnz.org/image-library/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 FREE CLINICAL REFERENCES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BAD Student Handbook (FREE PDF)  → https://www.bad.org.uk/healthcare-professionals/clinical-standards/dermatology-handbook-for-medical-students/
NCBI StatPearls Dermoscopy       → https://www.ncbi.nlm.nih.gov/books/NBK537026/
DermNet — All Topics             → https://dermnetnz.org/topics/
AAD — Public Disease Library     → https://www.aad.org/public/diseases
Mayo Clinic — Skin Conditions    → https://www.mayoclinic.org/diseases-conditions/index?letter=A
WHO Skin NTD Resources           → https://www.who.int/teams/control-of-neglected-tropical-diseases/skin-nlt
PubMed Open ML Papers            → https://pubmed.ncbi.nlm.nih.gov/?term=skin+lesion+classification+deep+learning&filter=simsearch2.ffrft
PMC Free Full-Text Papers        → https://www.ncbi.nlm.nih.gov/pmc/search/?term=skin+lesion+classification

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔑 FREE API
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gemini 2.5 Flash API Key         → https://aistudio.google.com/app/apikey
Gemini API Vision Docs           → https://ai.google.dev/gemini-api/docs/vision
Gemini API Pricing               → https://ai.google.dev/pricing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 FREE HOSTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vercel (Frontend)                → https://vercel.com
Netlify (Frontend)               → https://netlify.com
Railway (Backend / Node.js)      → https://railway.app
Firebase (Auth + Storage)        → https://firebase.google.com
```

---

*SKILL v4.0-FINAL | Merged from SKILL_2.md + SKILL_3.md + UltraMaster prompt*
*Clinical basis: Fitzpatrick · Bolongia · Habif · Rook · Andrews · BAD Handbook*
*Datasets: ISIC · HAM10000 · DermNet · DDI · SCIN · Derm7pt · Fitzpatrick17k*
*AI Engine: Google Gemini 2.5 Flash (Free Tier)*
*Safety standard: AAD · Mayo Clinic · WHO triage guidelines*
*Total conditions covered: 50 | Red flags: 15 | Amber flags: 10*
