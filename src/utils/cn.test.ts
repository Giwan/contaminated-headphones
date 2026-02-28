import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('merges tailwind classes and removes duplicates', () => {
    expect(cn('p-4', 'p-4', 'text-sm')).toBe('p-4 text-sm');
  });

  it('handles conditional values and falsy inputs', () => {
    expect(cn('text-base', null, undefined, '', { 'font-bold': true, hidden: false })).toBe('text-base font-bold');
  });
});
