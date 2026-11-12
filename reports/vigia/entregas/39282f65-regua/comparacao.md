# The catalogue's hidden triangles, the old rule and the new one, on the same geometry (759af93f)

Command, from a clean worktree of each, served by `npx vite --config vite.photos.config.ts --host 127.0.0.1 --port <p> --strictPort`:
`node scripts/model-catalog.mjs <out> --url=http://127.0.0.1:<p>/ --no-game "--only=^(buildings \(engine generators\)|building far levels)$" --no-models`

- Old rule: `reports/vigia/entregas/a40805b3-etapa1b/catalogo-depois` (759af93f, already in the repository); measured again by me at 759af93f
  (`39282f65-etapa1/catalogo-antes`, not committed: the same numbers, 1,662,866 / 3,195,915 / 188,568).
- New rule: `catalogo-759af93f-regua-nova` (759af93f + this commit's measure.ts and model-catalog.mjs).

| group (objects) | triangles | vertices | hidden, old rule | hidden, new rule |
|---|---|---|---|---|
| Buildings: made to measure (27) | 379,290 | 740,398 | 53,552 | 23,357 |
| Buildings: far facade (L1) (80) | 756,308 | 1,454,674 | 90,284 | 45,777 |
| Buildings: functions (42) | 379,792 | 726,846 | 30,012 | 17,806 |
| Buildings: presets (11) | 90,120 | 172,802 | 8,728 | 5,070 |
| Buildings: interiors (cut open) (3) | 28,964 | 46,982 | 4,332 | 3,540 |
| Editor previews (3) | 16,038 | 31,013 | 1,641 | 859 |
| Buildings: masses, cell / tile / plate (79 each) | 6,412 / 2,420 / 2,204 | 12,864 / 4,880 / 4,376 | 2 / 2 / 0 | 0 / 0 / 0 |
| Buildings: base (79) | 1,318 | 1,080 | 15 | 15 |
| **total (482)** | **1,662,866** | **3,195,915** | **188,568** | **96,424** |

Triangles and vertices are the same in both (the rule counts, it changes no geometry); all 482 objects present in both.
