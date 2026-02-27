import { For } from 'solid-js';

const coverageLinks = [
  {
    title: 'The Sound of Contamination',
    outlet: 'Arnika',
    region: 'Central Europe',
    date: 'Feb 2026',
    summary:
      'Arnika’s investigative team documents the chemicals laboratory tests uncovered inside popular headphones and explains why regulators must act.',
    url: 'https://arnika.org/en/publications/the-sound-of-contamination',
  },
  {
    title: 'Koptelefoons uit voorzorg uit verkoop na onderzoek schadelijke stoffen',
    outlet: 'NOS',
    region: 'Netherlands',
    date: 'Feb 2026',
    summary:
      'Dutch retailers remove several headphone models from shelves after journalists connect Arnika’s findings to potential consumer exposure.',
    url: 'https://nos.nl/artikel/2603689-koptelefoons-uit-voorzorg-uit-verkoop-na-onderzoek-schadelijke-stoffen',
  },
  {
    title: 'Hazardous substances found in popular headphones',
    outlet: 'The Guardian',
    region: 'United Kingdom',
    date: '18 Feb 2026',
    summary:
      'An international spotlight on the headphone supply chain shows why transparency and green chemistry commitments are urgently needed.',
    url: 'https://www.theguardian.com/technology/2026/feb/18/hazardous-substances-headphones',
  },
];

interface NewsCoverageProps {
  onNavigateHome?: () => void;
}

export const NewsCoverage = (props: NewsCoverageProps) => (
  <section class="max-w-5xl mx-auto px-8 py-24 text-slate-900">
    <a
      href="/#"
      onClick={(event) => {
        event.preventDefault();
        props.onNavigateHome?.();
      }}
      class="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-3"
    >
      <span class="inline-block w-10 h-[2px] bg-slate-200" aria-hidden="true" />
      Back to dashboard
    </a>

    <p class="text-slate-300 font-black uppercase tracking-[0.4em] text-xs mt-12">Global Coverage</p>
    <h2 class="text-5xl font-black tracking-tighter leading-tight mt-4">
      Newsrooms amplifying
      <span class="text-rose-600"> the contamination alarm.</span>
    </h2>
    <p class="text-xl text-slate-500 font-medium mt-6 max-w-3xl">
      Journalists across Europe are pressuring brands to phase out hazardous additives in personal audio gear.
      These are the key stories driving the conversation.
    </p>

    <div class="grid md:grid-cols-2 gap-8 mt-16">
      <For each={coverageLinks}>
        {(article) => (
          <article class="border-2 border-slate-100 p-8 bg-white shadow-[10px_10px_0_0_rgba(15,23,42,0.08)] flex flex-col gap-4">
            <div class="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
              <span>{article.outlet}</span>
              <span class="text-slate-300">{article.region}</span>
            </div>
            <h3 class="text-2xl font-black tracking-tight text-slate-900 leading-snug">
              {article.title}
            </h3>
            <p class="text-sm font-bold uppercase tracking-[0.3em] text-rose-500">{article.date}</p>
            <p class="text-base text-slate-500 leading-relaxed">{article.summary}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              class="mt-4 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-slate-900 hover:text-rose-600"
            >
              Read coverage
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M7 17 17 7" />
                <path d="m8 7h9v9" />
              </svg>
            </a>
          </article>
        )}
      </For>
    </div>
  </section>
);
