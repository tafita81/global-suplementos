# 🚀 Global Supplements - Installation Guide

## 📋 Requirements

- Node.js 18+ 
- npm or yarn
- RapidAPI account (for real Amazon product data)

## ⚡ Quick Start

### 1. Install Dependencies

```bash
cd projeto-copia
npm install
```

### 2. Configure API Keys

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your RapidAPI key:

```env
VITE_RAPIDAPI_KEY_1=your_rapidapi_key_here
```

**Get your RapidAPI key:**
1. Go to: https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-amazon-data
2. Subscribe to BASIC plan ($9.99/month)
3. Copy your API key
4. Paste it in the `.env` file

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 4. Build for Production

```bash
npm run build
```

The production files will be in the `dist/` folder.

## 🌍 Amazon Affiliate Setup

Your Amazon affiliate tag is configured as: **globalsupleme-20**

To change it, edit `projeto-copia/src/config/amazonMarketplaces.ts`

## 🌐 Supported Countries

The site automatically detects user location and shows products from:
- 🇺🇸 USA (amazon.com)
- 🇬🇧 UK (amazon.co.uk)
- 🇩🇪 Germany (amazon.de)
- 🇫🇷 France (amazon.fr)
- 🇮🇹 Italy (amazon.it)
- 🇪🇸 Spain (amazon.es)
- 🇨🇦 Canada (amazon.ca)
- 🇯🇵 Japan (amazon.co.jp)
- 🇦🇺 Australia (amazon.com.au)
- 🇳🇱 Netherlands (amazon.nl)
- 🇸🇪 Sweden (amazon.se)
- 🇸🇬 Singapore (amazon.sg)
- 🇵🇱 Poland (amazon.pl)
- 🇸🇦 Saudi Arabia (amazon.sa)

## 📦 Deployment

### Deploy to Hostinger (via FTP)

1. Configure FTP credentials in `.env`:
```env
HOSTINGER_FTP_HOST=ftp.yourdomain.com
HOSTINGER_FTP_USER=your_username
HOSTINGER_FTP_PASSWORD=your_password
```

2. Run deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

### Deploy to Other Platforms

The `dist/` folder can be deployed to:
- Vercel
- Netlify
- AWS S3
- Cloudflare Pages
- Any static hosting service

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Components:** shadcn/ui + Radix UI
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Data Fetching:** TanStack Query
- **API:** RapidAPI Amazon Data

## 📝 Notes

- The site works WITHOUT API keys (uses demo products)
- Real-time Amazon products require paid RapidAPI subscription
- All affiliate links use Amazon OneLink for international tracking
- Products automatically show in local currency

## 💰 Start Earning

1. Share your website link
2. Drive traffic via social media, ads, SEO
3. Earn 1-10% commission on Amazon purchases
4. Track earnings in Amazon Associates dashboard

## 🆘 Support

For issues or questions, check:
- RapidAPI documentation: https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-amazon-data
- Amazon Associates: https://affiliate-program.amazon.com/

---

**Ready to launch!** 🎉
