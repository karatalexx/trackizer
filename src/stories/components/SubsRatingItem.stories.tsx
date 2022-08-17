import React from 'react';
import { Meta } from '@storybook/react';
import SubsRatingItem, { SubsRatingItemProps } from '../../components/SubsRatingItem/SubsRatingItem';

const meta: Meta = {
  title: 'SubsRatingItem',
  component: SubsRatingItem,
  argTypes: {
    onClick: { action: 'clicked' },
    value: {
      defaultValue: '$12.99',
      control: 'text',
    },
    title: {
      defaultValue: 'Your title',
      control: 'text',
    },
    color: {
      defaultValue: 'rgba(255, 166, 153, 1)',
    },
  },
}

export default meta;

const Template = (args: SubsRatingItemProps) => <SubsRatingItem {...args} />

export const Default = Template.bind({});
