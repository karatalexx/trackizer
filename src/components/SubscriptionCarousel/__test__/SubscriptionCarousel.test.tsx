import React from 'react';
import SubscriptionCarousel from '../SubscriptionCarousel';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { ReactComponent as YouTube } from 'assets/icons/youtube.svg';
import { ReactComponent as Spotify } from 'assets/icons/spotify.svg';
import { ReactComponent as Onedrive } from 'assets/icons/onedrive.svg';


const mockedOnChange = jest.fn();
const renderComponent = () => render(
  <SubscriptionCarousel onChange={mockedOnChange}>
    <>
      <YouTube />
      <span>YouTube</span>
    </>
    <>
      <Spotify />
      <span>Spotify</span>
    </>
    <>
      <Onedrive />
      <span>Onedrive</span>
    </>
  </SubscriptionCarousel>);

describe('SubscriptionCarousel component', () => {
   it('component displayed on the page', () => {
     renderComponent()
    const element = screen.getByTestId('1');

    expect(element).toBeInTheDocument();
  });

  it('onChange work correct', () => {
    renderComponent()
    const btn = screen.getByTestId('1');
    userEvent.click(btn);

    expect(mockedOnChange).toHaveBeenCalled();
  });
});