# Requirements checklist

Source: *K Explore – Web Designing* assignment brief.

| # | Requirement (from brief) | Where implemented |
|---|---|---|
| 1 | Attractive hero section introducing the platform | `index.html` hero + `css/styles.css` (`.hero`) |
| 2 | Section showcasing upcoming **and** featured events | `#featured` and `#upcoming` in `index.html`, rendered by `js/home.js` |
| 3 | Event cards: name, date, venue, image, short description | `KX.cardHtml` in `js/ui.js` (also category + View Details) |
| 4 | Browse events | `events.html` + `js/events.js` |
| 5 | Search for specific events | `#search` input, matches title, description, venue, category, organiser |
| 6 | Filter by category | Category chips (`aria-pressed`), URL-driven via `?category=` |
| 7 | Detailed event page + registration option | `event.html` + `js/event-details.js` |
| 8 | Registration form: name, email, phone, selected event | `register.html` + `js/register.js` |
| 9 | JavaScript validation | `validators` in `js/register.js` (required, name, email regex, 10-digit phone, valid open event) |
| 10 | Confirmation message on success | Success panel + toast in `showSuccess()` |
| 11 | Responsive: mobile, tablet, desktop | Breakpoints at 980 / 860 / 600 px; tested at 375, 768, 1280 px |
| 12 | Good UI/UX, consistent styling, transitions, interactivity | Design tokens, hover/reveal animations, shared header/footer |
| 13 | HTML5, CSS3, JavaScript | Vanilla stack, no dependencies |
| 14 | Git & GitHub | `.gitignore`, README upload instructions (**upload must be done by you**) |
| 15 | Bonus: dark/light mode | `js/theme.js` + toggle in `js/ui.js`; saved in LocalStorage |
| 16 | Bonus: countdown timers | `KX.tick` in `js/ui.js` |
| 17 | Bonus: animations | Scroll reveal, card hover, hero card motion, toast, success pop |
| 18 | Bonus: LocalStorage registration management | `js/storage.js`, `my-registrations.html` (view + cancel) |
| 19 | README explaining project & implementation | `README.md` |
| 20 | Submit GitHub link + deployed link | **Pending: to be done by the student** |

Extra requirements from the build brief: duplicate-registration prevention (event + email), empty state, reset filters, responsive mobile navigation, accessibility (labels, `aria-live`, skip link, focus styles), clear demo-vs-real backend disclosure (banner on form and README).
