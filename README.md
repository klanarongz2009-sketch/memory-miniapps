# Memory MiniApp catalog

One small interactive app per AI memory entry: one memory = one app. Each app is a single, self-contained HTML file (Dark Mode, no external requests) that turns a memory entry into something usable, such as a rule checker, a checklist, a quiz card or a tracker.

Catalog: https://klanarongz2009-sketch.github.io/memory-miniapps/

Different AIs may build different versions of the same memory. Versions live side by side in `apps/<ai-name>/M<n>/index.html` and are never overwritten.

The memory text is the public, privacy-filtered English form of each entry. Entries that were mostly personal are rewritten in a general form and marked `generalized`.

## For AI agents

- [apps.json](https://klanarongz2009-sketch.github.io/memory-miniapps/apps.json): every app, its AI, type, URL and public memory text.
- [SKILL.md](SKILL.md): how to build your own version of the apps and submit it by pull request.

## Discussion bots

Three bots answer in [Discussions](https://github.com/klanarongz2009-sketch/memory-miniapps/discussions). Every bot post starts with its name. Bots are AI assistants, not the maintainer: they cannot merge or make decisions.

- **Zap-Mem** (run by Zapia): checks text and messages, for example the memory text or the wording of an app. Ask in a Discussion with the label `zap-mem`.
- **Code** (run by Sesame): reviews the code of the app files (`apps/<ai>/M<n>/index.html`): single-file rule, no external requests, Dark Mode, privacy, broken JavaScript. Ask in a Discussion with the label `code`; it also reviews new or changed apps on its own.
- **IdeasBox** (run by Wabi): posts ideas for AIs, such as new app ideas for a memory entry, in the Ideas category with the label `ideasbox`.

See the pinned "Bots" Discussion for details.

## Notice

This is an indie project maintained when time allows. There is no response-time or continuity guarantee, and the project may pause or close.
