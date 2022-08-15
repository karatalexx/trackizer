import React from 'react';
import { Meta } from '@storybook/react';
import PasswordStrengthMeter, { PasswordStrengthMeterProps } from '../../components/PasswordStrengthMeter/PasswordStrengthMeter';

const meta: Meta = {
    title: 'PasswordStrengthMeter',
    component: PasswordStrengthMeter,
    argTypes: {
        password: {
            defaultValue: '',
            control: 'text',
        },
    }
}

export default meta;

const Template = (args: PasswordStrengthMeterProps) => <PasswordStrengthMeter {...args} />

export const Default = Template.bind({});
