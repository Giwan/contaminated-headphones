import type { Component } from 'solid-js';

interface QuickSafetyCheckProps {}

const SafetyCard: Component<{
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}> = (props) => (
  <div class="bg-white p-8 rounded-2xl border-4 border-slate-200">
    <div class={`w-16 h-16 ${props.iconBg} rounded-full flex items-center justify-center mb-4 mx-auto`}>
      <span class={`text-2xl font-black ${props.iconColor}`}>{props.icon}</span>
    </div>
    <h3 class="text-xl font-black mb-2">{props.title}</h3>
    <p class="text-slate-500">{props.description}</p>
  </div>
);

export const QuickSafetyCheck: Component<QuickSafetyCheckProps> = () => (
  <section class="mb-24">
    <div class="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-12 border-8 border-slate-50">
      <h2 class="text-4xl font-black mb-8 text-center uppercase tracking-tighter">
        Quick Safety Check
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SafetyCard
          icon="<!"
          iconBg="bg-red-100"
          iconColor="text-red-600"
          title="Concerned About Your Headphones?"
          description="Search your model above to check if it contains harmful chemicals like BPA or flame retardants"
        />
        <SafetyCard
          icon="?"
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
          title="What Are These Chemicals?"
          description="Common contaminants include BPA (endocrine disruptor) and organophosphate flame retardants (neurotoxins)"
        />
        <SafetyCard
          icon="✓"
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
          title="How to Stay Safe"
          description="Limit use time, avoid sleeping with headphones on, and choose models with verified safety ratings"
        />
      </div>
    </div>
  </section>
);