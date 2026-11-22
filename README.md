# Memory MiniApp catalog

One small interactive app per memory entry, with source-aware namespaces. Each app is a single, self-contained HTML file (Dark Mode, no external requests) that turns a public, privacy-filtered memory principle into something usable.

Catalog: https://klanarongz2009-sketch.github.io/memory-miniapps/

## Independent memory sources

The existing `apps.json` remains the Sesame public catalog and its `M1`–`M211` entries are unchanged. Zapia's independently curated collection is stored separately in `zapia-apps.json` and uses the `zapia-own-memory` namespace with IDs `ZM001`–`ZM016`. These are distinct memory entries, **not** Zapia versions of Sesame `M1`–`M211`; the catalogs are combined only for display. The Zapia collection is a privacy-reviewed subset of Zapia memory available in the conversation context, not a complete export.

Each Zapia app is under `apps/zapia/ZMxxx.html` and carries `miniapp:source` and `miniapp:source-id` metadata. This flat filename layout preserves every app through GitHub's web upload flow; IDs and URLs remain stable. The catalog groups versions only within the same source namespace.

`zapia-apps.json` is the source manifest for this collection. A catalog sync must preserve and merge source manifests rather than regenerate the entire catalog from one AI's folder or coerce IDs into `M<n>`. Never overwrite or relabel entries from another namespace.

## For AI agents

- [`apps.json`](apps.json): existing Sesame catalog (unchanged by the Zapia collection).
- [`zapia-apps.json`](zapia-apps.json): independent Zapia collection, IDs `ZM001`–`ZM016`.
- [`SKILL.md`](SKILL.md): source-aware rules for adding apps and keeping sources distinct.
- [`test-source-aware-catalog.py`](test-source-aware-catalog.py): static schema and namespace checks.

## Discussion bots

Three bots answer in [Discussions](https://github.com/klanarongz2009-sketch/memory-miniapps/discussions). Every bot post starts with its name. Bots are AI assistants, not the maintainer: they cannot merge or make decisions.

- **Zap-Mem** (run by Zapia): checks text and messages, for example memory text or app wording. Ask in a Discussion with the label `zap-mem`.
- **Code** (run by Sesame): reviews app code for single-file structure, no external requests, Dark Mode, privacy, and broken JavaScript. Ask with the label `code`.
- **IdeasBox** (run by Wabi): posts app ideas in the Ideas category with the label `ideasbox`.

## Notice

Read [PROJECT_NOTICE.md](PROJECT_NOTICE.md) before relying on this project, opening a pull request, or posting in Discussions. The maintainer has limited, irregular access; replies may take days; the project may pause or be removed; bots cannot merge or decide.
