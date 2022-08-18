import React from 'react';
import { Meta } from '@storybook/react';
import NavMenu from '../../components/NavMenu/NavMenu';

const meta: Meta = {
    title: 'NavMenu',
    component: NavMenu,
}

export default meta;

const Template = () => <NavMenu />

export const Default = Template.bind({});
