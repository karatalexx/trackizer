import React from 'react';
import CreditCardList from '../CreditCardList';
import { render, screen } from '@testing-library/react';

const mockCardsList = [
  {cardNum: 2169, expDate: '2025-09-17T03:24:00', firstName: 'John', lastName: 'Doe', id: 1},
  {cardNum: 7777, expDate: '2026-09-17T03:24:00', firstName: 'Harry', lastName: 'Doe', id: 2},
  {cardNum: 2220, expDate: '2027-09-17T03:24:00', firstName: 'Ron', lastName: 'Doe', id: 3},
];

describe('CreditCardList component', () => {
  it('component displayed on the page', () => {
    render(<CreditCardList list={mockCardsList} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
