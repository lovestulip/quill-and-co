# Quill & Co 🦔

**Live site:** https://lovestulip.github.io/quill-and-co

A deliberately badly-instrumented demo store used to show how the [PostHog MCP](https://posthog.com/docs/mcp) can diagnose real instrumentation problems in a live project.

---

## What this is

Quill & Co is a fake hedgehog-themed coastal lifestyle brand (linen shirts, beach totes, pineapple pizza art prints). It's not a real store — there's no real checkout, no payments, no backend.

It exists as a demo prop. A customer watches Claude diagnose 10 real instrumentation bugs in this PostHog project using MCP, sees the fix recommendations and doc links, and (ideally) decides they want MCP on their own project.

## The 10 bugs baked in

| # | Bug | File |
|---|---|---|
| 1 | `person_profiles: 'always'` — bills every anonymous visitor at identified rate | `posthog-init.js` |
| 2 | `identify()` called on every page load, not just at login | `posthog-init.js` |
| 3 | `$set` fires on every product click with redundant person properties | `products.html` |
| 4 | Session recording at 100% sample rate with no minimum duration | `posthog-init.js` |
| 5 | Feature flag checked via `reloadFeatureFlags()` in a 3-second loop instead of local eval | `product.html` |
| 6 | No billing limits set (PostHog UI setting — not in code) | PostHog UI |
| 7 | `order_completed` fires on page load AND on button click — double-counts every order | `checkout.html` |
| 8 | `$pageleave` fired manually on every click — PostHog already fires it automatically | all pages |
| 9 | Web Vitals enabled but no alerts or insights configured — easy one-click fix | `posthog-init.js` |
| 10 | `group()` called on every page load, not just at login | `posthog-init.js` |

## The demo flow

1. Browse the live store to generate some PostHog events
2. Open Claude with PostHog MCP connected
3. Run the 6 diagnostic prompts (see below)
4. Claude finds and explains each problem with fix recommendations
5. Hit **Reset demo** in the footer to start fresh for the next customer

## Diagnostic prompt sequence

1. **Bill snapshot** — projected bill and what's driving it
2. **Event health check** — identified vs anonymous ratio, `$set` and `$pageleave` firing rate, autocapture vs custom events
3. **Session replay audit** — sampling rate, minimum duration, controls in place
4. **Feature flag efficiency** — local vs remote eval ratio, `/decide` calls per session
5. **Implementation error check** — `identify` calls per session, `group` calls per session, `order_completed` double-fire, web vitals usage
6. **Summary + priority fixes** — ranked list of all 10 problems with estimated impact and doc links

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
