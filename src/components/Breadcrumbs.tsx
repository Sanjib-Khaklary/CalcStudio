import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageId } from '../types';

interface BreadcrumbsProps {
  currentPage: PageId;
  subTitle?: string;
  onSelectPage: (page: PageId) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentPage, subTitle, onSelectPage }) => {
  if (currentPage === 'home') return null;

  const getPageTitle = (page: PageId) => {
    switch (page) {
      case 'percentage':
        return 'Percentage Calculator';
      case 'gst':
        return 'GST Calculator';
      case 'age':
        return 'Age Calculator';
      case 'about':
        return 'About Us';
      case 'privacy':
        return 'Privacy Policy';
      case 'terms':
        return 'Terms & Conditions';
      case 'contact':
        return 'Contact Us';
      case 'seo-docs':
        return 'Sitemap & Robots';
      default:
        return 'Calculator';
    }
  };

  return (
    <nav 
      aria-label="Breadcrumb"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-xs font-medium text-slate-500 dark:text-slate-400"
    >
      <ol className="flex items-center flex-wrap gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="flex items-center gap-1.5">
          <button
            onClick={() => onSelectPage('home')}
            className="flex items-center gap-1 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            itemProp="item"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span itemProp="name">Home</span>
          </button>
          <meta itemProp="position" content="1" />
        </li>

        <li className="flex items-center">
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
        </li>

        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="flex items-center gap-1.5">
          <button
            onClick={() => onSelectPage(currentPage)}
            className={`transition-colors ${!subTitle ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'hover:text-sky-600 dark:hover:text-sky-400'}`}
            itemProp="item"
          >
            <span itemProp="name">{getPageTitle(currentPage)}</span>
          </button>
          <meta itemProp="position" content="2" />
        </li>

        {subTitle && (
          <>
            <li className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
            </li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="text-sky-600 dark:text-sky-400 font-semibold">
              <span itemProp="name">{subTitle}</span>
              <meta itemProp="position" content="3" />
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};
