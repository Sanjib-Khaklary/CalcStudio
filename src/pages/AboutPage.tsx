import React from 'react';
import { HelpCircle, ShieldCheck, Zap, Award, CheckCircle2 } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
      <AdBanner type="top" />

      <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest bg-sky-100 dark:bg-sky-950 px-2.5 py-0.5 rounded-md">
          About CalcStudio
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Our Mission: Fast, Precise & Free Online Calculation Tools
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          CalcStudio was engineered to bridge the gap between complex mathematical, financial, and chronological formulas and effortless everyday decision making.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <Zap className="w-6 h-6 text-sky-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Instant Calculations</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            All code executes client-side synchronously in React, ensuring outputs display instantly as you type numbers without loading spinners.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Client Privacy</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your numerical entries and history are stored strictly in your local browser storage. We never collect or store user input data on external databases.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <Award className="w-6 h-6 text-amber-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Formula Transparency</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We don't just give you a number. Every tool displays the underlying mathematical formula and step-by-step breakdown.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4">
        <h2 className="text-xl font-bold">Why Students & Professionals Choose CalcStudio</h2>
        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Free with no registration, email subscription, or paid tier barriers.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>High-resolution PDF report generation and print-friendly invoice layouts.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Mobile-first glassmorphism design with Dark and Light mode support.</span>
          </li>
        </ul>
      </div>

      <AdBanner type="bottom" />
    </div>
  );
};
