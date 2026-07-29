import React from 'react';
import { History, Trash2, X, Clock, ArrowRight } from 'lucide-react';
import { CalculationHistoryItem, PageId } from '../types';
import { clearHistory } from '../utils/storage';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: CalculationHistoryItem[];
  onClearHistory: () => void;
  onSelectPage: (page: PageId, subTab?: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onSelectPage,
}) => {
  if (!isOpen) return null;

  const handleClear = () => {
    clearHistory();
    onClearHistory();
  };

  const formatCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Percentage':
        return 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300';
      case 'GST':
        return 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300';
      case 'Age':
        return 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Calculation History</h3>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={handleClear}
                className="flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 px-2.5 py-1.5 rounded-lg transition-colors"
                title="Clear all local calculation history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-20 px-4">
              <Clock className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No calculations recorded yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Perform any Percentage, GST, or Age calculation and your results will automatically save here locally.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${formatCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                  {item.title}
                </h4>
                <div className="text-xs font-mono font-medium text-sky-700 dark:text-sky-300 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 mt-2">
                  {item.summary}
                </div>
                <button
                  onClick={() => {
                    const page = item.category.toLowerCase() as PageId;
                    onSelectPage(page);
                    onClose();
                  }}
                  className="mt-2 text-xs font-medium text-sky-600 dark:text-sky-400 flex items-center gap-1 hover:underline"
                >
                  <span>Open Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 text-center">
          🔒 Saved privately in your browser's local storage.
        </div>
      </div>
    </div>
  );
};
