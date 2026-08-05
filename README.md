# Rafi Portfolio

Personal portfolio website built with Next.js, Tailwind CSS v4, and Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact Form

The `/api/contact` route sends messages via [Resend](https://resend.com). Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` for the form to deliver.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run gh:sync` — refresh `lib/github-snapshot.json` from the GitHub API
