import type { Component } from 'solid-js';

interface RiskStatisticsProps {
  stats: {
    total: number;
    green: number;
    yellow: number;
    red: number;
    childModels: number;
    bpaFound: number;
    opfrFound: number;
  };
}

const RiskCard: Component<{
  percentage: number;
  label: string;
  description: string;
  color: 'red' | 'amber' | 'emerald';
}> = (props) => {
  const colors = {
    red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', textDark: 'text-red-800' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', textDark: 'text-amber-800' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', textDark: 'text-emerald-800' },
  };

  const c = colors[props.color];

  return (
    <div class={`${c.bg} border-4 ${c.border} p-8 rounded-2xl text-center`}>
      <div class={`text-4xl font-black ${c.text} mb-2`}>{props.percentage}%</div>
      <div class={`text-lg font-medium ${c.textDark} uppercase tracking-wider mb-1`}>
        {props.label}
      </div>
      <p class={`text-sm ${c.text}`}>{props.description}</p>
    </div>
  );
};

const StatCard: Component<{
  value: number | string;
  label: string;
}> = (props) => (
  <div class="bg-slate-50 p-6 rounded-2xl text-center">
    <div class="text-3xl font-black text-slate-600 mb-2">{props.value}</div>
    <div class="text-sm font-medium text-slate-500 uppercase tracking-wider">
      {props.label}
    </div>
  </div>
);

export const RiskStatistics: Component<RiskStatisticsProps> = (props) => (
  <section class="mb-24">
    <div class="bg-white rounded-2xl p-12 border-8 border-slate-50">
      <h2 class="text-4xl font-black mb-12 text-center uppercase tracking-tighter">
        Chemical Safety Overview
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <RiskCard percentage={props.stats.red} label="High Risk" description="Contain harmful chemicals exceeding safety limits" color="red" />
        <RiskCard percentage={props.stats.yellow} label="Moderate Risk" description="Some concerns but within voluntary limits" color="amber" />
        <RiskCard percentage={props.stats.green} label="Safe" description="Meet most protective standards" color="emerald" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard value={props.stats.total} label="Total Models Tested" />
        <StatCard value={props.stats.bpaFound} label="BPA Samples Found" />
        <StatCard value={props.stats.opfrFound} label="Flame Retardants" />
        <StatCard value={props.stats.childModels} label="Children's Models" />
      </div>
    </div>
  </section>
);