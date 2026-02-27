import { createSignal, For, Show, createMemo, onMount, createEffect } from 'solid-js';
import { headphones, HeadphoneData } from './data';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const RatingBadge = (props: { rating: 'green' | 'yellow' | 'red' | 'none'; label: string }) => {
  const colors = {
    green: "bg-emerald-50 text-emerald-900 border-emerald-200",
    yellow: "bg-amber-50 text-amber-900 border-amber-200",
    red: "bg-rose-50 text-rose-900 border-rose-200",
    none: "bg-slate-50 text-slate-500 border-slate-200"
  };

  const dots = {
    green: "bg-emerald-500",
    yellow: "bg-amber-500",
    red: "bg-rose-500",
    none: "bg-slate-400"
  };

  return (
    <div class={cn("flex flex-col gap-6 p-12 rounded-none border-4 transition-all", colors[props.rating])}>
      <div class="flex items-center justify-between">
        <span class="text-xs font-black uppercase tracking-[0.2em] opacity-60">{props.label}</span>
        <div class={cn("w-6 h-6 rounded-none", dots[props.rating])} />
      </div>
      <div class="text-5xl font-black capitalize tracking-tight">
        {props.rating === 'none' ? 'N/A' : props.rating}
      </div>
      <p class="text-xl font-medium leading-snug opacity-80">
        {props.rating === 'green' && "Meets most protective standards."}
        {props.rating === 'yellow' && "Moderate concern. Exceeds strict voluntary limits."}
        {props.rating === 'red' && "High concern. Non-compliant or multiple hazards."}
        {props.rating === 'none' && "No data available for this component."}
      </p>
    </div>
  );
};

export default function App() {
  const [search, setSearch] = createSignal("");
  const [selected, setSelected] = createSignal<HeadphoneData | null>(null);
  const [copied, setCopied] = createSignal(false);

  // Helper to generate a URL-friendly slug
  const getSlug = (item: HeadphoneData) => {
    return `${item.manufacturer}-${item.model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  // Sync URL hash with selected model
  onMount(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const found = headphones.find(h => getSlug(h) === hash);
        if (found) setSelected(found);
      } else {
        setSelected(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
  });

  createEffect(() => {
    const current = selected();
    if (current) {
      window.location.hash = getSlug(current);
    } else {
      // Only clear hash if it was set to a model slug
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredHeadphones = createMemo(() => {
    const term = search().toLowerCase();
    if (!term) return [];
    return headphones.filter(h => 
      h.model.toLowerCase().includes(term) || 
      h.manufacturer.toLowerCase().includes(term)
    ).slice(0, 8);
  });

  return (
    <div class="min-h-screen bg-white text-slate-900 font-sans selection:bg-rose-200">
      {/* Header */}
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
            </div>
          </div>

          {/* Search in Header */}
          <div class="relative group">
            <input
              type="text"
              placeholder="Search headphone model..."
              class="w-full bg-slate-50 border-4 border-slate-100 rounded-none px-8 py-4 text-xl font-black focus:outline-none focus:border-rose-500 transition-all pr-24 placeholder:text-slate-300"
              onInput={(e) => setSearch(e.currentTarget.value)}
              value={search()}
            />
            <div class="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
              <Show when={search().length > 0}>
                <button 
                  onClick={() => setSearch("")}
                  class="p-2 hover:bg-white rounded-none text-slate-300 transition-colors border-2 border-slate-100 bg-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </Show>
              <div class="text-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
            </div>

            {/* Suggestions */}
            <Show when={filteredHeadphones().length > 0}>
              <div class="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-slate-900 rounded-none shadow-2xl overflow-hidden z-40">
                <For each={filteredHeadphones()}>
                  {(item) => (
                    <button
                      class="w-full text-left px-8 py-6 hover:bg-slate-900 hover:text-white border-b-2 border-slate-100 last:border-0 transition-colors flex items-center justify-between group/item"
                      onClick={() => {
                        setSelected(item);
                        setSearch("");
                      }}
                    >
                      <div>
                        <div class="text-xl font-black">{item.manufacturer}</div>
                        <div class="text-lg font-bold opacity-50">{item.model}</div>
                      </div>
                      <div class={cn(
                        "w-4 h-4 rounded-full",
                        item.totalRating === 'green' ? 'bg-emerald-500' : 
                        item.totalRating === 'yellow' ? 'bg-amber-500' : 'bg-rose-500'
                      )} />
                    </button>
                  )}
                </For>
              </div>
            </Show>
          </div>
        </div>
      </header>

      <main class="max-w-6xl mx-auto px-8 py-20">
        {/* Dashboard Content */}
        <Show 
          when={selected()} 
          fallback={
            <div class="text-center py-48">
              <div class="w-40 h-40 bg-slate-50 rounded-none border-4 border-slate-100 flex items-center justify-center mx-auto mb-12">
                <svg class="text-slate-200" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
              </div>
              <h2 class="text-5xl font-black tracking-tighter">Search for your model to see the risk report</h2>
              <p class="text-2xl font-bold text-slate-300 mt-6 uppercase tracking-[0.2em]">Data covers 81 models across Central Europe</p>
            </div>
          }
        >
          {(data) => (
            <div class="animate-in fade-in duration-700">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
                <div>
                  <div class="flex items-center gap-6 mb-8">
                    <button 
                      onClick={() => setSelected(null)}
                      class="text-rose-600 font-black flex items-center gap-2 hover:underline text-xl uppercase tracking-widest"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                      Reset Search
                    </button>
                    <button 
                      onClick={handleCopyLink}
                      class={cn(
                        "font-black flex items-center gap-2 text-xl uppercase tracking-widest transition-colors",
                        copied() ? "text-emerald-600" : "text-slate-400 hover:text-slate-900"
                      )}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                      {copied() ? "Link Copied!" : "Share Link"}
                    </button>
                  </div>
                  <h2 class="text-8xl font-black tracking-tighter leading-[0.8] mb-4">{data().manufacturer}</h2>
                  <p class="text-4xl font-black text-slate-200 tracking-tighter">{data().model}</p>
                  <div class="mt-8 inline-flex items-center gap-3 bg-slate-100 px-6 py-2 rounded-none text-sm font-black uppercase tracking-[0.2em] text-slate-500">
                    {data().type}
                  </div>
                </div>

                <div class={cn(
                  "w-56 h-56 rounded-none flex flex-col items-center justify-center border-8",
                  data().totalRating === 'green' ? 'bg-emerald-500 border-emerald-600 text-emerald-50' : 
                  data().totalRating === 'yellow' ? 'bg-amber-500 border-amber-600 text-amber-50' : 
                  'bg-rose-500 border-rose-600 text-rose-50'
                )}>
                  <span class="text-xs font-black uppercase tracking-[0.4em] opacity-70 mb-4">Overall</span>
                  <span class="text-5xl font-black capitalize tracking-tighter">{data().totalRating}</span>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-16 mb-48">
                <RatingBadge label="Parts Touching Skin" rating={data().skinRating} />
                <RatingBadge label="Internal / Non-Contact Parts" rating={data().nonSkinRating} />
              </div>

              {/* Infographic Details */}
              <div class="bg-white rounded-none p-20 border-8 border-slate-50">
                <h3 class="text-4xl font-black mb-24 border-b-8 border-slate-50 pb-8 uppercase tracking-tighter">Chemical Risk Profile</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-20">
                  <div class="space-y-8">
                    <div class="w-24 h-24 bg-rose-50 rounded-none flex items-center justify-center text-rose-600 border-4 border-rose-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v5"/><path d="M12 16h.01"/><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>
                    </div>
                    <h4 class="text-3xl font-black tracking-tight">Bisphenol Crisis</h4>
                    <p class="text-xl text-slate-500 font-medium leading-relaxed">
                      Bisphenols (BPA, BPS) were found in 177 of 180 samples. Migration is accelerated by sweat and body heat. These are potent endocrine disruptors affecting hormonal health.
                    </p>
                  </div>

                  <div class="space-y-8">
                    <div class="w-24 h-24 bg-amber-50 rounded-none flex items-center justify-center text-amber-600 border-4 border-amber-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22h20"/><path d="M5 22v-5a7 7 0 0 1 14 0v5"/><circle cx="12" cy="9" r="2"/></svg>
                    </div>
                    <h4 class="text-3xl font-black tracking-tight">Flame Retardants</h4>
                    <p class="text-xl text-slate-500 font-medium leading-relaxed">
                      Organophosphate flame retardants (OPFRs) are pervasive. 72% of samples contained 5 or more distinct OPFRs. Some are known neurotoxins and endocrine disruptors.
                    </p>
                  </div>

                  <div class="space-y-8">
                    <div class="w-24 h-24 bg-emerald-50 rounded-none flex items-center justify-center text-emerald-600 border-4 border-emerald-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <h4 class="text-3xl font-black tracking-tight">Consumer Advice</h4>
                    <p class="text-xl text-slate-500 font-medium leading-relaxed">
                      Limit duration of use. Avoid falling asleep with headphones on. For children, select models specifically designed for their age group.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Advice Section */}
              <div class="bg-slate-900 text-white rounded-none p-20 mt-16 border-8 border-slate-900">
                <h3 class="text-4xl font-black mb-12 uppercase tracking-tighter flex items-center gap-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                  What You Can Do
                </h3>
                
                <div class="max-w-3xl">
                  <p class="text-2xl font-bold leading-relaxed mb-12 text-slate-300">
                    {data().actionAdvice || "Contact the reseller or manufacturer to inquire about the chemical composition and safety certifications of this model."}
                  </p>
                  
                  <Show when={data().supportLink}>
                    <a 
                      href={data().supportLink} 
                      target="_blank" 
                      class="inline-flex items-center gap-4 bg-rose-600 text-white px-10 py-6 text-xl font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all border-4 border-rose-600"
                    >
                      Contact {data().manufacturer} Support
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  </Show>
                </div>
              </div>
            </div>
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
