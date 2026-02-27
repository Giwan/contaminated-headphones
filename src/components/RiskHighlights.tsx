import { For } from 'solid-js';
import { cn } from '../utils/cn';
import type { RiskHighlight } from '../constants/ui';

const RISK_HIGHLIGHTS: RiskHighlight[] = [
  {
    title: 'Bisphenol Crisis',
    description:
      'Bisphenols (BPA, BPS) were found in 177 of 180 samples. Migration is accelerated by sweat and body heat. These are potent endocrine disruptors affecting hormonal health.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M12 7v5" />
        <path d="M12 16h.01" />
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      </svg>
    ),
    styles: 'bg-rose-50 text-rose-700 border-rose-100'
  },
  {
    title: 'Flame Retardants',
    description:
      'Organophosphate flame retardants (OPFRs) are pervasive. 72% of samples contained 5 or more distinct OPFRs. Some are known neurotoxins and endocrine disruptors.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M2 22h20" />
        <path d="M5 22v-5a7 7 0 0 1 14 0v5" />
        <circle cx="12" cy="9" r="2" />
      </svg>
    ),
    styles: 'bg-amber-50 text-amber-700 border-amber-100'
  },
  {
    title: 'Consumer Advice',
    description:
      'Limit duration of use. Avoid falling asleep with headphones on. For children, select models specifically designed for their age group.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    styles: 'bg-emerald-50 text-emerald-700 border-emerald-100'
  }
];

export const RiskHighlights = () => (
  <div class="grid grid-cols-1 md:grid-cols-3 gap-20">
    <For each={RISK_HIGHLIGHTS}>
      {(highlight) => (
        <div class="space-y-8">
          <div class={cn('w-24 h-24 rounded-none flex items-center justify-center border-4', highlight.styles)}>
            {highlight.icon}
          </div>
          <h4 class="text-3xl font-black tracking-tight">{highlight.title}</h4>
          <p class="text-xl text-slate-500 font-medium leading-relaxed">{highlight.description}</p>
        </div>
      )}
    </For>
  </div>
);
