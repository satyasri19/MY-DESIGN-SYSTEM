import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Table, { TableProps } from './Table';

interface Person {
  id: number;
  name: string;
  age: number;
  email: string;
}

const meta: Meta<TableProps<Person>> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: `
### Table Component

A flexible and accessible data table component supporting sorting, filtering, and theming.

**Accessibility:**
- Uses proper \`aria-sort\` attributes on sortable headers.
- Keyboard accessible sorting via Enter/Space keys.
- Clear focus styles for interactive elements.

**Theming:**
- Supports light and dark themes via TailwindCSS classes.
- Responsive and scrollable for smaller screens.

**Best Practices:**
- Provide unique keys for rows.
- Use appropriate column widths for better layout.
- Use filterable and sortable props to enhance UX.
        `,
      },
    },
  },
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;

const Template: StoryFn<TableProps<Person>> = (args) => <Table {...args} />;

const sampleData: Person[] = [
  { id: 1, name: 'Alice', age: 30, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 25, email: 'bob@example.com' },
  { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
  { id: 4, name: 'Diana', age: 28, email: 'diana@example.com' },
];

export const Default = Template.bind({});
Default.args = {
  columns: [
    { key: 'id', header: 'ID', sortable: true, filterable: true, width: 50 },
    { key: 'name', header: 'Name', sortable: true, filterable: true },
    { key: 'age', header: 'Age', sortable: true, filterable: true, width: 80 },
    { key: 'email', header: 'Email', sortable: false, filterable: true },
  ],
  data: sampleData,
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  columns: Default.args.columns,
  data: [],
};
EmptyState.parameters = {
  docs: {
    description: {
      story: 'Displays a message when no data is available.',
    },
  },
};

export const LargeDataSet = Template.bind({});
LargeDataSet.args = {
  columns: Default.args.columns,
  data: Array.from({ length: 100 }).map((_, i) => ({
    id: i + 1,
    name: 'User ' + (i + 1),
    age: 20 + (i % 30),
    email: 'user' + (i + 1) + '@example.com',
  })),
};
LargeDataSet.parameters = {
  docs: {
    description: {
      story: 'Demonstrates performance and scroll behavior with large data sets.',
    },
  },
};
