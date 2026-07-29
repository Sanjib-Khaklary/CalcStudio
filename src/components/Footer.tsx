import React from 'react';
import { Calculator, Heart, Shield, FileText, HelpCircle, Mail, Globe, CheckCircle2 } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onSelectPage: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">CalcStudio</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              CalcStudio is a modern suite of free, fast, and precise online calculation tools. Designed with glassmorphism UI, zero page reloads, step-by-step mathematical formulas, and PDF report downloads.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Free & AdSense Compliant</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-800/60">
                <Globe className="w-3.5 h-3.5" />
                <span>Client-Side Speed</span>
              </div>
            </div>
          </div>

          {/* Calculator Tools Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Calculators</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectPage('percentage')} className="hover:text-sky-400 transition-colors">
                  Percentage Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPage('gst')} className="hover:text-sky-400 transition-colors">
                  GST Tax Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPage('age')} className="hover:text-sky-400 transition-colors">
                  Exact Age Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPage('percentage')} className="hover:text-sky-400 transition-colors text-slate-400">
                  Discount & Savings
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPage('percentage')} className="hover:text-sky-400 transition-colors text-slate-400">
                  Profit Margin & Markup
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Legal & Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectPage('about')} className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPage('privacy')} className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPage('terms')} className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPage('contact')} className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Contact Support</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPage('seo-docs')} className="hover:text-sky-400 transition-colors text-slate-500">
                  Sitemap & Robots
                </button>
              </li>
            </ul>
          </div>

          {/* Features Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Core Features</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>⚡ Instant Instantaneous Output</li>
              <li>📄 Download Results as PDF</li>
              <li>🖨️ Print-Friendly Reports</li>
              <li>🌓 Light & Dark Theme</li>
              <li>💾 Local Storage Privacy</li>
              <li>📱 Responsive Mobile Design</li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CalcStudio. All rights reserved. Built for accuracy, speed & ease.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with precision</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for users worldwide</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
