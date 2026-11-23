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
  NOTIFY_EMAIL: 'mushieditz@gmail.com, ahmathmusharraf@gmail.com',
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
    // Message is optional; store empty string cleanly when omitted

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

    // 5. Send instant email notification (plain text + formatted HTML)
    var emailResult = sendLeadNotificationEmail_({
      timestamp: formattedTimestamp,
      name: name,
      email: email,
      phone: phone,
      interest: interest,
      message: message,
      pageUrl: pageUrl,
      utmSource: utmSource,
      utmMedium: utmMedium,
      utmCampaign: utmCampaign,
      rowNumber: rowNumber,
      sheetUrl: sheet.getParent().getUrl(),
    });

    return createJsonResponse({
      ok: true,
      status: 'success',
      rowNumber: rowNumber,
      leadStatus: 'New',
      timestamp: formattedTimestamp,
      emailNotified: emailResult.sent,
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
 * Sends instant lead notification email to CONFIG.NOTIFY_EMAIL.
 * Never throws so Google Sheet persistence always succeeds.
 */
function sendLeadNotificationEmail_(lead) {
  if (!CONFIG.NOTIFY_EMAIL) {
    return {sent: false, error: 'NOTIFY_EMAIL is blank'};
  }

  var safeMessage = lead.message || '(No message provided)';
  var cleanPhoneHref = String(lead.phone || '').replace(/[^\d+]/g, '');

  var plainBody = [
    'New website inquiry received for Mushi Digital Growth Studio:',
    '',
    'Timestamp: ' + lead.timestamp,
    'Full Name: ' + lead.name,
    'Email: ' + lead.email,
    'Phone: ' + lead.phone,
    'Interest: ' + lead.interest,
    'Lead Status: New',
    'Sheet Row: #' + lead.rowNumber,
    '',
    'Message:',
    safeMessage,
    '',
    'Page URL: ' + (lead.pageUrl || 'Direct'),
    'UTM Source: ' + (lead.utmSource || '-'),
    'UTM Medium: ' + (lead.utmMedium || '-'),
    'UTM Campaign: ' + (lead.utmCampaign || '-'),
    '',
    'Open Google Sheet: ' + (lead.sheetUrl || ''),
  ].join('\n');

  var htmlBody = [
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#111114;background:#ffffff;border:1px solid #e4e4e7;border-radius:10px;overflow:hidden;">',
    '  <div style="background:#101010;padding:20px 24px;color:#f7f6f2;">',
    '    <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#B69AFF;font-weight:700;">Mushi Digital Growth Studio</p>',
    '    <h2 style="margin:6px 0 0;font-size:20px;line-height:1.3;">New Website Lead Received</h2>',
    '  </div>',
    '  <div style="padding:24px;">',
    '    <table style="width:100%;border-collapse:collapse;font-size:14px;">',
    '      <tr><td style="padding:8px 0;color:#52525b;width:130px;font-weight:600;">Full Name</td><td style="padding:8px 0;font-weight:600;">' + escapeHtml_(lead.name) + '</td></tr>',
    '      <tr><td style="padding:8px 0;color:#52525b;font-weight:600;">Email</td><td style="padding:8px 0;"><a href="mailto:' + escapeHtml_(lead.email) + '" style="color:#6D48C5;">' + escapeHtml_(lead.email) + '</a></td></tr>',
    '      <tr><td style="padding:8px 0;color:#52525b;font-weight:600;">Phone</td><td style="padding:8px 0;"><a href="tel:' + escapeHtml_(cleanPhoneHref) + '" style="color:#111114;text-decoration:none;font-weight:600;">' + escapeHtml_(lead.phone) + '</a></td></tr>',
    '      <tr><td style="padding:8px 0;color:#52525b;font-weight:600;">Interest</td><td style="padding:8px 0;color:#6D48C5;font-weight:600;">' + escapeHtml_(lead.interest) + '</td></tr>',
    '      <tr><td style="padding:8px 0;color:#52525b;font-weight:600;">Timestamp</td><td style="padding:8px 0;">' + escapeHtml_(lead.timestamp) + '</td></tr>',
    '      <tr><td style="padding:8px 0;color:#52525b;font-weight:600;">Lead Status</td><td style="padding:8px 0;">New (Row #' + escapeHtml_(String(lead.rowNumber)) + ')</td></tr>',
    '    </table>',
    '    <div style="margin-top:16px;padding:14px 16px;background:#f7f6f2;border-radius:8px;border:1px solid #e4e4e7;">',
    '      <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#52525b;text-transform:uppercase;">Message</p>',
    '      <p style="margin:0;font-size:14px;line-height:1.5;white-space:pre-wrap;">' + escapeHtml_(safeMessage) + '</p>',
    '    </div>',
    '    <p style="margin:16px 0 0;font-size:12px;color:#52525b;">Page: ' + escapeHtml_(lead.pageUrl || 'Direct') + '<br/>UTM: ' + escapeHtml_([lead.utmSource || '-', lead.utmMedium || '-', lead.utmCampaign || '-'].join(' / ')) + '</p>',
    (lead.sheetUrl ? '    <p style="margin:18px 0 0;"><a href="' + escapeHtml_(lead.sheetUrl) + '" style="display:inline-block;padding:10px 16px;background:#101010;color:#f7f6f2;text-decoration:none;border-radius:6px;font-size:13px;font-weight:600;">Open Leads Google Sheet</a></p>' : ''),
    '  </div>',
    '</div>',
  ].join('\n');

  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAIL,
      replyTo: lead.email,
      name: 'Mushi Studio Leads',
      subject: 'New Website Lead: ' + lead.interest + ' — ' + lead.name,
      body: plainBody,
      htmlBody: htmlBody,
    });
    return {sent: true};
  } catch (mailErr) {
    Logger.log('Email notification error: ' + (mailErr && mailErr.message ? mailErr.message : String(mailErr)));
    return {sent: false, error: mailErr && mailErr.message ? mailErr.message : String(mailErr)};
  }
}

/**
 * IMPORTANT ONE-TIME SETUP TEST:
 * Select "testEmailNotification" from the Run dropdown in Apps Script and click Run
 * to authorize email sending permissions and verify instant inbox delivery.
 */
function testEmailNotification() {
  var result = sendLeadNotificationEmail_({
    timestamp: Utilities.formatDate(new Date(), CONFIG.TIMEZONE || 'Asia/Colombo', 'yyyy-MM-dd HH:mm:ss'),
    name: 'Test Lead',
    email: 'test@example.com',
    phone: '+94 76 776 5080',
    interest: 'Digital Marketing & Growth',
    message: '',
    pageUrl: 'https://mushieditz.vercel.app/contact.html',
    utmSource: 'test',
    utmMedium: 'manual',
    utmCampaign: 'verification',
    rowNumber: 1,
    sheetUrl: '',
  });
  Logger.log(JSON.stringify(result));
}

function escapeHtml_(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
