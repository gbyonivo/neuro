# Neuro

A modern web application built with Next.js 15, React 19, and TypeScript, featuring a robust frontend architecture and integration with the Neurolabs API.

## Features

- 🚀 Next.js 15 with App Router
- ⚡ React 19 with modern features
- 🔥 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 📦 Redux Toolkit for state management
- 🔄 Axios for API communication
- 🎯 ESLint for code quality
- 📱 Responsive design with Headless UI components
- 🔔 Toast notifications with react-toastify
- 📅 Date handling with date-fns
- 🕵🏾‍♂️ Yup for validation
- 🫀 Jest for Test / cool icon for Jest eh?!

## Prerequisites

- Node.js (Latest LTS version recommended)
- Yarn package manager

## Getting Started

1. Clone the repository:

```bash
git clone [repository-url]
cd neuro
```

2. Install dependencies:

```bash
yarn
```

3. Start the development server:

```bash
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/          # Next.js app router pages
├── components/   # Reusable React components
├── context/      # React context providers
├── hooks/        # Custom React hooks
├── lib/          # Utility libraries and configurations
├── types/        # TypeScript type definitions
└── utils/        # Helper functions and utilities
```

## Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build the application for production
- `yarn start` - Start the production server
- `yarn lint` - Run ESLint for code quality checks
- `yarn test` - Test Code

## API Integration

The application is configured to proxy requests to the Neurolabs API staging environment. The proxy configuration can be found in `package.json`.

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the terms of the license included in the repository.
