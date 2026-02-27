import { Show, createSignal } from 'solid-js';
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

const LISTBOX_ID = 'search-suggestions-listbox';
const SEARCH_INPUT_ID = 'search-headphones-input';

export const AppHeader = (props: AppHeaderProps) => {
  const [activeIndex, setActiveIndex] = createSignal(-1);

  const isOpen = () => props.suggestions.length > 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen()) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, props.suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex() >= 0) {
      e.preventDefault();
      props.onSuggestionSelect(props.suggestions[activeIndex()]);
      setActiveIndex(-1);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      props.onSearchChange('');
      setActiveIndex(-1);
    }
  };

  const handleSelect = (item: HeadphoneData) => {
    props.onSuggestionSelect(item);
    setActiveIndex(-1);
  };

  const activeDescendant = () =>
    activeIndex() >= 0 ? `${LISTBOX_ID}-option-${activeIndex()}` : undefined;

  return (
    <header class="bg-white border-b-2 border-slate-100 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-8 py-8 flex flex-col gap-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 class="text-4xl font-black tracking-tighter text-slate-900 leading-none">
              THE SOUND OF <span class="text-rose-600">CONTAMINATION</span>
            </h1>
            <p class="text-lg font-medium text-slate-600 mt-2 tracking-tight flex items-center gap-3">
              Headphone Chemical Safety Dashboard
              <span class="w-1 h-1 bg-slate-200 rounded-full" aria-hidden="true" />
              <a href="https://arnika.org/en" target="_blank" rel="noreferrer" aria-label="Source: Arnika.org (opens in new tab)" class="text-rose-600 hover:underline font-black uppercase text-[10px] tracking-widest">Source: Arnika.org</a>
            </p>
          </div>
          <div class="flex items-center gap-4">
            <a
              href="https://arnika.org/en/publications/download/2128_f40ae4eb2e63e4dc3205035fb376d8e3"
              target="_blank"
              rel="noreferrer"
              aria-label="Download PDF Report (opens in new tab)"
              class="bg-slate-900 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-colors"
            >
              Download PDF Report
            </a>
            <span class="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hidden md:block" aria-hidden="true">Feb 2026</span>
            <button
              type="button"
              onClick={props.isNewsView ? props.onNavigateDashboard : props.onNavigateNews}
              aria-pressed={props.isNewsView}
              class="border-2 border-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-colors"
            >
              {props.isNewsView ? 'Back to Dashboard' : 'News Coverage'}
            </button>
          </div>
        </div>

        <div class="relative">
          <label for={SEARCH_INPUT_ID} class="sr-only">
            Search headphone brand or model
          </label>
          <input
            id={SEARCH_INPUT_ID}
            type="text"
            role="combobox"
            aria-expanded={isOpen()}
            aria-controls={LISTBOX_ID}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-activedescendant={activeDescendant()}
            placeholder="Search headphone brand or model..."
            class="w-full bg-slate-50 border-4 border-slate-100 rounded-none px-8 py-4 text-xl font-black focus:outline-none focus:border-rose-500 transition-all pr-24 placeholder:text-slate-400"
            onInput={(e) => { props.onSearchChange(e.currentTarget.value); setActiveIndex(-1); }}
            onKeyDown={handleKeyDown}
            value={props.searchValue}
          />
          <div class="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <Show when={props.searchValue.length > 0}>
              <button
                type="button"
                onClick={() => { props.onSearchChange(''); setActiveIndex(-1); }}
                aria-label="Clear search"
                class="p-2 hover:bg-white rounded-none text-slate-500 transition-colors border-2 border-slate-100 bg-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </Show>
            <div class="text-slate-400" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
          </div>

          <SearchSuggestions
            suggestions={props.suggestions}
            onSelect={handleSelect}
            activeIndex={activeIndex()}
            listboxId={LISTBOX_ID}
          />
        </div>
      </div>
    </header>
  );
};
