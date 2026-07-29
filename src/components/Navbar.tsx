import React, { useState } from 'react';
import { 
  Calculator, 
  Percent, 
  Calendar, 
  Search, 
  Sun, 
  Moon, 
  History, 
  Keyboard, 
  Menu, 
  X, 
  Sparkles,
  Megaphone
} from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId, subTab?: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onOpenHistory: () => void;
  onOpenShortcuts: () => void;
  historyCount: number;
  adsEnabled: boolean;
  onToggleAds: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onSelectPage,
  isDarkMode,
  onToggleDarkMode,
  onOpenSearch,
  onOpenHistory,
  onOpenShortcuts,
  historyCount,
  adsEnabled,
  onToggleAds,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as PageId, label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'percentage' as PageId, label: 'Percentage Calculator', icon: <Percent className="w-4 h-4" /> },
    { id: 'gst' as PageId, label: 'GST Calculator', icon: <Calculator className="w-4 h-4" /> },
    { id: 'age' as PageId, label: 'Age Calculator', icon: <Calendar className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageId) => {
    onSelectPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-extrabold bg-gradient-to-r from-slate-900 via-sky-900 to-slate-800 dark:from-white dark:via-sky-200 dark:to-slate-200 bg-clip-text text-transparent tracking-tight">
                  CalcStudio
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950 px-1.5 py-0.5 rounded-md ml-2 border border-sky-200/60 dark:border-sky-800/60 uppercase tracking-widest">
                  PRO
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools & Search */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200/50 dark:border-slate-700/50"
              title="Search all calculators (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800">
                ⌘K
              </kbd>
            </button>

            {/* History Toggle */}
            <button
              onClick={onOpenHistory}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Calculation History"
            >
              <History className="w-4 h-4" />
              {historyCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {historyCount > 9 ? '9+' : historyCount}
                </span>
              )}
            </button>

            {/* Shortcuts Guide Toggle */}
            <button
              onClick={onOpenShortcuts}
              className="hidden sm:flex p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Keyboard Shortcuts"
            >
              <Keyboard className="w-4 h-4" />
            </button>

            {/* AdSense Preview Toggle */}
            <button
              onClick={onToggleAds}
              className={`p-2 rounded-xl transition-colors ${
                adsEnabled
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={adsEnabled ? 'AdSense slot placeholders visible' : 'AdSense slot placeholders hidden'}
            >
              <Megaphone className="w-4 h-4" />
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100 dark:border-slate-800 space-y-1 animate-fade-in">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 px-3">
              <span>More Pages:</span>
              <div className="flex gap-3">
                <button onClick={() => handleNavClick('about')} className="hover:underline">About</button>
                <button onClick={() => handleNavClick('privacy')} className="hover:underline">Privacy</button>
                <button onClick={() => handleNavClick('contact')} className="hover:underline">Contact</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
