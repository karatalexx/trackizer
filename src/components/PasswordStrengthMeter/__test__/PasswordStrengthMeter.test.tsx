import React from 'react';
import PasswordStrengthMeter from '../PasswordStrengthMeter';
import { render, screen } from '@testing-library/react';

describe('PasswordStrengthMeter component', () => {
  it('component displayed on the page', () => {
    render(<PasswordStrengthMeter password='SomePass@23$' />);
    const meter = screen.getByTestId('strengthMeter');

    expect(meter).toBeInTheDocument();
  });
});