# Global Supplements

Global premium supplements platform connecting governments, businesses and consumers through advanced technology.

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

Production files will be in the `dist/` folder.

## Integrations & Environment Variables

This project supports integration with multiple external APIs for e-commerce, shipping, compliance, and payment processing. All integrations are implemented as placeholder clients with health checks that validate environment variable presence.

### Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure the API keys you need in `.env` (all keys are prefixed with `VITE_` for Vite environment variable support)

3. Never commit your `.env` file (it's already in `.gitignore`)

### Available Integrations

#### AI/ML APIs
- **OpenAI** - Content generation and embeddings
  - `VITE_OPENAI_API_KEY`
- **Google Gemini** - AI content generation
  - `VITE_GEMINI_API_KEY`

#### E-Commerce & Sourcing APIs
- **Alibaba** - Global B2B sourcing
  - `VITE_ALIBABA_APP_KEY`
  - `VITE_ALIBABA_APP_SECRET`
- **IndiaMart** - Indian B2B marketplace
  - `VITE_INDIAMART_API_KEY`
- **Global Sources** - Asian sourcing platform
  - `VITE_GS_API_KEY`
- **Amazon SP-API** - Amazon Selling Partner API
  - `VITE_AWS_ACCESS_KEY_ID`
  - `VITE_AWS_SECRET_ACCESS_KEY`
  - `VITE_LWA_CLIENT_ID`
  - `VITE_LWA_CLIENT_SECRET`
  - `VITE_SP_API_REFRESH_TOKEN`
  - `VITE_ROLE_ARN`
- **eBay** - eBay marketplace integration
  - `VITE_EBAY_APP_ID`
  - `VITE_EBAY_CLIENT_SECRET`

#### Shipping & Logistics APIs
- **DHL** - International shipping
  - `VITE_DHL_API_KEY`
- **FedEx** - Express shipping
  - `VITE_FEDEX_API_KEY`
  - `VITE_FEDEX_API_SECRET`
- **UPS** - Package delivery
  - `VITE_UPS_CLIENT_ID`
  - `VITE_UPS_CLIENT_SECRET`

#### Compliance & Regulatory APIs
- **Sanctions Screening** - Trade compliance
  - `VITE_SANCTIONS_API_KEY`
- **FDA** - Food and Drug Administration (public API, no key required)
  - https://open.fda.gov/

#### Payment & Financial APIs
- **Stripe** - Payment processing
  - `VITE_STRIPE_SECRET_KEY`
  - `VITE_STRIPE_WEBHOOK_SECRET`
- **Exchange Rate API** - Currency conversion
  - `VITE_EXCHANGE_RATE_API_KEY`
- **Wise (TransferWise)** - International transfers
  - `VITE_WISE_API_KEY`

### Security Best Practices

1. **Never commit API keys** - Always use environment variables
2. **Rotate keys regularly** - Especially after team member changes
3. **Use different keys for dev/staging/production**
4. **Limit key permissions** - Only grant necessary scopes
5. **Monitor API usage** - Set up alerts for unusual activity
6. **Use secrets management** - Consider using AWS Secrets Manager, HashiCorp Vault, or similar for production

### Implementation Status

All integration clients are currently placeholder implementations with:
- ✅ Environment variable health checks
- ✅ TypeScript interfaces and types
- ✅ TODO markers for actual API implementations
- 🔄 Actual API integrations (to be implemented)

### Vercel Deployment

When deploying to Vercel:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add all required `VITE_*` variables for your integrations
4. Deploy!

Note: Vercel automatically exposes `VITE_*` variables to the browser build. **Never** store sensitive keys that should only be server-side in `VITE_*` variables.

## Global Supplements © 2024

All rights reserved.
