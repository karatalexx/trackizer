import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import SubscriptionInfo from '../SubscriptionInfo';

const mockData = {
  name: 'Spotify',
  price: 5.99,
  description: 'Music',
  category: {
    current: 'Music app',
    categoryList: ['Music app', 'Business app', 'Games'],
  },
  firstPayment: '2021-12-17T03:24:00',
  reminder: {
    current: 'Never',
    reminderList: ['Never', 'Every month', 'Every year'],
  },
  currency: {
    current: 'USD',
    currencyList: ['USD', 'EURO', 'UAH'],
  },
};

const mockedOnDelete = jest.fn();
const mockedOnSubmit = jest.fn();
const mockedOnDownArrowClick = jest.fn();

const renderComponent = () => render(
  <SubscriptionInfo
    price={mockData.price}
    category={mockData.category}
    name={mockData.name}
    description={mockData.description}
    currency={mockData.currency}
    firstPayment={mockData.firstPayment}
    reminder={mockData.reminder}
    onSubmit={mockedOnSubmit}
    onDelete={mockedOnDelete}
    onDownArrowClick={mockedOnDownArrowClick}
  />
);

describe('SubscriptionInfo component', () => {
  it('component displayed on the page', () => {
    renderComponent();
    const element = screen.getByTestId('Music');

    expect(element).toBeInTheDocument();
  });

  it('onSubmit work correct', async () => {
    renderComponent();
    await act(async () => {
      fireEvent.submit(screen.getByTestId('form'))
    });

    expect(mockedOnSubmit).toBeCalled();
  });

  it('OnDelete work correct', async () => {
    renderComponent();
    userEvent.click(screen.getByText('trash.svg'))

    expect(mockedOnDelete).toBeCalled();
  });

  it('onDownArrowClick work correct', async () => {
    renderComponent();
    userEvent.click(screen.getByText('downMenuArrow.svg'))

    expect(mockedOnDownArrowClick).toBeCalled();
  });
});
