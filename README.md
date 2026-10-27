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

1. **Prices** in `js/config.js`. Confirmed: Exterior $100, Interior $150, Full Detail $250 (sedan). Still to confirm: SUV/truck prices, Gold, add-ons, the paint correction ($350–$900) and ceramic coating ($700–$1,500) ranges, and the maintenance discounts (15% every 2 weeks, 10% every 4 weeks).
2. **Hours** (7 days, 7 AM – 7 PM) in `js/config.js` (`hours`, `closeHour`) and in `index.html` (search `openingHoursSpecification`). Long services only show start times that finish by closing.
3. **Policies** (FAQ in `index.html` and `terms.html`): free cancel/reschedule up to 24 hours before, no travel fee within about 20 miles of Kissimmee, what isn't included, payment methods, own water and power, rain policy, 24-hour guarantee window.
4. **Reviews:** the section is hidden until real reviews are added to `reviews` in `js/config.js`. Never publish made-up reviews.
5. **Google review link:** once his Google Business Profile is live, paste its "ask for reviews" link into `googleReviewUrl`; the "Leave us a Google review" button then appears.
6. **Privacy and terms** (`privacy.html`, `terms.html`): plain-language drafts, not legal advice. Have ZR read them.

## How online booking works

Customers pick a size, service, add-ons, date and time, then enter their name, phone and address. Pressing **Send by text / WhatsApp / Email** opens their phone's app with a ready-made message to ZR, and the site shows a "press send" screen (with Try again and Copy). The page says clearly that nothing is booked until ZR confirms by text. Nothing needs a server or a paid booking tool. (Later, if he wants automatic calendar booking and deposits, it can be swapped for Cal.com or Square Appointments.)

## Hero photos

The exterior and interior hero photos are from Unsplash (free licence, no credit required):
- Exterior: unsplash.com/photos/fc3ee04dbcf0
- Interior: unsplash.com/photos/c1806d14a4d9
- Tan interior: unsplash.com/photos/b965cb9935d5

Swap in ZR's own best before/after shots any time (keep the same file names).

## Where it's hosted

- **Live site:** https://zrmobiledetailing.com (Vercel project `zr-mobile-detailing`, team "rob-gets-it-done"). `www.zrmobiledetailing.com` forwards to it (set in Vercel → Domains).
- **Domain:** bought at Cloudflare (registrar + DNS). Cloudflare DNS has two records, both **DNS only (grey cloud)**:
  - `CNAME  @    eee9355edc52f990.vercel-dns-017.com`
  - `CNAME  www  eee9355edc52f990.vercel-dns-017.com`
- **Update the site:** push to GitHub, then from this folder run `npx vercel@latest deploy --prod --yes`.
- Backup copy: GitHub Pages (updates on its own from `main`).

After it's live:
- Submit `https://zrmobiledetailing.com/sitemap.xml` in Google Search Console.
- Put the website link in the Instagram bio and on his Google Business Profile.
