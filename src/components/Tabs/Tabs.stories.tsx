import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Tabs, { TabsProps, Tab } from './Tabs';

const meta: Meta<TabsProps> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: `
### Tabs Component

A responsive and accessible tabs component supporting keyboard navigation, theming, and multiple variants.

**Accessibility:**
- Uses \`role="tablist"\`, \`role="tab"\`, and \`role="tabpanel"\`.
- Keyboard navigation with arrow keys and tab key.
- Proper ARIA attributes for selected and focus states.

**Theming:**
- Supports light and dark themes via TailwindCSS classes.

**Best Practices:**
- Use clear and concise tab labels.
- Avoid too many tabs to maintain usability.
- Ensure tab content is meaningful and accessible.
        `,
      },
    },
  },
};

export default meta;

const Template: StoryFn<TabsProps> = (args) => {
  const [selectedId, setSelectedId] = useState<string>(args.selectedId || (args.tabs.length > 0 ? args.tabs[0].id : ''));

  return (
    <Tabs
      {...args}
      selectedId={selectedId}
      onSelect={(id) => setSelectedId(id)}
    />
  );
};

const tabItems: Tab[] = [
  { id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
  { id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
  { id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3', disabled: true },
];

export const Default = Template.bind({});
Default.args = {
  tabs: tabItems,
  selectedId: 'tab1',
};
