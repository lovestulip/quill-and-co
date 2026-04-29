# Quill & Co 🦔

**Live site:** https://lovestulip.github.io/quill-and-co

A deliberately badly-instrumented demo store used to show how the [PostHog MCP](https://posthog.com/docs/mcp) can diagnose real instrumentation problems in a live project.

---

## What this is

Quill & Co is a fake hedgehog-themed coastal lifestyle brand (linen shirts, beach totes, pineapple pizza art prints). It's not a real store — there's no real checkout, no payments, no backend.

It exists as a demo prop. A customer watches Claude diagnose 9 real instrumentation bugs in this PostHog project using MCP, sees the fix recommendations and doc links, and (ideally) decides they want MCP on their own project.

## The 9 bugs baked in

| # | Bug | Where |
|---|---|---|
| 1 | `person_profiles: 'always'` — every anonymous browse session bills at identified rate (4x more expensive) | `posthog-init.js` |
| 2 | `identify()` called on every page load, not just at login | `posthog-init.js` |
| 3 | `$set` firing on every product click with redundant properties | `products.html` |
| 4 | Autocapture enabled with zero Actions created — high volume, no analytical value | `posthog-init.js` + PostHog UI |
| 5 | Feature flag re-fetched from server every 3 seconds — should read from the local cache PostHog JS already maintains | `product.html` |
| 6 | `order_completed` firing on page load AND on actual checkout — double-fire bug | `checkout.html` |
| 7 | `$pageleave` fired manually on every click in addition to the automatic one | all pages |
| 8 | Session replay at 100% sampling with no minimum duration — recording every session including 1-second bounces | `posthog-init.js` |
| 9 | `groupidentify` firing on every page load | `posthog-init.js` |

## The demo flow

1. Browse the live store to generate PostHog events
2. Open Claude with PostHog MCP connected
3. Run the 6 diagnostic prompts — Claude reads the PostHog data, explains each problem, and fixes them (code edits + PostHog settings via MCP)
4. Customer thinks "I want that on my project"
5. Show the 2-minute MCP install
6. Reset for the next customer (see `RESET.md`)

## Diagnostic prompt sequence

1. **Bill snapshot** — projected bill and what's driving it
2. **Event health check** — identified vs anonymous ratio, `$set` and `$pageleave` firing rate, autocapture vs custom events
3. **Session replay audit** — sampling rate, minimum duration, controls in place
4. **Feature flag efficiency** — local vs remote eval ratio, `/decide` calls per session
5. **Implementation error check** — `identify` calls per session, `group` calls per session, `order_completed` double-fire, web vitals usage
6. **Summary + priority fixes** — ranked list of all 10 problems with estimated impact and doc links for each

## Branches

| Branch | Purpose |
|---|---|
| `main` | What GitHub Pages serves — starts broken, gets fixed during demo, reset after |
| `buggy` | Permanent broken reference — never touch this, it's the restore point |

To reset `main` back to broken after a demo: see `RESET.md`.

## PostHog project

- **Region:** US (`us.i.posthog.com`)
- **API key:** scoped to this project only, stored in VS Code MCP config (not in this repo)

## Pages

| Page | URL |
|---|---|
| Home | `/index.html` |
| Shop | `/products.html` |
| Product detail | `/product.html?id=1` through `?id=6` |
| Checkout | `/checkout.html` |
| About | `/about.html` |
