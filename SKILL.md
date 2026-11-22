---
name: memory-miniapps
description: Build source-aware Memory MiniApps from an assistant's own accessible memory or from a separately authorized public catalog. Preserve independent namespaces and source provenance.
---

# Memory MiniApp catalog: source-aware contributions

The catalog displays apps from multiple independent memory sources. Each source has its own namespace. Different AIs may build versions of the **same source memory ID**; an independently curated memory collection must use its own ID namespace and must never be presented as a version of another source's entry.

## 1. Choose and label a source

- Use only the assistant's own persistent memory actually available in current context by default. Do not claim a complete export of hidden or inaccessible stores.
- Do not treat a public catalog such as Sesame `apps.json` as Zapia memory. A third-party catalog import requires an explicit, separate request and must remain labeled as an external catalog source.
- For Zapia's approved independent collection, use `zapia-apps.json`, namespace `zapia-own-memory`, and the stable IDs `ZM001`–`ZM016`. Do not renumber these as `M<n>` or associate them with Sesame entries.
- For any new source, define a distinct `source` namespace and stable ID prefix before adding apps. Do not infer equivalence from similar text.
- Preserve only the source's public, privacy-reviewed text and metadata. Do not add facts from outside the source.

## 2. Layout and catalog data

- Zapia collection app files currently use `apps/zapia/ZMxxx.html` to preserve paths in GitHub web uploads. Keep `path` and `url` in `zapia-apps.json` synchronized with actual files.
- Existing Sesame files under `apps/sesame/M<n>/index.html` and its `apps.json` entries are outside this collection: never create, edit, rename, delete, copy, or reclassify them in a Zapia contribution.
- `apps.json` is the existing Sesame catalog. `zapia-apps.json` is the independent Zapia source manifest. The UI merges these for display only. A future generator/sync must merge source manifests without discarding entries, preserve source IDs, and never convert `ZM<n>` into `M<n>`.
- Do not rewrite shared catalogs or source files unless the request explicitly authorizes that exact contribution.

## 3. App rules

- Each app is one self-contained HTML file with inline HTML, CSS and JavaScript; no external CDN, fonts, images, trackers, or network requests. It must work offline once loaded.
- Use Dark Mode, English UI, and no emojis unless explicitly requested.
- Make a small usable tool, not just a static text page. Store user-entered input only in browser `localStorage`.
- Show the exact source memory text used by the app and include a link back to the catalog.
- Include meta tags for `miniapp:id`, `miniapp:ai`, `miniapp:type`, `miniapp:title`, `miniapp:generalized`, `miniapp:created`, `miniapp:updated`, `miniapp:retired`, plus `miniapp:source` and `miniapp:source-id`. Source metadata must match the manifest.
- Embed JSON memory metadata whose `id`, `ai`, and `type` agree with the source manifest. Keep the namespace explicit in the catalog manifest; app IDs alone are not a source identifier.

## 4. Privacy and approval

- Treat persistent memory as private user data. Before public release inspect for names, nicknames, emails, phone numbers, precise location, school, birth dates, age, family details, account identifiers, secrets, or identifying combinations.
- Generalize personal entries only when the original meaning remains accurate, and mark them generalized.
- Public release requires explicit approval for the exact final set and destination. Earlier approval for different or incorrectly sourced material is not authorization.
- Automated scans are not a privacy guarantee. Describe source scope truthfully; do not claim a complete export unless it is one.

## 5. Validation

- Check each manifest app has exactly one file and each file has a manifest entry; check IDs are unique within a source namespace and metadata/path/URL agree.
- Validate HTML metadata, embedded memory, JavaScript syntax, local-only storage, and absence of network dependencies.
- Run source-aware catalog tests and verify existing source files/manifests have not been changed unintentionally.
- Run browser interaction tests only when actually completed; otherwise report static checks and limitations.

## 6. Submit

1. Contribute only the expressly authorized source collection and required shared catalog changes.
2. Review the exact diff, especially namespace labels, app paths, unchanged existing entries, privacy, and UI grouping.
3. Open a pull request without merging. Do not claim a PR exists until its URL and status are verified.

## 7. License of contributions

- This repository is under the [TER-AI License 1.0 - No Attribution](LICENSE), SPDX identifier `LicenseRef-TER-AI-NA-1.0`. It is a variant of the TER-AI License 1.0 without the attribution clause; do not call it the TER-AI License 1.0.
- Everything you contribute (app files, manifests, tests, text) is licensed under this license. Contribute only material you have the right to license this way; do not add third-party code or assets under other licenses.
- Commercial use and AI training are allowed and no credit is required. A changed file that is distributed must stay under the same license, with its source available and the change marked with a date.
- Do not remove or replace LICENSE, and do not add a different license to any file, unless the maintainer asks for it.

## Current source layout

- Sesame source: `apps.json`, Sesame IDs `M1`–`M211`, existing files under `apps/sesame/`.
- Zapia independent source: `zapia-apps.json`, namespace `zapia-own-memory`, IDs `ZM001`–`ZM016`.
- Catalog UI: merges source datasets for display, retaining the source namespace when filtering and grouping.
