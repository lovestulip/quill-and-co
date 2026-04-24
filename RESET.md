# Demo Reset Guide

Run this after every demo to get the store back to broken for the next customer.

---

## Step 1 — Reset the code

1. Open Terminal and run:
   ```bash
   git checkout buggy -- .
   ```
2. Open GitHub Desktop — you'll see all the files marked as changed
3. Commit them with any message (e.g. "Reset to buggy state")
4. Hit **Push origin**
5. GitHub Pages redeploys in ~60 seconds — store is broken again

---

## Step 2 — Reset PostHog settings

Paste this prompt into Claude (with PostHog MCP connected) to undo any settings Claude fixed during the demo:

```
I need to restore the Quill & Co PostHog demo project to its intentionally broken state.
Please check the following and undo anything that was fixed:

1. Actions — no Actions should exist. If any were created during the demo, delete them.

2. Session recording minimum duration — no minimum duration should be set.
   If one exists, remove it.

3. Feature flag 'summer-discount' — this flag should be disabled (or not exist at all).
   If it's enabled, disable it.

4. Web Vitals — confirm web vitals are still being collected (this should stay ON — it's Bug 9).

Report what you found and what you changed.
```

---

## Step 3 — Reset the browser session

Hit **Reset demo** in the footer of the live site. This clears the PostHog session so the next customer starts as a fresh anonymous visitor.

---

## What never needs resetting

- PostHog event data — accumulated events make the demo look more realistic, not less
- The `buggy` branch — never touch it, it's your permanent restore point
- The live site URL — always https://lovestulip.github.io/quill-and-co
