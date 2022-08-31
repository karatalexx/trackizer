import React from 'react';
import SubscriptionCarousel from '../SubscriptionCarousel';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';

const mockedList =  [
  {
    name: 'Spotify',
    category: 'Entertainment',
  },
  {
    name: 'YouTube Premium',
    category: 'Entertainment',
  },
  {
    name: 'Microsoft OneDrive',
    category: 'Security',
  },
  {
    name: 'Netflix',
    category: 'Entertainment',
  },
  {
    name: 'HBO GO',
    category: 'Entertainment',
  },
];

const mockedOnChange = jest.fn();
const renderComponent = () => render(
  <SubscriptionCarousel list={mockedList} onChange={mockedOnChange} />);

describe('SubscriptionCarousel component', () => {
   it('component displayed on the page', () => {
     renderComponent()
    const element = screen.getByTestId('1');

    expect(element).toBeInTheDocument();
  });

  it('onChange work correct', () => {
    renderComponent()
    const btn = screen.getByTestId('1');
    userEvent.click(btn);

    expect(mockedOnChange).toHaveBeenCalled();
  });
});