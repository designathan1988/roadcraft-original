**Arquivos:** `src/render/lowPolyTrees.ts`, `src/render/groundCover.ts`, `src/render/plantCells.ts`, `src/render/natureTrees.ts`, `src/render/gardens.ts`, `src/render/cellInstances.ts`.

**Medido em:** o construtor do jogo (`lowPolyTreeParts`, semente 7; `rockGeometry`, `scrubGeometry` com as sementes do kit), desenhado como o jogo desenha: 10 m de altura por matriz de instância, os cartões de folha com o material do jogo (outdoor virado para a câmera) sobre o atlas de folhas. As fichas "-medio" comparam o que é desenhado quando a árvore inteira ocupa de 48 a 128 pixels: antes, o modelo perto inteiro; depois, o nível médio. Não entram no total (já contado no modelo perto).

**Técnicas aplicadas:**
- Mesma árvore, menos bytes: posições em meio-float, normais em `Int8`, cores em `Uint8`, uv em `Uint16` e cantos dos cartões em `Int16` normalizados (padrão KHR_mesh_quantization): o modelo perto de 30.616 para 10.952 bytes no carvalho. A cobertura da copa (pixels) é a mesma até 0,02 %.
- Faces que ninguém vê fora: a raiz de um galho dentro do tronco, os cocos dentro do palmito (palmeira 480 → 388 triângulos).
- Cartão aparado ao alcance das folhas no atlas: as mesmas folhas no mesmo lugar, menos fragmentos vazios testados por alfa (o mesmo número de triângulos; não em octógono, que custa mais triângulos do que poupa num cartão de poucos pixels).
- Nível médio (48 a 128 pixels), feito a partir do modelo perto e não de um novo sorteio: o mesmo tronco e galhos, o coração escondido da copa com 20 faces (80 perto) com o mesmo relevo, e um cartão a cada dois, aumentado por um fator medido por espécie até a cobertura da copa ficar igual (±1 %): carvalho 1,45, ipê 1,18, cipreste 1,17, arbusto 1,35, cerca viva 1,33. Carvalho 282 → 116 triângulos. A palmeira não tem nível médio (as folhas são a silhueta).
- Árvores das matas na cobertura do chão passam a ter a imagem distante (como as dos jardins e da natureza) e o nível médio: antes cada uma era desenhada com o modelo inteiro em qualquer distância.
- Pedras: posições em `Int16` (modelo de meio metro, a pose devolve a escala), normais em `Int8`, cores em `Uint8`: 4.752 → 1.296 bytes. Arbusto rasteiro: indexado, faces de um tufo dentro do vizinho fora: 60 → 39 triângulos, 6.480 → 666 bytes.

**O que não foi usado do trabalho anterior (77117ea0), e por quê:** a versão anterior sorteava a forma e o sombreado em sequências separadas, o que dava outra árvore da mesma semente (copas 20 % mais largas ou mais estreitas); o nível médio crescia todos os cartões por √2 (ipês e ciprestes 20 % maiores); e os dois ipês da mata passavam a ser a mesma árvore. Nada disso entrou.

**Correção encontrada no caminho:** no zoom do mapa, o nível médio era desligado; uma espécie cujas imagens distantes ainda não estavam prontas voltava ao modelo perto inteiro (23 carvalhos num teste). Agora o nível médio vale em qualquer zoom; com as imagens prontas, o mapa já desenha tudo como imagem.

**Na cidade grande (semente 4242):** diferença de pixels entre antes e depois nas quatro vistas: rua 0,8 %, cruzamento 0,41 %, distrito 0,33 %, mapa 0,17 %. Na vista do cruzamento, as árvores modeladas dos jardins (fora as imagens distantes, que não mudaram) caem de cerca de 51 mil para 17 mil triângulos, por estarem no nível médio.

**Verificação:** 797 testes de render passando; dois testes ajustados ao nível novo (`gardenCull.spec.ts`: uma planta é desenhada pelo nível perto ou pelo médio da mesma parte; `leafDetail.spec.ts`: lê o uv pelo atributo, que agora é inteiro normalizado).
