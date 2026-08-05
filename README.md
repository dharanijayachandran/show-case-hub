# ShowCaseHub

Personal portfolio for **Dharani J** — a single-page Angular 15 site with a hero,
an about section (experience / education / skills), selected work, and a contact
form backed by EmailJS.

## Getting started

```bash
npm install
npm start          # dev server on http://localhost:4200/
```

## Scripts

| Command         | What it does                                                  |
| --------------- | ------------------------------------------------------------- |
| `npm start`     | Dev server with live reload                                   |
| `npm run build` | Production build into `docs/` (see *Deploy* below)             |
| `npm run watch` | Development build that rebuilds on change                      |
| `npm test`      | Unit tests via Karma + Jasmine                                |

## How it's put together

- **Content lives in TypeScript, not markup.** Experience, education and skills
  are arrays in [`about.component.ts`](src/app/about/about.component.ts); projects
  are in [`project.component.ts`](src/app/project/project.component.ts). Editing
  the site means editing data, not hunting through HTML.
- **Shared contact details** — email, resume path and social links — come from
  [`site-data.ts`](src/app/site-data.ts) so the hero and contact section can
  never disagree.
- **Theming** is driven by CSS custom properties in
  [`styles.css`](src/styles.css). Dark is the default; light is applied via
  `data-theme="light"` on `<html>`.
  [`theme.service.ts`](src/app/theme.service.ts) owns the toggle and persists the
  choice to `localStorage`, and a small inline script in
  [`index.html`](src/index.html) applies the stored theme *before* first paint so
  there is no flash of the wrong colours.
- **Styling layers:** Bootstrap 5 (grid + utilities) → Font Awesome → then
  `src/styles.css`, which is loaded last so its overrides win without
  `!important`. Shared primitives (`.btn`, `.form-control`, `.section-title`,
  `.card-surface`, `.tag`) are global; each component stylesheet only handles its
  own layout.
- **No jQuery or Bootstrap JS.** Interactive bits use ng-bootstrap directives
  (`ngbCollapse` for the mobile nav, `ngbNav` for the about tabs).

## Adding a project

Append an entry to `projects` in
[`project.component.ts`](src/app/project/project.component.ts):

```ts
{
  title: 'My Project',
  blurb: 'One or two lines on what it does.',
  tags: ['Angular', 'TypeScript'],
  image: 'assets/my-project.webp',
  imageAlt: 'Screenshot of My Project',
  liveUrl: 'https://example.com',              // optional
  repoUrl: 'https://github.com/me/project',    // optional
}
```

The "Live demo" and "Code" buttons appear automatically when a URL is present.

Keep screenshots around 1000 px wide and save them as `.webp` — the cards render
them at roughly 400 px, so anything larger is wasted bytes.

## Deploy

The build writes to `docs/`, which GitHub Pages can serve directly
(*repo settings → Pages → deploy from branch, `/docs` folder*).

```bash
ng build --output-path docs --base-href /show-case-hub/
```

The `--base-href` flag matters: without it, a site served from a subpath such as
`/show-case-hub/` will look for assets at the domain root and fail.

## Notes / known follow-ups

- `liveUrl` and `repoUrl` are not filled in for the existing projects yet.
- Social preview tags in `index.html` need an absolute `og:url` and `og:image`
  once the site has a final domain — scrapers ignore relative URLs.
- EmailJS credentials live in [`service.service.ts`](src/app/service.service.ts).
  Anything committed there is public in the built bundle; keep the EmailJS
  account restricted to the allowed-origins list.
- `emailjs-com` is deprecated upstream in favour of `@emailjs/browser`.
- `@ng-bootstrap/ng-bootstrap` is pinned to 7.0.0, which predates Angular 15 and
  builds through the legacy "View Engine" compatibility path. Upgrading is a
  separate piece of work.
