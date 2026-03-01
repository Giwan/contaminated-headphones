import type { Component } from 'solid-js';

interface HeroSectionProps { }

export const HeroSection: Component<HeroSectionProps> = () => (
  <section class="mb-24">
    <div class="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-12 text-center">
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-6">
        Your Headphones Might Be Toxic
      </h1>
      <p class="text-2xl md:text-3xl text-slate-600 mb-8">
        Search your model to see if it contains harmful chemicals
      </p>
      <p class="text-sm text-slate-400 font-medium">
        Based on independent research by Arnika and Tudatos Vásárlók, covering 81 headphone models across Central Europe. Links to the source documents in the header and footer.
      </p>
    </div>
  </section>
);