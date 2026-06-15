# RentX

RentX is a `Next.js 15` app for exploring U.S. cost-of-living data across cities and states.

## Stack

- Framework: `Next.js`
- Language: `TypeScript`
- Styling: `Tailwind CSS`
- Package manager: `npm`

## Scripts

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`

## Environment variables

Create a local env file from `.env.example` when you want to override the production site URL used for SEO metadata.

```bash
cp .env.example .env.local
```

Available variables:

- `NEXT_PUBLIC_SITE_URL` - public site URL such as `https://your-domain.com`
- `NEXT_PUBLIC_ADSENSE_CLIENT` - AdSense publisher ID (default: `ca-pub-3635656048122177`)
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - Google Search Console site verification token (optional)

## AdSense & ads.txt
The root of the domain serves the required AdSense publisher authorization file at `public/ads.txt`. The publisher ID defined in `public/ads.txt` must match the `NEXT_PUBLIC_ADSENSE_CLIENT` environment variable and the active AdSense account to ensure correct ad delivery.

## Google Search Console Verification
To verify ownership in Google Search Console via HTML meta tag, add your verification token to the `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` environment variable. The layout metadata system will dynamically render `<meta name="google-site-verification" content="TOKEN" />` in the HTML output.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Netlify

This repo already includes `netlify.toml` with the Next.js Netlify plugin enabled.

- Build command: `npm run build`
- Publish directory: `.next`