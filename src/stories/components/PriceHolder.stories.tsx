import React from 'react';
import { Meta } from '@storybook/react';
import PriceHolder, { PriceHolderProps } from '../../components/PriceHolder/PriceHolder';

const meta: Meta = {
  title: 'PriceHolder',
  component: PriceHolder,
  argTypes: {
    onChange: { action: 'scrolled' },
    price: {
      defaultValue: 5.99,
      control: 'number',
    },
  }
}

export default meta;

const Template = (args: PriceHolderProps) => <PriceHolder {...args} />

export const Default = Template.bind({});
