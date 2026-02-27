import { Show } from 'solid-js';

interface ActionAdviceSectionProps {
  advice?: string;
  supportLink?: string;
  manufacturer: string;
}

export const ActionAdviceSection = (props: ActionAdviceSectionProps) => (
  <div class="bg-slate-900 text-white rounded-none p-20 mt-16 border-8 border-slate-900">
    <h3 class="text-4xl font-black mb-12 uppercase tracking-tighter flex items-center gap-6">
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
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
      What You Can Do
    </h3>

    <div class="max-w-3xl">
      <p class="text-2xl font-bold leading-relaxed mb-12 text-slate-300">
        {props.advice ||
          'Contact the reseller or manufacturer to inquire about the chemical composition and safety certifications of this model.'}
      </p>

      <Show when={props.supportLink}>
        <a
          href={props.supportLink}
          target="_blank"
          class="inline-flex items-center gap-4 bg-rose-600 text-white px-10 py-6 text-xl font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all border-4 border-rose-600"
        >
          Contact {props.manufacturer} Support
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </Show>
    </div>
  </div>
);
