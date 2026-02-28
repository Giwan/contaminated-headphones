import { createSignal, Show, createMemo, createEffect } from 'solid-js';
import { useLocation, useNavigate } from '@solidjs/router';
import { headphones, HeadphoneData, riskStatistics } from './data';
import { AppHeader } from './components/AppHeader';
import { HeadphoneDetails } from './components/HeadphoneDetails';
import { NewsCoverage } from './components/NewsCoverage';
import { RiskHighlights } from './components/RiskHighlights';
import { HeroSection } from './components/HeroSection';
import { RiskStatistics } from './components/RiskStatistics';
import { QuickSafetyCheck } from './components/QuickSafetyCheck';
import { CategoryNavigation } from './components/CategoryNavigation';
import { HEADPHONE_RESULT_LIMIT } from './constants/ui';

const headphoneSlug = (item: HeadphoneData) =>
  `${item.manufacturer}-${item.model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');

const findHeadphoneBySlug = (slug: string) =>
  headphones.find((headphone) => headphoneSlug(headphone) === slug) ?? null;

const computeRiskCategories = () => ({
  safe: headphones.filter(h => h.totalRating === 'green'),
  moderate: headphones.filter(h => h.totalRating === 'yellow'),
  highRisk: headphones.filter(h => h.totalRating === 'red')
});

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = createSignal("");
  const [copied, setCopied] = createSignal(false);
  const [lastViewedSlug, setLastViewedSlug] = createSignal<string | null>(null);
  const [showRiskStats, setShowRiskStats] = createSignal(true);

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
      setShowRiskStats(false);
    } else {
      setShowRiskStats(true);
    }
  });

  const isNewsView = createMemo(() => location.pathname === '/news');
  const riskCategories = createMemo(computeRiskCategories);

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

  const navigateToNews = () => navigate('/news');

  const navigateToDashboard = () => {
    const recent = lastViewedSlug();
    recent ? navigate(`/headphones/${recent}`) : navigate('/');
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
      .filter(h => h.model.toLowerCase().includes(term) || h.manufacturer.toLowerCase().includes(term))
      .slice(0, HEADPHONE_RESULT_LIMIT);
  });

  return (
    <div class="min-h-screen bg-white text-slate-900 font-sans selection:bg-rose-200">
      <AppHeader
        searchValue={search()}
        onSearchChange={setSearch}
        suggestions={filteredHeadphones()}
        onSuggestionSelect={handleHeadphoneSelect}
        isNewsView={isNewsView()}
        onNavigateNews={navigateToNews}
        onNavigateDashboard={navigateToDashboard}
      />

      <Show when={showRiskStats()}>
        <main class="max-w-6xl mx-auto px-8 py-20">
          <HeroSection />
          <RiskStatistics stats={riskStatistics} />
          <QuickSafetyCheck />
          <section id="risk-highlights" class="mb-24">
            <RiskHighlights />
          </section>
          <CategoryNavigation
            categories={riskCategories()}
          />
        </main>
      </Show>

      <Show when={isNewsView()} fallback={
        <Show when={selected()}>
          {data => (
            <HeadphoneDetails
              headphone={data()}
              onReset={handleResetSelection}
              onShare={handleCopyLink}
              copied={copied()}
            />
          )}
        </Show>
      }>
        <NewsCoverage onNavigateHome={navigateToDashboard} />
      </Show>

      <footer class="max-w-6xl mx-auto px-8 py-16 text-center border-t-2 border-slate-50">
        <p class="text-slate-500 font-black uppercase tracking-[0.4em] text-xs mb-8">Source Documentation</p>
        <a
          href="https://arnika.org/en/publications/download/2128_f40ae4eb2e63e4dc3205035fb376d8e3"
          target="_blank"
          rel="noreferrer"
          aria-label="A Comprehensive Analysis of Endocrine Disruptors and Hazardous Additives in Headphones (opens in new tab)"
          class="block text-3xl font-black text-slate-900 tracking-tighter mb-4 hover:text-rose-600 transition-colors"
        >
          THE SOUND OF CONTAMINATION
        </a>
        <div class="flex items-center justify-center gap-6 mt-8">
          <a href="https://arnika.org/en" target="_blank" rel="noreferrer" aria-label="Arnika.org (opens in new tab)" class="text-slate-600 font-bold uppercase tracking-widest text-sm hover:text-slate-900 transition-colors">Arnika.org</a>
          <span class="w-1 h-1 bg-slate-200 rounded-full" aria-hidden="true" />
          <a href="https://tudatosvasarlo.hu" target="_blank" rel="noreferrer" aria-label="Tudatos Vásárlók (opens in new tab)" class="text-slate-600 font-bold uppercase tracking-widest text-sm hover:text-slate-900 transition-colors">Tudatos Vásárlók</a>
        </div>
      </footer>
    </div>
  );
}
