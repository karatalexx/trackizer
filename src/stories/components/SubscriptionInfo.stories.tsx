import React from 'react';
import { Meta } from '@storybook/react';
import SubscriptionInfo from 'components/SubscriptionInfo/SubscriptionInfo';
import { SubscriptionInfoProps } from 'components/SubscriptionInfo/type';

const mockData = {
  name: 'Spotify',
  price: 5.99,
  description: 'Music',
  category: {
    current: 'Music app',
    categoryList: ['Music app', 'Business app', 'Games'],
  },
  firstPayment: '2021-12-17T03:24:00',
  reminder: {
    current: 'Never',
    reminderList: ['Never', 'Every month', 'Every year'],
  },
  currency: {
    current: 'USD',
    currencyList: ['USD', 'EURO', 'UAH'],
  },
}

const meta: Meta = {
  title: 'SubscriptionInfo',
  component: SubscriptionInfo,
  argTypes: {
    name: {
      defaultValue: 'Spotify',
      control: 'text',
    },
    price: {
      defaultValue: 5.99,
      control: 'number',
    },
    description: {
      defaultValue: 'Music',
      control: 'text',
    },
    firstPayment: {
      defaultValue: '2021-12-17T03:24:00',
      control: 'date',
    },
    onSubmit: { action: 'submit' },
    onDelete: { action: 'delete' },
    onDownArrowClick: { action: 'down arrow click' },
  }
}

export default meta;

const Template = (args: SubscriptionInfoProps) => <SubscriptionInfo
  {...args}
  category={mockData.category}
  currency={mockData.currency}
  reminder={mockData.reminder}
/>

export const Default = Template.bind({});
