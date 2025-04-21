import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Tooltip, { TooltipProps } from './Tooltip';

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: `
### Tooltip Component

A simple and accessible tooltip component supporting different placements and delay.

**Accessibility:**
- Uses \`role="tooltip"\` and \`aria-describedby\` for screen readers.
- Keyboard accessible via focus and Escape key to dismiss.
- Proper focus management and hover/focus triggers.

**Theming:**
- Supports light and dark themes via TailwindCSS classes.

**Best Practices:**
- Use concise and clear tooltip content.
- Avoid overly long tooltips.
- Use appropriate delay to avoid flickering.
        `,
      },
    },
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: { control: 'number' },
    className: { control: 'text' },
  },
};

export default meta;

const Template: StoryFn<TooltipProps> = (args) => (
  <div style={{ padding: '100px', textAlign: 'center' }}>
    <Tooltip {...args}>
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Hover me</button>
    </Tooltip>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  content: 'This is a tooltip',
  placement: 'top',
  delay: 300,
};
