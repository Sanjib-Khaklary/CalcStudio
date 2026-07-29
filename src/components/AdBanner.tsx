import React from 'react';
import { Megaphone, Info } from 'lucide-react';
import { getAdsEnabled } from '../utils/storage';

interface AdBannerProps {
  type: 'top' | 'middle' | 'bottom' | 'sidebar' | 'inline';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ type, className = '' }) => {
  const adsEnabled = getAdsEnabled();

  if (!adsEnabled) return null;

  const getDimensions = () => {
    switch (type) {
      case 'top':
      case 'bottom':
      case 'middle':
        return 'w-full min-h-[90px] max-h-[120px]';
      case 'sidebar':
        return 'w-full min-h-[250px] sm:min-h-[600px]';
      case 'inline':
      default:
        return 'w-full min-h-[100px] max-h-[250px]';
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'top':
        return 'Header Leaderboard (728x90 / Responsive)';
      case 'middle':
        return 'In-Content Ad Banner (Responsive)';
      case 'bottom':
        return 'Footer Sticky Leaderboard (728x90)';
      case 'sidebar':
        return 'Sidebar Tower Ad (300x600)';
      case 'inline':
        return 'Inline Rectangular Ad (336x280)';
    }
  };

  return (
    <aside 
      aria-label="Advertisement"
      className={`my-4 relative overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-3 text-center flex flex-col items-center justify-center transition-all ${getDimensions()} ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
        <Megaphone className="w-3.5 h-3.5" />
        <span>Advertisement</span>
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
        <span>{getLabel()}</span>
        <Info className="w-3 h-3 text-slate-400" title="Reserved space for Google AdSense script integration" />
      </div>
      {/* Mock AdSense publisher slot frame */}
      <div className="mt-1 w-full max-w-xl h-8 rounded border border-dashed border-slate-300 dark:border-slate-700/60 flex items-center justify-center text-[10px] text-slate-400">
        Google AdSense Slot #calcstudio-{type}
      </div>
    </aside>
  );
};
