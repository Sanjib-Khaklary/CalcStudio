import React, { useState, useEffect } from 'react';
import { 
  Percent, 
  Copy, 
  RotateCcw, 
  Share2, 
  Check, 
  Info, 
  TrendingUp, 
  TrendingDown, 
  Tag, 
  DollarSign, 
  BookOpen, 
  Star,
  Zap,
  HelpCircle
} from 'lucide-react';
import { PercentageToolType } from '../types';
import { saveHistoryItem, toggleFavorite, getFavorites } from '../utils/storage';
import { AdBanner } from '../components/AdBanner';

interface PercentagePageProps {
  initialSubTab?: string;
  onShowToast: (title: string, description?: string, type?: 'success' | 'info' | 'error') => void;
}

export const PercentagePage: React.FC<PercentagePageProps> = ({ initialSubTab, onShowToast }) => {
  const [activeTab, setActiveTab] = useState<PercentageToolType>(
    (initialSubTab as PercentageToolType) || 'of'
  );

  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(getFavorites());

  // Tool 1: What is X% of Y?
  const [pct1, setPct1] = useState<string>('25');
  const [val1, setVal1] = useState<string>('800');

  // Tool 2: Percentage Increase
  const [oldInc, setOldInc] = useState<string>('100');
  const [newInc, setNewInc] = useState<string>('125');

  // Tool 3: Percentage Decrease
  const [oldDec, setOldDec] = useState<string>('200');
  const [newDec, setNewDec] = useState<string>('150');

  // Tool 4: Percentage Difference
  const [diffA, setDiffA] = useState<string>('50');
  const [diffB, setDiffB] = useState<string>('75');

  // Tool 5: Reverse Percentage
  const [revFinal, setRevFinal] = useState<string>('120');
  const [revPct, setRevPct] = useState<string>('20');
  const [revMode, setRevMode] = useState<'increase' | 'decrease'>('increase');

  // Tool 6: Discount Calculator
  const [discPrice, setDiscPrice] = useState<string>('120');
  const [discPct, setDiscPct] = useState<string>('15');

  // Tool 7: Markup & Profit Margin
  const [costPrice, setCostPrice] = useState<string>('100');
  const [markupPct, setMarkupPct] = useState<string>('30');

  // Sync state if initialSubTab changes
  useEffect(() => {
    if (initialSubTab) {
      setActiveTab(initialSubTab as PercentageToolType);
    }
  }, [initialSubTab]);

  // Read URL query params on mount for instant share link prefilling
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tool');
    if (tabParam) setActiveTab(tabParam as PercentageToolType);

    if (params.get('pct1')) setPct1(params.get('pct1')!);
    if (params.get('val1')) setVal1(params.get('val1')!);
    if (params.get('oldInc')) setOldInc(params.get('oldInc')!);
    if (params.get('newInc')) setNewInc(params.get('newInc')!);
    if (params.get('discPrice')) setDiscPrice(params.get('discPrice')!);
    if (params.get('discPct')) setDiscPct(params.get('discPct')!);
    if (params.get('costPrice')) setCostPrice(params.get('costPrice')!);
    if (params.get('markupPct')) setMarkupPct(params.get('markupPct')!);
  }, []);

  const handleToggleFav = (toolKey: string) => {
    const updated = toggleFavorite(toolKey);
    setFavorites(updated);
    const isFav = updated.includes(toolKey);
    onShowToast(
      isFav ? 'Added to Favorites' : 'Removed from Favorites',
      `Percentage tool '${toolKey}' updated in your favorites bar.`,
      'info'
    );
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onShowToast('Copied to Clipboard!', `${label}: ${text}`);
  };

  const handleShareResult = (summary: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('tool', activeTab);
    
    if (activeTab === 'of') {
      currentUrl.searchParams.set('pct1', pct1);
      currentUrl.searchParams.set('val1', val1);
    } else if (activeTab === 'discount') {
      currentUrl.searchParams.set('discPrice', discPrice);
      currentUrl.searchParams.set('discPct', discPct);
    } else if (activeTab === 'markup') {
      currentUrl.searchParams.set('costPrice', costPrice);
      currentUrl.searchParams.set('markupPct', markupPct);
    }

    navigator.clipboard.writeText(currentUrl.toString());
    onShowToast('Shareable Link Copied!', 'Anyone opening this link will see your exact pre-filled inputs.');
  };

  // --- Calculation Logic ---

  // 1. What is X% of Y?
  const numPct1 = parseFloat(pct1) || 0;
  const numVal1 = parseFloat(val1) || 0;
  const result1 = (numPct1 / 100) * numVal1;

  // 2. Increase
  const numOldInc = parseFloat(oldInc) || 0;
  const numNewInc = parseFloat(newInc) || 0;
  const diffInc = numNewInc - numOldInc;
  const pctIncResult = numOldInc !== 0 ? (diffInc / numOldInc) * 100 : 0;

  // 3. Decrease
  const numOldDec = parseFloat(oldDec) || 0;
  const numNewDec = parseFloat(newDec) || 0;
  const diffDec = numOldDec - numNewDec;
  const pctDecResult = numOldDec !== 0 ? (diffDec / numOldDec) * 100 : 0;

  // 4. Difference
  const numDiffA = parseFloat(diffA) || 0;
  const numDiffB = parseFloat(diffB) || 0;
  const absDiff = Math.abs(numDiffA - numDiffB);
  const avgDiff = (numDiffA + numDiffB) / 2;
  const pctDiffResult = avgDiff !== 0 ? (absDiff / avgDiff) * 100 : 0;

  // 5. Reverse
  const numRevFinal = parseFloat(revFinal) || 0;
  const numRevPct = parseFloat(revPct) || 0;
  const revOriginal =
    revMode === 'increase'
      ? numRevFinal / (1 + numRevPct / 100)
      : numRevFinal / (1 - numRevPct / 100);

  // 6. Discount
  const numDiscPrice = parseFloat(discPrice) || 0;
  const numDiscPct = parseFloat(discPct) || 0;
  const savingsAmount = (numDiscPct / 100) * numDiscPrice;
  const finalPrice = numDiscPrice - savingsAmount;

  // 7. Markup & Margin
  const numCost = parseFloat(costPrice) || 0;
  const numMarkup = parseFloat(markupPct) || 0;
  const markupAmount = (numMarkup / 100) * numCost;
  const sellingPrice = numCost + markupAmount;
  const profitMarginPct = sellingPrice !== 0 ? (markupAmount / sellingPrice) * 100 : 0;

  // Auto-record history when inputs are complete
  const recordHistory = (title: string, summary: string, details: Record<string, string | number>) => {
    saveHistoryItem({
      category: 'Percentage',
      title,
      summary,
      details,
    });
  };

  const tabs: { id: PercentageToolType; label: string; icon: React.ReactNode }[] = [
    { id: 'of', label: 'X% of Y', icon: <Percent className="w-4 h-4 text-sky-500" /> },
    { id: 'increase', label: 'Percentage Increase', icon: <TrendingUp className="w-4 h-4 text-emerald-500" /> },
    { id: 'decrease', label: 'Percentage Decrease', icon: <TrendingDown className="w-4 h-4 text-rose-500" /> },
    { id: 'difference', label: 'Percentage Difference', icon: <Percent className="w-4 h-4 text-purple-500" /> },
    { id: 'reverse', label: 'Reverse Percentage', icon: <RotateCcw className="w-4 h-4 text-amber-500" /> },
    { id: 'discount', label: 'Discount & Savings', icon: <Tag className="w-4 h-4 text-indigo-500" /> },
    { id: 'markup', label: 'Markup & Margin', icon: <DollarSign className="w-4 h-4 text-teal-500" /> },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      
      {/* Top Banner Ad */}
      <AdBanner type="top" />

      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest bg-sky-100 dark:bg-sky-950 px-2.5 py-0.5 rounded-md">
              Multi-Calculator Suite
            </span>
            <button
              onClick={() => handleToggleFav(`pct_${activeTab}`)}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-amber-500 transition-colors"
              title="Favorite this tool"
            >
              <Star className={`w-4 h-4 ${favorites.includes(`pct_${activeTab}`) ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Percentage Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Instant percentage calculations, growth rates, discounts, margin formulas & step-by-step explanations.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100 dark:border-slate-800">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Calculator Workspace */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/5 space-y-6 relative overflow-hidden">
            
            {/* Tool 1: What is X% of Y? */}
            {activeTab === 'of' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Percent className="w-5 h-5 text-sky-500" />
                    <span>What is X% of Y?</span>
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">Formula: (X / 100) × Y</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Percentage (X%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={pct1}
                        onChange={(e) => setPct1(e.target.value)}
                        placeholder="e.g. 25"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                      />
                      <span className="absolute right-4 top-3.5 text-slate-400 text-sm font-bold">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Total Amount (Y)
                    </label>
                    <input
                      type="number"
                      value={val1}
                      onChange={(e) => setVal1(e.target.value)}
                      placeholder="e.g. 800"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Instant Result Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 border border-sky-200/80 dark:border-sky-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Calculated Output</span>
                    <div className="text-3xl font-black text-slate-900 dark:text-white mt-0.5">
                      {result1.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {numPct1}% of {numVal1} is equal to {result1}.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        handleCopyText(result1.toString(), 'Percentage Result');
                        recordHistory('What is X% of Y?', `${numPct1}% of ${numVal1} = ${result1}`, { X: numPct1, Y: numVal1, Output: result1 });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'Copied' : 'Copy Result'}</span>
                    </button>
                    <button
                      onClick={() => handleShareResult(`${numPct1}% of ${numVal1}`)}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 transition-colors"
                      title="Share link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Step-by-Step Explanation & Formula */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs space-y-2">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-sky-500" />
                    <span>Calculation Formula & Step-by-Step Explanation</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    1. Convert percentage to decimal: {numPct1} / 100 = {(numPct1 / 100).toFixed(4)}<br />
                    2. Multiply by total value: {(numPct1 / 100).toFixed(4)} × {numVal1} = <strong>{result1}</strong>
                  </p>
                  <p className="text-slate-500 italic pt-1 border-t border-slate-200/40 dark:border-slate-700/40">
                    💡 Example: If a restaurant bill is ${numVal1} and you want to leave a {numPct1}% tip, the tip amount is ${result1}.
                  </p>
                </div>
              </div>
            )}

            {/* Tool 2: Percentage Increase */}
            {activeTab === 'increase' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <span>Percentage Increase Calculator</span>
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">((New - Old) / Old) × 100</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Old / Original Value
                    </label>
                    <input
                      type="number"
                      value={oldInc}
                      onChange={(e) => setOldInc(e.target.value)}
                      placeholder="e.g. 100"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      New Value
                    </label>
                    <input
                      type="number"
                      value={newInc}
                      onChange={(e) => setNewInc(e.target.value)}
                      placeholder="e.g. 125"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Instant Result Box */}
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Percentage Growth</span>
                    <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                      +{pctIncResult.toFixed(2)}%
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      Absolute Increase: +{diffInc.toLocaleString()} ({numOldInc} → {numNewInc})
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        handleCopyText(`+${pctIncResult.toFixed(2)}%`, 'Percentage Increase');
                        recordHistory('Percentage Increase', `${numOldInc} → ${numNewInc} = +${pctIncResult.toFixed(2)}%`, { Old: numOldInc, New: numNewInc });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Increase</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs space-y-2">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-emerald-500" />
                    <span>Calculation Formula</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Difference: {numNewInc} - {numOldInc} = {diffInc}<br />
                    Increase %: ({diffInc} / {numOldInc}) × 100 = <strong>+{pctIncResult.toFixed(2)}%</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Tool 3: Percentage Decrease */}
            {activeTab === 'decrease' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-rose-500" />
                    <span>Percentage Decrease Calculator</span>
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">((Old - New) / Old) × 100</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Old / Original Value
                    </label>
                    <input
                      type="number"
                      value={oldDec}
                      onChange={(e) => setOldDec(e.target.value)}
                      placeholder="e.g. 200"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      New Value
                    </label>
                    <input
                      type="number"
                      value={newDec}
                      onChange={(e) => setNewDec(e.target.value)}
                      placeholder="e.g. 150"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Percentage Drop</span>
                    <div className="text-3xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
                      -{pctDecResult.toFixed(2)}%
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      Absolute Decrease: -{diffDec.toLocaleString()} ({numOldDec} → {numNewDec})
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      handleCopyText(`-${pctDecResult.toFixed(2)}%`, 'Percentage Decrease');
                      recordHistory('Percentage Decrease', `${numOldDec} → ${numNewDec} = -${pctDecResult.toFixed(2)}%`, { Old: numOldDec, New: numNewDec });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Decrease</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tool 4: Percentage Difference */}
            {activeTab === 'difference' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Percent className="w-5 h-5 text-purple-500" />
                    <span>Percentage Difference Calculator</span>
                  </h2>
                  <span className="text-xs text-slate-400 font-mono font-bold">|A - B| / ((A + B) / 2) × 100</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Value A</label>
                    <input
                      type="number"
                      value={diffA}
                      onChange={(e) => setDiffA(e.target.value)}
                      placeholder="e.g. 50"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Value B</label>
                    <input
                      type="number"
                      value={diffB}
                      onChange={(e) => setDiffB(e.target.value)}
                      placeholder="e.g. 75"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Relative Difference</span>
                    <div className="text-3xl font-black text-purple-600 dark:text-purple-400 mt-0.5">
                      {pctDiffResult.toFixed(2)}%
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      Absolute difference: {absDiff} (Average: {avgDiff})
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyText(`${pctDiffResult.toFixed(2)}%`, 'Percentage Difference')}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Result</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tool 5: Reverse Percentage */}
            {activeTab === 'reverse' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <RotateCcw className="w-5 h-5 text-amber-500" />
                    <span>Reverse Percentage Calculator</span>
                  </h2>
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button
                      onClick={() => setRevMode('increase')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${revMode === 'increase' ? 'bg-amber-500 text-white' : 'text-slate-500'}`}
                    >
                      After Increase
                    </button>
                    <button
                      onClick={() => setRevMode('decrease')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${revMode === 'decrease' ? 'bg-amber-500 text-white' : 'text-slate-500'}`}
                    >
                      After Decrease
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Final Value (Post-Change)
                    </label>
                    <input
                      type="number"
                      value={revFinal}
                      onChange={(e) => setRevFinal(e.target.value)}
                      placeholder="e.g. 120"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Percentage Applied (%)
                    </label>
                    <input
                      type="number"
                      value={revPct}
                      onChange={(e) => setRevPct(e.target.value)}
                      placeholder="e.g. 20"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Original Value Before %</span>
                    <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
                      {revOriginal.toFixed(2)}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {revOriginal.toFixed(2)} {revMode === 'increase' ? '+' : '-'} {numRevPct}% = {numRevFinal}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyText(revOriginal.toFixed(2), 'Original Value')}
                    className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Original</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tool 6: Discount Calculator */}
            {activeTab === 'discount' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Tag className="w-5 h-5 text-indigo-500" />
                    <span>Discount & Sale Savings Calculator</span>
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">Final = Original × (1 - Discount/100)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Original Price ($)</label>
                    <input
                      type="number"
                      value={discPrice}
                      onChange={(e) => setDiscPrice(e.target.value)}
                      placeholder="e.g. 120"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Discount (%)</label>
                    <input
                      type="number"
                      value={discPct}
                      onChange={(e) => setDiscPct(e.target.value)}
                      placeholder="e.g. 15"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Final Price</span>
                    <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                      ${finalPrice.toFixed(2)}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">You Save</span>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      ${savingsAmount.toFixed(2)} ({numDiscPct}% Off)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tool 7: Markup & Margin */}
            {activeTab === 'markup' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-teal-500" />
                    <span>Markup & Profit Margin Calculator</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Cost Price ($)</label>
                    <input
                      type="number"
                      value={costPrice}
                      onChange={(e) => setCostPrice(e.target.value)}
                      placeholder="e.g. 100"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Markup Percentage (%)</label>
                    <input
                      type="number"
                      value={markupPct}
                      onChange={(e) => setMarkupPct(e.target.value)}
                      placeholder="e.g. 30"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-500/20 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Selling Price</span>
                    <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                      ${sellingPrice.toFixed(2)}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Profit Amount</span>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      +${markupAmount.toFixed(2)}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Profit Margin</span>
                    <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-0.5">
                      {profitMarginPct.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reset Button */}
            <div className="flex items-center justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setPct1('25');
                  setVal1('800');
                  setOldInc('100');
                  setNewInc('125');
                  setOldDec('200');
                  setNewDec('150');
                  setDiffA('50');
                  setDiffB('75');
                  setRevFinal('120');
                  setRevPct('20');
                  setDiscPrice('120');
                  setDiscPct('15');
                  setCostPrice('100');
                  setMarkupPct('30');
                  onShowToast('Values Reset', 'All input fields cleared to defaults.');
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Fields</span>
              </button>
            </div>

          </div>

        </div>

        {/* Sidebar Space with AdSense & Quick Reference */}
        <div className="lg:col-span-4 space-y-6">
          <AdBanner type="sidebar" />

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-sky-500" />
              <span>Percentage Formulas Cheat Sheet</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80">
                <span className="font-bold text-slate-800 dark:text-slate-200">X% of Y</span>
                <p className="font-mono text-[11px] text-sky-600 dark:text-sky-400 mt-0.5">(X ÷ 100) × Y</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80">
                <span className="font-bold text-slate-800 dark:text-slate-200">Percentage Increase</span>
                <p className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">((New - Old) ÷ Old) × 100</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80">
                <span className="font-bold text-slate-800 dark:text-slate-200">Profit Margin %</span>
                <p className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400 mt-0.5">(Profit ÷ Selling Price) × 100</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Banner Ad */}
      <AdBanner type="bottom" />
    </div>
  );
};
