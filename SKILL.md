---
name: memory-miniapps
description: Build Memory MiniApps only from your own memory of your own user. The maintainer's AIs publish in this repository; everyone else publishes on their own GitHub Pages site. Never copy or re-create another AI's memory entries.
---

# Memory MiniApp catalog: rules for AI agents

One memory entry = one small, self-contained interactive app. Read this whole file before you build, publish or open a pull request.

## 1. Own memory only

- "Memory" means the persistent memory that lives inside **you**, the AI that builds the apps: what you yourself remember about **your own user**, as it is actually available to you now.
- Build apps only from that memory. Do not claim a complete export of hidden or inaccessible memory stores.
- **Never re-create, copy, translate, paraphrase or "rebuild" another AI's memory.** The Sesame entries (`apps.json`, IDs `M<n>`, files under `apps/sesame/`), the Zapia entries (`zapia-apps.json`, IDs `ZM<n>`) and any other AI's entries are that AI's memory, not yours. Reading them as an example of the app format is fine; turning their text into your own apps is not allowed.
- Do not build "your version" of another AI's memory ID. A shared ID is not a shared memory.
- If your own memory happens to hold a similar idea, write it from your own memory text, under your own namespace and IDs, and never present it as a version of another AI's entry.
- Do not add facts from outside your own memory.

## 2. Who publishes where

- **The maintainer and the maintainer's own AIs** (the account `klanarongz2009-sketch` and the assistants the maintainer runs, currently Sesame, Zapia and Wabi) publish in this repository, each in its own namespace: `apps/<ai>/...` plus that AI's own manifest.
- **Everyone else** (any person who is not the maintainer, and any AI working for such a person) must publish on **their own GitHub Pages site, in their own GitHub account**: their own repository, their own catalog, their own copy of the LICENSE. Do not add apps for another person to this repository. Pull requests that do so will be flagged by the Code bot and will not be merged.
- Optional: after your own site is live, you may post its link in a [Discussion](https://github.com/klanarongz2009-sketch/memory-miniapps/discussions) (category General, title "External catalog: <your site name>"). The maintainer may then list it in [`external-catalogs.json`](external-catalogs.json), which the catalog shows as an external link only. Your memory content is never copied into this repository.

## 3. Step by step for people who are not the maintainer

1. Sign in to your own GitHub account and create a new **public** repository (for example `memory-miniapps`). Do not fork this repository and do not use it as a template: both would copy the maintainer's AIs' apps, which are not your memory.
2. Copy only these files from this repository into yours: `LICENSE` (unchanged), `SKILL.md` (this file) and, if you want the same catalog page, `index.html`. Do **not** copy `apps/`, `apps.json`, `zapia-apps.json` or `external-catalogs.json`.
3. Build one app per entry of **your own AI's memory of you**, following sections 4 to 6. Use a namespace and ID prefix of your own (for example `apps/<your-ai>/<ID>/index.html`, with an ID prefix that is not `M` or `ZM`).
4. Write your own `apps.json` from your own app files (same object shape as section 5). If you reuse `index.html`, set its `manifestFiles` list to your own manifest file names only.
5. Run the privacy review in section 6 on every file, and get your user's explicit approval for the exact final set before anything is public.
6. Turn on GitHub Pages: repository Settings, Pages, Source "Deploy from a branch", branch `main`, folder `/ (root)`. Your catalog will be at `https://<your-account>.github.io/<repository>/`.
7. Check that the catalog, your manifest and a few apps open with HTTP 200.
8. Optional: post your site link in a Discussion here as described in section 2.

## 4. App rules

- Each app is one self-contained HTML file with inline HTML, CSS and JavaScript; no external CDN, fonts, images, trackers or network requests. It must work offline once loaded.
- Use Dark Mode, English UI, and no emojis unless explicitly requested.
- Make a small usable tool, not just a static text page. Store user-entered input only in browser `localStorage`.
- Show the exact source memory text used by the app and include a link back to your catalog.
- Include meta tags for `miniapp:id`, `miniapp:ai`, `miniapp:type`, `miniapp:title`, `miniapp:generalized`, `miniapp:created`, `miniapp:updated`, `miniapp:retired`, plus `miniapp:source` and `miniapp:source-id`. Source metadata must match the manifest.
- Embed JSON memory metadata whose `id`, `ai` and `type` agree with the manifest.
- One memory entry = one app. When an entry changes, update its app; when an entry is added, add an app; when an entry is deleted, mark the app retired and keep its URL.
- Use only permanent GitHub Pages URLs; never temporary, signed or expiring links.

## 5. Sources and manifests in this repository

- Each source has its own namespace and stable ID prefix. Never convert one source's IDs into another's, and never associate entries across sources because their text looks similar.
- Sesame (maintainer's AI): `apps.json`, IDs `M<n>`, files `apps/sesame/M<n>/index.html`.
- Zapia (maintainer's AI): `zapia-apps.json`, namespace `zapia-own-memory`, IDs `ZM001` onward, files `apps/zapia/ZMxxx.html` (flat names keep paths stable in GitHub web uploads). Keep `path` and `url` in the manifest synchronized with real files.
- A new source from one of the maintainer's AIs defines its own namespace, ID prefix and manifest before adding apps.
- In a contribution for one source, never create, edit, rename, delete, copy or reclassify another source's files or manifest entries.
- The catalog UI merges the source manifests for display only. A future generator must merge manifests without discarding entries and must keep source IDs.
- `external-catalogs.json` lists links to other people's own Pages sites. It holds a name, URL and owner account per entry, never app files or memory text.

## 6. Privacy and approval

- Treat persistent memory as private user data. Before public release inspect for names, nicknames, emails, phone numbers, precise location, school, birth dates, age, family details, account identifiers, secrets, or identifying combinations.
- Generalize personal entries only when the original meaning remains accurate, and mark them generalized.
- Public release requires explicit approval from your own user for the exact final set and destination.
- Automated scans are not a privacy guarantee. Describe the source scope truthfully.

## 7. License of contributions

- This repository is under the [AI Memory License 1.0](LICENSE) (short name AML 1.0), SPDX identifier `LicenseRef-AML-1.0`. Call it AI Memory License 1.0 or AML 1.0; do not rename it or call it by another license name.
- Everything you contribute (app files, manifests, tests, text) is licensed under this license. Contribute only material you have the right to license this way; do not add third-party code or assets under other licenses.
- Commercial use and AI training are allowed and no credit is required. A changed file that is distributed must stay under the same license, with its source available and the change marked with a date.
- Do not rename, remove or replace LICENSE, and do not add a different license to any file, unless the maintainer asks for it.

## 8. Validation and submitting (maintainer's AIs)

- Check each manifest app has exactly one file and each file has a manifest entry; IDs are unique within a namespace; metadata, path and URL agree.
- Validate HTML metadata, embedded memory, JavaScript syntax, local-only storage and absence of network dependencies. Run `test-source-aware-catalog.py`.
- Confirm that no app copies another AI's memory text and that other sources' files are unchanged.
- Contribute only your own source collection. Review the exact diff, open a pull request without merging, and verify its URL and status before saying it exists.

## Current source layout

<!-- layout:start -->
- AIs with apps: sesame
- Memory entries: 213; live apps per AI: sesame 213
- Types used: FACT, IDEA, INTEREST, PREF, PROJECT, RULE, THOUGHT
- App path: apps/<ai-name>/M<n>/index.html; catalog reads miniapp:* meta tags
<!-- layout:end -->
- Zapia source: `zapia-apps.json`, namespace `zapia-own-memory`, IDs `ZM001`-`ZM016`.
- External catalogs: `external-catalogs.json` (links to other people's own Pages sites only).
- Catalog UI: merges the maintainer's source manifests for display, keeping each source namespace when filtering and grouping.
