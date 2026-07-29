import React, { useState, useEffect } from 'react';
import { PageId, ToastMessage, CalculationHistoryItem } from './types';
import { getHistory, getAdsEnabled, setAdsEnabled } from './utils/storage';
import { applyPageSeo } from './utils/seo';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ToastContainer } from './components/Toast';
import { SearchModal } from './components/SearchModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';

import { HomePage } from './pages/HomePage';
import { PercentagePage } from './pages/PercentagePage';
import { GstPage } from './pages/GstPage';
import { AgePage } from './pages/AgePage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { SeoInfoPage } from './pages/SeoInfoPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [currentSubTab, setCurrentSubTab] = useState<string | undefined>(undefined);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('calcstudio_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // AdSense slots preview state
  const [adsEnabled, setAdsEnabledState] = useState<boolean>(getAdsEnabled());

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // History state
  const [historyItems, setHistoryItems] = useState<CalculationHistoryItem[]>(getHistory());

  // Apply dark mode class to HTML root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('calcstudio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('calcstudio_theme', 'light');
    }
  }, [isDarkMode]);

  // Apply SEO meta tags on page change
  useEffect(() => {
    applyPageSeo(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHistoryItems(getHistory());
  }, [currentPage]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K -> Open Search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // Esc -> Close Modals
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsHistoryOpen(false);
        setIsShortcutsOpen(false);
      }
      // Alt shortcuts for pages
      if (e.altKey) {
        if (e.key.toLowerCase() === 'p') {
          e.preventDefault();
          handleSelectPage('percentage');
        } else if (e.key.toLowerCase() === 'g') {
          e.preventDefault();
          handleSelectPage('gst');
        } else if (e.key.toLowerCase() === 'a') {
          e.preventDefault();
          handleSelectPage('age');
        } else if (e.key.toLowerCase() === 'h') {
          e.preventDefault();
          handleSelectPage('home');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const newToast: ToastMessage = {
      id: 'toast_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title,
      description,
      type,
    };
    setToasts((prev) => [...prev.slice(-4), newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSelectPage = (page: PageId, subTab?: string) => {
    setCurrentPage(page);
    setCurrentSubTab(subTab);
  };

  const handleToggleAds = () => {
    const newState = !adsEnabled;
    setAdsEnabledState(newState);
    setAdsEnabled(newState);
    showToast(
      newState ? 'AdSense Slots Visible' : 'AdSense Slots Hidden',
      newState ? 'Displaying responsive AdSense preview containers.' : 'AdSense placeholders collapsed.',
      'info'
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* Sticky Header Navigation */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenHistory={() => {
          setHistoryItems(getHistory());
          setIsHistoryOpen(true);
        }}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        historyCount={historyItems.length}
        adsEnabled={adsEnabled}
        onToggleAds={handleToggleAds}
      />

      {/* Visual Breadcrumb Trail */}
      <Breadcrumbs
        currentPage={currentPage}
        subTitle={currentSubTab}
        onSelectPage={handleSelectPage}
      />

      {/* Primary Page Content Router */}
      <main className="flex-1 pb-16">
        {currentPage === 'home' && (
          <HomePage onSelectPage={handleSelectPage} />
        )}

        {currentPage === 'percentage' && (
          <PercentagePage initialSubTab={currentSubTab} onShowToast={showToast} />
        )}

        {currentPage === 'gst' && (
          <GstPage onShowToast={showToast} />
        )}

        {currentPage === 'age' && (
          <AgePage onShowToast={showToast} />
        )}

        {currentPage === 'about' && (
          <AboutPage />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPage />
        )}

        {currentPage === 'terms' && (
          <TermsPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage onShowToast={showToast} />
        )}

        {currentPage === 'seo-docs' && (
          <SeoInfoPage />
        )}
      </main>

      {/* Footer Links & Disclaimer */}
      <Footer onSelectPage={handleSelectPage} />

      {/* Global Modals & Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPage={handleSelectPage}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={historyItems}
        onClearHistory={() => setHistoryItems([])}
        onSelectPage={handleSelectPage}
      />

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

    </div>
  );
}
