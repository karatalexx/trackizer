import React from 'react';
import { Meta } from '@storybook/react';
import HalfCircleProgressBar from '../../components/HalfCircleProgressBar/HalfCircleProgressBar';
import { HalfCircleProgressBarProps } from '../../components/HalfCircleProgressBar/type';

const meta: Meta = {
    title: 'HalfCircleProgressBar',
    component: HalfCircleProgressBar,
    argTypes: {
        onChange: { action: 'typed' },
        limitValue: {
            defaultValue: 2000,
            control: 'number',
        },
    }
}

export default meta;

const Template = (args: HalfCircleProgressBarProps) => <HalfCircleProgressBar {...args} />

export const Default = Template.bind({});
