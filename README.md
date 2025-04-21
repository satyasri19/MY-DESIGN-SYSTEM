# Design System

This project is a scalable, reusable design system built with React, TypeScript, and TailwindCSS. It includes a token-based color system, data display components, navigation components, and comprehensive Storybook documentation.

## Components

- **Color System**: Token-based colors supporting primary, secondary, tertiary, neutral, semantic colors, surface/background layers, and light/dark themes.
- **Data Display Components**:
  - Table (with sorting and filtering)
  - Tooltip
- **Navigation Components**:
  - Sidebar Navigation (with collapse/expand)
  - Tabs

## Tech Stack

- React
- TypeScript
- TailwindCSS
- Storybook

## Features

- Accessibility compliant components with ARIA roles and keyboard navigation.
- Theming support with light and dark modes.
- Responsive design for various screen sizes.
- Storybook documentation with usage examples, states, variants, and accessibility notes.

## Getting Started

### Installation

```bash
npm install
```

### Running Storybook

```bash
npm start
```

Open [http://localhost:6006](http://localhost:6006) to view the components in Storybook.

### Building Storybook for Deployment

```bash
npm run build
```

The static Storybook files will be generated in the `storybook-static` folder.

## Deployment

You can deploy the Storybook static files to platforms like Vercel or Chromatic for sharing and review.

## Folder Structure

```
src/
  colors/               # Color tokens and theme configuration
  components/
    Table/              # Table component and stories
    Tooltip/            # Tooltip component and stories
    SidebarNavigation/  # Sidebar navigation component and stories
    Tabs/               # Tabs component and stories
```

## Contributing

Contributions are welcome. Please follow the existing code style and ensure accessibility and responsiveness in new components.

## License

This project is licensed under the MIT License.
