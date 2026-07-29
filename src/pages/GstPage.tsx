import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Plus, 
  Minus, 
  Copy, 
  RotateCcw, 
  Printer, 
  Download, 
  Share2, 
  Receipt, 
  Info, 
  Check, 
  BookOpen, 
  PieChart, 
  ShieldCheck,
  Star
} from 'lucide-react';
import { exportElementToPdf, printElement } from '../utils/pdfExport';
import { saveHistoryItem, toggleFavorite, getFavorites } from '../utils/storage';
import { AdBanner } from '../components/AdBanner';

interface GstPageProps {
  onShowToast: (title: string, description?: string, type?: 'success' | 'info' | 'error') => void;
}

export const GstPage: React.FC<GstPageProps> = ({ onShowToast }) => {
  const [gstMode, setGstMode] = useState<'add' | 'remove'>('add');
  const [amount, setAmount] = useState<string>('1000');
  const [selectedRate, setSelectedRate] = useState<number>(18);
  const [customRate, setCustomRate] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [splitCgstSgst, setSplitCgstSgst] = useState<boolean>(true);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(getFavorites());

  const standardRates = [3, 5, 12, 18, 28];

  const handleToggleFav = () => {
    const updated = toggleFavorite('gst');
    setFavorites(updated);
    onShowToast('Favorites Updated', 'GST Calculator updated in your favorites.');
  };

  // Determine active rate
  const activeRate = isCustomMode ? parseFloat(customRate) || 0 : selectedRate;
  const numAmount = parseFloat(amount) || 0;

  // Calculation formulas
  let originalPrice = 0;
  let gstAmount = 0;
  let totalAmount = 0;

  if (gstMode === 'add') {
    originalPrice = numAmount;
    gstAmount = (numAmount * activeRate) / 100;
    totalAmount = numAmount + gstAmount;
  } else {
    // Remove GST (Price is Inclusive)
    totalAmount = numAmount;
    originalPrice = numAmount / (1 + activeRate / 100);
    gstAmount = totalAmount - originalPrice;
  }

  const cgstAmount = gstAmount / 2;
  const sgstAmount = gstAmount / 2;

  // Save history
  useEffect(() => {
    if (numAmount > 0) {
      saveHistoryItem({
        category: 'GST',
        title: `${gstMode === 'add' ? 'Add' : 'Remove'} ${activeRate}% GST on $${numAmount}`,
        summary: `Net: $${originalPrice.toFixed(2)} | GST: $${gstAmount.toFixed(2)} | Total: $${totalAmount.toFixed(2)}`,
        details: { Mode: gstMode, Rate: activeRate, Amount: numAmount, Total: totalAmount },
      });
    }
  }, [numAmount, activeRate, gstMode]);

  const handleCopyResult = () => {
    const text = `GST Calculation Summary:\nMode: ${gstMode === 'add' ? 'Add GST' : 'Remove GST'}\nGST Rate: ${activeRate}%\nOriginal Base Price: $${originalPrice.toFixed(2)}\nGST Tax Amount: $${gstAmount.toFixed(2)}\nTotal Amount: $${totalAmount.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    onShowToast('Invoice Breakdown Copied!', 'Text copied to clipboard.');
  };

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    onShowToast('Generating PDF Report...', 'Please wait while we assemble your document.');
    const success = await exportElementToPdf('gst-report-card', `GST_Tax_Report_${activeRate}pct.pdf`);
    setIsExportingPdf(false);
    if (success) {
      onShowToast('PDF Downloaded!', 'Your GST summary has been saved to your downloads.');
    } else {
      onShowToast('Export Failed', 'Unable to create PDF, please try again or use Print.', 'error');
    }
  };

  const handlePrint = () => {
    printElement('gst-report-card');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      
      {/* Top Banner Ad */}
      <AdBanner type="top" />

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-100 dark:bg-indigo-950 px-2.5 py-0.5 rounded-md">
              Tax & Accounting Tool
            </span>
            <button
              onClick={handleToggleFav}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-amber-500 transition-colors"
              title="Favorite GST Calculator"
            >
              <Star className={`w-4 h-4 ${favorites.includes('gst') ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Goods & Services Tax (GST) Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Add or Extract GST tax amounts instantly with standard tax slabs (3%, 5%, 12%, 18%, 28%) and CGST/SGST breakdowns.
          </p>
        </div>

        {/* Mode Selector Toggle */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setGstMode('add')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              gstMode === 'add'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add GST (Exclusive)</span>
          </button>

          <button
            onClick={() => setGstMode('remove')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              gstMode === 'remove'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Minus className="w-4 h-4" />
            <span>Remove GST (Inclusive)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Input & Calculation Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/5 space-y-6">
            
            {/* Amount Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {gstMode === 'add' ? 'Initial Net Price / Amount ($)' : 'Total Gross Price (Inclusive of GST) ($)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-lg font-black outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
                <span className="absolute right-4 top-4 text-slate-400 font-bold text-sm">$</span>
              </div>
            </div>

            {/* GST Rate Selection Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Select GST Tax Rate
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {standardRates.map((rate) => {
                  const isSelected = !isCustomMode && selectedRate === rate;
                  return (
                    <button
                      key={rate}
                      onClick={() => {
                        setSelectedRate(rate);
                        setIsCustomMode(false);
                      }}
                      className={`py-3 rounded-2xl text-xs font-extrabold transition-all border ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20 scale-105'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                      }`}
                    >
                      {rate}%
                    </button>
                  );
                })}

                <button
                  onClick={() => setIsCustomMode(true)}
                  className={`py-3 rounded-2xl text-xs font-extrabold transition-all border ${
                    isCustomMode
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Custom
                </button>
              </div>

              {isCustomMode && (
                <div className="mt-3 pt-2">
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Custom GST Rate (%)</label>
                  <input
                    type="number"
                    value={customRate}
                    onChange={(e) => setCustomRate(e.target.value)}
                    placeholder="Enter custom rate e.g. 7.5"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold outline-none focus:border-indigo-500"
                  />
                </div>
              )}
            </div>

            {/* Split CGST & SGST Option */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Show Central (CGST) & State (SGST) Split</span>
              </div>
              <input
                type="checkbox"
                checked={splitCgstSgst}
                onChange={(e) => setSplitCgstSgst(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
            </div>

            {/* Reset Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setAmount('1000');
                  setSelectedRate(18);
                  setIsCustomMode(false);
                  setCustomRate('');
                  onShowToast('Inputs Reset', 'GST amount reset to $1,000 at 18% rate.');
                }}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Fields</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right Output Invoice / Tax Report Card */}
        <div className="lg:col-span-5 space-y-6">
          <div 
            id="gst-report-card"
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white shadow-2xl border border-indigo-900/50 space-y-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-indigo-800/60 pb-4">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-extrabold uppercase tracking-wider text-indigo-300">GST Invoice Summary</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                {activeRate}% GST Rate
              </span>
            </div>

            <div className="space-y-4 font-mono">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Net Base Price:</span>
                <span className="font-bold text-white">${originalPrice.toFixed(2)}</span>
              </div>

              {splitCgstSgst ? (
                <>
                  <div className="flex items-center justify-between text-xs text-indigo-300 pl-3 border-l-2 border-indigo-500">
                    <span>CGST ({(activeRate / 2).toFixed(1)}%):</span>
                    <span>${cgstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-indigo-300 pl-3 border-l-2 border-indigo-500">
                    <span>SGST ({(activeRate / 2).toFixed(1)}%):</span>
                    <span>${sgstAmount.toFixed(2)}</span>
                  </div>
                </>
              ) : null}

              <div className="flex items-center justify-between text-sm border-t border-slate-800 pt-3">
                <span className="text-slate-400">Total GST Tax Amount:</span>
                <span className="font-bold text-indigo-400">${gstAmount.toFixed(2)}</span>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-between">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-indigo-200">Total Payable Price</span>
                <span className="text-2xl font-black text-emerald-400">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="grid grid-cols-3 gap-2 pt-2 no-print">
              <button
                onClick={handleCopyResult}
                className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-indigo-400" />
                <span>Copy</span>
              </button>

              <button
                onClick={handlePrint}
                className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-sky-400" />
                <span>Print</span>
              </button>

              <button
                onClick={handleDownloadPdf}
                disabled={isExportingPdf}
                className="py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors shadow-lg"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isExportingPdf ? 'Exporting...' : 'PDF'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Formula & Reverse Explanation Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          <span>GST Calculation Formula & Reverse Extraction Steps</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 dark:text-slate-400">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">1. Add GST Formula (Exclusive)</h4>
            <p><strong>GST Amount</strong> = Net Price × (GST Rate ÷ 100)</p>
            <p><strong>Total Gross Price</strong> = Net Price + GST Amount</p>
            <p className="font-mono text-slate-500 mt-1">Example: $1,000 × 18% = $180 GST → $1,180 Total</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">2. Remove GST Formula (Inclusive)</h4>
            <p><strong>Original Price</strong> = Total Amount ÷ (1 + (GST Rate ÷ 100))</p>
            <p><strong>Extracted GST Amount</strong> = Total Amount - Original Price</p>
            <p className="font-mono text-slate-500 mt-1">Example: $1,180 ÷ 1.18 = $1,000 Net → $180 GST Extracted</p>
          </div>
        </div>
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner type="bottom" />
    </div>
  );
};
