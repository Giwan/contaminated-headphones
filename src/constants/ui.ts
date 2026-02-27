import type { JSX } from 'solid-js';

export type RatingLevel = 'green' | 'yellow' | 'red';
export type ExtendedRatingLevel = RatingLevel | 'none';

export const HEADPHONE_RESULT_LIMIT = 8;

export const ratingBadgeColors: Record<ExtendedRatingLevel, string> = {
  green: 'bg-emerald-50 text-emerald-900 border-emerald-200',
  yellow: 'bg-amber-50 text-amber-900 border-amber-200',
  red: 'bg-rose-50 text-rose-900 border-rose-200',
  none: 'bg-slate-50 text-slate-500 border-slate-200'
};

export const ratingBadgeDots: Record<ExtendedRatingLevel, string> = {
  green: 'bg-emerald-500',
  yellow: 'bg-amber-500',
  red: 'bg-rose-500',
  none: 'bg-slate-400'
};

export const ratingBadgeDescriptions: Record<ExtendedRatingLevel, string> = {
  green: 'Meets most protective standards.',
  yellow: 'Moderate concern. Exceeds strict voluntary limits.',
  red: 'High concern. Non-compliant or multiple hazards.',
  none: 'No data available for this component.'
};

export const totalRatingPanelStyles: Record<RatingLevel, string> = {
  green: 'bg-emerald-500 border-emerald-600 text-emerald-50',
  yellow: 'bg-amber-500 border-amber-600 text-amber-50',
  red: 'bg-rose-500 border-rose-600 text-rose-50'
};

export const ratingDotColors: Record<RatingLevel, string> = {
  green: 'bg-emerald-500',
  yellow: 'bg-amber-500',
  red: 'bg-rose-500'
};

export interface RiskHighlight {
  title: string;
  description: string;
  styles: string;
  icon: JSX.Element;
}
