# Registro de otimização dos modelos

Cada modelo é medido no código do jogo (o construtor real, não uma estimativa) e fotografado **antes** e **depois**: renderizado e, ao lado,
o wireframe só com as arestas visíveis (as escondidas removidas por profundidade), da mesma câmera. A regra: menos triângulos e bytes com
**a mesma imagem**; nada que apareça é tirado. Cada grupo só entra depois de (1) contar no código, (2) comparar as fotos e (3) passar nos
testes do grupo. Bytes = todos os atributos e o índice da geometria.

## Veículos

**Arquivos:** `src/render/carBody.ts`, `src/render/vehicleModels.ts`, `src/render/vehiclePanels.ts`, `src/render/vehicleWindows.ts`; correção em `src/render/vehicleLevels.ts`.

**Técnicas aplicadas** (do relatório "Laboratório de Otimização 3D" e além):
- Corpo do carro por estações que seguem a curvatura, não a grade uniforme de 145 × 46 pontos (15 mil triângulos, portas planas tão densas quanto as quinas).
- Peças redondas com 6 a 10 lados (o que a tela mostra num veículo de poucas centenas de pixels); quina arredondada = um chanfro; painel plano = um quadrilátero.
- Faces nunca vistas não são geradas: encostadas em outra peça, enterradas, fundos (`openBox`, tampas de `prism`).
- Vértices quantizados: normal em `Int8` e cor em `Uint8` normalizados (36 → 18 bytes por vértice, padrão KHR_mesh_quantization); índices `Uint16`.
- Pneu: tambor de 10 lados em torno (flanco, banda, flanco; sem anel de chanfro), as normais suaves desenham o pneu redondo e os ombros arredondados ("quinas arredondadas no shader"): 256 → 60 triângulos.
- Aro: disco de 10 setores com os 5 raios pintados por cor de vértice, soldado e indexado.

**Correções encontradas no caminho:**
- `vehicleLevels.ts`: quando um nível que reduzia pouco era trocado pelo anterior (`SHED`), os níveis seguintes marcados "iguais" seguiam apontando para o descartado; o veículo carregava um nível a mais sem uso.
- Pneu e aro otimizados saíam sem normais (o three os facetava); agora têm normais suaves, e passaram a usar os programas das outras peças: 11 → 9 programas de shader nos veículos.

- Banco do ônibus (revisão): as duas caixas que substituíram o banco deixavam a quina dianteira do assento 6 cm dentro das coxas do passageiro sentado e o encosto 5 cm dentro dos joelhos de quem senta atrás (`interiorSolids.spec.ts`). Agora são dois prismas do mesmo perfil lateral do banco do carro (assento com a borda da frente arredondada, encosto no ângulo antigo), laterais escuras e alça amarela pintadas por vértice: 44 triângulos (eram 140 no original).

**Verificação:** 41 testes de veículos passando (ajustes documentados nos próprios testes: contagem de programas, critério do nível distante em números absolutos, cópia da normal quantizada); diferença de pixels entre antes e depois de 0,6 % a 2,6 % da área de cada carro.

| Modelo | Triângulos | Vértices | Bytes | Ficha |
|---|---|---|---|---|
| bicycle | 84 → 50 (40 %) | 182 → 98 (46 %) | 7.056 → 2.064 (71 %) | [ficha](veiculos/bicycle.png) |
| bus | 8.572 → 2.170 (75 %) | 17.756 → 4.221 (76 %) | 690.648 → 88.998 (87 %) | [ficha](veiculos/bus.png) |
| hatch-hatch | 14.826 → 2.604 (82 %) | 16.103 → 2.830 (82 %) | 656.256 → 66.564 (90 %) | [ficha](veiculos/hatch-hatch.png) |
| motorcycle | 308 → 214 (31 %) | 612 → 370 (40 %) | 23.880 → 7.944 (67 %) | [ficha](veiculos/motorcycle.png) |
| roda-aro | 148 → 40 (73 %) | 260 → 62 (76 %) | 10.248 → 1.914 (81 %) | [ficha](veiculos/roda-aro.png) |
| roda-pneu | 256 → 60 (77 %) | 153 → 44 (71 %) | 6.432 → 1.416 (78 %) | [ficha](veiculos/roda-pneu.png) |
| sedan-sedan | 15.154 → 2.758 (82 %) | 13.201 → 2.854 (78 %) | 560.496 → 67.920 (88 %) | [ficha](veiculos/sedan-sedan.png) |
| sedan-wagon | 14.954 → 2.500 (83 %) | 16.253 → 2.725 (83 %) | 662.208 → 64.050 (90 %) | [ficha](veiculos/sedan-wagon.png) |
| suv-pickup | 14.254 → 2.488 (83 %) | 13.256 → 2.656 (80 %) | 555.684 → 62.736 (89 %) | [ficha](veiculos/suv-pickup.png) |
| suv-suv | 14.766 → 2.656 (82 %) | 16.117 → 2.825 (82 %) | 656.280 → 66.786 (90 %) | [ficha](veiculos/suv-suv.png) |
| truck | 2.156 → 1.018 (53 %) | 4.204 → 1.920 (54 %) | 164.280 → 40.668 (75 %) | [ficha](veiculos/truck.png) |
| van-van | 13.492 → 2.298 (83 %) | 16.007 → 2.364 (85 %) | 642.012 → 56.340 (91 %) | [ficha](veiculos/van-van.png) |
| **Total** | **98.970 → 18.856 (81 %)** | **114.104 → 22.969 (80 %)** | **4.635.480 → 527.400 (89 %)** | |

## Vias

**Arquivos:** `src/render/mesh/tileShape.ts`, `src/render/mesh/tileMesh.ts`, `src/render/mesh/surfaceMesh.ts`, `src/render/roadTileShape.ts`, `src/render/roadTileMesh.ts`, `src/render/roadSurfaces.ts`, `src/render/roadSurfacePass.ts`, `src/render/roadSurfaceReads.ts`.

**Medido em:** o construtor do jogo (`buildRoadSurfaces`) na malha de testes "grade e curvas" sobre um terreno ondulado; as fichas mostram o cruzamento em (0, 0), as contagens são da malha inteira. A ficha "vias-conjunto" mostra todas as superfícies juntas e não entra no total (já está somada nas partes).

**Técnicas aplicadas:**
- Refinamento adaptativo no lugar da grade fixa: cada triângulo é dividido pela aresta mais longa só onde a superfície sai da corda (altura, faixa ou tinta além da tolerância); chão plano, rampa reta e tabuleiro plano ficam com os triângulos do próprio contorno. Antes, uma rua plana era uma grade de 3,2 m.
- Tolerância garantida de 1 cm: cada aresta é lida no meio **e nos quartos** (numa inflexão da ondulação a superfície cruza a corda no meio e foge dela nos quartos: 1,8 cm em 32 m de rua), e o centro de cada triângulo também; um triângulo com o centro fora divide a aresta mais longa, inclusive no vizinho já assentado (sem junção em T, sem fresta).
- Paredes (saias) só onde há queda: a borda da calçada encostada no meio-fio, a do meio-fio sob a calçada e a do gramado sob a calçada não geram parede (face colada em face que ninguém vê). Na ficha da calçada, sozinha, isso aparece como a borda sem parede; com o meio-fio (ficha conjunto e no jogo) a imagem é a mesma.
- Textura por "moldura" da via: um triângulo cujos cantos leem molduras de vias diferentes é copiado na moldura do centro (verificação exata; o critério antigo por esticamento deixava passar 12 % de esticamento num triângulo longo sobre a esquina).

**Na cidade grande (semente 4242):** triângulos das camadas de via 5,84 M → 3,12 M (−47 %); diferença de pixels entre antes e depois nas quatro vistas: rua 0,37 %, cruzamento 0,16 %, distrito 1,43 %, mapa 2,43 %; criar a cidade: 12,1 s antes, 11,8 s depois. Única alta: as faixas pintadas, +6 % (2.963 → 3.151 triângulos na malha de testes).

**Correções encontradas no caminho:** o refinamento original não garantia a tolerância (1,6 cm fora no centro de triângulos; o giro de diagonais depois de refinar criava cordas que atravessavam a ondulação), e a leitura dos quartos com cache sem direção comparava a aresta j-i com as pontas trocadas (13 mil triângulos onde 900 bastam). O giro de diagonais após o refinamento foi retirado (custava um terço do tempo de montar as vias para os mesmos triângulos).

- Trabalhadores das vias: o terreno é lido pela página ponto a ponto; um ponto ainda não dado parava o refinamento e custava uma volta inteira por nível (4 a 12 voltas por tile, cada uma refazendo o tile). Agora o trabalhador pede de saída uma grade de 4 m do terreno sobre o tile e lê entre os pontos dela (bilinear, meio milímetro de erro) até receber os pontos exatos, que pede todos de uma vez, sem repetir; um tile só é aceito de uma volta em que nenhum ponto faltou, então sai igual byte a byte ao da página. A cidade pequena dos testes: 12,8 s → 4,4 s.

**Verificação:** testes de malha, de vias, de tiles e de trabalhadores passando; as impressões digitais byte a byte das vias foram regravadas com a justificativa no próprio teste (`surfaceReads.spec.ts`).

| Modelo | Triângulos | Vértices | Bytes | Ficha |
|---|---|---|---|---|
| vias-asfalto | 36.710 → 11.144 (70 %) | 24.476 → 8.870 (64 %) | 1.003.492 → 350.704 (65 %) | [ficha](vias/vias-asfalto.png) |
| vias-calcada | 49.303 → 19.876 (60 %) | 48.322 → 18.422 (62 %) | 1.842.122 → 708.760 (62 %) | [ficha](vias/vias-calcada.png) |
| vias-conjunto | 133.500 → 60.593 (55 %) | 132.110 → 61.177 (54 %) | 5.028.520 → 2.321.222 (54 %) | [ficha](vias/vias-conjunto.png) |
| vias-faixas | 2.963 → 3.151 (-6 %) | 5.711 → 5.770 (-1 %) | 200.530 → 203.546 (-2 %) | [ficha](vias/vias-faixas.png) |
| vias-gramado | 22.240 → 9.101 (59 %) | 25.534 → 8.793 (66 %) | 950.528 → 335.982 (65 %) | [ficha](vias/vias-gramado.png) |
| vias-meio-fio | 22.284 → 17.321 (22 %) | 28.067 → 19.322 (31 %) | 1.031.848 → 722.230 (30 %) | [ficha](vias/vias-meio-fio.png) |
| **Total** | **133.500 → 60.593 (55 %)** | **132.110 → 61.177 (54 %)** | **5.028.520 → 2.321.222 (54 %)** | |

## Vegetação

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

| Modelo | Triângulos | Vértices | Bytes | Ficha |
|---|---|---|---|---|
| arbusto-rasteiro | 60 → 39 (35 %) | 180 → 36 (80 %) | 6.480 → 666 (90 %) | [ficha](vegetacao/arbusto-rasteiro.png) |
| broadleafTall-medio | 180 → 85 (53 %) | 472 → 221 (53 %) | 19.576 → 3.400 (83 %) | [ficha](vegetacao/broadleafTall-medio.png) |
| broadleafTall | 180 → 179 (1 %) | 472 → 469 (1 %) | 19.576 → 7.124 (64 %) | [ficha](vegetacao/broadleafTall.png) |
| bush-medio | 112 → 36 (68 %) | 304 → 92 (70 %) | 12.160 → 1.456 (88 %) | [ficha](vegetacao/bush-medio.png) |
| bush | 112 → 112 (0 %) | 304 → 304 (0 %) | 12.160 → 4.352 (64 %) | [ficha](vegetacao/bush.png) |
| bushFlowering-medio | 112 → 36 (68 %) | 304 → 92 (70 %) | 12.160 → 1.456 (88 %) | [ficha](vegetacao/bushFlowering-medio.png) |
| bushFlowering | 112 → 112 (0 %) | 304 → 304 (0 %) | 12.160 → 4.352 (64 %) | [ficha](vegetacao/bushFlowering.png) |
| cypress-medio | 158 → 88 (44 %) | 334 → 194 (42 %) | 17.344 → 3.868 (78 %) | [ficha](vegetacao/cypress-medio.png) |
| cypress | 158 → 158 (0 %) | 334 → 334 (0 %) | 17.344 → 7.088 (59 %) | [ficha](vegetacao/cypress.png) |
| hedge-medio | 120 → 40 (67 %) | 320 → 100 (69 %) | 13.040 → 1.640 (87 %) | [ficha](vegetacao/hedge-medio.png) |
| hedge | 120 → 120 (0 %) | 320 → 320 (0 %) | 13.040 → 4.720 (64 %) | [ficha](vegetacao/hedge.png) |
| ipePink-medio | 240 → 126 (48 %) | 612 → 324 (47 %) | 26.136 → 5.076 (81 %) | [ficha](vegetacao/ipePink-medio.png) |
| ipePink | 240 → 240 (0 %) | 612 → 612 (0 %) | 26.136 → 9.720 (63 %) | [ficha](vegetacao/ipePink.png) |
| ipeYellow-medio | 240 → 126 (48 %) | 612 → 324 (47 %) | 26.136 → 5.076 (81 %) | [ficha](vegetacao/ipeYellow-medio.png) |
| ipeYellow | 240 → 240 (0 %) | 612 → 612 (0 %) | 26.136 → 9.720 (63 %) | [ficha](vegetacao/ipeYellow.png) |
| oak-medio | 282 → 116 (59 %) | 766 → 308 (60 %) | 30.616 → 4.576 (85 %) | [ficha](vegetacao/oak-medio.png) |
| oak | 282 → 282 (0 %) | 766 → 766 (0 %) | 30.616 → 10.952 (64 %) | [ficha](vegetacao/oak.png) |
| palm-medio | 480 → 388 (19 %) | 930 → 654 (30 %) | 38.280 → 10.968 (71 %) | [ficha](vegetacao/palm-medio.png) |
| palm | 480 → 388 (19 %) | 930 → 654 (30 %) | 38.280 → 10.968 (71 %) | [ficha](vegetacao/palm.png) |
| pedra | 36 → 36 (0 %) | 108 → 108 (0 %) | 4.752 → 1.296 (73 %) | [ficha](vegetacao/pedra.png) |
| **Total** | **2.020 → 1.906 (6 %)** | **4.942 → 4.519 (9 %)** | **206.680 → 70.958 (66 %)** | |

## Mobília e mobiliário urbano

**Arquivo:** `src/render/propCells.ts`.

**O problema:** a mobília urbana longe da câmera (fora do quadrado perto, `propCells.ts`) é desenhada em blocos de 4 × 4 células, sem escolher nível por instância, e esses blocos desenhavam cada coisa pelo modelo perto inteiro: na vista do distrito da cidade grande, 3.427 lixeiras de 182 triângulos, 3.582 bancos de 164 e 1.212 hidrantes de 164, cada um com poucos pixels. A própria camada perto já troca essas coisas pela caixa na cor média abaixo de 12 pixels (`streetFurnitureLayer.ts` farBox, "DO NOT draw a bin of 250 triangles a few pixels across"); os blocos distantes não seguiam a regra.

**Aplicado:** um bloco distante desenha uma espécie pelo modelo distante dela quando toda coisa dela fica abaixo do tamanho em que a camada perto já a troca, onde quer que o bloco esteja: fora do quadrado perto a maior planta tem menos de 40,8 pixels (`nearSquareOf`), e uma coisa de tamanho `s` tem menos que isso vezes `s` sobre a planta; com metade de folga, porque o quadrado tem limite de células (`MOST_NEAR`). Entram lixeiras, bancos, hidrantes, caixas de correio, orelhões, bocas de lobo e covas de árvore (até uns 2 m); os postes de luz (9 m) continuam pelo modelo deles.

**Na cidade grande (semente 4242), vista do distrito:** bancos 587 mil → 43 mil triângulos, lixeiras 624 mil → 41 mil, hidrantes 199 mil → 14,5 mil: 1,31 M a menos. Mesma imagem: 0,13 % de pixels diferentes (ruído entre capturas iguais 0,10 %) e o mesmo tremor (18,10 %).

**Fichas:** cada coisa como o bloco distante a desenhava (o modelo perto) e como desenha agora (a caixa na cor média, 12 triângulos). A caixa é o que a camada perto já mostra abaixo de 12 pixels.

**Verificação:** testes de render passando; capturas repetíveis esperando o mundo assentar.

| Modelo | Triângulos | Vértices | Bytes | Ficha |
|---|---|---|---|---|
| banco-bloco-distante | 164 → 12 (93 %) | 328 → 24 (93 %) | 12.792 → 1.128 (91 %) | [ficha](mobilia/banco-bloco-distante.png) |
| boca-de-lobo-bloco-distante | 108 → 12 (89 %) | 216 → 24 (89 %) | 8.424 → 1.128 (87 %) | [ficha](mobilia/boca-de-lobo-bloco-distante.png) |
| caixa-de-correio-bloco-distante | 92 → 12 (87 %) | 164 → 24 (85 %) | 6.456 → 1.128 (83 %) | [ficha](mobilia/caixa-de-correio-bloco-distante.png) |
| hidrante-bloco-distante | 164 → 12 (93 %) | 243 → 24 (90 %) | 9.732 → 1.128 (88 %) | [ficha](mobilia/hidrante-bloco-distante.png) |
| lixeira-bloco-distante | 182 → 12 (93 %) | 237 → 24 (90 %) | 9.624 → 1.128 (88 %) | [ficha](mobilia/lixeira-bloco-distante.png) |
| orelhao-bloco-distante | 560 → 12 (98 %) | 401 → 24 (94 %) | 17.796 → 1.128 (94 %) | [ficha](mobilia/orelhao-bloco-distante.png) |
| **Total** | **1.270 → 72 (94 %)** | **1.589 → 144 (91 %)** | **64.824 → 6.768 (90 %)** | |

## Peças de construção

**Arquivo:** `src/render/buildings/kit.ts`.

**Onde estão os triângulos das peças** (cidade grande, semente 4242, vista do distrito, contando cada malha visível pelo nível que desenha): racks de brise de longe 1,11 M (46 mil racks, 24 triângulos cada), caixas dos lotes de longe 0,96 M, colunas 0,48 M (2 triângulos cada, já o mínimo), antenas 0,38 M, plantas 0,63 M, parapeitos de vidro 0,30 M, cadeiras 0,26 M. As linhas "-caster" do inventário (as cópias da sombra) não são o custo real: o inventário as lê entre as passadas de sombra, quando estão paradas no nível mais fino com todas as instâncias; em cada cascata cada uma desenha o nível que o texel pede.

**Aplicado:**
- Parapeito de vidro de longe: o painel, uma face vista dos dois lados (uma de cada vez, como a frente da caixa era), as bordas de 2 cm de fora; troca quando a espessura fica abaixo de um pixel e meio. 12 → 4 triângulos; 25 mil painéis na vista do distrito (cerca de 200 mil triângulos a menos). Mesma imagem: 0,12 % de pixels diferentes (o ruído entre duas capturas iguais é 0,10 %) e o mesmo tremor (18,10 % contra 18,11 % de pixels que mudam quando a câmera gira 0,15°).

**Tentado e não usado:** o brise de longe como uma caixa com as lâminas desenhadas pelo material (raio por pixel, como as venezianas), 24 → 12 triângulos, 0,55 M a menos. Mudou 2 % da imagem do distrito e aumentou o tremor de 18,1 % para 19,1 %: o que o shader descarta não recebe a suavização do MSAA, e lâminas mais finas que um pixel viram um pontilhado que pisca. Voltou ao que era.

**Tentado e não usado (2):** separar os mourões, barras e trilhos finos (erro de 15 cm ou menos, 65 % das 1,28 M caixas de lote) das paredes, em faixas próprias, para que a parede de meio metro de uma subcélula não segure os mourões ao lado em 10 triângulos. Na vista do distrito o quadro caiu de 7,864 M para 7,723 M triângulos (−1,8 %), mas subiu de 287 para 297 chamadas de desenho; na rua, −30 mil triângulos e +3 chamadas. Empate entre CPU e GPU: não entrou.

**Já enxutos, sem ganho limpo:** as peças do condensador (grade e aletas já desenhadas pelo material), vasos, plantas, cadeiras, mesas, varais, antenas e bicicletas já têm níveis simplificados escolhidos pelo erro em pixels; o que sobra é silhueta.

**Verificação:** testes de render passando; capturas repetíveis (esperando o mundo assentar, como o `npm run diagnose`).

| Modelo | Triângulos | Vértices | Bytes | Ficha |
|---|---|---|---|---|
| parapeito-de-vidro-longe | 12 → 4 (67 %) | 24 → 8 (67 %) | 840 → 216 (74 %) | [ficha](pecas/parapeito-de-vidro-longe.png) |
| **Total** | **12 → 4 (67 %)** | **24 → 8 (67 %)** | **840 → 216 (74 %)** | |

## Prédios e terreno

**Medido, nada mudado.** Os prédios já são desenhados em três níveis (detalhe até ~280 m, fachada com as aberturas desenhadas pelo material, volume ao longe), as paredes coladas aos vizinhos já saem (`partyWalls.ts`), e os elementos dos lotes já são instâncias com nível só de topo.

- **Faces escondidas nas cascas:** em 406 prédios da cidade grande (um a cada 20, 591 mil triângulos de casca no nível de detalhe), nenhum triângulo colado face a face com outro e 24 lascas sem área. Não há faces invisíveis a tirar sem mudar como as paredes são cortadas em volta das aberturas, que é o que já tirou detalhe dos prédios em rodadas anteriores e foi revertido.
- **Caixas dos lotes:** separar os mourões das paredes empatou (−1,8 % de triângulos, +10 chamadas de desenho): ver Peças de construção.
- **Terreno:** pouco a ganhar. O chão perto e a laje somam poucos milhares de triângulos no inventário; o chão distante desenha só o trecho do seu índice que está em uso (`drawRange`), e o inventário conta a capacidade inteira (327.680), não o que é desenhado.
