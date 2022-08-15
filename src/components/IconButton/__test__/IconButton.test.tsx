import React from 'react';
import IconButton from '../IconButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactComponent as Settings } from '../../../assets/icons/settings.svg';

const mockedOnClick = jest.fn();

describe('IconButton component', () => {
    it('component displayed on the page', () => {
        render(<IconButton onClick={mockedOnClick} Icon={Settings} />);
        expect(screen.getByTestId('svgIcon')).toBeInTheDocument();
    });

    it('onClick to work correctly', () => {
        render(<IconButton onClick={mockedOnClick} Icon={Settings} />);
        const btn = screen.getByRole('button');
        userEvent.click(btn);

        expect(mockedOnClick).toHaveBeenCalled();
    });
});