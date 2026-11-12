# src/desktopShown.ts
Lines: 20
Summary: Whether the desktop window is minimized or hidden, as the shell tells it by a window message (the shell disables background throttling, so document.hidden never says it).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-5 doc comment; DesktopShown {hidden}
- 7-19 watchDesktopShown: a window message listener (own window only) flips `hidden` and tells `changed`
- 20 end of file (blank)

## Contracts, state and data flow
- With backgroundThrottling false the page keeps drawing at full rate whenever the shell does not say minimized/hidden: a window fully covered by another app is "visible" to the game (MDN: the browser would call it hidden).

## Depends on / used by
- uses: window messages from desktop/preload.cjs; used by: main.ts (pausing the loop when hidden)

## Problems found (finding IDs)
- none confirmed here

## To check in other files
- desktop/main.cjs: does it tell "hidden" when the window is fully occluded, or only when minimized? Does main.ts stop drawing on hidden?

## Sources
- https://www.electronjs.org/docs/latest/api/structures/web-preferences : backgroundThrottling false keeps timers and animations unthrottled in the background (line 1)
- https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API : hidden when minimized, in a background tab, fully obscured or the screen off (line 1)
- https://www.electronjs.org/docs/latest/api/structures/web-preferences : (redone research) backgroundThrottling false: animations and timers are not throttled in the background and every frame of the window is still rendered; so a minimized game draws and simulates at full rate unless main.ts stops on this file's signal (to check in main.ts: the frame loop's use of desktopShown)
