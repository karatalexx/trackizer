import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import Field from '../Field';

const mockedOnChange = jest.fn();
const mockedOnClick = jest.fn();

const renderComponent = (isClicked: boolean) => render(
  <Field
    name='Category'
    value= 'Music'
    type='select'
    selectList={['Music app', 'Business app', 'Games']}
    onChange={mockedOnChange}
    isClicked={isClicked}
    onClick={mockedOnClick}
  />
);

describe('Field component', () => {
  it('component displayed on the page', () => {
    renderComponent(false);
    const element = screen.getByTestId('Music');

    expect(element).toBeInTheDocument();
  });


  it('onClick work correct', async () => {
    renderComponent(false);
    userEvent.click(screen.getByText('btnRightArrow.svg'));

    expect(mockedOnClick).toBeCalled();
  });

  it('select work correct', async () => {
    renderComponent(true);
    userEvent.click(screen.getByTestId('Music'));
    userEvent.click(screen.getByText('Business app'));

    expect(screen.getByText('Business app')).toBeInTheDocument();
  });
});
