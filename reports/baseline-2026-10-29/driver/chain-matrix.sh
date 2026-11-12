#!/bin/sh
# The 10 km camera matrix in order, one after the other (item 2).
cd "$(dirname "$0")/.."
node driver/matrix.mjs ten still >> logs/run-ten-still.log 2>&1
node driver/matrix.mjs ten moves all 1 >> logs/run-ten-moves.log 2>&1
node driver/matrix.mjs ten moves rua,bairro pause,2,4 >> logs/run-ten-speeds.log 2>&1
node driver/matrix.mjs ten photos all 1 >> logs/run-ten-photos.log 2>&1
echo MATRIX-CHAIN-DONE
