# PashuGyan

PashuGyan is a Next.js 14 web app for Indian livestock breed detection and education. It includes:

- AI-powered breed detection
- A searchable cattle and buffalo breed database
- A farmer dashboard with saved scan history
- Marketing/help pages rebuilt from Stitch designs

## Stack

- Next.js 14
- React 18
- Tailwind CSS
- Zustand for local scan history
- Optional Clerk auth
- Optional Supabase integration

## Run locally

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Production launch

```powershell
npm install
Copy-Item .env.example .env.production.local
npm run build
npm run start -- --hostname 0.0.0.0 --port 3000
```

## Environment variables

`NEXT_PUBLIC_SITE_URL`

- Public base URL used for metadata and sitemap.

`ML_API_URL` or `NEXT_PUBLIC_ML_API_URL`

- Optional override for the live breed-classification backend.
- If unset, the app uses the current Hugging Face Space default.

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

- Optional. Enables live Clerk sign-in/sign-up.
- If omitted, auth pages fall back to a safe setup-pending state.

`NEXT_PUBLIC_SUPABASE_URL`
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
`NEXT_PUBLIC_SUPABASE_ANON_KEY`

- Optional. Enables Supabase-backed features where configured.
- The app accepts either `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or the older
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` name for Vercel and legacy setups.

## Quality checks

```powershell
npm run lint
npm run typecheck
npm run build
```
