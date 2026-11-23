# Mushi Digital Growth Studio

**We Build Brands. We Drive Growth.**  
Full-service digital marketing, branding, creative production, web development, and AI automation agency serving **Sri Lanka | UAE | Worldwide**, founded by **Ahmath Musharraf**.

---

## Multi-Page Architecture

The project is built with **Vite (Multi-Page App)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and an **Express** server (`server.ts`):

1. `index.html` — Home (`src/pages/HomePage.tsx`)
2. `about.html` — About Us & Founder Profile (`src/pages/AboutPage.tsx`)
3. `services.html` — Five Service Categories (`src/pages/ServicesPage.tsx`)
4. `work.html` — Sample Portfolio Concepts & Interactive Brief Viewer (`src/pages/WorkPage.tsx`)
5. `process.html` — Six-Stage Growth Methodology (`src/pages/ProcessPage.tsx`)
6. `insights.html` — Searchable Insights & Article Reader (`src/pages/InsightsPage.tsx`)
7. `contact.html` — Validated Project Enquiry Form (`src/pages/ContactPage.tsx`)

Each HTML file ships with dedicated SEO titles, meta descriptions, Open Graph metadata, Twitter cards, and Schema.org JSON-LD structured data.

---

## Local Setup & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env` if you want to enable real email delivery via Resend:
```env
STUDIO_CONTACT_EMAIL="hello@yourdomain.com"
RESEND_API_KEY="re_your_api_key"
```
> **Note:** If `RESEND_API_KEY` and `STUDIO_CONTACT_EMAIL` are not configured, `/api/enquiry` validates submissions, applies honeypot + rate-limit spam checks, logs valid submissions locally on the server (`data/enquiries.json`), and honestly instructs visitors to open their email app or copy their project brief rather than pretending an external email was dispatched.

### 3. Run Development Server
```bash
npm run dev
```
The server runs on `http://localhost:3000`.

### 4. Type-Check & Build for Production
```bash
npm run lint
npm run build
```
Production static assets for all seven HTML entry pages are emitted to `dist/`.

### 5. Pre-Launch Checklist
- Update `STUDIO_INFO` in `src/data/agencyData.ts` with your official studio inbox, WhatsApp number, and social media URLs.
- Configure `STUDIO_CONTACT_EMAIL` and `RESEND_API_KEY` in your hosting environment.
- Replace illustrative portfolio concepts in `WORK_CONCEPTS` (`src/data/agencyData.ts`) and sample articles in `INSIGHTS_ARTICLES` with approved client case studies and published studio articles.
