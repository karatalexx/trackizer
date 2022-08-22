import React from 'react';
import TabsMenu from '../TabsMenu';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockedList = [
  {
    name: 'Spotify',
    price:'$5.99',
    date: '2022-10-05T14:48:00.000',
    id: 1,
  },
  {
    name: 'YouTube Premium',
    price: '$18.99',
    date: '2022-09-07T14:48:00.000',
    id: 2,
  },
  {
    name: 'Microsoft OneDrive',
    price: '$29.99',
    date: '2022-11-12T14:48:00.000',
    id: 3,
  },
];

describe('TabsMenu component', () => {
    it('component displayed on the page', () => {
        render(<TabsMenu list={mockedList} />);
        expect(screen.getByTestId('Spotify')).toBeInTheDocument();
    });

    it('component displayed the correct list and onClick work', () => {
        render(<TabsMenu list={mockedList} />);
        const btn = screen.getByText('Upcoming bills');
        userEvent.click(btn);

        expect(screen.getByTestId('Oct')).toHaveTextContent('Oct');
        expect(screen.getByTestId('05')).toHaveTextContent('05');
    });
});
