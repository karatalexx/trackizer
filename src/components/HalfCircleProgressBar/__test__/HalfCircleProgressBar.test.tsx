import React from 'react';
import { render, screen } from '@testing-library/react';
import HalfCircleProgressBar from '../HalfCircleProgressBar';

const mockData = [
  {value: 500, colour: '#00FAD9'},
  {value: 500, colour: '#FF7966'},
  {value: 0, colour: '#AD7BFF'},
];

describe('HalfCircleProgressBar component', () => {
  it('component displayed on the page', () => {
    render(<HalfCircleProgressBar limitValue={200} data={mockData} />);
    expect(screen.getByTestId('#00FAD9')).toBeInTheDocument();
    });

  it('component check if value 0', () => {
    render(<HalfCircleProgressBar limitValue={200} data={mockData} />);
    expect(screen.getByTestId('#AD7BFF')).toHaveAttribute('stroke-dasharray', '0 157')
  });
});
