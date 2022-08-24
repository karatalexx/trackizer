import React from 'react';
import { Meta } from '@storybook/react';
import SubscriptionCarousel, { SubscriptionCarouselProps } from '../../components/SubscriptionCarousel/SubscriptionCarousel';
import {ReactComponent as YouTube} from '../../assets/icons/youtube.svg';
import {ReactComponent as Spotify} from '../../assets/icons/spotify.svg';
import {ReactComponent as Onedrive} from '../../assets/icons/onedrive.svg';

const meta: Meta = {
  title: 'SubscriptionCarousel',
  component: SubscriptionCarousel,
  argTypes: {
    onChange: { action: 'scrolled' },
  }
}

export default meta;

const Template = (args: SubscriptionCarouselProps) => <SubscriptionCarousel {...args}>
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
</SubscriptionCarousel>

export const Default = Template.bind({});
