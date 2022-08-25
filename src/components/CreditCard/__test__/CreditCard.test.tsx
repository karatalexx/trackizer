import React from 'react';
import CreditCard from '../CreditCard';
import { render, screen } from '@testing-library/react';

describe('CreditCard component', () => {
  it('component displayed on the page', () => {
    render(<CreditCard cardNum={2169} expDate='09/23' firstName='John' lastName='Doe' />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
