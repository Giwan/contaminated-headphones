import type { Component } from 'solid-js';

interface CategoryNavigationProps {
  categories: {
    safe: { length: number };
    moderate: { length: number };
    highRisk: { length: number };
  };
}

export const CategoryNavigation: Component<CategoryNavigationProps> = (props) => (
  <section class="mb-24">
    <div class="bg-white rounded-2xl p-12 border-8 border-slate-50">
      <h2 class="text-4xl font-black mb-12 text-center uppercase tracking-tighter">
        Browse by Safety Level
      </h2>
      <p class="text-center text-slate-500 mb-8">
        Use the search bar above to find your specific model
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-emerald-50 border-4 border-emerald-200 p-8 rounded-2xl text-center">
          <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span class="text-2xl font-black text-emerald-600">✓</span>
          </div>
          <h3 class="text-xl font-black mb-2 text-emerald-800">Safe</h3>
          <p class="text-sm text-emerald-600">
            {props.categories.safe.length} models meet safety standards
          </p>
        </div>
        <div class="bg-amber-50 border-4 border-amber-200 p-8 rounded-2xl text-center">
          <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span class="text-2xl font-black text-amber-600">?</span>
          </div>
          <h3 class="text-xl font-black mb-2 text-amber-800">Moderate Risk</h3>
          <p class="text-sm text-amber-600">
            {props.categories.moderate.length} models with some concerns
          </p>
        </div>
        <div class="bg-red-50 border-4 border-red-200 p-8 rounded-2xl text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span class="text-2xl font-black text-red-600">{'<'}!</span>
          </div>
          <h3 class="text-xl font-black mb-2 text-red-800">High Risk</h3>
          <p class="text-sm text-red-600">
            {props.categories.highRisk.length} models with hazardous chemicals
          </p>
        </div>
      </div>
    </div>
  </section>
);