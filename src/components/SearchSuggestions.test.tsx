import { fireEvent, render } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import type { HeadphoneData } from '../data';
import { SearchSuggestions } from './SearchSuggestions';

const suggestions: HeadphoneData[] = [
  {
    manufacturer: 'Sony',
    model: 'WH-1000XM5',
    type: 'over ear',
    skinRating: 'green',
    nonSkinRating: 'green',
    totalRating: 'green',
  },
  {
    manufacturer: 'Apple',
    model: 'AirPods Max',
    type: 'over ear',
    skinRating: 'green',
    nonSkinRating: 'yellow',
    totalRating: 'green',
  },
];

describe('SearchSuggestions', () => {
  it('renders suggestions and marks the active option', () => {
    const { getByRole, getAllByRole } = render(() => (
      <SearchSuggestions
        suggestions={suggestions}
        onSelect={vi.fn()}
        activeIndex={1}
        listboxId="test-listbox"
      />
    ));

    const listbox = getByRole('listbox');
    expect(listbox).toBeInTheDocument();

    const options = getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('does not render list when there are no suggestions', () => {
    const { queryByRole } = render(() => (
      <SearchSuggestions
        suggestions={[]}
        onSelect={vi.fn()}
        activeIndex={-1}
        listboxId="test-listbox"
      />
    ));

    expect(queryByRole('listbox')).toBeNull();
  });

  it('calls onSelect when a suggestion is clicked', () => {
    const handleSelect = vi.fn();
    const { getAllByRole } = render(() => (
      <SearchSuggestions
        suggestions={suggestions}
        onSelect={handleSelect}
        activeIndex={0}
        listboxId="test-listbox"
      />
    ));

    fireEvent.click(getAllByRole('option')[0]);
    expect(handleSelect).toHaveBeenCalledWith(suggestions[0]);
  });
});
