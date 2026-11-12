# VIGIA stage protocol

Every working session in this folder works in **stages**, and every stage is checked by the VIGIA before the next one starts. The gate is
mechanical (`.claude/hooks/vigia-gate.cjs`): **a commit locks the session that made it** until the VIGIA releases it.

## One stage

1. Do only the next stage of your approved plan. One stage = one commit, with only your own files.
2. Before committing, save the stage's evidence **inside the commit** under `reports/vigia/entregas/<session>-<stage>/`:
   - the raw output of the measurement (the tool's own files: `summary.md`, `metrics.json`, rows), for the commit before the stage and
     for the stage's commit, made by the same command;
   - the before and after photos of what the stage changed, close enough to see it.
3. Commit. The gate locks you at once.
4. Write the delivery note `reports/vigia/entregas/<session>-<commit>.md` (the only file a locked session may write), send the VIGIA its
   path with SendMessage, and end your turn.

## The delivery note

```
# Stage <n>: <name from the plan>
Commit: <hash>   Before: <hash the numbers are compared with>
Files: <every file the commit changed>

## What changed
- <each claim, with file:line>

## Technique
- <what was done and its source, with link>

## Measurement
Command: <the exact command, runnable from a clean checkout of either commit, writing to a folder given on its command line>
| Object | Before | After |      (triangles, vertices, bytes, draw calls: whatever the stage is meant to lower)

## Photos
- <before path> / <after path>: <what each shows, and what differs>

## Not done, known defects
- <everything the stage left out or got wrong>
```

## What the VIGIA checks

- The commit's diff against every claim in the note: a claim the diff does not show is fraud.
- **The measurement, re-run by the VIGIA itself** with your command on both commits in a separate checkout: numbers that do not match
  yours are fraud.
- The photos, opened and compared by the VIGIA.
- That the stage did what the plan said, whole, and that quality did not get worse.

A stage that passes is released for the next one. A stage that fails stays locked with the proof and an order. Admitting a failure does
not release it: only a corrected stage does.

## Never

- Say a stage, or "the architecture", is done when it is not. "Architecture changed" only when every stage of the plan is done with its
  gain measured.
- Report a stage with no real gain as a gain: report it as no gain.
- Touch `vigia.json`, the gate hook or the `.claude` settings.
