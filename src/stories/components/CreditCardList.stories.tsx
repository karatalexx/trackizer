import React from 'react';
import { Meta } from '@storybook/react';
import CreditCardList, { CreditCardListProps } from 'components/CreditCardList/CreditCardList';

const mockCardsList = [
  {cardNum: 2169, expDate: '2025-09-17T03:24:00', firstName: 'John', lastName: 'Doe', id: 1},
  {cardNum: 7777, expDate: '2026-09-17T03:24:00', firstName: 'Harry', lastName: 'Doe', id: 2},
  {cardNum: 2220, expDate: '2027-09-17T03:24:00', firstName: 'Ron', lastName: 'Doe', id: 3},
];

const meta: Meta = {
  title: 'CreditCardList',
  component: CreditCardList,
  argTypes: {
    list: {
      defaultValue: mockCardsList,
    },
  }
}

export default meta;

const Template = (args: CreditCardListProps) => <CreditCardList {...args} />

export const Default = Template.bind({});
