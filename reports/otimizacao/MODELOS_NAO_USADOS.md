# Modelos não usados no jogo

Verificado em 2026-10-24 com uma compilação real do jogo (`vite build`, 118 MB) e o código.

- **`public/models/elements` (7,9 MB, 50 arquivos):** todos usados. O plugin de URLs (`scripts/vite/model-urls-plugin.ts`) põe na compilação todo `gltf`, `bin` e `png` da pasta; os 22 modelos que `src/render/elements.ts` nomeia referenciam, pelos seus glTF, exatamente os 50 arquivos. Nenhum sobra.
- **`public/models/people` (313 MB, MakeHuman):** não vai para o jogo. Só as ferramentas de desenvolvedor em `src/dev` (o laboratório de pessoas e o cozimento) importam esses arquivos, e a compilação do jogo só leva `index.html` (não há `cook-people.html` nem `people-lab.html` nela). Na compilação não há nenhum arquivo de pele ou de proxy (`.webp`) do MakeHuman: as pessoas do jogo são as cozidas (`cooked/people`).
- **`public/models/citizens`:** só as duas licenças, que o jogo mostra.
- **`src/render/motion/rocketbox*.json` (14 MB):** não são modelos, são as animações de caminhada que o jogo assa nos corpos cozidos em tempo de execução (`citizenBake.worker.ts`): em uso.

Fora de modelos, a compilação leva cerca de 30 MB de mapas de código (`.js.map`, `build.sourcemap: true` em `vite.config.ts`). Ficaram como estão: é uma escolha de configuração, não um modelo.
