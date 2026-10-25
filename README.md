# decibel-one-software-development-group.github.io

The Decibel One website, served by GitHub Pages at https://decibelone.com (`CNAME`).
No build step: a push to `main` publishes.

- `index.html` — the front page: two panels (Simon, 2026-10-25). Software carries the eight apps' icons
  from `software/icons/`, each linking to `decibelone.com/<product>/`, then All Mac apps and Pricing.
  Engineering and design gets its link when its page exists: a list of shows Simon gives, worked up
  together. SiPay is off the site (Simon, 2026-10-25), its messaging-terms link included.
- `software/index.html` — the Mac apps page, https://decibelone.com/software/.
- `software/icons/` — one 256 px icon per app, cut from the app's own icon so every
  icon fills its square.
- `pricing/`, `terms/`, `refunds/`, `privacy/` — what Paddle's site review asks for before
  checkout can open (Simon's rulings, 2026-10-24: Paddle as the seller; each app priced on its
  own, SiGENTEST, SiChronize, SiCTR and SiMONITOR $49 Pro / $149 per Mac, the others $19 / $59; refunds within 30
  days; a Company license covers one Mac). They share `pages.css`. Paddle rejects a site whose
  Terms lose the Merchant of Record sentence, whose refund window drops under 14 days, or that
  says "all sales final". Every page's footer links all four. Text marked `class="owed"` is a gap
  Simon still has to fill: nothing so marked may be pushed.
- `checkout.js` — the Buy buttons on /pricing/ (Paddle's overlay checkout; a small form first asks the name to
  show as "Licensed to" and, for Company, how many Macs). **Sandbox runs only on a local copy** (localhost,
  127.0.0.1); `LIVE` stays `null` until Paddle approves decibelone.com, so the published page shows no buttons
  and never loads Paddle's script (proven by loading the page under another host name: all 16 stay hidden).
  Going live: put the live client-side token and the live price ids (`scripts/paddle-catalog.py --live`
  writes them) in `LIVE`. Paddle needs a default payment link set before any checkout opens (sandbox:
  `http://localhost:8790/pricing/`; live: `https://decibelone.com/pricing/`, approved with the site).

## The Mac apps page

One card per app that has a public product page, in alphabetical order, each linking to
`https://decibelone.com/<product>/`. A card carries the app's own icon, its name, a tag
(the platforms its product page names; "Free" came off with the free/paid wording, Simon,
2026-10-25) and one line, which is the product page's own headline. **SiBig and SiPan are left off on purpose**
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
