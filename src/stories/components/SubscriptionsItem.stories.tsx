import React from 'react';
import { Meta } from '@storybook/react';
import SubscriptionsItem, { SubscriptionsItemProps } from '../../components/SubscriptionsItem/SubscriptionsItem';
import { getSubscriptionIcon } from '../../utils/getSubscriptionIcon';

const meta: Meta = {
  title: 'SubscriptionsItem',
  component: SubscriptionsItem,
  argTypes: {
    Icon: {
      defaultValue: getSubscriptionIcon('Spotify'),
    },
    name: {
      defaultValue: 'Spotify',
      control: 'text',
    },
    price: {
      defaultValue: '$5.99',
      control: 'text',
    },
    date: {
      defaultValue: '2022-10-05T14:48:00.000Z',
      control: 'date',
    },
    isUpcomingBill: {
      defaultValue: false,
    },
    isSquare: {
      defaultValue: false,
    },
  }
}

export default meta;

const Template = (args: SubscriptionsItemProps) => <SubscriptionsItem {...args} />

export const Default = Template.bind({});
