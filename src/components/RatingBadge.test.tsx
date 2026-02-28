import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { RatingBadge } from './RatingBadge';

describe('RatingBadge', () => {
  it('renders the rating label and description', () => {
    render(() => <RatingBadge label="Skin Contact" rating="green" />);
    expect(screen.getByText('Skin Contact')).toBeInTheDocument();
    expect(screen.getByText('Meets most protective standards.')).toBeInTheDocument();
  });

  it('shows N/A when the rating is none', () => {
    render(() => <RatingBadge label="Internal" rating="none" />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
    expect(screen.getByText('No data available for this component.')).toBeInTheDocument();
  });
});
