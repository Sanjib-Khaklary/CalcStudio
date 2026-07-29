import React, { useState } from 'react';
import { 
  Percent, 
  Calculator, 
  Calendar, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  UserCheck, 
  ChevronDown, 
  Sparkles, 
  Star, 
  Share2, 
  Download, 
  Clock,
  TrendingUp,
  Receipt,
  Cake
} from 'lucide-react';
import { PageId } from '../types';
import { AdBanner } from '../components/AdBanner';

interface HomePageProps {
  onSelectPage: (page: PageId, subTab?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectPage }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featureCards = [
    {
      id: 'percentage' as PageId,
      title: 'Percentage Calculator',
      description: 'Calculate percentage of numbers, percentage change (increase/decrease), discount savings, markup & profit margin with formula breakdowns.',
      icon: <Percent className="w-7 h-7 text-sky-500" />,
      gradient: 'from-sky-500/10 via-sky-500/5 to-transparent',
      borderColor: 'border-sky-500/30',
      badge: '7 Sub-Tools',
      stats: 'Instant Step-by-Step Solutions',
      highlights: ['X% of Y', 'Increase & Decrease %', 'Discount & Markup', 'Reverse %'],
      primarySubTab: 'of',
    },
    {
      id: 'gst' as PageId,
      title: 'GST Calculator',
      description: 'Add or Remove GST (Goods and Services Tax) from prices with standard rates (3%, 5%, 12%, 18%, 28%) or custom rates. CGST & SGST breakdowns.',
      icon: <Calculator className="w-7 h-7 text-indigo-500" />,
      gradient: 'from-indigo-500/10 via-indigo-500/5 to-transparent',
      borderColor: 'border-indigo-500/30',
      badge: 'Standard & Custom Rates',
      stats: 'PDF Export & Print Invoice',
      highlights: ['Add GST', 'Remove GST', 'CGST + SGST Split', 'PDF Tax Reports'],
      primarySubTab: undefined,
    },
    {
      id: 'age' as PageId,
      title: 'Age Calculator',
      description: 'Find your exact age down to years, months, weeks, days, hours, and seconds. Next birthday countdown, planetary ages, and zodiac insights.',
      icon: <Calendar className="w-7 h-7 text-amber-500" />,
      gradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
      borderColor: 'border-amber-500/30',
      badge: 'Exact Live Countdown',
      stats: 'Planet Ages & Zodiacs',
      highlights: ['Years, Months & Days', 'Next Birthday Clock', 'Planet Ages', 'Zodiac & Life Stats'],
      primarySubTab: undefined,
    },
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: 'Instant Calculations',
      description: 'Zero page reloads or lag. Outputs update synchronously in real-time as you type digits.',
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
      title: '100% Free & Unlimited',
      description: 'No paywalls, subscriptions, hidden charges, or premium feature locks. Free forever.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-sky-500" />,
      title: 'High Accuracy & Formulas',
      description: 'Rigorous mathematical logic with explicit formula displays and step-by-step breakdowns.',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-purple-500" />,
      title: 'Mobile & Tablet Ready',
      description: 'Fully responsive glassmorphism interface optimized for touch targets on iOS & Android.',
    },
    {
      icon: <UserCheck className="w-6 h-6 text-indigo-500" />,
      title: 'No Registration Required',
      description: 'Start calculating instantly without signing up or exposing personal email addresses.',
    },
    {
      icon: <Download className="w-6 h-6 text-teal-500" />,
      title: 'PDF Export & Print',
      description: 'Export professional tax summaries or age breakdowns directly as high-resolution PDF documents.',
    },
  ];

  const faqs = [
    {
      q: 'How does the Percentage Calculator handle reverse percentages?',
      a: 'The reverse percentage tool calculates the original value before a specified percentage increase or decrease occurred using the formula: Original Value = Final Value / (1 ± (Percentage / 100)).',
    },
    {
      q: 'What is the difference between Add GST and Remove GST?',
      a: 'Add GST calculates the total price inclusive of tax on a net base amount. Remove GST extracts the original tax-exclusive base price and the tax component from an all-inclusive total price.',
    },
    {
      q: 'Is my calculation data saved privately?',
      a: 'Yes! All calculations run 100% inside your browser client. Your entries and history are stored exclusively in your local browser storage and never transmitted to external servers.',
    },
    {
      q: 'Can I download or print calculation summaries?',
      a: 'Absolutely. Every calculator tool includes dedicated "Copy Result", "Print Report", and "Download PDF" buttons for instant document sharing and record-keeping.',
    },
    {
      q: 'Is CalcStudio free to use for business and commercial tasks?',
      a: 'Yes, CalcStudio is completely free for students, accountants, business managers, financial analysts, and personal use with zero usage restrictions.',
    },
  ];

  const testimonials = [
    {
      name: 'Ananya Sharma',
      role: 'Chartered Accountant',
      text: 'The GST Calculator with CGST/SGST split and instant PDF download saves me hours every week when verifying vendor tax invoices.',
      rating: 5,
    },
    {
      name: 'David Miller',
      role: 'E-commerce Business Owner',
      text: 'The Markup and Profit Margin calculator is crucial for setting product prices accurately. Fast, clean, and works seamlessly on my iPhone.',
      rating: 5,
    },
    {
      name: 'Sophia Patel',
      role: 'Student & Researcher',
      text: 'The Age Calculator with planetary ages and birthday countdown is super fun and extremely accurate. Love the dark mode theme too!',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-12">
      {/* Top Banner Ad */}
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner type="top" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 lg:pt-12 lg:pb-16 bg-gradient-to-b from-sky-500/5 via-indigo-500/5 to-transparent rounded-3xl border border-slate-200/60 dark:border-slate-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" />
              <span>Next-Gen Fast & Precise Online Calculators</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Modern Online Calculators for{' '}
              <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 dark:from-sky-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Percentage, GST & Age
              </span>
            </h1>

            <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Accurate, instantaneous, and 100% free calculation suite. Compute percentages, discounts, GST tax breakdowns, exact chronological age, planet ages, and download printable PDF reports.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onSelectPage('percentage')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-sky-600/25 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Start Calculating</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectPage('gst')}
                className="px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2 transition-all"
              >
                <Calculator className="w-4 h-4 text-indigo-500" />
                <span>GST Tax Calculator</span>
              </button>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 dark:border-slate-800 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Free & Private</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">0.0s</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Instant Output</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">PDF</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Download Ready</div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Graphic */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-md p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400">CalcStudio v2.5</span>
              </div>

              {/* Sample Interactive Graphic Card Preview */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 dark:from-sky-950/40 to-slate-50 dark:to-slate-900 border border-sky-100 dark:border-sky-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Percentage Increase</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                    +25.0% Growth
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-mono">
                  <span>800 → 1,000</span>
                  <span className="font-bold text-sky-600 dark:text-sky-400">+200 Diff</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 dark:from-indigo-950/40 to-slate-50 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">GST Invoice (18% Rate)</span>
                  </div>
                  <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
                    Add GST Mode
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-mono">
                  <span>Net $1,000 + GST $180</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">$1,180 Total</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 dark:from-amber-950/40 to-slate-50 dark:to-slate-900 border border-amber-100 dark:border-amber-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cake className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Exact Chronological Age</span>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                    Live Clock
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-mono font-bold">
                  28 Years, 4 Months, 12 Days
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Three Primary Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Primary Calculation Tools
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Select a specialized tool below to calculate instantly with formulas, step-by-step explanations, and export options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureCards.map((card) => (
            <div
              key={card.id}
              className={`group relative rounded-3xl bg-white dark:bg-slate-900 border ${card.borderColor} p-6 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${card.gradient} rounded-bl-full pointer-events-none`} />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {card.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {card.highlights.map((h, i) => (
                    <span key={i} className="text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 font-mono mb-3">
                  ⚡ {card.stats}
                </div>
                <button
                  onClick={() => onSelectPage(card.id, card.primarySubTab)}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-sky-600 dark:bg-slate-800 dark:hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-sky-600/20"
                >
                  <span>Open {card.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Middle Banner Ad */}
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner type="middle" />
      </div>

      {/* Benefits Section: Why Choose Our Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
            Built For Speed & Precision
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Choose CalcStudio?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Engineered with modern Web standard practices, mobile touch optimization, and client-side privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 shrink-0">
                {b.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions Section (FAQ Schema Ready) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Common questions regarding accuracy, tax rates, and privacy.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-sky-500' : 'text-slate-400'}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by Students, Accountants & Business Owners
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real feedback from users who rely on CalcStudio daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, r) => (
                  <Star key={r} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "{t.text}"
              </p>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                <p className="text-[11px] text-slate-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Call-To-Action Footer Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Ready to Calculate Right Now?</h2>
            <p className="text-xs sm:text-sm text-sky-100 max-w-xl">
              No account creation, no download wait times. Open any calculator to compute instant answers.
            </p>
          </div>
          <button
            onClick={() => onSelectPage('percentage')}
            className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs tracking-wide uppercase transition-transform hover:scale-105 active:scale-95 shadow-lg shrink-0"
          >
            Start Calculating Now
          </button>
        </div>
      </section>

      {/* Bottom Banner Ad */}
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner type="bottom" />
      </div>
    </div>
  );
};
