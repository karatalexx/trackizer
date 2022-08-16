import React from 'react';
import CircularProgressBar from '../CircularProgressBar';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';

const mockedOnClick = jest.fn();

describe('CircularProgressBar component', () => {
  it('component displayed on the page', () => {
    render(<CircularProgressBar
      onClick={mockedOnClick}
      buttonText="Test value"
      limitValue={1000}
      currentValue={500}
    />);
      const btn = screen.getByRole('button');

      expect(btn).toBeInTheDocument();
    });

  it('onClick work correct', () => {
    render(<CircularProgressBar
      onClick={mockedOnClick}
      buttonText="Test value"
      limitValue={1000}
      currentValue={500}
    />);
    const btn = screen.getByRole('button');
    userEvent.click(btn);

    expect(mockedOnClick).toHaveBeenCalled();
  });

  it('component displayed correct current value', () => {
    render(<CircularProgressBar
      onClick={mockedOnClick}
      buttonText="Test value"
      limitValue={1000}
      currentValue={500}
    />);
    const value = screen.getByTestId('500');

    expect(value).toHaveTextContent(/\$500/gi)
  });

  it('component displayed progress line', () => {
    render(<CircularProgressBar
      onClick={mockedOnClick}
      buttonText="Test value"
      limitValue={1000}
      currentValue={1000}
    />);
    const path = screen.getByTestId('path');

    expect(path).toHaveAttribute('stroke-dashoffset', '0')
  });
});
