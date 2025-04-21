import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import SidebarNavigation, { SidebarNavigationProps, NavItem } from './SidebarNavigation';

const meta: Meta<SidebarNavigationProps> = {
  title: 'Components/SidebarNavigation',
  component: SidebarNavigation,
  parameters: {
    docs: {
      description: {
        component: `
### Sidebar Navigation Component

A collapsible sidebar navigation component supporting nested items, keyboard navigation, and theming.

**Accessibility:**
- Uses \`role="tree"\` and \`role="treeitem"\` for nested navigation.
- Supports keyboard navigation with Enter/Space to select or expand items.
- Proper ARIA attributes for expanded/collapsed states.

**Theming:**
- Supports light and dark themes via TailwindCSS classes.

**Best Practices:**
- Use clear labels and icons for navigation items.
- Avoid deeply nested menus for better usability.
- Indicate disabled items visually and functionally.
        `,
      },
    },
  },
};

export default meta;

const Template: StoryFn<SidebarNavigationProps> = (args) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  return (
    <SidebarNavigation
      {...args}
      selectedId={selectedId}
      onSelect={(id) => setSelectedId(id)}
    />
  );
};

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
  },
  {
    id: 'projects',
    label: 'Projects',
    children: [
      { id: 'project1', label: 'Project 1' },
      { id: 'project2', label: 'Project 2', disabled: true },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
  },
];

export const Default = Template.bind({});
Default.args = {
  items: navItems,
  collapsed: false,
};
