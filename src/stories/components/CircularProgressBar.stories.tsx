import React from 'react';
import { Meta } from '@storybook/react';
import CircularProgressBar, { CircularProgressBarProps } from '../../components/CircularProgressBar/CircularProgressBar';

const meta: Meta = {
    title: 'CircularProgressBar',
    component: CircularProgressBar,
    argTypes: {
        onClick: { action: 'clicked' },
        currentValue: {
            defaultValue: 1235,
            control: 'number',
        },
        limitValue: {
            defaultValue: 2000,
            control: 'number',
        },
        buttonText: {
            defaultValue: 'Some text',
            control: 'text',
        },
    }
}

export default meta;

const Template = (args: CircularProgressBarProps) => <CircularProgressBar {...args} />

export const Default = Template.bind({});
