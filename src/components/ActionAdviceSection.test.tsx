import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { ActionAdviceSection } from './ActionAdviceSection';

describe('ActionAdviceSection', () => {
  it('shows the provided advice and support button', () => {
    render(() => (
      <ActionAdviceSection
        advice="Contact support immediately."
        supportLink="https://example.com/support"
        manufacturer="TestCo"
      />
    ));

    expect(screen.getByText('Contact support immediately.')).toBeInTheDocument();
    const button = screen.getByRole('link', { name: /contact testco support/i });
    expect(button).toHaveAttribute('href', 'https://example.com/support');
  });

  it('falls back to default advice and hides the button when supportLink is missing', () => {
    render(() => <ActionAdviceSection manufacturer="TestCo" />);

    expect(
      screen.getByText(
        'Contact the reseller or manufacturer to inquire about the chemical composition and safety certifications of this model.'
      )
    ).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /contact/i })).toBeNull();
  });
});
