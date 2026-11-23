/**
 * Mushi Digital Growth Studio — Google Sheets Lead Capture Backend
 * Single-backend serverless Web App using Google Apps Script + Google Sheets.
 *
 * Setup:
 * 1. Replace SHEET_ID with your Google Sheet's ID (from its URL: /d/<SHEET_ID>/edit).
 * 2. Keep or customize SHEET_NAME (default: 'Leads').
 * 3. Deploy -> New deployment -> Web app -> Execute as: Me -> Who has access: Anyone.
 */

var CONFIG = {
  SHEET_ID: 'YOUR_GOOGLE_SHEET_ID',
  SHEET_NAME: 'Leads',
  NOTIFY_EMAIL: 'ahmathmusharraf@gmail.com',
  TIMEZONE: 'Asia/Colombo', // Change to 'Asia/Dubai' or your preferred IANA timezone
  HEADERS: [
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'Interest',
    'Message',
    'Page URL',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'Lead Status',
  ],
};

/**
 * Health check endpoint (GET) — visit your Web App URL in a browser to verify deployment.
 */
function doGet(e) {
  return createJsonResponse({
    ok: true,
    service: 'Mushi Lead Capture API',
    sheetName: CONFIG.SHEET_NAME,
    status: 'ready',
    timestamp: new Date().toISOString(),
  });
}

/**
 * Primary lead submission endpoint (POST).
 * Accepts JSON string payload from browser fetch() (recommended Content-Type: text/plain;charset=utf-8
 * to avoid Google Apps Script CORS OPTIONS preflight failures, or application/json from server tools).
 */
function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    // Prevent concurrent row write collisions when multiple leads arrive simultaneously
    lock.waitLock(10000);

    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        ok: false,
        error: 'Empty request payload received.',
      });
    }

    var payload = parsePayload_(e.postData.contents);
    if (!payload) {
      return createJsonResponse({
        ok: false,
        error: 'Invalid JSON payload.',
      });
    }

    // 1. Honeypot Spam Protection: silently reject bots that populate hidden field
    var honeypot = cleanString_(payload.website_url || payload.honeypot || '', 120);
    if (honeypot.length > 0) {
      return createJsonResponse({
        ok: false,
        spam: true,
        error: 'Submission rejected by spam filter.',
      });
    }

    // 2. Extract and validate required fields
    var name = cleanString_(payload.name, 120);
    var email = cleanString_(payload.email, 160);
    var phone = cleanString_(payload.phone, 40);
    var interest = cleanString_(payload.interest || payload.service, 160);
    var message = cleanString_(payload.message, 3000);

    var pageUrl = cleanString_(payload.pageUrl || payload.page_url, 500);
    var utmSource = cleanString_(payload.utmSource || payload.utm_source, 120);
    var utmMedium = cleanString_(payload.utmMedium || payload.utm_medium, 120);
    var utmCampaign = cleanString_(payload.utmCampaign || payload.utm_campaign, 160);

    if (name.length < 2) {
      return createJsonResponse({ok: false, error: 'Full Name is required.'});
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return createJsonResponse({ok: false, error: 'A valid Email Address is required.'});
    }
    if (!phone || !/^[+\d\s().-]{7,24}$/.test(phone)) {
      return createJsonResponse({ok: false, error: 'A valid Phone Number is required.'});
    }
    if (!interest) {
      return createJsonResponse({ok: false, error: 'Please select a Course or Service.'});
    }
    if (message.length < 10) {
      return createJsonResponse({ok: false, error: 'Please enter a brief Message (at least 10 characters).'});
    }

    // 3. Open target Google Sheet & ensure headers exist
    var sheet = getOrCreateLeadSheet_();

    // 4. Generate server-verified formatted timestamp + default "New" Lead Status
    var now = new Date();
    var tz = CONFIG.TIMEZONE || Session.getScriptTimeZone();
    var formattedTimestamp = Utilities.formatDate(now, tz, 'yyyy-MM-dd HH:mm:ss');

    var fieldMap = {
      'timestamp': formattedTimestamp,
      'name': sanitizeCell_(name),
      'email': sanitizeCell_(email),
      'phone': formatPhoneCell_(phone),
      'interest': sanitizeCell_(interest),
      'message': sanitizeCell_(message),
      'page url': sanitizeCell_(pageUrl || 'Direct'),
      'utm source': sanitizeCell_(utmSource || ''),
      'utm medium': sanitizeCell_(utmMedium || ''),
      'utm campaign': sanitizeCell_(utmCampaign || ''),
      'lead status': 'New',
    };

    var headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn() || CONFIG.HEADERS.length).getValues()[0];
    var safeRow = headerRow.map(function (header) {
      var key = String(header || '').trim().toLowerCase();
      return Object.prototype.hasOwnProperty.call(fieldMap, key) ? fieldMap[key] : '';
    });

    sheet.appendRow(safeRow);
    var rowNumber = sheet.getLastRow();

    // Send optional email notification to Google Sheet owner
    if (CONFIG.NOTIFY_EMAIL) {
      try {
        MailApp.sendEmail({
          to: CONFIG.NOTIFY_EMAIL,
          replyTo: email,
          subject: 'New Website Lead: ' + interest + ' — ' + name,
          body: [
            'New inquiry received via Mushi Digital Growth Studio website:',
            '',
            'Timestamp: ' + formattedTimestamp,
            'Full Name: ' + name,
            'Email: ' + email,
            'Phone: ' + phone,
            'Interest: ' + interest,
            'Lead Status: New',
            '',
            'Message:',
            message,
            '',
            'Page URL: ' + (pageUrl || 'Direct'),
            'UTM Source: ' + (utmSource || '-'),
            'UTM Medium: ' + (utmMedium || '-'),
            'UTM Campaign: ' + (utmCampaign || '-'),
          ].join('\n'),
        });
      } catch (_mailErr) {
        // Ignore email quota errors so Google Sheet row save never fails
      }
    }

    return createJsonResponse({
      ok: true,
      status: 'success',
      rowNumber: rowNumber,
      leadStatus: 'New',
      timestamp: formattedTimestamp,
      message: 'Your inquiry has been received and logged cleanly.',
    });
  } catch (err) {
    return createJsonResponse({
      ok: false,
      error: 'Server error saving inquiry: ' + (err && err.message ? err.message : String(err)),
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (_ignore) {
      // Lock already released
    }
  }
}

/**
 * Opens the target spreadsheet by CONFIG.SHEET_ID (or active spreadsheet fallback)
 * and ensures the sheet tab and styled 11-column header row exist.
 */
function getOrCreateLeadSheet_() {
  if (!CONFIG.SHEET_ID || CONFIG.SHEET_ID === 'YOUR_GOOGLE_SHEET_ID') {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (!active) {
      throw new Error('CONFIG.SHEET_ID is not configured.');
    }
    return ensureSheetAndHeaders_(active, CONFIG.SHEET_NAME);
  }

  var ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  return ensureSheetAndHeaders_(ss, CONFIG.SHEET_NAME);
}

function ensureSheetAndHeaders_(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(CONFIG.HEADERS);
    var headerRange = sheet.getRange(1, 1, 1, CONFIG.HEADERS.length);
    headerRange
      .setFontWeight('bold')
      .setBackground('#101010')
      .setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function parsePayload_(raw) {
  try {
    return JSON.parse(raw);
  } catch (_err) {
    return null;
  }
}

function cleanString_(value, maxLength) {
  if (value === null || value === undefined) return '';
  return String(value).trim().slice(0, maxLength);
}

function sanitizeCell_(value) {
  if (!value) return '';
  var str = String(value);
  if (/^[=+\-@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

function formatPhoneCell_(phone) {
  if (!phone) return '';
  // Prefix with apostrophe so Google Sheets preserves leading "+" or "0" as plain text
  return "'" + String(phone).trim();
}

/**
 * Google Apps Script Web Apps execute doGet/doPost and return JSON via ContentService
 * with cross-origin headers handled automatically after Google's 302 execution redirect.
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
