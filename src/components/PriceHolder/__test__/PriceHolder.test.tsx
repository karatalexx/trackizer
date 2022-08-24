import React from 'react';
import PriceHolder from '../PriceHolder';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockedOnChange = jest.fn();

describe('PriceHolder component', () => {
  it('component displayed on the page', () => {
    render(<PriceHolder  price={5.99} onChange={mockedOnChange}/>);
    expect(screen.getByRole('textbox')).toHaveValue('$5.99');
  });

  it('onChange to work correctly', () => {
    render(<PriceHolder  price={5.99} onChange={mockedOnChange}/>);
    const input = screen.getByRole('textbox');
    userEvent.type(input, '9');

    expect(mockedOnChange).toHaveBeenCalled();
  });

  it('increment and decrement to work correctly', () => {
    render(<PriceHolder  price={5.99} onChange={mockedOnChange}/>);
    const input = screen.getByRole('textbox');
    const plus = screen.getByTestId('plus');
    const minus = screen.getByTestId('minus');

    userEvent.click(plus);
    expect(mockedOnChange).toHaveBeenCalled();
    expect(input).toHaveValue('$6')

    userEvent.click(minus);
    expect(mockedOnChange).toHaveBeenCalled();
    expect(input).toHaveValue('$5.99')
  });
});
