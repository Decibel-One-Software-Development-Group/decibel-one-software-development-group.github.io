# decibel-one-software-development-group.github.io

The Decibel One website, served by GitHub Pages at https://decibelone.com (`CNAME`).
No build step: a push to `main` publishes.

- `index.html` — the front page. Its software rows carry each app's family tile as inline SVG (the form
  `suite-icons/gen.py` writes) and link to `decibelone.com/<product>/`.
- `software/index.html` — the Mac apps page, https://decibelone.com/software/.
- `software/icons/` — one 256 px icon per app, cut from the app's own icon so every
  icon fills its square.
- `pricing/`, `terms/`, `refunds/`, `privacy/` — what Paddle's site review asks for before
  checkout can open (Simon's rulings, 2026-10-24: Paddle as the seller; each app priced on its
  own, SiGENTEST and SiChronize $49 Pro / $149 per Mac, the others $19 / $59; refunds within 30
  days; a Company license covers one Mac). They share `pages.css`. Paddle rejects a site whose
  Terms lose the Merchant of Record sentence, whose refund window drops under 14 days, or that
  says "all sales final". Every page's footer links all four. Text marked `class="owed"` is a gap
  Simon still has to fill: nothing so marked may be pushed.

## The Mac apps page

One card per app that has a public product page, in alphabetical order, each linking to
`https://decibelone.com/<product>/`. A card carries the app's own icon, its name, a tag
(what its product page says: "Free" where it says so, and the platforms) and one line,
which is the product page's own headline. **SiBig and SiPan are left off on purpose**
(Simon, 2026-10-05). **So is SiCache** (Simon, 2026-10-11): it has a product page at
`decibelone.com/sicache/`, and this page does not list it.

To add an app: put its icon in `software/icons/`, add its card in alphabetical order, and
add its name to the two description meta tags at the top of the page.

The cards sit three across (two on a narrow window, one on a phone). When the last row is
short, its cards are centred (Simon, 2026-10-11): the grid is six half-columns and each card
spans two, so the CSS needs no change when the number of apps changes.

Design: IBM Plex Sans and Tabler icons, CSS-variable light and dark. Every graphic is a
real mark; no decorative filler.

## Custom domain

The custom domain set on this org site covers every project page too
(`decibelone.com/sichronize-server/`), with a GitHub-issued HTTPS certificate. The old
`github.io` addresses redirect.
