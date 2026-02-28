import { fireEvent, render, screen } from '@solidjs/testing-library';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const navigateMock = vi.fn();
let pathname = '/';

vi.mock('@solidjs/router', () => ({
  useNavigate: () => navigateMock,
  useLocation: () => ({
    pathname,
    search: '',
    hash: '',
    query: {},
    state: null,
    key: 'test',
  }),
}));

import App, { findHeadphoneBySlug, headphoneSlug } from './App';

const resetPath = (path = '/') => {
  pathname = path;
};

describe('App interactions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetPath();
  });

  it('generates consistent slugs for headphones', () => {
    expect(
      headphoneSlug({ manufacturer: 'Sony', model: 'WH-1000XM5' } as any)
    ).toBe('sony-wh-1000xm5');
  });

  it('finds headphones by slug', () => {
    expect(findHeadphoneBySlug('sony-wh-1000xm5')).toMatchObject({ manufacturer: 'Sony' });
    expect(findHeadphoneBySlug('does-not-exist')).toBeNull();
  });

  it('navigates to the news view when the toggle is clicked', async () => {
    render(() => <App />);
    fireEvent.click(screen.getByRole('link', { name: /news/i }));
    expect(navigateMock).toHaveBeenCalledWith('/news');
  });

  it('navigates back home when reset is triggered', async () => {
    resetPath('/headphones/sony-wh-1000xm5');
    render(() => <App />);
    fireEvent.click(await screen.findByRole('button', { name: /reset search/i }));
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('selects a suggestion and navigates to the headphone details', async () => {
    render(() => <App />);
    const input = screen.getByRole('combobox');
    fireEvent.input(input, { target: { value: 'Sony' } });

    const options = await screen.findAllByRole('option');
    fireEvent.click(options[0]);
    expect(navigateMock).toHaveBeenCalledWith('/headphones/sony-wh-1000xm5');
  });

  it('copies the link when share button is clicked', async () => {
    resetPath('/headphones/sony-wh-1000xm5');
    render(() => <App />);
    fireEvent.click(await screen.findByRole('button', { name: /share link/i }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href);
  });

  it('navigates to dashboard from news view when no last selection exists', () => {
    resetPath('/news');
    render(() => <App />);
    fireEvent.click(
      screen.getByRole('link', {
        name: (content) => content.trim().toLowerCase() === 'dashboard',
      })
    );
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
