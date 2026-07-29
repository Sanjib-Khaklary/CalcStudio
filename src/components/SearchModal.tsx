import React, { useState, useEffect, useRef } from 'react';
import { Search, Percent, Calculator, Calendar, ArrowRight, X } from 'lucide-react';
import { PageId } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPage: (page: PageId, subTab?: string) => void;
}

interface SearchableTool {
  id: string;
  page: PageId;
  subTab?: string;
  title: string;
  category: string;
  description: string;
  keywords: string[];
  icon: React.ReactNode;
}

const ALL_TOOLS: SearchableTool[] = [
  {
    id: 'pct-of',
    page: 'percentage',
    subTab: 'of',
    title: 'What is X% of Y?',
    category: 'Percentage Calculator',
    description: 'Find a percentage portion of any number (e.g., 25% of 800)',
    keywords: ['percent of', 'percentage of', 'portion', 'fraction'],
    icon: <Percent className="w-5 h-5 text-sky-500" />,
  },
  {
    id: 'pct-increase',
    page: 'percentage',
    subTab: 'increase',
    title: 'Percentage Increase',
    category: 'Percentage Calculator',
    description: 'Calculate percentage growth from old value to new value',
    keywords: ['growth', 'increase', 'rise', 'gain', 'percentage up'],
    icon: <Percent className="w-5 h-5 text-emerald-500" />,
  },
  {
    id: 'pct-decrease',
    page: 'percentage',
    subTab: 'decrease',
    title: 'Percentage Decrease',
    category: 'Percentage Calculator',
    description: 'Calculate percentage drop or loss from old value to new value',
    keywords: ['decrease', 'drop', 'reduction', 'loss', 'percentage down'],
    icon: <Percent className="w-5 h-5 text-rose-500" />,
  },
  {
    id: 'pct-diff',
    page: 'percentage',
    subTab: 'difference',
    title: 'Percentage Difference',
    category: 'Percentage Calculator',
    description: 'Find relative difference between two values A and B',
    keywords: ['difference', 'variance', 'compare', 'relative diff'],
    icon: <Percent className="w-5 h-5 text-purple-500" />,
  },
  {
    id: 'pct-reverse',
    page: 'percentage',
    subTab: 'reverse',
    title: 'Reverse Percentage',
    category: 'Percentage Calculator',
    description: 'Find original value before percentage increase or decrease',
    keywords: ['original value', 'pre tax', 'pre increase', 'reverse'],
    icon: <Percent className="w-5 h-5 text-amber-500" />,
  },
  {
    id: 'pct-discount',
    page: 'percentage',
    subTab: 'discount',
    title: 'Discount & Savings Calculator',
    category: 'Percentage Calculator',
    description: 'Calculate final price and total savings from percentage discount',
    keywords: ['discount', 'sale', 'savings', 'off', 'final price'],
    icon: <Percent className="w-5 h-5 text-indigo-500" />,
  },
  {
    id: 'pct-markup',
    page: 'percentage',
    subTab: 'markup',
    title: 'Markup & Profit Margin Calculator',
    category: 'Percentage Calculator',
    description: 'Calculate selling price, profit margin, and profit percentage from cost',
    keywords: ['markup', 'margin', 'profit', 'cost price', 'selling price'],
    icon: <Percent className="w-5 h-5 text-teal-500" />,
  },
  {
    id: 'gst-add',
    page: 'gst',
    title: 'Add GST Calculator',
    category: 'GST Calculator',
    description: 'Calculate total amount by adding GST (3%, 5%, 12%, 18%, 28%, or Custom Rate)',
    keywords: ['add gst', 'gst inclusive', 'goods and services tax', 'tax add'],
    icon: <Calculator className="w-5 h-5 text-sky-500" />,
  },
  {
    id: 'gst-remove',
    page: 'gst',
    title: 'Remove / Reverse GST Calculator',
    category: 'GST Calculator',
    description: 'Extract original pre-tax price and GST amount from total price',
    keywords: ['remove gst', 'reverse gst', 'gst exclusive', 'extract tax', 'pre tax'],
    icon: <Calculator className="w-5 h-5 text-indigo-500" />,
  },
  {
    id: 'age-exact',
    page: 'age',
    title: 'Exact Chronological Age Calculator',
    category: 'Age Calculator',
    description: 'Calculate exact age in years, months, weeks, days, hours, and seconds',
    keywords: ['age', 'birth date', 'years old', 'exact age', 'time alive'],
    icon: <Calendar className="w-5 h-5 text-amber-500" />,
  },
  {
    id: 'age-planets',
    page: 'age',
    title: 'Age on Different Planets',
    category: 'Age Calculator',
    description: 'Discover your age on Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune',
    keywords: ['planet age', 'space age', 'mars age', 'jupiter age'],
    icon: <Calendar className="w-5 h-5 text-purple-500" />,
  },
  {
    id: 'age-zodiac',
    page: 'age',
    title: 'Western & Chinese Zodiac Finder',
    category: 'Age Calculator',
    description: 'Find your astrological sign, element, and Chinese year animal',
    keywords: ['zodiac', 'astrology', 'chinese zodiac', 'horoscope'],
    icon: <Calendar className="w-5 h-5 text-rose-500" />,
  },
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectPage }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = ALL_TOOLS.filter((tool) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      tool.title.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search calculator (e.g., GST, Discount, Age, Reverse %)..."
            className="flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-100 outline-none placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No calculators found matching "{query}"
            </div>
          ) : (
            filtered.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  onSelectPage(tool.page, tool.subTab);
                  onClose();
                }}
                className="w-full flex items-center gap-3.5 p-3 rounded-xl hover:bg-sky-50/70 dark:hover:bg-sky-950/30 text-left transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 shadow-sm transition-colors">
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                      {tool.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {tool.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">ESC</kbd> to exit</span>
          <span>{filtered.length} calculators available</span>
        </div>
      </div>
    </div>
  );
};
