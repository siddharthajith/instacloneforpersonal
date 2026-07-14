# Glimpse

A modern photo and video sharing web app with an original identity — a full frontend built with React, React Router and Tailwind CSS, running entirely on realistic mock data.

## Features

- **Home feed** with stories (viewed/unviewed rings, full-screen story viewer with progress bars), post cards with carousels, double-tap like with heart animation, comments and save
- **Explore** masonry-style grid with hover stats and a media-left / comments-right post modal
- **Clips** — vertical short-video feed with scroll snapping, play/pause, mute toggle, progress bar and per-video actions (audio never autoplays)
- **Messages** — conversation list with unread/online indicators, chat with bubbles, seen states, typing indicator, image and voice message placeholders, emoji picker
- **Notifications** grouped into Today / This week / Earlier with mark-as-read
- **Profiles** with highlights, tabbed grids (posts, clips, tagged, saved), searchable follower/following modals
- **Create post** — 4-step modal (upload → crop/edit → details → share) with drag-and-drop, carousel upload, aspect-ratio selection and simulated upload progress
- **Auth** — login, signup, forgot password, verification code and reset password with validation
- **Settings & edit profile** with form validation and success states
- Likes, follows, saves, comments, searches and profile edits persist via `localStorage`
- Responsive: desktop sidebars, icon-only rail on medium screens, bottom nav + top bar on mobile

## Live demo

After deployment: **[https://siddharthajith2009.github.io](https://siddharthajith2009.github.io)**

Log in with any credentials — it's a frontend-only demo.

## Deploy to GitHub Pages

This repo is configured for GitHub Pages on the **siddharthajith2009** account (user site).

1. Log in to GitHub CLI as that account:
   ```bash
   gh auth login
   ```
2. Create the Pages repository (once):
   ```bash
   gh repo create siddharthajith2009.github.io --public --description "Glimpse — photo and video sharing app"
   ```
3. Push this project:
   ```bash
   git remote add origin https://github.com/siddharthajith2009/siddharthajith2009.github.io.git
   git push -u origin main
   ```
4. Enable Pages from Actions (once):
   ```bash
   gh api repos/siddharthajith2009/siddharthajith2009.github.io/pages -X POST \
     -f build_type=workflow \
     -f source[branch]=main \
     -f source[path]=/
   ```

The `Deploy to GitHub Pages` workflow runs on every push to `main`.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173. Any credentials work on the login screen — it's a frontend-only demo.

## Stack

- React 19 + Vite
- React Router 7
- Tailwind CSS 4
- Mock data only — no backend, no API keys

## Structure

```
src/
  components/
    create/     # multi-step create post modal
    feed/       # stories, post cards, carousel media, post detail
    layout/     # sidebars, mobile nav, search panel
    ui/         # icons, avatar, button, modal, skeletons
  context/      # app state + localStorage persistence
  data/         # mock users, posts, reels, messages, notifications
  pages/        # one component per route
  utils/        # formatting helpers
```
