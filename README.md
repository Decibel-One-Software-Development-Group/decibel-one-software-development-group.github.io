# decibel-one-software-development-group.github.io

The Decibel One website, served by GitHub Pages at https://decibelone.com (`CNAME`).
No build step: a push to `main` publishes.

- `index.html` — the front page.
- `software/index.html` — the Mac apps page, https://decibelone.com/software/.
- `software/icons/` — one 256 px icon per app, cut from the app's own icon so every
  icon fills its square.

## The Mac apps page

One card per app that has a public product page, in alphabetical order, each linking to
`https://decibelone.com/<product>/`. A card carries the app's own icon, its name, a tag
(what its product page says: "Free" where it says so, and the platforms) and one line,
which is the product page's own headline. **SiBig and SiPan are left off on purpose**
(Simon, 2026-10-05).

To add an app: put its icon in `software/icons/`, add its card in alphabetical order, and
add its name to the two description meta tags at the top of the page.

Design: IBM Plex Sans and Tabler icons, CSS-variable light and dark. Every graphic is a
real mark; no decorative filler.

## Custom domain

The custom domain set on this org site covers every project page too
(`decibelone.com/sichronize-server/`), with a GitHub-issued HTTPS certificate. The old
`github.io` addresses redirect.
