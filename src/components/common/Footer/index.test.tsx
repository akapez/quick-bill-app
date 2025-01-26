import '@testing-library/jest-dom';

import React from 'react';

import { render, screen } from '@testing-library/react';

import Footer from '.';

describe('Footer Component', () => {
  it('renders the QuickBill logo with the correct text', () => {
    render(<Footer />);
    expect(
      screen.getByText(/QuickBill/i, { selector: 'span' })
    ).toBeInTheDocument();
  });
  it('renders the copyright text', () => {
    render(<Footer />);
    expect(
      screen.getByText(/© 2025 QuickBill Inc. All rights reserved./i, {
        selector: 'p',
      })
    ).toBeInTheDocument();
  });
  it('renders social media buttons with correct aria labels', () => {
    render(<Footer />);
    const facebookButton = screen.getByLabelText(/Facebook/i);
    const twitterButton = screen.getByLabelText(/X/i);
    const xButton = screen.getByLabelText(/Instagram/i);

    expect(facebookButton).toBeInTheDocument();
    expect(twitterButton).toBeInTheDocument();
    expect(xButton).toBeInTheDocument();
  });
});
