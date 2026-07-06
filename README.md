# sumantakabiraj.com

Astro + React island terminal-themed portfolio, deployed as a static site on Cloudflare Pages.

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build   # outputs to dist/
pnpm preview # preview the production build locally
```

## Deploy (Cloudflare Pages)

1. In the Cloudflare dashboard, create a Pages project connected to this GitHub repo.
2. Build command: `pnpm build`
3. Output directory: `dist`
4. No environment variables or adapter needed — this is a fully static build.
