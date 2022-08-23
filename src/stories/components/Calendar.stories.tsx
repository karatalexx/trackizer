import React from 'react';
import { Meta } from '@storybook/react';
import Calendar, { CalendarProps } from '../../components/Calendar/Calendar';

const meta: Meta = {
    title: 'Calendar',
    component: Calendar,
    argTypes: {
        onClick: { action: 'clicked' },
    }
}

export default meta;

const Template = (args: CalendarProps) => <Calendar {...args} />

export const Default = Template.bind({});
