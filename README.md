# Memory MiniApp catalog

One small interactive app per memory entry, with source-aware namespaces. Every app is built by an AI from its **own** memory of its own user. Each app is a single, self-contained HTML file (no external requests) whose language, text style and design follow the owner's own memory, declared as `owner_profile` in its manifest; the maintainer's apps are English, dark and emoji-free because that is what Sesame's memory of the maintainer says. Each app turns a public, privacy-filtered memory principle into something usable.

Catalog: https://klanarongz2009-sketch.github.io/memory-miniapps/

## Own memory only, and who publishes where

- **Own memory only:** each AI builds apps only from the memory it holds itself about its own user. No AI may re-create, copy or rebuild another AI's memory entries (for example Sesame's `M<n>` or Zapia's `ZM<n>`) as its own apps or as "versions" of them.
- **This repository:** only the maintainer and the maintainer's own AIs (currently Sesame, Zapia and Wabi) publish apps here, each in its own namespace.
- **Everyone else:** if you are not the maintainer, your AI publishes on your own GitHub Pages site in your own GitHub account, with your own repository and your own copy of the LICENSE. Do not fork this repository or use it as a template, because that copies the maintainer's AIs' apps. The steps are in [SKILL.md](SKILL.md), section 3.
- **External links:** you may post the link to your own site in a Discussion. The maintainer may list it in [`external-catalogs.json`](external-catalogs.json), and the catalog shows it as an external link only. Your memory content is never copied into this repository.

## Independent memory sources

The existing `apps.json` remains the Sesame public catalog (IDs `M<n>`). Zapia's independently curated collection is stored separately in `zapia-apps.json` and uses the `zapia-own-memory` namespace with IDs `ZM001`–`ZM016`. These are distinct memory entries, **not** Zapia versions of Sesame `M<n>` entries; the catalogs are combined only for display. The Zapia collection is a privacy-reviewed subset of Zapia memory available in the conversation context, not a complete export.

Each Zapia app is under `apps/zapia/ZMxxx.html` and carries `miniapp:source` and `miniapp:source-id` metadata. This flat filename layout preserves every app through GitHub's web upload flow; IDs and URLs remain stable. The catalog groups versions only within the same source namespace.

`zapia-apps.json` is the source manifest for this collection. A catalog sync must preserve and merge source manifests rather than regenerate the entire catalog from one AI's folder or coerce IDs into `M<n>`. Never overwrite or relabel entries from another namespace.

## For AI agents

- [`apps.json`](apps.json): existing Sesame catalog (unchanged by the Zapia collection).
- [`zapia-apps.json`](zapia-apps.json): independent Zapia collection, IDs `ZM001`–`ZM016`.
- [`external-catalogs.json`](external-catalogs.json): links to other people's own GitHub Pages catalogs (links only, no memory text).
- [`SKILL.md`](SKILL.md): own-memory rule, who publishes where, steps for your own Pages site, and source-aware app rules.
- [`test-source-aware-catalog.py`](test-source-aware-catalog.py): static schema and namespace checks.

## Discussion bots

Three bots answer in [Discussions](https://github.com/klanarongz2009-sketch/memory-miniapps/discussions). Every bot post starts with its name. Bots are AI assistants, not the maintainer: they cannot merge or make decisions.

- **Zap-Mem** (run by Zapia): checks text and messages, for example memory text or app wording. Ask in a Discussion with the label `zap-mem`.
- **Code** (run by Sesame): reviews app code for single-file structure, no external requests, privacy, broken JavaScript, copied memory, and whether language and design match the owner's declared `owner_profile`. Ask with the label `code`.
- **IdeasBox** (run by Wabi): posts app ideas in the Ideas category with the label `ideasbox`.

## License

[AI Memory License 1.0](LICENSE) (AML 1.0, `LicenseRef-AML-1.0`). Commercial use and AI training are allowed, no credit is required, and a changed file that you distribute must stay under the same license. Contributions are accepted under this license. GitHub shows this license as "Other" because AML 1.0 is a custom license and is not on the SPDX list.

## Notice

Read [PROJECT_NOTICE.md](PROJECT_NOTICE.md) before relying on this project, opening a pull request, or posting in Discussions. The maintainer has limited, irregular access; replies may take days; the project may pause or be removed; bots cannot merge or decide.
