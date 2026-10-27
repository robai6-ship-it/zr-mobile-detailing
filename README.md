# ZR Mobile Detailing LLC: website

Website for **zrmobiledetailing.com**. Plain HTML, CSS and JavaScript: no build step and no monthly software, so it can be hosted for free.

## What's where

| File | What it is |
|---|---|
| `index.html` | Home page: logo hero, showroom card (exterior ↔ interior), services & pricing, how it works, our work (Instagram photos), reviews, about, service areas + map, online booking, FAQ, guides, contact |
| `js/config.js` | **Edit this one.** Prices, packages, add-ons, reviews, service areas, booking times, phone, email, hours |
| `guides/` | Four car-care articles (good for Google search) + a guides list page |
| `css/styles.css` | The black & gold design |
| `js/main.js` | Animations, price toggle, booking calendar, photo viewer |
| `images/` | Logo (enhanced), hero photos, Instagram photos in `images/ig/` |

## Before going live: confirm with ZR

1. **All prices** in `js/config.js`. Exterior $100, Interior $150 and Full Detail $250 (sedan) are confirmed. Still to confirm: SUV/truck prices, the Gold package and add-ons.
2. **Hours** (currently "7 days, 7 AM – 7 PM") in `js/config.js` and in `index.html` (search `openingHoursSpecification`).
3. **FAQ answers** in `index.html`: does he bring his own water and power? Which payment methods (cash, card, Zelle, Cash App, Apple Pay)? Rain policy?
4. **Reviews:** two are real Instagram comments. The three marked "Sample" must be replaced with real Google reviews (or deleted). Never publish made-up reviews.
5. **Google review link:** once his Google Business Profile is set up, paste its "ask for reviews" link into `googleReviewUrl`.

## How online booking works

Customers pick a size, service, add-ons, date and time, then enter their name, phone and address. Pressing **Send by text / WhatsApp / Email** opens their phone's app with a ready-made message to ZR. ZR confirms by text. Nothing needs a server or a paid booking tool. (Later, if he wants automatic calendar booking and deposits, it can be swapped for Cal.com or Square Appointments.)

## Hero photos

The exterior and interior hero photos are from Unsplash (free licence, no credit required):
- Exterior: unsplash.com/photos/fc3ee04dbcf0
- Interior: unsplash.com/photos/c1806d14a4d9
- Tan interior: unsplash.com/photos/b965cb9935d5

Swap in ZR's own best before/after shots any time (keep the same file names).

## Where it's hosted

- **Live site:** https://zrmobiledetailing.com (Vercel project `zr-mobile-detailing`, team "rob-gets-it-done"). `www.zrmobiledetailing.com` forwards to it (`vercel.json`).
- **Domain:** bought at Cloudflare (registrar + DNS). Cloudflare DNS has two records, both **DNS only (grey cloud)**:
  - `CNAME  @    eee9355edc52f990.vercel-dns-017.com`
  - `CNAME  www  eee9355edc52f990.vercel-dns-017.com`
- **Update the site:** push to GitHub, then from this folder run `npx vercel@latest deploy --prod --yes`.
- Backup copy: GitHub Pages (updates on its own from `main`).

After it's live:
- Submit `https://zrmobiledetailing.com/sitemap.xml` in Google Search Console.
- Put the website link in the Instagram bio and on his Google Business Profile.
