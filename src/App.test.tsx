import { render, screen } from '@solidjs/testing-library';
import { MemoryRouter, Route, createMemoryHistory } from '@solidjs/router';
import { describe, expect, it } from 'vitest';
import App from './App';

const renderWithRouter = (path = '/') => {
  const history = createMemoryHistory();
  if (path !== '/') {
    history.set({ value: path, replace: true });
  }

  return render(() => (
    <MemoryRouter history={history}>
      <Route path="/" component={App} />
      <Route path="/news" component={App} />
      <Route path="/headphones/:slug" component={App} />
      <Route path="/*" component={App} />
    </MemoryRouter>
  ));
};

describe('App', () => {
  it('shows the hero content on the dashboard when nothing is selected', () => {
    renderWithRouter();
    expect(screen.getByText(/Your Headphones Might Be Toxic/i)).toBeInTheDocument();
  });

  it('renders the news view when visiting /news', async () => {
    renderWithRouter('/news');
    expect(await screen.findByText(/Newsrooms amplifying/i)).toBeInTheDocument();
  });

  it('renders headphone details when navigating directly to a slug', async () => {
    renderWithRouter('/headphones/sony-wh-1000xm5');
    expect(await screen.findByText('Sony')).toBeInTheDocument();
    expect(await screen.findByText(/Chemical Risk Profile/i)).toBeInTheDocument();
  });
});
