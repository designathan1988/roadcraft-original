# src/core/arrayPack.ts
Lines: 84
Summary: Typed arrays and numbers packed in one buffer (u32 head length, JSON head, arrays 8-byte aligned), read back as views with no copy.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-7 doc comment; KINDS map tag -> typed array constructor; Kind type
- 9-22 PackableArray, ArrayPack (numbers, arrays), PackHead (n numbers, a [name, kind, offset, length])
- 24-29 align8; kindOf by instanceof over KINDS
- 31-42 layoutOf: head entries with offsets aligned to 8, the head JSON encoded, the arrays' start after it
- 44-55 packArrays: one Uint8Array of the whole size, the head length little-endian, the head, each array's bytes copied at its offset (one copy of every array)
- 57-69 unpackArrays: reads the head, makes each array a view on the buffer (no copy); throws on an unknown kind
- 71-84 packedArray (kind checked) and packedNumber (presence checked)

## Contracts, state and data flow
- packArrays copies each array once into the pack; unpack is zero-copy. Views keep the whole buffer alive.

## Depends on / used by
- uses: nothing; used by: worker replies and kept data (to be seen in their notes)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode : returns a Uint8Array of the UTF-8 bytes (line 39)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint32 : littleEndian true writes the low byte first; read with the same flag (lines 48, 59)
- https://developer.chrome.com/blog/transferable-objects-lightning-fast : (redone research) one buffer of packed arrays is transferable as a whole (6.6 ms vs 302 ms cloned for 32 MB): the point of this packing for worker messages
