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
