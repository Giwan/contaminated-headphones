import { createSignal, Show, createMemo, createEffect } from 'solid-js';
import { useLocation, useNavigate } from '@solidjs/router';
import { headphones, HeadphoneData } from './data';
import { AppHeader } from './components/AppHeader';
import { EmptyState } from './components/EmptyState';
import { HeadphoneDetails } from './components/HeadphoneDetails';
import { NewsCoverage } from './components/NewsCoverage';
import { HEADPHONE_RESULT_LIMIT } from './constants/ui';

export const headphoneSlug = (item: HeadphoneData) =>
  `${item.manufacturer}-${item.model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');

export const findHeadphoneBySlug = (slug: string) =>
  headphones.find((headphone) => headphoneSlug(headphone) === slug) ?? null;

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = createSignal("");
  const [copied, setCopied] = createSignal(false);
  const [lastViewedSlug, setLastViewedSlug] = createSignal<string | null>(null);
  let mainHeadingRef: HTMLHeadingElement | undefined;

  const selectedSlug = createMemo(() => {
    const path = location.pathname;
    const match = path.match(/^\/headphones\/(.+)$/);
    return match ? match[1] : null;
  });

  const selected = createMemo<HeadphoneData | null>(() => {
    const slug = selectedSlug();
    return slug ? findHeadphoneBySlug(slug) : null;
  });

  createEffect(() => {
    const slug = selectedSlug();
    if (slug) {
      setLastViewedSlug(slug);
    }
  });

  const isNewsView = createMemo(() => location.pathname === '/news');

  const focusMainHeading = () => {
    queueMicrotask(() => mainHeadingRef?.focus());
  };

  createEffect(() => {
    isNewsView();
    selected();
    focusMainHeading();
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

  const showNews = () => {
    navigate('/news');
  };

  const showDashboard = () => {
    const recent = lastViewedSlug();
    if (recent) {
      navigate(`/headphones/${recent}`);
      return;
    }
    navigate('/');
  };

  const handleHeadphoneSelect = (item: HeadphoneData) => {
    navigate(`/headphones/${headphoneSlug(item)}`);
    setSearch("");
  };

  const handleResetSelection = () => {
    setLastViewedSlug(null);
    navigate('/');
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
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-rose-600 focus:text-white focus:px-6 focus:py-3 focus:font-black focus:uppercase focus:tracking-widest focus:text-sm"
      >
        Skip to main content
      </a>

      <AppHeader
        searchValue={search()}
        onSearchChange={setSearch}
        suggestions={filteredHeadphones()}
        onSuggestionSelect={handleHeadphoneSelect}
        isNewsView={isNewsView()}
        onNavigateNews={showNews}
        onNavigateDashboard={showDashboard}
      />

      <main id="main-content" tabindex="-1" class="max-w-6xl mx-auto px-8 py-20 focus:outline-none">
        <div aria-live="polite" aria-atomic="true" class="sr-only">
          {copied() ? 'Link copied to clipboard.' : ''}
        </div>

        <Show
          when={isNewsView()}
          fallback={
            <Show
              when={selected()}
              fallback={
                <>
                  <h2 ref={mainHeadingRef} tabindex="-1" class="sr-only focus:not-sr-only">Dashboard</h2>
                  <EmptyState />
                </>
              }
            >
              {(data) => (
                <>
                  <h2 ref={mainHeadingRef} tabindex="-1" class="sr-only focus:not-sr-only">
                    {data().manufacturer} {data().model}
                  </h2>
                  <HeadphoneDetails
                    headphone={data()}
                    onReset={handleResetSelection}
                    onShare={handleCopyLink}
                    copied={copied()}
                  />
                </>
              )}
            </Show>
          }
        >
          <>
            <h2 ref={mainHeadingRef} tabindex="-1" class="sr-only focus:not-sr-only">News Coverage</h2>
            <NewsCoverage onNavigateHome={showDashboard} />
          </>
        </Show>
      </main>

      <footer class="max-w-6xl mx-auto px-8 py-32 text-center border-t-2 border-slate-50 mt-32">
        <p class="text-slate-500 font-black uppercase tracking-[0.4em] text-xs mb-8">Source Documentation</p>
        <a
          href="https://tudatosvasarlo.hu/tox-free-life-for-all-english"
          target="_blank"
          rel="noreferrer"
          aria-label="A Comprehensive Analysis of Endocrine Disruptors and Hazardous Additives in Headphones (opens in new tab)"
          class="block text-3xl font-black text-slate-900 tracking-tighter mb-4 hover:text-rose-600 transition-colors"
        >
          A Comprehensive Analysis of Endocrine Disruptors and Hazardous Additives in Headphones
        </a>
        <div class="flex items-center justify-center gap-6 mt-8">
          <a href="https://arnika.org/en" target="_blank" rel="noreferrer" aria-label="Arnika.org (opens in new tab)" class="text-slate-600 font-bold uppercase tracking-widest text-sm hover:text-slate-900 transition-colors">Arnika.org</a>
          <span class="w-1 h-1 bg-slate-200 rounded-full" aria-hidden="true" />
          <a href="https://tudatosvasarlo.hu" target="_blank" rel="noreferrer" aria-label="Tudatos Vásárlók (opens in new tab)" class="text-slate-600 font-bold uppercase tracking-widest text-sm hover:text-slate-900 transition-colors">Tudatos Vásárlók</a>
        </div>
        <p class="text-slate-500 mt-12 text-xs font-bold uppercase tracking-widest">© 2026 ToxFree LIFE for All Project</p>
      </footer>
    </div>
  );
}
