import React from 'react';
import NavMenu from '../NavMenu';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('NavMenu component', () => {
  it('component displayed on the page', () => {
    render(<NavMenu />);
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('onClick work on buttons', () => {
    const spy = jest.spyOn(console, 'log');
    render(<NavMenu />);
    const btns = screen.getAllByRole('button');

    btns.forEach((btn) => {
      userEvent.click(btn);
    });

     expect(spy).toHaveBeenCalledTimes(5);
    });
});
