import { For, Show } from 'solid-js';
import { ratingDotColors } from '../constants/ui';
import type { HeadphoneData } from '../data';
import { cn } from '../utils/cn';

interface SearchSuggestionsProps {
  suggestions: HeadphoneData[];
  onSelect: (item: HeadphoneData) => void;
}

export const SearchSuggestions = (props: SearchSuggestionsProps) => (
  <Show when={props.suggestions.length > 0}>
    <div class="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-slate-900 rounded-none shadow-2xl overflow-hidden z-40">
      <For each={props.suggestions}>
        {(item) => (
          <button
            class="w-full text-left px-8 py-6 hover:bg-slate-900 hover:text-white border-b-2 border-slate-100 last:border-0 transition-colors flex items-center justify-between group/item"
            onClick={() => props.onSelect(item)}
          >
            <div>
              <div class="text-xl font-black">{item.manufacturer}</div>
              <div class="text-lg font-bold opacity-50">{item.model}</div>
            </div>
            <div class={cn('w-4 h-4 rounded-full', ratingDotColors[item.totalRating])} />
          </button>
        )}
      </For>
    </div>
  </Show>
);
