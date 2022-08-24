import React from 'react';
import { Meta } from '@storybook/react';
import Input, { InputProps } from '../../components/Input/input';

const meta: Meta = {
  title: 'Input',
  component: Input,
  argTypes: {
    onChange: { action: 'typed' },
      value: {
        defaultValue: 'Some text',
        control: 'text',
      },
      label: {
        defaultValue: 'Your label',
        control: 'text',
      },
      isCentered: {
        defaultValue: false,
        control: 'boolean',
      }
    }
}

export default meta;

const Template = (args: InputProps) => <Input {...args} />

export const Default = Template.bind({});
