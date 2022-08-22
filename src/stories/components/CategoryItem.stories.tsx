import React from 'react';
import { Meta } from '@storybook/react';
import CategoryItem, { CategoryItemProps } from '../../components/CategoryItem/CategoryItem';

const meta: Meta = {
  title: 'CategoryItem',
  component: CategoryItem,
  argTypes: {
    name: {
      defaultValue: 'Auto & Transport',
    },
    limitValue: {
      defaultValue: 400,
      control: 'number',
    },
    currentValue: {
      defaultValue: 150,
      control: 'number',
    },
    color: {
      defaultValue: '#00FAD9',
    },
  },
}

export default meta;

const Template = (args: CategoryItemProps) => <CategoryItem {...args} />

export const Default = Template.bind({});
