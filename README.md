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

Available variable:

- `NEXT_PUBLIC_SITE_URL` - public site URL such as `https://your-domain.com`

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