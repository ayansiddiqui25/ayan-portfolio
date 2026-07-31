# Pixel Portfolio FC

An interactive pixel-soccer portfolio where every penalty corner opens a
different part of the story.

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local address shown in the terminal. The site is a standard source
project, so you can open this folder directly in VS Code.

## Customize

Replace the sample name and introduction in
`app/components/PenaltyPortfolio.tsx`. Portfolio page content lives in
`app/portfolio-data.ts`, organized under `about`, `experience`, `projects`, and
`hobbies`.

The four penalty targets and routes are configured in the `routes` array in
`app/components/PenaltyPortfolio.tsx`.

## Deploy

Commit the project to a GitHub repository, then import that repository into
Vercel. The included `vercel.json` selects the standard Next.js production
build automatically.

To verify both supported deployment targets locally:

```bash
npm run build
npm run build:vercel
```
