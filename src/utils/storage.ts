import { CalculationHistoryItem } from '../types';

const HISTORY_KEY = 'calcstudio_history';
const FAVORITES_KEY = 'calcstudio_favorites';
const ADS_KEY = 'calcstudio_ads_enabled';

export function getHistory(): CalculationHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveHistoryItem(item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>): CalculationHistoryItem {
  const existing = getHistory();
  const newItem: CalculationHistoryItem = {
    ...item,
    id: 'calc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    timestamp: Date.now(),
  };
  
  // Keep up to 30 history items, deduplicating identical titles/summaries
  const filtered = existing.filter(
    (h) => !(h.category === item.category && h.title === item.title && h.summary === item.summary)
  );
  
  const updated = [newItem, ...filtered].slice(0, 30);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save calculation history', e);
  }
  return newItem;
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear history', e);
  }
}

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ['percentage', 'gst', 'age'];
  } catch {
    return ['percentage', 'gst', 'age'];
  }
}

export function toggleFavorite(toolId: string): string[] {
  const favs = getFavorites();
  const isFav = favs.includes(toolId);
  const updated = isFav ? favs.filter((id) => id !== toolId) : [...favs, toolId];
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save favorites', e);
  }
  return updated;
}

export function getAdsEnabled(): boolean {
  try {
    const raw = localStorage.getItem(ADS_KEY);
    return raw !== null ? JSON.parse(raw) : true;
  } catch {
    return true;
  }
}

export function setAdsEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(ADS_KEY, JSON.stringify(enabled));
  } catch (e) {
    console.error('Failed to set ads state', e);
  }
}
