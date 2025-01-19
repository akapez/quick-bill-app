import '@testing-library/jest-dom';

import React from 'react';

import { render, screen } from '@testing-library/react';

import BaseTemplate, { IBaseTemplateProps } from './BaseTemplate';

describe('BaseTemplate Component', () => {
  const defaultProps: IBaseTemplateProps = {
    sampleTextProp: 'Hello, World!',
  };

  it('renders with the provided sampleTextProp', () => {
    render(<BaseTemplate {...defaultProps} />);
    const textElement = screen.getByText(/Hello, World!/i);
    expect(textElement).toBeInTheDocument();
  });

  it('renders the correct text when sampleTextProp changes', () => {
    render(<BaseTemplate sampleTextProp="Another Text" />);
    const textElement = screen.getByText(/Another Text/i);
    expect(textElement).toBeInTheDocument();
  });
});
