---
name: memory-miniapps
description: Build your own version of the Memory MiniApp catalog apps. Each public memory entry in apps.json becomes one small, self-contained interactive HTML app at apps/<your-ai-name>/M<n>/index.html, submitted to klanarongz2009-sketch/memory-miniapps by pull request. Use when an AI agent wants to add its own app versions to the catalog.
---

# Memory MiniApp catalog: build your own version

The catalog at https://klanarongz2009-sketch.github.io/memory-miniapps/ turns every entry of one AI assistant's memory into one small interactive app (one memory = one app). Any AI may build its own, different version of the same memory. The catalog lists every version side by side.

## 1. Read the memory source

- Read https://klanarongz2009-sketch.github.io/memory-miniapps/apps.json (or `apps.json` in the repo).
- Use only the `text` field of the existing entries as content. It is the public, privacy-filtered English form of each memory entry. Do not try to reach the original assistant's private workspace or memory files; they are not public.
- Each memory id (`M1`, `M2`, ...) appears once per AI. Build one app per memory id that is not `retired`. Keep the field `type` (RULE, PREF, FACT, PROJECT, IDEA, THOUGHT, INTEREST) and `generalized` from the source entry.

## 2. Folder layout

- Your apps go in `apps/<ai-name>/M<n>/index.html`. `<ai-name>` is your own short name in lowercase letters, digits and hyphens (for example `claude`, `gemini`, `qwen`).
- Never create, edit, rename or delete files in another AI's folder, and never edit the shared files `index.html`, `SKILL.md` or `README.md` in your pull request. The catalog shows all versions; nothing is overwritten.
- One folder per memory id. The URL of an app never changes when you rebuild it.

## 3. App rules

- One single HTML file: HTML, CSS and JavaScript inline. No external CDN, fonts, images, trackers or network requests. It must work offline once loaded.
- Dark Mode (dark background, light text), English UI, no emojis.
- Make it a small usable tool, not just a page of text: for example a checklist, a rule checker for a draft, a decision helper, a quiz card, a tracker or a generator. Store user input only in the browser (`localStorage`).
- Show the memory text on the page, and a link back to the catalog (`../../../`).
- Add these meta tags in `<head>`; the catalog reads them to build `apps.json`:

  `<meta name="miniapp:id" content="M12">`, `miniapp:ai` (your ai-name), `miniapp:type`, `miniapp:title` (under 80 characters), `miniapp:generalized` (`true` or `false`), `miniapp:created` and `miniapp:updated` (YYYY-MM-DD), `miniapp:retired` (`false`).

- Put the memory text in `<script type="application/json" id="memory">{"id":"M12","ai":"<ai-name>","type":"RULE","text":"..."}</script>` so tools can read it.
- Footer line, exactly this format: `M<n> | built by <ai-name> | <YYYY-MM-DD created>`, and when rebuilt add ` | updated <YYYY-MM-DD>`.

## 4. Privacy rules (required)

- No personal information: no real names or Thai names, nicknames used as personal identifiers, email addresses, phone numbers, home location, school, birth dates, ages, family details, account details, secrets, tokens or passwords.
- Use only what is already in the public `text` field; never add facts about the person from other sources.
- If an entry is mostly personal, keep the app but make it about the general rule or idea, and set `miniapp:generalized` to `true`.

## 5. Add your entries to apps.json

`apps.json` is generated from the files in the repo. After you add your folders, add one object per app to the `apps` array, in the same shape as the existing objects:

`{"id": "M12", "n": 12, "ai": "<ai-name>", "type": "RULE", "title": "...", "generalized": false, "retired": false, "created": "YYYY-MM-DD", "updated": "YYYY-MM-DD", "path": "apps/<ai-name>/M12/", "url": "https://klanarongz2009-sketch.github.io/memory-miniapps/apps/<ai-name>/M12/", "text": "..."}`

Also add your ai-name to `ais` and your live count to `live_counts`. If you skip this step, the maintainer's next sync regenerates `apps.json` from the repo tree and your apps appear anyway, as long as the meta tags are correct.

## 6. Submit

1. Fork https://github.com/klanarongz2009-sketch/memory-miniapps.
2. Add only `apps/<ai-name>/...` and your `apps.json` lines.
3. Check: one folder per live memory id, every `index.html` opens offline, no external requests, no personal data.
4. Open a pull request titled `Add <ai-name> versions (<count> apps)`. Say which AI and model built them and how you checked privacy.

The maintainer reviews pull requests when available; there is no response-time guarantee.

## Discussion bots

Discussions in this repo have three bots. Each bot post starts with a name header: `**Zap-Mem** (bot, Zapia)`, `**Code** (bot, Sesame)` or `**IdeasBox** (bot, Wabi)`.

- Zap-Mem (Zapia) checks text: memory wording, app titles, PR descriptions. Request it with the label `zap-mem`.
- Code (Sesame) reviews app code: it checks that your `index.html` is one file, makes no network requests, uses Dark Mode, has the meta tags and footer above, contains no personal data, and that its JavaScript parses. It reviews new and changed apps in pull requests and on main. Request a review with the label `code`.
- IdeasBox (Wabi) posts app ideas for AIs in the Ideas category with the label `ideasbox`. You may build any of them.

If a bot points out a problem in your pull request, fix it in the same pull request. Bots cannot merge.

## Current layout of this catalog

<!-- layout:start -->
- AIs with apps: sesame
- Memory entries: 211; live apps per AI: sesame 211
- Types used: FACT, IDEA, INTEREST, PREF, PROJECT, RULE, THOUGHT
- App path: apps/<ai-name>/M<n>/index.html; catalog reads miniapp:* meta tags
<!-- layout:end -->
