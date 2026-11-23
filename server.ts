import 'dotenv/config';
import express, {type Request, type Response} from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const PAGE_ROUTES: Record<string, string> = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/about': 'about.html',
  '/about.html': 'about.html',
  '/services': 'services.html',
  '/services.html': 'services.html',
  '/work': 'work.html',
  '/work.html': 'work.html',
  '/process': 'process.html',
  '/process.html': 'process.html',
  '/insights': 'insights.html',
  '/insights.html': 'insights.html',
  '/contact': 'contact.html',
  '/contact.html': 'contact.html',
};

interface EnquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  submittedAt: string;
}

const rateLimitMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS);
  if (timestamps.length >= RATE_MAX_REQUESTS) {
    rateLimitMap.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

function saveEnquiryLocally(record: EnquiryRecord): void {
  const dataDir = path.resolve(__dirname, 'data');
  const filePath = path.join(dataDir, 'enquiries.json');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, {recursive: true});
  }
  let existing: EnquiryRecord[] = [];
  if (fs.existsSync(filePath)) {
    try {
      existing = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as EnquiryRecord[];
    } catch {
      existing = [];
    }
  }
  existing.push(record);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');
}

function resolveOrigin(req: Request): string {
  const configured = process.env.APP_URL?.trim().replace(/\/+$/, '');
  if (configured) return configured;
  const proto = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'https';
  const host = (req.headers['x-forwarded-host'] as string) || req.get('host') || 'localhost:3000';
  return `${proto}://${host}`;
}

function injectCanonicalMetadata(html: string, origin: string, reqPath: string): string {
  const normalizedPath = reqPath === '/' ? '/index.html' : reqPath.endsWith('.html') ? reqPath : `${reqPath}.html`;
  const canonicalUrl = `${origin}${normalizedPath === '/index.html' ? '/' : normalizedPath}`;
  return html
    .replace(/__CANONICAL_URL__/g, canonicalUrl)
    .replace(/__BASE_ORIGIN__/g, origin);
}

async function startServer() {
  const app = express();
  app.use(express.json({limit: '64kb'}));

  app.get('/robots.txt', (req: Request, res: Response) => {
    const origin = resolveOrigin(req);
    res
      .type('text/plain')
      .send(
        [
          'User-agent: *',
          'Allow: /',
          'Disallow: /api/',
          '',
          'User-agent: Googlebot',
          'Allow: /',
          'User-agent: Bingbot',
          'Allow: /',
          'User-agent: GPTBot',
          'Allow: /',
          'User-agent: OAI-SearchBot',
          'Allow: /',
          'User-agent: ChatGPT-User',
          'Allow: /',
          'User-agent: ClaudeBot',
          'Allow: /',
          'User-agent: PerplexityBot',
          'Allow: /',
          'User-agent: Google-Extended',
          'Allow: /',
          '',
          `Sitemap: ${origin}/sitemap.xml`,
          `# AIO Knowledge Index: ${origin}/llms.txt`,
        ].join('\n')
      );
  });

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const origin = resolveOrigin(req);
    const today = new Date().toISOString().split('T')[0];
    const entries = [
      {loc: '/', priority: '1.0', changefreq: 'weekly'},
      {loc: '/services.html', priority: '0.9', changefreq: 'weekly'},
      {loc: '/work.html', priority: '0.9', changefreq: 'weekly'},
      {loc: '/about.html', priority: '0.8', changefreq: 'monthly'},
      {loc: '/process.html', priority: '0.8', changefreq: 'monthly'},
      {loc: '/insights.html', priority: '0.8', changefreq: 'weekly'},
      {loc: '/contact.html', priority: '0.7', changefreq: 'monthly'},
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
      .map(
        entry =>
          `  <url>\n    <loc>${origin}${entry.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`
      )
      .join('\n')}\n</urlset>`;
    res.type('application/xml').send(xml);
  });

  app.get(['/llms.txt', '/llms-full.txt'], (req: Request, res: Response) => {
    const fileName = req.path === '/llms-full.txt' ? 'llms-full.txt' : 'llms.txt';
    const filePath = path.resolve(__dirname, 'public', fileName);
    if (fs.existsSync(filePath)) {
      res.type('text/plain; charset=utf-8').send(fs.readFileSync(filePath, 'utf-8'));
      return;
    }
    res.status(404).send('Not found');
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    const resendConfigured = Boolean(process.env.RESEND_API_KEY?.trim());
    const rawEmail = process.env.STUDIO_CONTACT_EMAIL?.trim() || '';
    const recipientConfigured = Boolean(
      rawEmail && !rawEmail.includes('example') && !rawEmail.includes('yourdomain')
    );
    res.json({
      status: 'ok',
      resendKeyConfigured: resendConfigured,
      emailIntegrationConfigured: resendConfigured && recipientConfigured,
      studioContactEmail: recipientConfigured ? rawEmail : null,
    });
  });

  app.post('/api/enquiry', async (req: Request, res: Response) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        error: 'Too many enquiry attempts. Please wait a few minutes before submitting again.',
      });
      return;
    }

    const body = req.body as Record<string, unknown>;
    const honeypot = typeof body.website_url === 'string' ? body.website_url.trim() : '';
    if (honeypot.length > 0) {
      // Silently reject automated spam submissions
      res.status(400).json({
        ok: false,
        error: 'Submission blocked by automated spam filter.',
      });
      return;
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const company = typeof body.company === 'string' ? body.company.trim() : '';
    const service = typeof body.service === 'string' ? body.service.trim() : '';
    const budget = typeof body.budget === 'string' ? body.budget.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    const errors: Record<string, string> = {};
    if (name.length < 2) errors.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid work email address.';
    if (phone && !/^[+\d\s().-]{7,24}$/.test(phone)) {
      errors.phone = 'Please enter a valid phone or WhatsApp number.';
    }
    if (!service) errors.service = 'Please select the service you need.';
    if (message.length < 15) {
      errors.message = 'Please share a brief project overview (at least 15 characters).';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Please review the highlighted fields and try again.',
        fieldErrors: errors,
      });
      return;
    }

    const record: EnquiryRecord = {
      id: `ENQ-${Date.now().toString(36).toUpperCase()}`,
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
      submittedAt: new Date().toISOString(),
    };

    try {
      saveEnquiryLocally(record);
    } catch (err) {
      console.error('Failed to persist enquiry locally:', err);
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const studioEmail = process.env.STUDIO_CONTACT_EMAIL?.trim();
    const hasValidRecipient = Boolean(
      studioEmail && !studioEmail.includes('example') && !studioEmail.includes('yourdomain')
    );

    if (resendApiKey && hasValidRecipient && studioEmail) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL?.trim() || 'Mushi Studio Website <onboarding@resend.dev>',
            to: [studioEmail],
            reply_to: email,
            subject: `New Project Enquiry: ${service} — ${name}`,
            text: [
              `Reference: ${record.id}`,
              `Name: ${name}`,
              `Email: ${email}`,
              `Phone / WhatsApp: ${phone || 'Not provided'}`,
              `Company: ${company || 'Not provided'}`,
              `Service: ${service}`,
              `Estimated Budget: ${budget || 'Not specified'}`,
              '',
              'Project Brief:',
              message,
            ].join('\n'),
          }),
        });

        if (!resendRes.ok) {
          throw new Error(`Email provider responded with ${resendRes.status}`);
        }

        res.status(200).json({
          ok: true,
          mode: 'email-dispatched',
          enquiryId: record.id,
          message: 'Your enquiry has been delivered to Mushi Digital Growth Studio. We will respond within one business day.',
        });
        return;
      } catch (err) {
        console.error('Email dispatch failed:', err);
        res.status(502).json({
          ok: false,
          error: 'Email delivery encountered an issue. Please verify your Resend domain/key or use the direct email option below.',
        });
        return;
      }
    }

    if (resendApiKey && !hasValidRecipient) {
      res.status(202).json({
        ok: true,
        mode: 'recorded-awaiting-email-config',
        enquiryId: record.id,
        message:
          'RESEND_API_KEY is configured, but STUDIO_CONTACT_EMAIL is not set yet. Your enquiry was validated and logged locally; add STUDIO_CONTACT_EMAIL in Secrets to enable email delivery, or use "Open in Email App" below.',
      });
      return;
    }

    res.status(202).json({
      ok: true,
      mode: 'recorded-awaiting-email-config',
      enquiryId: record.id,
      message:
        'Your enquiry was validated and logged by the preview server, but external email delivery is not configured yet (RESEND_API_KEY and STUDIO_CONTACT_EMAIL). Use "Open in Email App" or copy your brief below.',
    });
  });

  if (!isProduction) {
    const {createServer: createViteServer} = await import('vite');
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req: Request, res: Response, next) => {
      const reqPath = req.originalUrl.split('?')[0];
      const htmlFile = PAGE_ROUTES[reqPath];
      if (!htmlFile) {
        next();
        return;
      }
      try {
        const templatePath = path.resolve(__dirname, htmlFile);
        const rawHtml = injectCanonicalMetadata(
          fs.readFileSync(templatePath, 'utf-8'),
          resolveOrigin(req),
          reqPath
        );
        const transformed = await vite.transformIndexHtml(req.originalUrl, rawHtml);
        res.status(200).set({'Content-Type': 'text/html'}).end(transformed);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.use('*', (req: Request, res: Response) => {
      const reqPath = req.originalUrl.split('?')[0];
      const htmlFile = PAGE_ROUTES[reqPath] || 'index.html';
      const filePath = path.join(distDir, htmlFile);
      if (fs.existsSync(filePath)) {
        const html = injectCanonicalMetadata(
          fs.readFileSync(filePath, 'utf-8'),
          resolveOrigin(req),
          reqPath
        );
        res.status(200).set({'Content-Type': 'text/html'}).end(html);
        return;
      }
      res.sendFile(filePath);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mushi Digital Growth Studio server running at http://localhost:${PORT}`);
  });
}

startServer();
