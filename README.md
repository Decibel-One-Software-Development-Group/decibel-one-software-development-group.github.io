# decibel-one-software-development-group.github.io

The **Decibel One** company landing page — served at the GitHub Pages **root** for the org.

- **Live:** https://decibel-one-software-development-group.github.io/
- **Source:** a single self-contained `index.html` (no build step), served from the `main` branch root.

## Design

Matches the Decibel One product pages (SiChronize, SiGENTEST): IBM Plex + Tabler icons,
CSS-variable light/dark, fully self-contained. The hero is an animated dB level meter —
the mark the company is named for — and the footer carries the real Decibel One logo.

## Products featured

Two apps, listed one per row, each linking to its product page:

- **SiChronize** — network time sync for closed networks (includes SiChronize Connect, the client-side sub-app).
- **SiGENTEST** — audio signal generation and testing for macOS.

## Custom domain

When a domain is registered (e.g. `decibelone.com`):

1. Add a `CNAME` file to this repo containing the bare domain.
2. Point DNS at GitHub Pages (4 `A` records + a `www` `CNAME`).

A custom domain set on the org site **automatically covers every project page too**
(e.g. `decibelone.com/sichronize-server/`), and GitHub issues a free HTTPS certificate.
The old `github.io` URLs keep working via redirect.
