import type { HeadphoneData } from '../data';
import { RatingBadge } from './RatingBadge';
import { RiskHighlights } from './RiskHighlights';
import { ActionAdviceSection } from './ActionAdviceSection';
import { HeadphoneSummary } from './HeadphoneSummary';

interface HeadphoneDetailsProps {
  headphone: HeadphoneData;
  onReset: () => void;
  onShare: () => void;
  copied: boolean;
}

export const HeadphoneDetails = (props: HeadphoneDetailsProps) => (
  <div class="animate-in fade-in duration-700">
    <HeadphoneSummary
      headphone={props.headphone}
      onReset={props.onReset}
      onShare={props.onShare}
      copied={props.copied}
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 mb-48">
      <RatingBadge label="Parts Touching Skin" rating={props.headphone.skinRating} />
      <RatingBadge label="Internal / Non-Contact Parts" rating={props.headphone.nonSkinRating} />
    </div>

    <div class="bg-white rounded-none p-20 border-8 border-slate-50">
      <h3 class="text-4xl font-black mb-24 border-b-8 border-slate-50 pb-8 uppercase tracking-tighter">Chemical Risk Profile</h3>
      <RiskHighlights />
    </div>

    <ActionAdviceSection
      advice={props.headphone.actionAdvice}
      supportLink={props.headphone.supportLink}
      manufacturer={props.headphone.manufacturer}
    />
  </div>
);
