import React from 'react';
import SubsRatingList from '../SubsRatingList';
import { render, screen } from '@testing-library/react';

const mockedList = [
  {
    name: 'Spotify',
    price:'$5.99',
    nextPayment: '2022-10-05T14:48:00.000',
    id: 1,
  },
  {
    name: 'YouTube Premium',
    price: '$18.99',
    nextPayment: '2022-09-07T14:48:00.000',
    id: 2,
  },
  {
    name: 'Microsoft OneDrive',
    price: '$29.99',
    nextPayment: '2022-11-12T14:48:00.000',
    id: 3,
  },
];

describe('SubsRatingList component' ,() => {
  it('component displayed on the page', () => {
    render(<SubsRatingList list={mockedList} />);
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });
});
