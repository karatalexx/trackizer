import React from 'react';
import { Meta } from '@storybook/react';
import Logo, { LogoProps } from '../../components/Logo/Logo';

const meta: Meta = {
    title: 'Logo',
    component: Logo,
}

export default meta;

const Template = (args: LogoProps) => <Logo {...args} />

export const Default = Template.bind({});
