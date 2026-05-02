---
name: dermai-dermatology-knowledge-v3
version: 3.0
description: |
  DERMATOLOGY CLINICAL KNOWLEDGE BASE
  50+ skin conditions, ABCDE scoring, 7-point dermoscopy,
  red-flag triage, differential diagnosis engine.
  Built on: Fitzpatrick · Bolongia · Habif · Rook · Andrews · BAD Handbook
  Datasets: ISIC · HAM10000 · DermNet · DDI · SCIN · Derm7pt · Fitzpatrick17k
---

# 🩺 DERMAI — DERMATOLOGY KNOWLEDGE BASE v3.0

## CLINICAL FOUNDATION

### Reference Books
| Book | Key Use |
|------|---------|
| Fitzpatrick's Dermatology (9th Ed) | ABCDE criteria, morphology, Fitzpatrick scale |
| Bolongia Dermatology (4th Ed) | Differential diagnosis trees |
| Habif's Clinical Dermatology (6th Ed) | Triage, patient communication |
| Rook's Textbook of Dermatology | Rare conditions, immunological patterns |
| BAD Student Handbook | Red flag rules, referral criteria |

### Training Datasets
| Dataset | Images | Use |
|---------|--------|-----|
| ISIC Archive | 400,000+ | Dermoscopic labeled images |
| HAM10000 | 10,015 | 7-class benchmark |
| Fitzpatrick17k | 16,577 | Skin tone diversity |
| DDI | 656 | Diverse skin tones |
| SCIN (Google) | 10,000+ | Self-reported symptoms |
| DermNet | 25,000+ | Clinical reference |

---

## RED-FLAG TRIAGE LOGIC

### RED FLAGS (Any 1 = Emergency)
```
RF-1  : Rapidly growing lesion — doubled in under 3 months
RF-2  : Spontaneous bleeding from lesion
RF-3  : Fever over 38°C with skin condition
RF-4  : Spreading infection — pus, warmth, red streaking
RF-5  : Mucous membrane involvement (mouth, genitals, eyes)
RF-6  : Widespread blistering/peeling over 10% body
RF-7  : ABCDE score 3+ AND diameter ≥6mm
RF-8  : Face/genital lesion in immunocompromised patient
RF-9  : Painless ulcerated nodule over 2cm
RF-10 : Child with vesicles + fever + widespread
RF-11 : Drug rash + mucosal erosions + fever (SJS/TEN)
RF-12 : New lesion with melanoma history
RF-13 : Angioedema — lip/tongue/throat swelling
RF-14 : Non-blanching purpura (meningococcemia risk)
RF-15 : Sudden widespread painful red skin
```

### AMBER FLAGS (Doctor within 2 weeks)
```
AF-1  : Lesion unchanged >6 weeks, no diagnosis
AF-2  : Slowly changing over months
AF-3  : Nail dystrophy or dark streak under nail
AF-4  : Widespread rash + unexplained weight loss
AF-5  : Non-healing wound >4 weeks
AF-6  : Herpes zoster — antivirals needed within 72h
AF-7  : Impetigo in child — antibiotic needed
AF-8  : Any unexplained rash in pregnancy
AF-9  : Lichen planus with oral component
AF-10 : Urticaria lasting >6 weeks
```

---

## DIFFERENTIAL DIAGNOSIS ENGINE — 50 CONDITIONS

| Condition | Key Features | Urgency |
|-----------|-------------|---------|
| Melanoma | Asymmetric, multicolor, irregular border, >6mm, evolving | 🔴 Urgent |
| Basal Cell Carcinoma | Pearly nodule, rolled border, telangiectasia | 🟡 2 weeks |
| Squamous Cell Carcinoma | Hyperkeratotic plaque, ulcerated, sun-exposed | 🟡 2 weeks |
| Actinic Keratosis | Sandpaper-feel, sun-exposed, >50 years | 🟡 2 weeks |
| Seborrheic Keratosis | Stuck-on warty, horn cysts, >40 years | 🟢 Monitor |
| Common Nevus | Symmetric, uniform brown, <6mm, stable | 🟢 Monitor |
| Dysplastic Nevus | Irregular border, color variation, >6mm | 🟡 Review |
| Atopic Dermatitis | Flexural, intense itch, dry skin, atopy history | 🟢 Manage |
| Psoriasis | Silvery scale, sharply defined, extensor surfaces | 🟢 Manage |
| Contact Dermatitis | Geometric border matching exposure, trigger history | 🟢 Remove trigger |
| Tinea Corporis | Annular, scaling border, central clearing | 🟢 Treat |
| Tinea Versicolor | Hypo/hyperpigmented patches, trunk | 🟢 Treat |
| Tinea Pedis | Interdigital maceration, foot scaling | 🟢 Treat |
| Onychomycosis | Nail dystrophy, yellow-brown, crumbling | 🟢 Treat |
| Candidiasis | Satellite lesions, moist flexural areas | 🟢 Treat |
| Impetigo | Honey-yellow crusted, face/limbs, children | 🟡 Treat promptly |
| Cellulitis | Warm, tender, spreading erythema, possible fever | 🔴 Urgent |
| Folliculitis | Perifollicular papules/pustules | 🟢 Treat |
| Hidradenitis Suppurativa | Recurrent nodules/abscesses, axillae/groin | 🟡 Specialist |
| Rosacea | Centrofacial erythema, flushing, no comedones | 🟢 Manage |
| Acne Vulgaris | Comedones + papules + pustules, sebaceous areas | 🟢 Treat |
| Herpes Simplex | Grouped vesicles, recurrent same site, tingling | 🟡 Antiviral |
| Herpes Zoster | Dermatomal vesicles, unilateral, burning pain | 🟡 Urgent 72h |
| Varicella | All stages simultaneously, central, fever | 🟡 Monitor |
| Scabies | Burrows, nocturnal itch, finger web spaces | 🟢 Treat contacts |
| Urticaria | Migratory wheals, <24h per lesion, itch | 🟡 if angioedema |
| Angioedema | Deep swelling lips/tongue/throat, airway risk | 🔴 Emergency |
| Vitiligo | Depigmented white macules, autoimmune | 🟢 Manage |
| Melasma | Symmetric hyperpigmented, face, hormonal | 🟢 Treat |
| PIH | Prior lesion same site, flat macule only | 🟢 Monitor |
| Lichen Planus | Purple flat-topped, Wickham's striae, wrists | 🟡 Specialist |
| Pityriasis Rosea | Herald patch, Christmas tree trunk, self-limiting | 🟢 Monitor |
| Granuloma Annulare | Annular non-scaly, hands/feet | 🟢 Monitor |
| Dermatofibroma | Firm papule, dimples on squeeze, legs | 🟢 Monitor |
| Lipoma | Soft mobile subcutaneous, rubbery, slow | 🟢 Monitor |
| Epidermal Cyst | Dome-shaped, central punctum, keratin content | 🟢 Monitor |
| Molluscum Contagiosum | Umbilicated pearly papules, children | 🟢 Treat |
| Verruca Vulgaris | Rough surface, black dots (capillaries) | 🟢 Treat |
| Sebaceous Hyperplasia | Yellow papule, central dell, face | 🟢 Monitor |
| Milia | White keratin cysts 1-2mm, periorbital | 🟢 Monitor |
| Alopecia Areata | Smooth circular hair loss, exclamation hairs | 🟡 Specialist |
| Androgenetic Alopecia | Patterned hair loss, gradual, genetic | 🟢 Manage |
| Keratosis Pilaris | Rough follicular papules, upper arms | 🟢 Manage |
| Seborrhoeic Dermatitis | Greasy scale, scalp/face, Malassezia | 🟢 Manage |
| Nummular Eczema | Coin-shaped, oozing/crusting, legs | 🟢 Treat |
| Pompholyx | Deep vesicles palms/soles, pruritic | 🟢 Treat |
| Bullous Pemphigoid | Tense bullae, elderly, eosinophilia | 🔴 Urgent |
| Pemphigus Vulgaris | Flaccid bullae, Nikolsky+, mucosal erosions | 🔴 Urgent |
| SJS/TEN | Drug-induced, mucosal erosions, epidermal detachment | 🔴 ICU |
| Erythema Multiforme | Target lesions, acral, post-HSV | 🟡 Treat |
| Fixed Drug Eruption | Same site each exposure, hyperpigmentation | 🟡 Stop drug |

---

## ABCDE SCORING (Melanoma Risk)
```
A — Asymmetry       : +1 if one half doesn't match
B — Border          : +1 if irregular/notched/ragged
C — Color           : +1 if multiple colors present
D — Diameter        : +1 if ≥6mm
E — Evolution       : +1 if any change

Score 0-1 : Low concern — monitor
Score 2   : Moderate — dermatology review
Score 3+  : HIGH — urgent referral
```

## SEVEN-POINT DERMOSCOPY
```
MAJOR (2 pts each): Atypical pigment network, Blue-white veil, Atypical vascular
MINOR (1 pt each): Irregular streaks, Irregular pigmentation, Irregular dots, Regression

0-2 : Likely benign
3   : Borderline — refer 2 weeks
4+  : High melanoma suspicion — URGENT
```

## 3-TIER OUTPUT
```
🟢 NORMAL  — Self-care tips, optional doctor list
🟡 MODERATE — Doctor referral 2-3 days, NO self-care
🔴 SEVERE  — RED ALERT, emergency contacts, nearest hospital
```
