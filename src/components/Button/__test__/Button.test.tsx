import React from 'react';
import Button from '../Button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactComponent as AppleIcon } from '../../../assets/icons/appleIcon.svg';

const mockedOnClick = jest.fn();

describe('Button component', () => {
   it('component displayed on the page', () => {
     render(
       <Button onClick={mockedOnClick}>
         <span>test</span>
       </Button>);

     expect(screen.getByRole('button')).toHaveTextContent('test');
   });

   it('component got right styles', () => {
     render(
       <Button
         onClick={mockedOnClick}
         variant='black'>
           <span>test</span>
       </Button>);

     expect(screen.getByRole('button')).toHaveClass('black');
   });

   it('icon displayed', () => {
     render(
       <Button
         onClick={mockedOnClick}
         variant='black'
         Icon={AppleIcon}>
           <span>test</span>
       </Button>);

     expect(screen.getByTestId('icon')).toBeInTheDocument();
   });

   it('onClick to work correctly', () => {
     render(
       <Button onClick={mockedOnClick}>
         <span>test</span>
       </Button>);

      const btn = screen.getByRole('button');
      userEvent.click(btn);

     expect(mockedOnClick).toHaveBeenCalled();
   });
});