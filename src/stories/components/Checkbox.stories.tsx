import React from 'react';
import { Meta } from '@storybook/react';
import Checkbox, { CheckboxProps } from '../../components/Checkbox/Checkbox';

const meta: Meta = {
    title: 'Checkbox',
    component: Checkbox,
    argTypes: {
        onChange: { action: 'clicked' },
        checked: {
            defaultValue: false,
        },
        label: {
            defaultValue: 'Your label',
            control: 'text',
        },
    }
}

export default meta;

const Template = (args: CheckboxProps) => <Checkbox {...args} />

export const Default = Template.bind({});
