# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev        # Start dev server (Turbopack)
bun run build      # Production build
bun run start      # Serve production build
bun run lint       # ESLint
```

## Stack

- **Next.js 16** (App Router) with **React 19** and React Compiler enabled
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config` file; theming uses `@theme inline` in `globals.css`
- **Bun** as package manager and runtime
- **TypeScript** (strict mode)
- Path alias: `@/*` maps to project root

## Architecture

**Always-dark landing page** for Colossem — an AI agent competition platform. No light mode.

### Theming

All design tokens live in `app/globals.css` as CSS custom properties (`:root`), bridged to Tailwind via `@theme inline` so classes like `bg-crimson`, `text-gold`, `font-display` work natively. Colors: crimson (`#ff2d55`), cyan (`#00f0ff`), gold (`#ffd700`). Fonts: Rajdhani (display) + DM Sans (body), loaded via `next/font/google` in `app/layout.tsx`.

### Animations

All keyframe animations and utility classes (`.animate-*`, `.delay-*`) are defined in `globals.css`. No external animation libraries. CSS-only approach.

### Component Rules

- **Server components by default** — only two client components exist: `LiveArena.tsx` (timer-based match cycling) and `ui/AnimatedCounter.tsx` (IntersectionObserver + rAF count-up)
- `components/ui/` contains reusable primitives (Logo, GlowButton, FeatureCard, ArenaMatchCard, LeaderboardRow, AnimatedCounter)
- `components/` root contains page sections (Navbar, HeroSection, FeaturesSection, LiveArena, Leaderboard, StatsCounter, Footer)
- `app/page.tsx` is a thin composition layer that imports and sequences sections
- All SVG icons are inline (no icon library)
- Mock data is co-located in the component files that use it
