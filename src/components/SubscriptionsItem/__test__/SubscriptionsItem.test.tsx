import React from 'react';
import SubscriptionsItem from '../SubscriptionsItem';
import { render, screen } from '@testing-library/react';
import { getSubscriptionIcon } from '../../../utils/getSubscriptionIcon';

describe('SubscriptionsItem component', () => {
  it('component displayed on the page with icon', () => {
    render(<SubscriptionsItem
      Icon={getSubscriptionIcon('Spotify')}
      name='Spotify' price='$5.99'
      date='2022-10-05T14:48:00.000Z'
    />);

    expect(screen.getByTestId('Spotify')).toBeInTheDocument()
  });

  it('displayed square component', () => {
    const {container} = render(<SubscriptionsItem
      Icon={getSubscriptionIcon('Spotify')}
      name='Spotify' price='$5.99'
      date='2022-10-05T14:48:00.000Z'
      isSquare
    />);
    const square = container.getElementsByClassName('square');

    expect(square).toBeTruthy();
  });

  it('component display correct date', () => {
    render(<SubscriptionsItem
      Icon={getSubscriptionIcon('Spotify')}
      name='Spotify' price='$5.99'
      date='2022-10-05T14:48:00.000Z'
      isUpcomingBill
    />);

    expect(screen.getByTestId('Oct')).toHaveTextContent('Oct');
    expect(screen.getByTestId('05')).toHaveTextContent('05');
  });
});
