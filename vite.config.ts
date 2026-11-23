import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds, and stamps production URLs into static dist HTML/SEO files.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }

          if (!fs.existsSync(distDir)) {
            return;
          }

          const rawOrigin =
            process.env.APP_URL?.trim() ||
            (process.env.VERCEL_PROJECT_PRODUCTION_URL
              ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.trim()}`
              : '') ||
            (process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL.trim()}`
              : '') ||
            'https://mushieditz.vercel.app';
          const baseOrigin = rawOrigin.replace(/\/+$/, '');

          const htmlFiles = [
            'index.html',
            'about.html',
            'services.html',
            'work.html',
            'process.html',
            'insights.html',
            'contact.html',
          ];

          for (const file of htmlFiles) {
            const filePath = path.join(distDir, file);
            if (!fs.existsSync(filePath)) continue;
            const canonicalUrl =
              file === 'index.html' ? `${baseOrigin}/` : `${baseOrigin}/${file}`;
            const updatedHtml = fs
              .readFileSync(filePath, 'utf-8')
              .replace(/__CANONICAL_URL__/g, canonicalUrl)
              .replace(/__BASE_ORIGIN__/g, baseOrigin);
            fs.writeFileSync(filePath, updatedHtml, 'utf-8');
          }

          const robotsPath = path.join(distDir, 'robots.txt');
          if (fs.existsSync(robotsPath)) {
            const robots = fs
              .readFileSync(robotsPath, 'utf-8')
              .replace(/^Sitemap:\s*\/sitemap\.xml$/m, `Sitemap: ${baseOrigin}/sitemap.xml`)
              .replace(
                /^# AI Engine Optimization Index:\s*\/llms\.txt$/m,
                `# AI Engine Optimization Index: ${baseOrigin}/llms.txt`
              );
            fs.writeFileSync(robotsPath, robots, 'utf-8');
          }

          const sitemapPath = path.join(distDir, 'sitemap.xml');
          if (fs.existsSync(sitemapPath)) {
            const sitemap = fs
              .readFileSync(sitemapPath, 'utf-8')
              .replace(/<loc>\/index\.html<\/loc>/g, `<loc>${baseOrigin}/</loc>`)
              .replace(/<loc>(\/[^<]+)<\/loc>/g, `<loc>${baseOrigin}$1</loc>`);
            fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
          }
        },
      },
    ],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          services: path.resolve(__dirname, 'services.html'),
          work: path.resolve(__dirname, 'work.html'),
          process: path.resolve(__dirname, 'process.html'),
          insights: path.resolve(__dirname, 'insights.html'),
          contact: path.resolve(__dirname, 'contact.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
