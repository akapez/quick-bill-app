import '@testing-library/jest-dom';

import React from 'react';

import { render, screen } from '@testing-library/react';

import Header, { HeaderProps } from '.';

jest.mock('./Menu', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="menu">{children}</div>
  ),
}));

describe('Header Component', () => {
  const defaultProps: HeaderProps = {
    name: 'Avishka Kapuruge',
  };
  it('renders QuickBill logo correctly', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText(/QuickBill/i)).toBeInTheDocument();
  });
  it('renders Menu and avatar correctly', () => {
    render(<Header {...defaultProps} />);
    const avatarFallback = screen.getByText('AK');
    expect(avatarFallback).toBeInTheDocument();
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });
});
