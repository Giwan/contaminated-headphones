import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root');

if (root) {
  render(
    () => (
      <Router>
        <Route path="/" component={App} />
        <Route path="/news" component={App} />
        <Route path="/headphones/:slug" component={App} />
        <Route path="/*" component={App} />
      </Router>
    ),
    root,
  );
}
