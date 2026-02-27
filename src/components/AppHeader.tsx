import { Show } from 'solid-js';
import type { HeadphoneData } from '../data';
import { SearchSuggestions } from './SearchSuggestions';

interface AppHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  suggestions: HeadphoneData[];
  onSuggestionSelect: (item: HeadphoneData) => void;
  isNewsView: boolean;
  onNavigateNews: () => void;
  onNavigateDashboard: () => void;
}

export const AppHeader = (props: AppHeaderProps) => (
  <header class="bg-white border-b-2 border-slate-100 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-8 py-8 flex flex-col gap-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 class="text-4xl font-black tracking-tighter text-slate-900 leading-none">
            THE SOUND OF <span class="text-rose-600">CONTAMINATION</span>
          </h1>
          <p class="text-lg font-medium text-slate-400 mt-2 tracking-tight flex items-center gap-3">
            Headphone Chemical Safety Dashboard
            <span class="w-1 h-1 bg-slate-200 rounded-full" />
            <a href="https://arnika.org/en" target="_blank" class="text-rose-600 hover:underline font-black uppercase text-[10px] tracking-widest">Source: Arnika.org</a>
          </p>
        </div>
        <div class="flex items-center gap-4">
          <a
            href="https://arnika.org/en/publications/download/2128_f40ae4eb2e63e4dc3205035fb376d8e3"
            target="_blank"
            class="bg-slate-900 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-colors"
          >
            Download PDF Report
          </a>
          <span class="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] hidden md:block">Feb 2026</span>
          <button
            type="button"
            onClick={props.isNewsView ? props.onNavigateDashboard : props.onNavigateNews}
            class="border-2 border-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-colors"
          >
            {props.isNewsView ? 'Back to Dashboard' : 'News Coverage'}
          </button>
        </div>
      </div>

      <div class="relative group">
        <input
          type="text"
          placeholder="Search headphone brand or model..."
          class="w-full bg-slate-50 border-4 border-slate-100 rounded-none px-8 py-4 text-xl font-black focus:outline-none focus:border-rose-500 transition-all pr-24 placeholder:text-slate-300"
          onInput={(e) => props.onSearchChange(e.currentTarget.value)}
          value={props.searchValue}
        />
        <div class="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
          <Show when={props.searchValue.length > 0}>
            <button
              onClick={() => props.onSearchChange('')}
              class="p-2 hover:bg-white rounded-none text-slate-300 transition-colors border-2 border-slate-100 bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </Show>
          <div class="text-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </div>
        </div>

        <SearchSuggestions suggestions={props.suggestions} onSelect={props.onSuggestionSelect} />
      </div>
    </div>
  </header>
);
