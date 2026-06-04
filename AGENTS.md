# Project AGENTS

## Project State
- `active`

## Scope
- Applies to `apps/knolquiz-jumpmap-local/*`.
- This project is a standalone static Jumpmap web app for Knolquiz local play.
- It contains only Jumpmap code plus the quiz, character, and Jumpmap visual assets needed by this app.

## Source Of Truth
- `index.html`
- `styles.css`
- `app.js`
- copied static assets under `assets/`
- `README.md`

## Run / Verify
- Local static server:
  - `python3 -m http.server 4271 --bind 127.0.0.1`
- Open:
  - `http://127.0.0.1:4271/`
- Syntax check:
  - `node --check app.js`
- Browser verification should cover setup, play, and result screens at 1920x1080, 1366x768, 1024x768, 820x1180, and 390x844.

## Change Safety Rules
- Keep changes inside this project directory unless the user explicitly expands scope.
- Do not reference `../knolquiz-runtime`, `../knolquiz-local-lite`, or any sibling app at runtime.
- Do not add Supabase, auth, classroom mode, ranking mode, or server-backed saved records.
- Local browser storage is allowed only for the user's own 1-player gugudan/division-gugudan learning records.
- Local learning-record storage must stay device-local and must not add server sync, login, classroom, ranking, or shared-user features.
- Before writing local learning records, show a clear confirmation that asks whether this is really the current user's device/profile.
- CSV import/export remains the safety and backup path for learning records. Importing a CSV may update the local learning state only after clear user action and warning.
- Do not use IndexedDB unless an explicit later task says `localStorage` is insufficient. Prefer the smallest local-storage implementation that satisfies the learning-record requirement.
- All sessions must end by the selected 1-10 minute timer.
- Result screens may show current session results and the user's local learning-record controls, but must not introduce class-wide, ranking, login, or server-backed history screens.
- Do not add turtle defense code or turtle defense assets to this project.

## Migration Note
- This project was split out from the combined Knolquiz local-lite reference.
- Static assets were copied from reference projects only where needed for standalone Jumpmap play.
