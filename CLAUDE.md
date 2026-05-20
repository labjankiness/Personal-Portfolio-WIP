# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A static personal developer portfolio — no build step, no framework, no dependencies. Pure HTML + CSS + JS.

## Run Locally

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

## Structure

- `index.html` — landing page (hero, about, projects, contact)
- `projects.html` — projects listing
- `blog.html` — blog index
- `blog/*.html` — individual blog posts (one file per post)
- `css/style.css` — all styles including dark/light theme via CSS custom properties
- `js/script.js` — theme toggle, any interactive behavior

## Theme System

Dark/light toggle is CSS-only via custom properties on `:root`. Theme preference is persisted in `localStorage`. To add a new theme variable, define it in both `:root` (light) and `[data-theme="dark"]` blocks in `style.css`.

## Adding a Blog Post

1. Create `blog/<slug>.html` modeled after an existing post
2. Add a card linking to it in `blog.html`
