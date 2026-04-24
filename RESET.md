# Demo Reset Guide

## After each demo — two steps

### Step 1: Reset the browser session
Hit **Reset demo** in the footer of the live site. This clears PostHog cookies so the next visitor starts as a fresh anonymous user.

### Step 2: Check if any PostHog settings were changed
If anything was changed in the PostHog UI during the demo (billing limits set, Actions created, session recording minimum duration added), run this prompt in Claude to restore the broken state:

---

## Re-break prompt

Paste this into Claude after a demo to restore the Quill & Co PostHog project to its broken state:

```
I need to restore the Quill & Co PostHog demo project to its intentionally broken state.
Please check the following and undo anything that was fixed:

1. Billing limits — confirm no billing limits are set on any product (Events, Recordings, etc). 
   If any limits exist, remove them.

2. Actions — confirm no Actions have been created. If any exist, list them so I can delete them manually.

3. Session recording minimum duration — confirm there is no minimum session duration filter set. 
   If one exists, remove it.

4. Feature flag 'summer-discount' — confirm this flag exists but is disabled (or doesn't exist). 
   The product page polls for it in a loop as Bug 5 — it should not be enabled during the demo 
   or the discount banner will show.

5. Web Vitals — confirm web vitals are still being collected (this should be on, as it's Bug 9).

Report what you find and what you changed.
```

---

## Resetting the code

If any code files were edited during a demo, restore the buggy versions with:

```bash
git checkout buggy -- .
git push origin main
```

Then push via GitHub Desktop. GitHub Pages will redeploy automatically (~60 seconds).

---

## What never needs resetting

- The 10 bugs in the code — they're always there
- PostHog event data — accumulated events make the demo look more realistic, not less
- The live site URL — always https://lovestulip.github.io/quill-and-co
