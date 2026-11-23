# Google Sheets + Google Apps Script Lead Capture Setup Guide

This website inquiry & lead generation system uses **Google Sheets + Google Apps Script** as its only backend. No servers, databases, or third-party form tools are required.

---

## Step 1: Create the Google Sheet & Add Column Headers

1. Open [Google Sheets](https://sheets.google.com) and create a **Blank spreadsheet**.
2. Name the spreadsheet (e.g., `Mushi Studio — Website Leads`).
3. Rename the bottom sheet tab from `Sheet1` to **`Leads`**.
4. In **Row 1** (`A1:K1`), add these exact column headers (or leave blank—our script will auto-create and style them on the first submission):
   - `A1`: **Timestamp**
   - `B1`: **Name**
   - `C1`: **Email**
   - `D1`: **Phone**
   - `E1`: **Interest**
   - `F1`: **Message**
   - `G1`: **Page URL**
   - `H1`: **UTM Source**
   - `I1`: **UTM Medium**
   - `J1`: **UTM Campaign**
   - `K1`: **Lead Status**
5. Copy your **Spreadsheet ID** from the browser URL:
   `https://docs.google.com/spreadsheets/d/`**`<COPY_THIS_SHEET_ID>`**`/edit`

---

## Step 2: Create the Google Apps Script Project

1. Inside your Google Sheet, click **Extensions → Apps Script**.
2. Delete any starter code inside `Code.gs`.
3. Paste the complete contents of `google-apps-script/Code.gs` from this repository.
4. At the top of `Code.gs`, update:
   - `SHEET_ID`: Replace `'YOUR_GOOGLE_SHEET_ID'` with your Spreadsheet ID from Step 1.
   - `SHEET_NAME`: Keep `'Leads'` (or match your exact sheet tab name).
   - `TIMEZONE`: Set `'Asia/Colombo'`, `'Asia/Dubai'`, or your preferred IANA timezone.
5. Click **Save** (`Ctrl + S` / `Cmd + S`).

---

## Step 3: Deploy as a Public Web App & Get the URL

1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear icon next to **Select type** and choose **Web app**.
3. Configure deployment settings:
   - **Description**: `Website Lead Capture v1`
   - **Execute as**: **`Me (your-email@gmail.com)`**
   - **Who has access**: **`Anyone`** *(required so website visitors can submit without signing into Google)*
4. Click **Deploy**.
5. Click **Authorize access**, pick your Google account, click **Advanced → Go to ... (unsafe)** if prompted for personal scripts, and click **Allow**.
6. Copy the **Web app URL** ending in `/exec` (e.g. `https://script.google.com/macros/s/AKfycbx.../exec`).

> **Verification Tip**: Open that `/exec` URL directly in a browser tab. You should see JSON output `{ "ok": true, "service": "Mushi Lead Capture API", "status": "ready" }`.

---

## Step 4: Connect the Web App URL to Your Website

### Option A: Connected React Site (`/contact.html`)
Add your Web App URL to your environment variables (`.env`) as:
```env
VITE_GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```
*(Or set it directly inside `src/config/leadCapture.ts`.)*

### Option B: Standalone HTML Template (`/standalone-lead-form.html`)
Open `public/standalone-lead-form.html` and replace:
```js
var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```
with your live `/exec` URL.

---

## Security & CORS Notes
- **CORS Preflight Free JSON**: The frontend sends `JSON.stringify(payload)` using `Content-Type: text/plain;charset=utf-8` so browsers never send an unsupported `OPTIONS` preflight to Apps Script, while `Code.gs` parses `JSON.parse(e.postData.contents)` and returns `ContentService` JSON.
- **Spam & Duplicate Protection**: Both the website and `Code.gs` check the hidden `website_url` honeypot field, validate all fields, block 5-minute duplicate payloads via `sessionStorage`, sanitize formula characters (`=`, `+`, `-`, `@`), and use `LockService` to prevent concurrent row overwrites.
