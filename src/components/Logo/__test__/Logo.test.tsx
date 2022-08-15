import React from 'react';
import Logo from '../Logo';
import { render, screen } from '@testing-library/react';

describe('Logo component', () => {
  it('component got default size value', () => {
     render(<Logo />);
     expect(screen.getByTestId('medium')).toBeInTheDocument();
  });

    it('component got correct size value from props', () => {
        render(<Logo size='big' />);
        expect(screen.getByTestId('big')).toBeInTheDocument();
    });
});
