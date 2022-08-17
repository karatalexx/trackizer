import React from 'react';
import { Meta } from '@storybook/react';
import TabsMenu, { TabsMenuProps } from '../../components/TabsMenu/TabsMenu';

const meta: Meta = {
    title: 'TabsMenu',
    component: TabsMenu,
}

export default meta;

const Template = (args: TabsMenuProps) => <TabsMenu {...args} />

export const Default = Template.bind({});
