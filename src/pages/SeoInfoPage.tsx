import React, { useState } from 'react';
import { FileCode, Copy, Check } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

export const SeoInfoPage: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://calcstudio.app/</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://calcstudio.app/percentage</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://calcstudio.app/gst</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://calcstudio.app/age</loc>
    <lastmod>2026-07-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

  const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://calcstudio.app/sitemap.xml`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
      <AdBanner type="top" />

      <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest bg-sky-100 dark:bg-sky-950 px-2.5 py-0.5 rounded-md">
          SEO Documents
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Sitemap.xml & Robots.txt Specification
        </h1>
        <p className="text-sm text-slate-500">
          Google Search Console & Bing Webmaster verification metadata.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <FileCode className="w-4 h-4 text-sky-400" />
              <span>sitemap.xml</span>
            </h3>
            <button
              onClick={() => handleCopy(sitemapXml, 'sitemap')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-sky-400 flex items-center gap-1"
            >
              {copied === 'sitemap' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === 'sitemap' ? 'Copied' : 'Copy Sitemap'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-950 text-sky-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            {sitemapXml}
          </pre>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span>robots.txt</span>
            </h3>
            <button
              onClick={() => handleCopy(robotsTxt, 'robots')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 flex items-center gap-1"
            >
              {copied === 'robots' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === 'robots' ? 'Copied' : 'Copy Robots'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            {robotsTxt}
          </pre>
        </div>
      </div>

      <AdBanner type="bottom" />
    </div>
  );
};
