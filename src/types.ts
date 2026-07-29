export type PageId = 
  | 'home' 
  | 'percentage' 
  | 'gst' 
  | 'age' 
  | 'about' 
  | 'privacy' 
  | 'terms' 
  | 'contact'
  | 'seo-docs';

export type PercentageToolType = 
  | 'of'           // What is X% of Y?
  | 'increase'     // Percentage Increase (Old -> New)
  | 'decrease'     // Percentage Decrease (Old -> New)
  | 'difference'   // Percentage Difference (Value A vs B)
  | 'reverse'      // Reverse Percentage (Value after % -> Original)
  | 'discount'     // Discount Calculator (Original Price, Discount %)
  | 'markup';      // Markup & Profit Margin Calculator (Cost Price, Markup/Selling)

export interface CalculationHistoryItem {
  id: string;
  category: 'Percentage' | 'GST' | 'Age';
  title: string;
  summary: string;
  details: Record<string, string | number>;
  timestamp: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ZodiacInfo {
  westernSign: string;
  westernSymbol: string;
  westernDates: string;
  westernElement: string;
  westernTraits: string;
  chineseSign: string;
  chineseElement: string;
  chineseYearAnimal: string;
}

export interface PlanetAge {
  planet: string;
  orbitalPeriodDays: number;
  ageInYears: number;
  nextBirthdayDays: number;
  iconName: string;
}
