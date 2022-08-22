import React from 'react';
import { Meta } from '@storybook/react';
import Button, { ButtonProps } from '../../components/Button/Button';

const meta: Meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      defaultValue: 'coral',
    },
    children: {
      defaultValue: 'Click me',
      control: 'text',
      },
    }
}

export default meta;

const Template = (args: ButtonProps) => <Button {...args} />

export const Default = Template.bind({});
