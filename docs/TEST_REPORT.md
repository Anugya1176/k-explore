# Test report

**Method:** automated end-to-end run in headless Chromium (Playwright) against a local static server, plus visual inspection of screenshots.
**Result:** 91 checks passed, 0 failed. Zero console errors or uncaught exceptions. (Google Fonts requests were blocked in the sandbox, so the system-font fallbacks were exercised. Fonts load normally online.)

| Area | What was verified |
|---|---|
| Homepage | Loads; 3 featured cards, 6 upcoming cards, 6 category tiles, hero cards, footer contact; card shows image, date, venue, description, category, View Details |
| Event display | All 9 events render on the listing page |
| Search | "hack" returns 1; case-insensitive; no-match query shows empty state |
| Category filter | Music returns 2; chip `aria-pressed` state; `?category=` URL pre-filters; home category tile opens a filtered list |
| Combined filter | Music + "mic" returns 1; Music + "hackathon" returns the empty state |
| Reset | Reset button and empty-state button both restore all 9 events |
| Event details | Navigation from card; title, description, highlights, schedule, venue, category, fee; unknown id shows a friendly "not found" |
| Countdown | 4 units shown, seconds visibly tick |
| Validation | Empty submit shows 4 errors and focuses the first invalid field; invalid name, email, short phone, phone not starting 6–9, letters in phone; nothing saved on invalid submit |
| Registration | Success panel and toast; form hidden; record saved with normalised phone and lower-cased email; nav counter updates |
| Persistence | Registration remains after page reload |
| Duplicates | Same event + same email (any letter case, with spaces) blocked and not saved; same event + different email allowed; same email + different event allowed |
| My Registrations | Lists entries, cancel removes one, empty state, corrupt storage value handled safely |
| Dark/light mode | Toggle switches theme and actual colours; theme persists after reload |
| Mobile navigation | Hamburger visible at 375 px, opens, closes with Esc and on link click; hidden on desktop |
| Responsiveness | No horizontal overflow on all 5 pages at 375, 768 and 1280 px |
| Links/images | Every internal link returns 200; no broken images on any page |

## Not covered / limitations
- Tested in Chromium only. Not run in Safari or Firefox, or on physical devices.
- Not a screen-reader audit. Accessibility features (labels, ARIA, focus styles, skip link) are implemented but only partly verified.
- Deployment has not been performed. Follow the README steps and test the live URL yourself.
