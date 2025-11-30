# Frontend - Product Upload System

A modern React/Next.js frontend with organized folder structure for maintainability and scalability.

## 📁 Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   ├── forms/          # Form-related components
│   ├── layout/         # Layout components (Header, Container)
│   └── product/        # Product-specific components
├── types/              # TypeScript type definitions
├── api/                # API client and service functions
├── utils/              # Utility functions (validation, helpers)
├── hooks/              # Custom React hooks
└── __tests__/          # Test files
```

## 🧩 Component Organization

### UI Components (`components/ui/`)
- **Button**: Reusable button with variants and loading states
- **Input**: Form input with error handling
- **ProgressBar**: Progress indicator for uploads

### Form Components (`components/forms/`)
- **ProductForm**: Product data input form
- **FileUpload**: File selection component

### Product Components (`components/product/`)
- **ProductCard**: Individual product display
- **ProductGrid**: Product collection with loading states
- **ProductUpload**: Complete upload workflow
- **Pagination**: Navigation for product pages

### Layout Components (`components/layout/`)
- **Header**: Application header
- **Container**: Consistent page container

## 🔧 API Layer (`api/`)
- **client.ts**: HTTP client with upload progress support
- **products.ts**: Product-specific API functions

## 📝 Types (`types/`)
- **product.ts**: Product-related interfaces
- **api.ts**: API response interfaces

## 🛠 Utils (`utils/`)
- **validation.ts**: Form and file validation functions

## 🎣 Hooks (`hooks/`)
- **useProducts**: Product data management
- **useUpload**: Upload functionality with progress

## 🧪 Testing (`__tests__/`)
- Unit tests for components and utilities
- Jest + React Testing Library setup

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage
npm run test:coverage
```

## 📋 Features

- **Type Safety**: Full TypeScript support
- **Component Reusability**: Modular component design
- **Error Handling**: Comprehensive validation and error states
- **Loading States**: Progress indicators and loading animations
- **Responsive Design**: Mobile-first responsive layout
- **Testing**: Unit tests for critical functionality
- **Path Aliases**: Clean imports with `@/` prefix

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional interface
- **Animations**: Smooth transitions and hover effects