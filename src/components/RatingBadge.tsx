import { ratingBadgeColors, ratingBadgeDescriptions, ratingBadgeDots, type ExtendedRatingLevel } from '../constants/ui';
import { cn } from '../utils/cn';

interface RatingBadgeProps {
  rating: ExtendedRatingLevel;
  label: string;
}

export const RatingBadge = (props: RatingBadgeProps) => (
  <div class={cn('flex flex-col gap-6 p-12 rounded-none border-4 transition-all', ratingBadgeColors[props.rating])}>
    <div class="flex items-center justify-between">
      <span class="text-xs font-black uppercase tracking-[0.2em] opacity-60">{props.label}</span>
      <div class={cn('w-6 h-6 rounded-none', ratingBadgeDots[props.rating])} />
    </div>
    <div class="text-5xl font-black capitalize tracking-tight">
      {props.rating === 'none' ? 'N/A' : props.rating}
    </div>
    <p class="text-xl font-medium leading-snug opacity-80">
      {ratingBadgeDescriptions[props.rating]}
    </p>
  </div>
);
