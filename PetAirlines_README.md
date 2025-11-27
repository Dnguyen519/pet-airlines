# PET AIRLINES — PROJECT DOCUMENTATION (README.md)
### Website Build Plan • Architecture • Packages • Pricing • Routing • DB Structure

---

# 0. Overview

This document defines the entire technical and business plan for the Pet Airlines website.  
It includes:

- Package offerings (Tier A–C)  
- Competitor-benchmarked pricing  
- Full page sitemap & content outline  
- Technical architecture (Next.js, Vercel, Supabase)  
- Inquiry form + database schema  
- i18n multi-language structure  
- Build phases (MVP → multilingual expansion)  
- Folder structure for your repo  
- Future roadmap  

---

# 1. SERVICE PACKAGES & PRICING  
*(Based on industry standards + competitor benchmarks)*

Pricing varies based on airline, route, season, pet size, crate dimensions, and paperwork complexity.  
Below are approximate ranges for transparency.

---

# 🟩 TIER A — TRANSPORT SERVICES (FULL / PARTIAL)

## A1. Door-to-Door International Transport (Full Service)
**Includes:**
- Home pickup  
- Airport check-in  
- Airline booking  
- Cargo handling  
- Crate confirmation  
- Export documents  
- Import permits  
- Customs clearance  
- Final delivery to destination home  
- Real-time updates / WhatsApp communication

**Approximate Price Range:**
- Small pets (under 10kg): **$2,000 – $4,500**  
- Medium (10–25kg): **$3,500 – $6,500**  
- Large (25kg+): **$5,000 – $9,000+**

### Typical Routes
- Canada → Korea: **$2,500 – $5,000+**  
- Korea → Vietnam: **$2,000 – $4,000+**  
- Canada → Vietnam: **$3,000 – $6,500+**
- Canada → France: **$3,200 – $6,800+**  
- Korea → France: **$2,800 – $5,500+**  
- Vietnam → France: **$3,500 – $7,000+**

---

## A2. Flight-Only Transport (Airport-to-Airport)
**Includes:**
- Airline booking  
- Crate approval  
- Export paperwork  
- Check-in & flight monitoring  

**Does NOT include:**
- Pickup  
- Customs  
- Final delivery  

**Price Range:**
- Small/Medium pets: **$800 – $2,000**  
- Large pets: **$2,000 – $4,000**

---

## A3. Door-to-Airport (Origin)
**Price Range:**  
- Local city: **$100 – $400**  
- Inter-city: **$300 – $800**

---

## A4. Airport-to-Door (Destination)
**Price Range:** **$200 – $600**

---

## A5. Premium Pet Nanny (In-Cabin Escort)
**Price Range:** **$1,500 – $4,000+**

---

# 🟨 TIER B — SUPPORT SERVICES

## B1. Paperwork & Documentation Handling
**Includes:**
- Health certificate scheduling  
- Vet appointment guidance  
- Vaccination schedule  
- Export/import permits  
- Airline compliance  
- Travel timeline  

**France-specific additions:**
- EU Pet Passport processing  
- TRACES system registration  
- French veterinary compliance  

**China-specific additions:** *(Future implementation)*
- AQSIQ registration  
- Chinese quarantine permits  

**Price Range:** **$150 – $600** *(+$100-200 for EU/China-specific paperwork)*

---

## B2. Customs Clearance Only
**Price Range:** **$200 – $600**

---

## B3. Crate Sizing + Delivery
Crate costs:  
- Small: **$60 – $150**  
- Medium: **$150 – $250**  
- Large: **$200 – $400+**

---

# 🟧 TIER C — CONSULTING / ADVISORY

## C1. Basic Consulting (30–45 minutes)
**Price:** **$50 – $150**

---

## C2. Premium Advisory (Full Journey Support)
**Price:** **$150 – $350**

---

# 2. WEBSITE SITEMAP & PAGE OUTLINE

All pages exist under `/[locale]/` using Next.js i18n routing.

```
/[locale]/
   home
   services
   routes
   how-it-works
   pricing
   book
   faq
   about
   resources
   legal/privacy
   legal/terms
```

---

# 3. MULTI-LANGUAGE STRUCTURE (i18n)

Supported locales:
- en (default)
- es  
- fr *(France + Francophone markets)*
- vi  
- ko  
- zh-cn *(Simplified Chinese)*

```
/locales/
   en/*.json
   es/*.json
   fr/*.json
   vi/*.json
   ko/*.json
   zh-cn/*.json
```

---

# 4. DATABASE SCHEMA (SUPABASE)

## Table: inquiries

| Column | Type | Notes |
|--------|------|--------|
| id | uuid | PK |
| created_at | timestamptz | now() |
| full_name | text |  |
| email | text |  |
| phone | text | WhatsApp preferred |
| preferred_language | text | en/es/fr/vi/ko/zh-cn |
| page_locale | text |  |
| pet_type | text |  |
| pet_breed | text |  |
| pet_weight_kg | numeric |  |
| pet_length_cm | numeric | optional |
| pet_height_cm | numeric | optional |
| pet_count | int |  |
| from_country | text |  |
| from_city | text |  |
| to_country | text |  |
| to_city | text |  |
| travel_date | date/text | approx date |
| travel_flexibility | text |  |
| crate_status | text |  |
| special_requests | text |  |
| status | text | new/in_progress/closed |
| internal_notes | text | admin use |

---

# 5. COMMUNICATION CHANNELS

### WhatsApp  
- WhatsApp Business API  
- Automated welcome message  
- Optional chatbot  

### Live Chat  
- Crisp, Tawk.to, Intercom

### Regional Communication *(Future implementation)*
- **China:** WeChat integration *(blocked in some regions)*
- **France:** Standard WhatsApp (widely used)
- **Korea:** KakaoTalk integration *(optional)*  

---

# 6. PAYMENT METHODS

## Current Implementation
- Stripe *(primary)*
- PayPal  
- Bank transfer  

## Future Regional Additions *(optional)*
- **France:** SEPA transfers  
- **China:** Alipay, WeChat Pay *(implementation complexity: high)*
- **Vietnam:** ZaloPay, MoMo *(optional)*  

---

# 7. TECH ARCHITECTURE

### Frontend
- Next.js 15 (App Router)
- TailwindCSS

### Hosting
- Vercel Edge Network  
- Global CDN  

### Backend
- Next.js API Routes  
- Supabase  

---

# 8. REPO STRUCTURE

```
/app/
   [locale]/
      layout.tsx
      page.tsx
      services/page.tsx
      routes/page.tsx
      book/page.tsx
/components/
   Header.tsx
   Footer.tsx
/locales/
   en/*.json
   es/*.json
   fr/*.json
   vi/*.json
   ko/*.json
   zh-cn/*.json
/public/
/README.md
/.env.example
```

---

# 9. BUILD PHASES

## Phase 1 — Setup  
- Next.js + Vercel  
- English routing skeleton  

## Phase 2 — Inquiry Backend  
- Supabase  
- /api/inquiries  

## Phase 3 — Content & SEO  
- Page text  
- Meta tags  
- Hreflang  

## Phase 4 — i18n Scaffold  
- Translation folders  
- JSON keys  

## Phase 5 — Launch MVP  

---

# 10. FUTURE ROADMAP

## Phase 1 *(MVP Focus)*
- Document upload portal  
- Crate calculator  
- AI chatbot  

## Phase 2 *(Market Expansion)*
- Automated quote generation  
- Multi-country landing pages  
- Currency localization (EUR, CNY)

## Phase 3 *(Advanced Features - Optional)*
- WeChat integration for China market
- EU TRACES system integration
- KakaoTalk for Korea market
- Advanced payment gateways (Alipay, SEPA)
- Region-specific compliance tracking  

---

# ✔️ END OF DOCUMENT
