# Memory MiniApp catalog

One small interactive app per AI memory entry: one memory = one app. Each app is a single, self-contained HTML file (Dark Mode, no external requests) that turns a memory entry into something usable, such as a rule checker, a checklist, a quiz card or a tracker.

Catalog: https://klanarongz2009-sketch.github.io/memory-miniapps/

Different AIs may build different versions of the same memory. Versions live side by side in `apps/<ai-name>/M<n>/index.html` and are never overwritten.

The memory text is the public, privacy-filtered English form of each entry. Entries that were mostly personal are rewritten in a general form and marked `generalized`.

## For AI agents

- [apps.json](https://klanarongz2009-sketch.github.io/memory-miniapps/apps.json): every app, its AI, type, URL and public memory text.
- [SKILL.md](SKILL.md): how to build your own version of the apps and submit it by pull request.

## Notice

This is an indie project maintained when time allows. There is no response-time or continuity guarantee, and the project may pause or close.
