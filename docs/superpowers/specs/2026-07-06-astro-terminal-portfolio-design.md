# Astro Terminal Portfolio — Redesign & Migration

## Goal

Replace the current Next.js "magicui" resume-style homepage with the terminal-themed design prototyped in `content/Portfolio.dc.html`, and migrate the whole site from Next.js to Astro so it can deploy as a static site on Cloudflare Pages. Keep the existing blog, ported to Astro content collections.

## Non-goals

- No new content/copy — reuse what's in `Portfolio.dc.html` for the homepage and the existing `content/*.mdx` for blog posts.
- No CMS, no server-rendered routes, no contact form backend (contact stays a link out to Twitter DM, per the mockup).
- No visual redesign beyond what the mockup already specifies.

## Architecture

Static Astro site, zero server runtime. Cloudflare Pages serves the built `dist/` directory directly — no `@astrojs/cloudflare` adapter, no Workers, no SSR.

```
astro.config.mjs          — output: 'static', @astrojs/react integration
src/
  layouts/Base.astro       — <html>, JetBrains Mono font link, meta tags
  pages/index.astro        — renders <Portfolio client:load />
  pages/blog/index.astro   — lists posts from the blog content collection
  pages/blog/[slug].astro  — renders one post via getStaticPaths + <Content />
  content.config.ts        — defines the `blog` collection (glob loader over src/content/blog)
  content/blog/*.mdx       — moved from content/*.mdx
  components/Portfolio.tsx — the ported DC component (see below)
public/                    — carried over as-is (images, resume PDFs, favicon)
```

## Homepage: Portfolio.tsx

The `content/Portfolio.dc.html` prototype is a `DCLogic`-based component with local state (`view`, `theme`, `cmd`, `proj`, `input`, `error`, `openN`, `hint`) and a `renderVals()` that derives all display data. Port this directly into a plain React function component using `useState`, mounted as a single Astro island with `client:load` (the whole component is interactive from first paint — terminal input, theme toggle, project cards — so no benefit to a lazier hydration strategy here).

- All embedded data (profile stats, experience, education, skills, skill groups, projects, menu, help list) moves into the component as plain arrays/objects, unchanged from the mockup.
- Styling stays inline exactly as in the mockup (CSS custom properties for theme, inline `style` attributes) — it has zero Tailwind dependency, so this skips reintroducing Tailwind for a single component.
- The `<style>` block in the mockup's `<helmet>` (keyframes, `.cursor`, `.mi`, `.lnk`, `.chip`, `.pcard`, scrollbar, responsive rules) moves into a `<style is:global>` in `Base.astro` or a scoped `<style>` in `index.astro`.
- Theme (`data-theme="dark"|"light"`) is applied to the wrapping div exactly as the mockup does — no `next-themes`, no system-theme detection beyond what the mockup already implements (manual toggle only).

## Blog

Replace the current MDX pipeline (`gray-matter`, `unified`, `remark-parse`, `remark-gfm`, `remark-rehype`, `rehype-stringify`, `rehype-pretty-code`, `react-markdown`) with Astro's built-in content collections and native MDX rendering:

- `content.config.ts` defines a `blog` collection using the glob loader over `src/content/blog/**/*.mdx`.
- `src/pages/blog/index.astro` calls `getCollection('blog')`, sorts by date, renders a simple list (title, date, link) styled to match the terminal aesthetic (monospace, green/amber accents) so it doesn't visually clash with the new homepage.
- `src/pages/blog/[slug].astro` uses `getStaticPaths` from the collection and renders `<Content />` from `entry.render()`.
- `content/hello-world.mdx` moves to `src/content/blog/hello-world.mdx` as-is; its existing frontmatter (`title`, `publishedAt`, `summary`) becomes the collection schema — no renaming needed.

## Dependencies

**Drop:** all `@radix-ui/*`, `framer-motion`, `next-themes`, `cmdk`, `embla-carousel-react`, `recharts`, `react-hook-form` + `@hookform/resolvers` + `zod`, `sonner`, `vaul`, `react-day-picker`, `input-otp`, `class-variance-authority`, `tailwind-merge`, `clsx`, `lucide-react`, `react-resizable-panels`, `gray-matter`, `react-markdown`, `rehype-*`, `remark-*`, `unified`. None are used by the new homepage or the Astro-native blog. Also drop `src/components/ui/*`, `src/components/magicui/*`, `src/components/mdx.tsx`, `src/components/navbar.tsx`, `src/components/mode-toggle.tsx`, `src/components/hackathon-card.tsx`, `src/components/resume-card.tsx`, `src/components/icons.tsx`, `src/data/resume.tsx`, `src/hooks/use-mobile.ts` — all superseded by `Portfolio.tsx`.

**Add:** `astro`, `@astrojs/react`, `@astrojs/mdx`, `@types/react`, `@types/react-dom` (keep `react`/`react-dom` already present).

**Remove:** `next`, `next-themes`, `eslint-config-next`, `tailwindcss` + `@tailwindcss/postcss` (no Tailwind usage remains), `postcss.config.mjs`.

## Deployment

Cloudflare Pages, connected to the GitHub repo:
- Build command: `astro build`
- Output directory: `dist`
- No environment variables, no adapter config needed (pure static output).
- `wrangler.toml` is optional — only add it if the user wants `wrangler pages deploy` from the CLI instead of the dashboard Git integration. Default to dashboard integration (fewer moving parts).

## Testing / verification

- `astro build` completes with no errors.
- Manually click through the deployed/previewed site: theme toggle, terminal ⇄ simple view switch, typing each command (`about`, `experience`, `education`, `skills`, `projects`, `contact`, `help`, `theme`, `terminal`, `simple`) in both views, expanding/collapsing project cards in terminal view, opening a project detail in simple view.
- Blog: `/blog` lists the existing post, `/blog/hello-world` renders it.
- No leftover references to removed Next.js/Radix/magicui files (grep for old import paths).
