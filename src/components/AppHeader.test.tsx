import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import type { HeadphoneData } from '../data';
import { AppHeader } from './AppHeader';

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

const renderHeader = (override: Partial<Parameters<typeof AppHeader>[0]> = {}) => {
  const handlers = {
    onSearchChange: vi.fn(),
    onSuggestionSelect: vi.fn(),
    onNavigateNews: vi.fn(),
    onNavigateDashboard: vi.fn(),
  };

  render(() => (
    <AppHeader
      searchValue="sony"
      suggestions={suggestions}
      isNewsView={false}
      {...handlers}
      {...override}
    />
  ));

  return handlers;
};

describe('AppHeader', () => {
  it('navigates suggestions with the keyboard and selects a highlighted option', () => {
    const { onSuggestionSelect } = renderHeader();
    const input = screen.getByRole('combobox');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input.getAttribute('aria-activedescendant')).toBe('search-suggestions-listbox-option-0');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSuggestionSelect).toHaveBeenCalledWith(suggestions[0]);
  });

  it('clears the search field via the clear button and Escape key', () => {
    const { onSearchChange } = renderHeader();
    const input = screen.getByRole('combobox');
    const clearButton = screen.getByRole('button', { name: /clear search/i });

    fireEvent.click(clearButton);
    expect(onSearchChange).toHaveBeenCalledWith('');

    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onSearchChange).toHaveBeenCalledTimes(2);
  });

  it('focuses the search input when the global shortcut is used', () => {
    renderHeader();
    const input = screen.getByRole('combobox');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
    expect(input).toHaveFocus();
  });

  it('calls the appropriate navigation callback when toggling between news and dashboard', () => {
    const { onNavigateNews } = renderHeader();
    fireEvent.click(screen.getByRole('link', { name: /news/i }));
    expect(onNavigateNews).toHaveBeenCalled();

    const onNavigateDashboard = vi.fn();
    render(() => (
      <AppHeader
        searchValue="sony"
        suggestions={suggestions}
        onSearchChange={vi.fn()}
        onSuggestionSelect={vi.fn()}
        isNewsView
        onNavigateNews={vi.fn()}
        onNavigateDashboard={onNavigateDashboard}
      />
    ));

    fireEvent.click(screen.getByRole('link', { name: /dashboard/i }));
    expect(onNavigateDashboard).toHaveBeenCalled();
  });
});
