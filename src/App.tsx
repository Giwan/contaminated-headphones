import { createSignal, Show, createMemo, onMount, createEffect, onCleanup } from 'solid-js';
import { headphones, HeadphoneData } from './data';
import { AppHeader } from './components/AppHeader';
import { EmptyState } from './components/EmptyState';
import { HeadphoneDetails } from './components/HeadphoneDetails';
import { HEADPHONE_RESULT_LIMIT } from './constants/ui';

const headphoneSlug = (item: HeadphoneData) =>
  `${item.manufacturer}-${item.model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');

const findHeadphoneBySlug = (slug: string) =>
  headphones.find((headphone) => headphoneSlug(headphone) === slug) ?? null;

export default function App() {
  const [search, setSearch] = createSignal("");
  const [selected, setSelected] = createSignal<HeadphoneData | null>(null);
  const [copied, setCopied] = createSignal(false);

  // Sync URL hash with selected model
  onMount(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setSelected(hash ? findHeadphoneBySlug(hash) : null);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    onCleanup(() => window.removeEventListener('hashchange', handleHashChange));
  });

  createEffect(() => {
    if (typeof window === 'undefined') return;
    const current = selected();
    if (current) {
      window.location.hash = headphoneSlug(current);
      return;
    }

    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  });

  const handleCopyLink = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link', error);
    }
  };

  const filteredHeadphones = createMemo(() => {
    const term = search().trim().toLowerCase();
    if (!term) return [];
    return headphones
      .filter((headphone) =>
        headphone.model.toLowerCase().includes(term) ||
        headphone.manufacturer.toLowerCase().includes(term)
      )
      .slice(0, HEADPHONE_RESULT_LIMIT);
  });

  return (
    <div class="min-h-screen bg-white text-slate-900 font-sans selection:bg-rose-200">
      <AppHeader
        searchValue={search()}
        onSearchChange={setSearch}
        suggestions={filteredHeadphones()}
        onSuggestionSelect={(item) => {
          setSelected(item);
          setSearch("");
        }}
      />

      <main class="max-w-6xl mx-auto px-8 py-20">
        <Show
          when={selected()}
          fallback={<EmptyState />}
        >
          {(data) => (
            <HeadphoneDetails
              headphone={data()}
              onReset={() => setSelected(null)}
              onShare={handleCopyLink}
              copied={copied()}
            />
          )}
        </Show>
      </main>

      <footer class="max-w-6xl mx-auto px-8 py-32 text-center border-t-2 border-slate-50 mt-32">
        <p class="text-slate-200 font-black uppercase tracking-[0.4em] text-xs mb-8">Source Documentation</p>
        <a
          href="https://tudatosvasarlo.hu/tox-free-life-for-all-english"
          target="_blank"
          class="block text-3xl font-black text-slate-900 tracking-tighter mb-4 hover:text-rose-600 transition-colors"
        >
          A Comprehensive Analysis of Endocrine Disruptors and Hazardous Additives in Headphones
        </a>
        <div class="flex items-center justify-center gap-6 mt-8">
          <a href="https://arnika.org/en" target="_blank" class="text-slate-400 font-bold uppercase tracking-widest text-sm hover:text-slate-900 transition-colors">Arnika.org</a>
          <span class="w-1 h-1 bg-slate-200 rounded-full" />
          <a href="https://tudatosvasarlo.hu" target="_blank" class="text-slate-400 font-bold uppercase tracking-widest text-sm hover:text-slate-900 transition-colors">Tudatos Vásárlók</a>
        </div>
        <p class="text-slate-300 mt-12 text-xs font-bold uppercase tracking-widest">© 2026 ToxFree LIFE for All Project</p>
      </footer>
    </div>
  );
}
