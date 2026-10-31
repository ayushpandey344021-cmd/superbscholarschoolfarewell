# Superb Scholar School — Class 10 Farewell 2026

A frontend-only website built with **React 19 (Create React App + CRACO)**, **Tailwind CSS**, **Framer Motion** and **Lenis**.
No backend, database, login or API keys are required.

## Project layout (this folder is the project root)
```
package.json        # scripts: start / build (CRACO)
craco.config.js     # CRA config overrides (path alias "@/..." -> src/)
tailwind.config.js  # theme (cream / ink / gold)
vercel.json         # Vercel build settings + security headers
public/index.html   # HTML entry (root element: <div id="root">)
public/photos/      # gallery photos
public/school-logo.png
src/index.js        # React entry point
src/App.js          # page composition
src/components/     # Hero, Journey, Gallery, Teachers, Friendship, NamesWall, LastDay, Finale, MusicToggle ...
src/hooks/useYouTubeMusic.js  # background song (YouTube IFrame API)
```

## Run locally
```bash
yarn install
yarn start      # http://localhost:3000
yarn build      # production output -> ./build
```

## Deploy on Vercel (exact settings)
| Setting            | Value                                  |
|--------------------|----------------------------------------|
| Root Directory     | `./` (leave EMPTY — project is at root) |
| Framework Preset   | Create React App                       |
| Install Command    | `yarn install --frozen-lockfile`       |
| Build Command      | `yarn build`                           |
| Output Directory   | `build`                                |
| Environment Vars   | none required                          |

These values are already declared in `vercel.json`, so the defaults work. Steps:
1. Push this folder to a GitHub repository (the `.gitignore` already excludes `node_modules`, `build`, `.env*`).
2. On vercel.com → **Add New Project** → import the repo → keep Root Directory empty → **Deploy**.
3. Alternatively drag-and-drop this unzipped folder on the Vercel dashboard.

> The earlier error `Could not find a required file: index.html — Searched in: /vercel/path0` happened because the
> project was nested inside a `frontend/` sub-folder. In this package the project sits at the root, so `public/index.html`
> is found automatically.

## Privacy & security
- No API keys, tokens or passwords exist in this project. `.env` files are git-ignored; `.env.example` holds placeholders only.
- Any `REACT_APP_*` variable is public (compiled into the browser bundle) — never store secrets there.
- `vercel.json` sets security headers (nosniff, SAMEORIGIN, strict referrer policy, Permissions-Policy, HSTS).
- No analytics or third-party tracking is included. External requests: Google Fonts and the YouTube player only.
- The site collects no personal data and has no forms.

## Background music
"Tere Jaisa Yaar Kahan" (YouTube video `9dcBy2uXL7E`) is played via the official YouTube IFrame Player API and loops forever.
Browsers block sound before the first user gesture, so it starts on the first tap/click anywhere on the page.
To change the song, edit `SONG.videoId` in `src/hooks/useYouTubeMusic.js` (the video must allow embedding).

## Photos
Add images to `public/photos/` and list them in `GALLERY_ITEMS` in `src/components/Gallery.jsx`.
