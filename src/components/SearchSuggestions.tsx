import { For, Show } from 'solid-js';
import { ratingDotColors } from '../constants/ui';
import type { HeadphoneData } from '../data';
import { cn } from '../utils/cn';

interface SearchSuggestionsProps {
  suggestions: HeadphoneData[];
  onSelect: (item: HeadphoneData) => void;
  activeIndex: number;
  listboxId: string;
  onKeyDown?: (e: KeyboardEvent) => void;
}

export const SearchSuggestions = (props: SearchSuggestionsProps) => (
  <Show when={props.suggestions.length > 0}>
    <ul
      id={props.listboxId}
      role="listbox"
      aria-label="Headphone suggestions"
      class="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-slate-900 rounded-none shadow-2xl overflow-hidden z-40"
      onKeyDown={props.onKeyDown}
    >
      <For each={props.suggestions}>
        {(item, index) => (
          <li
            role="option"
            id={`${props.listboxId}-option-${index()}`}
            aria-selected={props.activeIndex === index()}
            class={cn(
              'w-full text-left px-8 py-6 border-b-2 border-slate-100 last:border-0 transition-colors flex items-center justify-between cursor-pointer',
              props.activeIndex === index()
                ? 'bg-slate-900 text-white'
                : 'hover:bg-slate-900 hover:text-white'
            )}
            onClick={() => props.onSelect(item)}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div>
              <div class="text-xl font-black">{item.manufacturer}</div>
              <div class="text-lg font-bold opacity-50">{item.model}</div>
            </div>
            <div
              class={cn('w-4 h-4 rounded-full flex-shrink-0', ratingDotColors[item.totalRating])}
              aria-hidden="true"
            />
            <span class="sr-only">{item.totalRating} risk</span>
          </li>
        )}
      </For>
    </ul>
  </Show>
);
