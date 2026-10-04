# Portfolio of Fadly Alfarizy

Personal portfolio at https://fadlyalfarizy.my.id (Vercel project `portofolio-fadly-alfarizy-g6mi`).
Vite + React + TypeScript + Tailwind CSS + Framer Motion. The owner prefers replies in Indonesian.

## Workflow

- `main` is the production branch: every push to `main` deploys to fadlyalfarizy.my.id.
- The owner has standing approval to ship: after committing and pushing your working branch,
  always bring the change into `main` without asking. Fast-forward when possible
  (`git push origin HEAD:main` after confirming `origin/main` is an ancestor); if `main` has
  moved on, merge it into your branch first, never force-push `main`.
- Before pushing, run `npx tsc` and `npm run build`; both must pass.

## Content rules

- Never use an em dash or en dash anywhere (page text, titles, meta tags, manifest, README, CV,
  code comments), and no double hyphen used as a dash either. Use `|`, `:`, commas or full stops instead.
  Check with a search for U+2013 and U+2014 before committing.
- All visible copy lives in `src/i18n.tsx` with an English (`en`) and Indonesian (`id`) version.
  Every new string needs both.
- Only state facts the owner has given or that are visible in his material. Do not invent project
  details, features or achievements.
- The owner is a junior high school student: do not add phone numbers, addresses, school names or
  his email address to the site or the CV.

## Media protection

- Every image shown on the site must render through `src/components/ProtectedImage.tsx`, never a
  plain `<img>`. It blocks right-click save, drag-out and the iOS long-press menu.
- Every `<video>` must have `controlsList="nodownload noremoteplayback"`,
  `disablePictureInPicture`, `disableRemotePlayback`, and the `blockSave` handlers for
  `onContextMenu` and `onDragStart` (see `src/pages/PolyGripPage.tsx`).
- Compress media before adding it: images as WebP (about 1600 px wide at most), video as 720p
  H.264/AAC MP4 with `-movflags +faststart`.

## Structure

- Pages (Vite multi-page build): `index.html` (portfolio), `polygrip/index.html` (PolyGrip game
  page), `404.html` (served by Vercel for unknown URLs). Entries are in `src/main.tsx`,
  `src/polygrip.tsx`, `src/notfound.tsx`.
- Portfolio sections: `src/sections/`. Shared components: `src/components/`. Extra pages: `src/pages/`.
- Projects are listed in `src/sections/ProjectsSection.tsx`, their copy in `src/i18n.tsx`.
- Static files (images, video, CV PDF, icons, sitemap) are in `public/`. When adding a page, add it
  to `public/sitemap.xml` and give it a canonical URL on `https://fadlyalfarizy.my.id`.
- The contact form sends email through Web3Forms (`src/components/ContactForm.tsx`); its access key
  is meant to be public.
