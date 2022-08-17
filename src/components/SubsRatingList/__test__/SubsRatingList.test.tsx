import React from 'react';
import SubsRatingList from '../SubsRatingList';
import { render, screen } from '@testing-library/react';

const mockedList = [
  {
    title: 'Active subs',
    value: '12',
    color: 'rgba(255, 166, 153, 1)',
  },
  {
    title: 'Highest subs',
    value: '$19.99',
    color: 'rgba(173, 123, 255, 1)',
  },
  {
    title: 'Lowest subs',
    value: '$5.99',
    color: 'rgba(125, 255, 238, 1)',
   },
];

describe('SubsRatingList component' ,() => {
  it('component displayed on the page', () => {
    render(<SubsRatingList list={mockedList} />);
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });
});
