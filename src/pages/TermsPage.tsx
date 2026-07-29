import React from 'react';
import { FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
      <AdBanner type="top" />

      <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-100 dark:bg-indigo-950 px-2.5 py-0.5 rounded-md">
          Terms & Conditions
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Terms of Service & Mathematical Disclaimer
        </h1>
        <p className="text-xs text-slate-500">Effective Date: July 2026</p>
      </div>

      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-indigo-500" />
            <span>1. Acceptance of Terms</span>
          </h2>
          <p className="text-xs">
            By accessing and using CalcStudio, you agree to comply with these Terms & Conditions. If you do not agree with any part of these terms, you must discontinue use of the website immediately.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>2. Disclaimer of Financial & Tax Advice</span>
          </h2>
          <p className="text-xs">
            The calculations provided by CalcStudio (including Percentage, GST tax breakdowns, and Age tools) are intended for informational, educational, and general utility purposes only. While every effort is made to maintain mathematical accuracy, CalcStudio is not a substitute for certified accounting, legal, or professional tax advice. Always verify tax filings with qualified tax professionals or revenue authorities in your jurisdiction.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-500" />
            <span>3. Limitation of Liability</span>
          </h2>
          <p className="text-xs">
            CalcStudio shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from errors, omissions, or the use of calculation outputs generated on this platform.
          </p>
        </section>
      </div>

      <AdBanner type="bottom" />
    </div>
  );
};
