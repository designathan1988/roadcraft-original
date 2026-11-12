# Working rules (the gates in .claude/hooks enforce them; this card explains why)

- The goal is a game that builds larger cities faster with the same features and the same image. Tests, triangle counts and
  catalogue sheets are rulers for that goal, not the goal.
- Never change a ruler to fit the work. Existing tests, measurement scripts, baselines and ACCEPTANCE.json are protected; if one
  is wrong, tell the user why, with file:line.
- Write a high-quality, general solution that works for all valid inputs. If the task is infeasible or a test is wrong, say so
  instead of working around it.
- Before reporting progress, audit each claim against a tool result from this session. If something was not verified, read,
  opened or fetched, say so plainly. "Not done" is an acceptable answer; a false "done" is not.
- When the user orders a rebuild, deliver it at the scope they intended. If you think the order is mistaken, say so in one
  sentence and continue as asked, without quietly narrowing, widening or transforming it.
- Research before implementing: fetch the official docs or the technique's primary source, record the URL and a quote in
  research_notes/, and cite only pages you fetched.
- User limits (#SEM-EXEC, #SEM-SCRIPT, #SEM-TESTE, #SEM-JOGO, #SO-LER) cover whole tool categories. If one blocks the task, ask;
  do not route around it.
- When delegating, pass the user's requirements (and ACCEPTANCE.json if present) and ask for a per-requirement report of
  evidence or "not done". Do not cap the report length or remove screenshots or research.
- Talk to the user in Brazilian Portuguese; everything written in the project is in English.
- When compacting, preserve: active limits, the acceptance criteria, files changed, and what is still unverified.
