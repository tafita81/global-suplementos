# Global Supplements

## Overview

Global Supplements is a premium supplements platform connecting governments, enterprises, and consumers through advanced technology. Built with modern web technologies, it provides real-time product data from Amazon via RapidAPI integration, featuring a comprehensive catalog of health and wellness products with automated affiliate linking.

## Features

- **Dual Data Strategy**: Premium curated product database (300+ products) with fallback to demo data when API limits are reached
- **Real-Time Amazon Integration**: Live product search via RapidAPI (Real-Time Amazon Data API) with automatic data parsing
- **Amazon Affiliate Program**: Automated affiliate link generation with tag `globalsupleme-20` for all products
- **Internationalization (i18n)**: Multi-language support (currently English/Portuguese) with react-i18next
- **Advanced Routing**: React Router v6 implementation with protected routes and dynamic category navigation
- **Modern UI Stack**: 
  - React 18 with TypeScript
  - Tailwind CSS for styling
  - shadcn/ui component library
  - Lucide React icons
- **State Management**: TanStack Query (React Query) for efficient data fetching and caching
- **Responsive Design**: Mobile-first approach with responsive layouts across all device sizes

## Architecture Overview

### Project Structure

```
src/
├── components/          # Reusable UI components
├── data/               # Static product data (premiumProducts.ts)
├── i18n/               # Internationalization configuration
├── layouts/            # Page layout components
├── pages/              # Route-based page components
├── services/           # API clients and services
│   └── rapidAPIClient.ts  # Multi-API client with fallback
└── lib/                # Utility functions
```

### Main Services

**MultiAPIClient** (`src/services/rapidAPIClient.ts`):
- Handles RapidAPI integration for Real-Time Amazon Data
- Implements request counting and API rotation
- Automatic fallback to demo data when limits are reached
- Category-based keyword mapping for intelligent product search
- Configurable request limits (10,000 requests per API key)

### Internationalization

The application uses `react-i18next` for multi-language support. Translation files are located in `src/i18n/` with language-specific JSON files for UI strings.

### Layouts

Two main layout components:
- **MainLayout**: Standard layout with header, navigation, and footer
- **ProductLayout**: Specialized layout for product catalog pages

## Setup Instructions

### Requirements

- Node.js 18+ or Bun
- npm, yarn, or bun package manager
- RapidAPI key for Real-Time Amazon Data API (optional, falls back to demo data)

### Environment Variables

Create a `.env` file in the root directory (see `.env.example`):

```bash
# RapidAPI Configuration
VITE_RAPIDAPI_KEY_1=your_rapidapi_key_here

# Optional: Additional API keys for rotation
VITE_RAPIDAPI_KEY_2=your_second_key
VITE_RAPIDAPI_KEY_3=your_third_key
```

### Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### Available Scripts

```bash
# Development server (port 5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Deployment

### Vercel (Recommended)

1. Import the repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in site settings

### Static Hosting

The production build generates static files in the `dist/` folder that can be hosted on any static hosting service (AWS S3, GitHub Pages, Firebase Hosting, etc.).

### Environment Variables for Deployment

Ensure the following environment variables are set in your deployment platform:

- `VITE_RAPIDAPI_KEY_1`: Primary RapidAPI key
- Additional API keys (optional): `VITE_RAPIDAPI_KEY_2`, `VITE_RAPIDAPI_KEY_3`

## Roadmap

### Planned Features

- **B2B/B2G Integrations**: 
  - Bulk ordering system for businesses
  - Government procurement portal
  - Enterprise account management
  
- **Backend Services**:
  - Supabase integration for user authentication
  - PostgreSQL database for order management
  - User profiles and order history
  
- **Payment Processing**:
  - Stripe integration for secure payments
  - Multiple currency support
  - Subscription management
  
- **Logistics Integration**:
  - DHL API integration for international shipping
  - FedEx tracking and fulfillment
  - Real-time shipping estimates
  
- **Compliance & Certifications**:
  - FDA compliance tracking
  - GMP certification verification
  - International regulatory compliance (EU, ANVISA)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## License

Global Supplements © 2024. All rights reserved.

This project is proprietary software. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without express written permission from the copyright holder.
