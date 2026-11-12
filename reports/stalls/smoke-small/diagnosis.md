# Stall diagnosis

Series `smoke-small`: 1 valid runs, 6 frames past 33 ms, 158 ms taken from the player (what passed 16.7 ms in each).
Causes by the time they took (sum over their stalls of the interval less one frame). Each with its worst frame as recorded.

## 1. limited by cpu + step hitch:draw/Render

2 stalls, 50 ms (31.6 %). Example: run 1, whole-map, frame 31490: interval 43.4 ms, CPU 34.1 ms, GPU (most of its window) 10.9 ms, 1.91 MB sent, 0.69 MB allocated, 0.37 MB copied on the GPU in its window, 1 job answers.

- buffers allocated: src/render/buildings/gpuBatchedMesh.ts:183 (GpuBatchedMesh.buffer) 0.26 MB
- uploads: src/render/postprocess.ts:174 (scenePass.render) 0.30 MB
- steps: hitch:draw/Render 23.9 ms; hitch:furniture 0.1 ms; hitch:draw/Rebuild 0.0 ms; hitch:cover/sweep 0.0 ms; hitch:draw/Pump 0.0 ms; hitch:cover 0.0 ms
- calls in the frame: drawElementsInstanced 408, bufferSubData 54, bufferData 19, drawArraysInstanced 14, drawArrays 12, drawElements 9, multiDrawElementsWEBGL 3, getParameter 1

## 2. limited by cpu + wait getProgramInfoLog at src/render/postprocess.ts:174 + step hitch:draw/Render

1 stalls, 45 ms (28.3 %). Example: run 1, street-pan, frame 29432: interval 61.3 ms, CPU 48.1 ms, GPU (most of its window) 22.8 ms, 1.99 MB sent, 0.00 MB allocated, 0.00 MB copied on the GPU in its window, 0 job answers.

- uploads: src/render/canyonLight.ts:260 (pass.render) 0.95 MB
- waits: getProgramInfoLog src/render/postprocess.ts:174 (scenePass.render) 3.0 ms
- steps: hitch:draw/Render 13.8 ms; hitch:furniture 0.1 ms; hitch:draw/Rebuild 0.0 ms; hitch:cover/sweep 0.0 ms; hitch:elements 0.0 ms; hitch:draw/Pump 0.0 ms
- calls in the frame: drawElementsInstanced 463, bufferSubData 188, bufferData 157, drawElements 31, drawArraysInstanced 22, drawArrays 16, getProgramParameter 12, getShaderInfoLog 8

## 3. limited by cpu + upload from src/render/buildings/gpuBatchedMesh.ts + buffers allocated by src/render/buildings/gpuBatchedMesh.ts + GPU copies by src/render/buildings/gpuBatchedMesh.ts + step hitch:draw/Render

1 stalls, 23 ms (14.5 %). Example: run 1, whole-map, frame 31471: interval 39.5 ms, CPU 30.3 ms, GPU (most of its window) 12.1 ms, 19.48 MB sent, 73.41 MB allocated, 44.23 MB copied on the GPU in its window, 1 job answers.

- buffers allocated: src/render/buildings/gpuBatchedMesh.ts:183 (GpuBatchedMesh.buffer) 73.41 MB
- GPU copies: src/render/buildings/gpuBatchedMesh.ts:386 (flush) 42.22 MB
- uploads: src/render/buildings/gpuBatchedMesh.ts:411 (GpuBatchedMesh.compact) 13.99 MB; src/render/buildings/gpuBatchedMesh.ts:272 (GpuBatchedMesh.setGeometryAt) 1.52 MB; src/render/buildings/gpuBatchedMesh.ts:286 (GpuBatchedMesh.setGeometryAt) 0.47 MB
- steps: hitch:draw/Render 19.5 ms; hitch:furniture 0.1 ms; hitch:cover/sweep 0.0 ms; hitch:draw/Rebuild 0.0 ms; hitch:draw/Pump 0.0 ms; hitch:cover 0.0 ms
- calls in the frame: drawElementsInstanced 347, bufferSubData 120, drawArraysInstanced 28, drawElements 27, copyBufferSubData 22, getParameter 14, bufferData 14, drawArrays 14

## 4. limited by cpu + upload from src/render/buildings/gpuBatchedMesh.ts + buffers allocated by src/render/buildings/gpuBatchedMesh.ts + compile at src/render/postprocess.ts:174 + wait getProgramInfoLog at src/render/postprocess.ts:174 + step hitch:draw/Render

1 stalls, 20 ms (12.9 %). Example: run 1, street-pan, frame 29535: interval 37.1 ms, CPU 26.0 ms, GPU (most of its window) 21.3 ms, 4.25 MB sent, 5.35 MB allocated, 1.25 MB copied on the GPU in its window, 2 job answers.

- buffers allocated: src/render/buildings/gpuBatchedMesh.ts:183 (GpuBatchedMesh.buffer) 3.82 MB
- GPU copies: src/render/buildings/gpuBatchedMesh.ts:325 (copy) 0.36 MB
- uploads: src/render/buildings/gpuBatchedMesh.ts:272 (GpuBatchedMesh.setGeometryAt) 1.03 MB; src/render/buildings/gpuBatchedMesh.ts:286 (GpuBatchedMesh.setGeometryAt) 0.31 MB
- compiles: compileShader src/render/postprocess.ts:174 (scenePass.render) 0.0 ms; linkProgram src/render/postprocess.ts:174 (scenePass.render) 0.0 ms
- waits: getProgramInfoLog src/render/postprocess.ts:174 (scenePass.render) 10.0 ms
- steps: hitch:draw/Render 18.4 ms; hitch:furniture 0.0 ms; hitch:cover/sweep 0.0 ms; hitch:cover 0.0 ms; hitch:nature 0.0 ms; hitch:elements 0.0 ms
- calls in the frame: drawElementsInstanced 270, bufferData 107, bufferSubData 55, getParameter 22, drawElements 21, drawArrays 12, copyBufferSubData 8, drawArraysInstanced 7

## 5. limited by outside the frame (collector, compositor, GPU process: see the trace) + step hitch:draw/Render

1 stalls, 20 ms (12.7 %). Example: run 1, district-pan, frame 28932: interval 36.8 ms, CPU 3.6 ms, GPU (most of its window) 8.5 ms, 0.00 MB sent, 0.00 MB allocated, 0.00 MB copied on the GPU in its window, 0 job answers.

- steps: hitch:draw/Render 13.9 ms; hitch:furniture 0.1 ms; hitch:draw/Rebuild 0.0 ms; hitch:cover 0.0 ms; hitch:elements 0.0 ms; hitch:draw/Pump 0.0 ms
- calls in the frame: drawElementsInstanced 200, drawArrays 12, drawArraysInstanced 9, drawElements 8, multiDrawElementsWEBGL 3, getParameter 1

