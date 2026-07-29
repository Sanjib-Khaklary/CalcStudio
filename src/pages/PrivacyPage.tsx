import React from 'react';
import { Shield, Lock, Eye, Cookie } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
      <AdBanner type="top" />

      <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-md">
          Privacy Policy
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Privacy Policy & Google AdSense Disclosure
        </h1>
        <p className="text-xs text-slate-500">Last updated: July 2026</p>
      </div>

      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-500" />
            <span>1. Client-Side Calculation Privacy</span>
          </h2>
          <p className="text-xs">
            CalcStudio operates primarily as a client-side web application. All numerical entries (e.g., prices, percentages, dates of birth) are calculated entirely within your web browser using JavaScript. We do not transmit or store your inputs on remote servers.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cookie className="w-5 h-5 text-amber-500" />
            <span>2. Google AdSense & Cookies</span>
          </h2>
          <p className="text-xs">
            We use Google AdSense to serve advertisements when you visit our website. Google uses cookies to serve ads based on your prior visits to this website or other websites on the Internet. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
          </p>
          <p className="text-xs">
            Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-sky-500 underline">Google Ads Settings</a>.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-sky-500" />
            <span>3. Local Storage Usage</span>
          </h2>
          <p className="text-xs">
            To enhance user experience, CalcStudio uses browser <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">localStorage</code> to remember your theme preference (Dark/Light mode) and maintain a list of your recent calculations and favorite tools. You can clear this storage anytime by using the "Clear All" button in the History drawer.
          </p>
        </section>
      </div>

      <AdBanner type="bottom" />
    </div>
  );
};
