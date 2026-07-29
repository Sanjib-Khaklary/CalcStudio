import { PageId } from '../types';

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords: string[];
  ogType?: string;
  schema?: Record<string, unknown>[];
}

const BASE_URL = 'https://calcstudio.app';

export const PAGE_SEO_DATA: Record<PageId, PageSeoConfig> = {
  home: {
    title: 'CalcStudio - Free Online Percentage, GST & Age Calculators',
    description: 'Fast, accurate, and free online calculators for Percentage, GST, and Age calculations with step-by-step mathematical explanations, instant PDF export, and tax breakdowns.',
    canonicalUrl: `${BASE_URL}/`,
    keywords: ['percentage calculator', 'gst calculator', 'age calculator', 'online calculator', 'math tools', 'tax calculator'],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'CalcStudio',
        'url': BASE_URL,
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${BASE_URL}/?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'CalcStudio Suite',
        'operatingSystem': 'All',
        'applicationCategory': 'EducationalApplication',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
      },
    ],
  },
  percentage: {
    title: 'Percentage Calculator - Calculate Percentages, Increase, Discounts & Margin',
    description: 'Free online percentage calculator with 7 essential sub-tools: X% of Y, Percentage Increase & Decrease, Percentage Difference, Reverse Percentage, Discount, and Markup & Profit Margin with formulas.',
    canonicalUrl: `${BASE_URL}/percentage`,
    keywords: ['percentage calculator', 'calculate percentage', 'percentage increase', 'discount calculator', 'profit margin calculator', 'reverse percentage'],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Percentage Calculator Tool',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'Any',
        'browserRequirements': 'Requires JavaScript',
      },
    ],
  },
  gst: {
    title: 'GST Calculator - Free Online Goods & Services Tax Calculator (Add/Remove GST)',
    description: 'Accurate GST Calculator for standard tax rates (3%, 5%, 12%, 18%, 28%) or custom rates. Add GST or Remove GST with CGST/SGST breakdown, printable invoice summary, and downloadable PDF.',
    canonicalUrl: `${BASE_URL}/gst`,
    keywords: ['gst calculator', 'goods and services tax', 'add gst', 'remove gst', 'reverse gst calculator', 'cgst sgst calculator'],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'GST Calculator Tool',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Any',
      },
    ],
  },
  age: {
    title: 'Age Calculator - Calculate Exact Age in Years, Months, Days & Space Age',
    description: 'Find your exact age in years, months, weeks, days, hours, minutes, and seconds. Discover your next birthday countdown, planet ages, Western & Chinese Zodiac signs, and life statistics.',
    canonicalUrl: `${BASE_URL}/age`,
    keywords: ['age calculator', 'date of birth calculator', 'exact age calculator', 'chronological age', 'birthday countdown', 'age on planets', 'zodiac calculator'],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Exact Age Calculator Tool',
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'Any',
      },
    ],
  },
  about: {
    title: 'About Us - CalcStudio Suite',
    description: 'Learn more about CalcStudio, our mission to provide lightning-fast, 100% accurate, private, and accessible calculation tools for students, professionals, and small business owners.',
    canonicalUrl: `${BASE_URL}/about`,
    keywords: ['about calcstudio', 'online math tools', 'free calculator tools'],
  },
  privacy: {
    title: 'Privacy Policy - CalcStudio',
    description: 'CalcStudio Privacy Policy. Learn how we safeguard your information, respect client-side calculation privacy, and adhere to Google AdSense and GDPR standards.',
    canonicalUrl: `${BASE_URL}/privacy`,
    keywords: ['privacy policy', 'data protection', 'calcstudio privacy'],
  },
  terms: {
    title: 'Terms & Conditions - CalcStudio',
    description: 'Terms of Service and Disclaimer for using CalcStudio percentage, GST, and age online tools.',
    canonicalUrl: `${BASE_URL}/terms`,
    keywords: ['terms and conditions', 'disclaimer', 'terms of service'],
  },
  contact: {
    title: 'Contact Us - CalcStudio Support & Feedback',
    description: 'Get in touch with the CalcStudio team for feature requests, feedback, bug reports, or partnership inquiries.',
    canonicalUrl: `${BASE_URL}/contact`,
    keywords: ['contact calcstudio', 'calculator support', 'feedback'],
  },
  'seo-docs': {
    title: 'Sitemap & Robots - CalcStudio SEO Inspection',
    description: 'XML Sitemap & Robots.txt specification for CalcStudio online calculators.',
    canonicalUrl: `${BASE_URL}/sitemap`,
    keywords: ['sitemap', 'robots.txt', 'seo inspection'],
  },
};

export function applyPageSeo(page: PageId) {
  const config = PAGE_SEO_DATA[page] || PAGE_SEO_DATA.home;

  // Set Title
  document.title = config.title;

  // Set Description
  let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = config.description;

  // Set Keywords
  let metaKeywords = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.content = config.keywords.join(', ');

  // Set OpenGraph Title
  let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.content = config.title;

  // Set OpenGraph Description
  let ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.content = config.description;

  // Set Canonical URL
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = config.canonicalUrl;

  // Remove previous injected dynamic schemas
  const existingSchemas = document.querySelectorAll('script[data-dynamic-schema="true"]');
  existingSchemas.forEach((el) => el.remove());

  // Inject dynamic JSON-LD schemas
  if (config.schema && config.schema.length > 0) {
    config.schema.forEach((schemaObj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dynamic-schema', 'true');
      script.textContent = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });
  }
}
