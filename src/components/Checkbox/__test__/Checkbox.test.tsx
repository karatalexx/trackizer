import React from 'react';
import Checkbox from '../Checkbox';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockedOnChange = jest.fn();

describe('Checkbox component', () => {
  it('component displayed on the page', () => {
    render(<Checkbox checked={false} onChange={mockedOnChange} />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
  });

    it('component displayed the label', () => {
        render(<Checkbox checked={false} onChange={mockedOnChange} label='Some value' />);
        const label = screen.getByTestId('label');

        expect(label).toHaveTextContent(/Some value/gi);
    });

    it('onClick to work correctly', () => {
        render(<Checkbox checked={false} onChange={mockedOnChange} />);
        const checkbox = screen.getByRole('checkbox');
        userEvent.click(checkbox);

        expect(mockedOnChange).toHaveBeenCalled();
    });
})