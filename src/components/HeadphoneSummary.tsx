import type { HeadphoneData } from '../data';
import { totalRatingPanelStyles } from '../constants/ui';
import { cn } from '../utils/cn';

interface HeadphoneSummaryProps {
  headphone: HeadphoneData;
  onReset: () => void;
  onShare: () => void;
  copied: boolean;
}

export const HeadphoneSummary = (props: HeadphoneSummaryProps) => (
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
    <div>
      <div class="flex items-center gap-6 mb-8">
        <button
          onClick={props.onReset}
          class="text-rose-600 font-black flex items-center gap-2 hover:underline text-xl uppercase tracking-widest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          Reset Search
        </button>
        <button
          onClick={props.onShare}
          class={cn(
            'font-black flex items-center gap-2 text-xl uppercase tracking-widest transition-colors',
            props.copied ? 'text-emerald-600' : 'text-slate-600 hover:text-slate-900'
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
          {props.copied ? 'Link Copied!' : 'Share Link'}
        </button>
      </div>
      <h2 class="text-8xl font-black tracking-tighter leading-[0.8] mb-4">{props.headphone.manufacturer}</h2>
      <p class="text-4xl font-black text-slate-600 tracking-tighter">{props.headphone.model}</p>
      <div class="mt-8 inline-flex items-center gap-3 bg-slate-100 px-6 py-2 rounded-none text-sm font-black uppercase tracking-[0.2em] text-slate-500">
        {props.headphone.type}
      </div>
    </div>

    <div
      class={cn(
        'w-56 h-56 rounded-none flex flex-col items-center justify-center border-8',
        totalRatingPanelStyles[props.headphone.totalRating]
      )}
    >
      <span class="text-xs font-black uppercase tracking-[0.4em] opacity-70 mb-4">Overall</span>
      <span class="text-5xl font-black capitalize tracking-tighter" aria-label={`Overall rating: ${props.headphone.totalRating}`}>{props.headphone.totalRating}</span>
    </div>
  </div>
);
