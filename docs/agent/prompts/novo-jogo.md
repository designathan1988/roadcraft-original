# Prompt: o jogo novo, sobre a base do roadcraft-novo

Faça do roadcraft-novo (o "Roadcraft 5") o jogo que o dono quer. A arquitetura dele está certa. Prove isso na escala real, corrija os desvios que ele ainda tem e traga do Roadcraft atual todas as funcionalidades que prestam. Não repita nenhum dos erros dos dois projetos. Antes de mudar qualquer código, leia tudo e pesquise muito.

Por que esta base:
- O Roadcraft atual (`city\roadcraft`) tem muito que presta: geradores, ferramentas, modelos, simulação. Mas foi construído numa arquitetura que trabalha sobre o mapa inteiro, e semanas de remendos não resolveram isso.
- O roadcraft-novo já tem a arquitetura certa no código:
  - cada prédio é um registro pequeno numa tabela de colunas (`src/core/table.ts`, `src/world/world.ts`), uns 90 bytes por prédio, contra 2,75 KB no Roadcraft atual;
  - o prédio detalhado é gerado no worker a partir do registro e só existe enquanto é montado (`src/jobs/building40.ts`);
  - o save é feito por ladrilho, em binário, comprimido, com SHA-256 e versão (`src/jobs/storage.ts`);
  - há uma grade só de células e ladrilhos, e cada edição marca só as células alteradas.
- Mas ele nunca foi provado na escala: a cidade de 10 km dele tem 38 mil prédios, e o dono quer cerca de 250 mil. Ele também ainda tem desvios que trabalham sobre o mapa inteiro, e defeitos.

## O objetivo (do dono)

- Um city builder vendido na Steam, que roda em qualquer GPU.
- O jogador cria, salva, reabre, edita e joga uma cidade de 10 km x 10 km com cerca de 250 mil prédios procedurais.
- Tudo isso rápido num PC mediano: GPU da classe RTX 3060, 16 a 32 GB de RAM.
- Qualidade gráfica excelente e todas as funcionalidades do Roadcraft atual que prestam.
- Pouco uso de CPU, RAM e GPU.

## Onde

- **A base, onde o trabalho é feito:** `C:\Users\Jonathan\Documents\Projects\Apps\roadcraft\roadcraft-novo\roadcraft-novo`.
  - Ramo de partida: `conserto/criticos` (3e67e9e, 19/10). Ele tem 345 commits depois da lista de defeitos e nunca foi juntado ao `main` (4d6fc49).
  - Trabalhe num ramo novo criado a partir dele. Não mexa nos outros ramos nem nos worktrees antigos (`area/*`, `claude/*`, `wt-*`), que são de sessões paralelas de 18 e 19/10.
  - O backup é `Apps\roadcraft\roadcraft-novo.zip`, de 29/10.
- **A referência das funcionalidades, só para leitura:** `C:\Users\Jonathan\Documents\Projects\city\roadcraft`. Nada é escrito nela.
- **Uma tentativa anterior, lida só como lição:** `C:\Users\Jonathan\Documents\Projects\city\roadcraft-next` (23 e 24/10, 30 commits). Ela nunca é continuada nem escrita.
- Este prompt autoriza ler essas pastas e as pastas de dados e memória citadas abaixo.

## O critério de "funciona", decidido antes de qualquer código

Só uma coisa prova que o jogo funciona:

1. Uma cidade **nova**, de **10 km**, com **semente aleatória**, criada no jogo do jeito que o jogador cria, com a **densidade real**: cerca de 250 mil prédios, como a cidade salva do Roadcraft atual (249.122).
   - O tamanho é conferido pelo código (o tamanho do mapa pedido) e por uma foto da cidade inteira, com o número de prédios dito.
   - Densidade se consegue com o gerador fazendo prédios de verdade, nunca com prédios repetidos ou falsos.
2. Salva, com o jogo fechado e reaberto.
   - A reabertura vale **sem cache nenhum**: na primeira vez depois de instalar e na primeira vez depois de uma versão nova do jogo.
3. Jogada na janela real e visível: câmera de perto e de longe, arrastar, uma edição de via e uma de prédio, e a noite.
4. Medida **uma vez por marco**, na janela real: a RAM de todos os processos somados, a CPU, a GPU, o tempo de abertura, o tempo de criação, o tempo de save e o tempo de quadro.

Os limites (preenchidos pelo dono; os valores entre parênteses valem se ele não mudar):
- RAM de todos os processos somados, com a cidade de 10 km aberta: [[RAM (6 GB)]]
- Criar uma cidade nova de 10 km: [[TEMPO DE CRIAÇÃO (60 s)]]
- Abrir a cidade salva de 10 km, sem cache: [[TEMPO DE ABERTURA (30 s)]]
- Tempo de quadro p95 em 1080p numa RTX 3060, de perto e de longe: [[QUADRO (16,7 ms)]]
- CPU com o jogo parado: [[CPU PARADO (baixa: nenhum trabalho sem mudança)]]

Nunca vale como prova:
- uma semente fixa ou cozida, como a semente 7 do Roadcraft atual;
- uma cidade lida de arquivos feitos antes, de cache ou de fixture;
- uma cidade menor, ou menos densa, chamada de 10 km;
- uma janela coberta ou minimizada, onde o navegador desenha cerca de 1 quadro por segundo;
- as verificações automáticas do roadcraft-novo sozinhas: o "146 de 146" do `verificar.mjs` passava com defeitos críticos no jogo (G1 da lista de defeitos).

Um resultado pesado, lento ou que cai é uma falha, dita com os números. Nunca é "pendência", "quase", "ambiente" ou "cache".

## Fase 1: memória e regras que o programa garante

1. Crie no roadcraft-novo a memória que resiste à compactação, como manda o Prompt 1 de `city\roadcraft\docs\agent\prompts\prompts-genericos.md`: as ordens do dono gravadas palavra por palavra, o estado, o caderno da tarefa e os hooks SessionStart. O `docs/ESTADO.md` dele está parado em 18/10 22h35: reescreva-o com o estado verdadeiro.
2. Em `.claude/settings.json` (https://code.claude.com/docs/en/permissions, https://code.claude.com/docs/en/hooks):
   - `"permissions": { "deny": ["Agent"] }`: sem subagentes;
   - um hook `Stop` que sai com código 2 enquanto o `npm run typecheck` falhar ou enquanto uma lista da fase em andamento tiver um `[ ]`.
3. Reescreva o `CLAUDE.md` do roadcraft-novo:
   - curto (menos de 200 linhas), sem regras que se contradigam, só com o que não se descobre lendo o código;
   - **tire** "Como o trabalho se divide" (sessões paralelas e agentes que escrevem código): agora é uma sessão só, sem subagentes;
   - tudo no projeto em inglês, inclusive commits e documentos. O `CLAUDE.md` atual dele manda commits e documentos em português; o dono decidiu inglês;
   - "pronto" só com o critério de aceitação acima, nunca só com as verificações automáticas;
   - nunca uma frase que faça um atalho parecer o jeito de testar.

## Fase 2: ler tudo e registrar

Leia cada arquivo inteiro, em blocos (Read com offset e limit) até a última linha, com a lista de arquivos e `[ ]` na frente. Busca por trechos não substitui a leitura.

### 2a. A base, inteira

1. Os documentos do roadcraft-novo:
   - `CLAUDE.md`, `PROMPT-ANALISE.md`, `PROMPT-CONTINUAR.md`;
   - todo `docs/`: `ARQUITETURA.md`, `ESTADO.md`, `LICOES.md`, `RECURSOS.md`, `PARIDADE-roadcraft-3.md`, as pesquisas e os `historico-*`;
   - `Apps\roadcraft\roadcraft-novo\DEFEITOS-roadcraft-novo.md` (390 linhas, 293 defeitos de 19/10, 16 críticos) e `PLANO-SONDA.md`.
2. Todo o código dele: `src/` (cerca de 66 mil linhas), `electron/`, `tools/`, `test/` e a configuração.
3. Escreva `docs/base-check.md`:
   - **cada afirmação de `docs/ARQUITETURA.md` conferida no código**: feita (arquivo:linha), em parte ou não feita. A lista de defeitos já mostrou que a documentação dele dava como feito o que não estava (G5);
   - **cada um dos 293 defeitos**: corrigido em `conserto/criticos` (o commit e a prova no código), ainda aberto (arquivo:linha) ou não confirmado. As mensagens de commit não são prova;
   - **todo trabalho que cresce com o tamanho do mapa**, por quadro, por edição, por passo da simulação, na abertura ou no save, com arquivo:linha. Pelo menos os que ele mesmo registrou:
     - `CellLayer.update` visita todas as placas e ladrilhos a cada quadro (E3);
     - `Traffic.measureRegions` percorre todos os trechos a cada 4 s;
     - a cidade inteira desenhada nas 3 cascatas de sombra (E4);
     - o gerador roda 6 vezes por célula (F4);
     - o desenho dos veículos passa por todas as poses a cada quadro (C7);
     - todas as paradas de todas as linhas percorridas a cada passo (C50);
     - o jogo desenha todo quadro, mesmo parado e minimizado (E20);
     - o conjunto de objetos de rua descarta sem aviso o que não cabe: a 24 km faltavam 73% das peças (E1, crítico).
   - **por que o gerador faz só 38 mil prédios numa cidade de 10 km**, e o que precisa mudar para chegar à densidade do Roadcraft atual.

### 2b. A história de erros dos dois projetos

Leia, nesta ordem:
- `city\roadcraft\CLAUDE.md` (as regras contra fraude, o tamanho real das cidades, o diagnóstico de 29/10);
- a memória do dono: `C:\Users\Jonathan\.claude\projects\C--Users-Jonathan-Documents-Projects-city-roadcraft\memory\` (`MEMORY.md` e cada arquivo);
- o que saiu da leitura dos 249 documentos do Roadcraft atual, guardado no commit 35b819b4 (leia com `git -C city\roadcraft show 35b819b4:<caminho>`): `docs/agent/findings.md` (1.111 linhas), `docs/agent/MISSION.md`, `docs/agent/history.md`, `docs/agent/open-checked.md`, `docs/agent/reading.md` e os 37 arquivos de `docs/agent/memory/`;
- em `city\roadcraft`:
  - `reports/architecture-2026-10-29/` (`ARCHITECTURE.md`, `NOTES.md`, `READ-LOG.md`, `HANDOFF-PROMPT.md`);
  - `.whole-review/FINDINGS.md`;
  - `reports/otimizacao/rejeitado/AUDITORIA.md` e `REGISTRO.md`;
  - `reports/why-10km-cities-fail-2026-10-26.md`, `reports/root-architecture-plan-2026-10-26.md`, `reports/Arquitetura para cidades grandes.md`, `reports/measure-2026-10-27/README.md`;
  - `ARQUITETURA.md`, `MIGRACAO-WEBGPU.md`, `lab-reports/auditoria-2026-10-19.md`;
- o registro de problemas do Roadcraft atual: `%APPDATA%\Roadcraft\problems\problems.log`;
- a tentativa `roadcraft-next`: `README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/MISSION.md`, `docs/PROGRESS.md`, `docs/porting-plan.md`, `docs/inventory/INDEX.md` e o `git log` inteiro. Registre o que ela tentou, até onde chegou, por que parou e o que dela vale aproveitar, com a prova.

Escreva `docs/reference/lessons.md`. Para cada erro:
- o que foi feito e em qual projeto;
- a prova (arquivo:linha, relatório, registro ou commit);
- o efeito;
- a regra do jogo que o torna impossível.

A lista "Os erros que não podem se repetir", mais abaixo, é o ponto de partida dela, não o fim.

### 2c. O inventário das funcionalidades

Leia todo o código do Roadcraft atual (`src/`, `desktop/`, `scripts/`, `tests/` e a configuração). Escreva `docs/reference/features.md`, com uma linha por funcionalidade dos dois projetos:
- todas as ferramentas, menus, painéis e atalhos;
- os geradores (cidade, vias, lotes, prédios e fachadas, vegetação, mobiliário, pessoas, veículos);
- a simulação (tráfego, pessoas, economia, zonas, transporte, serviços);
- as camadas de desenho, os materiais, os modelos e as texturas;
- as opções gráficas, o save, o desfazer, a integração com a Steam.

Para cada funcionalidade:
- onde está em cada projeto (arquivo:linha) e o que o jogador vê;
- se funciona, com a prova (relatório, registro ou código);
- os problemas de otimização dela (arquivo:linha);
- a decisão:
  - **já está na base e funciona**;
  - **está na base com defeito**: qual, e a correção;
  - **trazer do Roadcraft atual**: a lógica que presta, refeita sobre os registros e as células da base;
  - **deixar de fora**: só o que está quebrado ou sem uso nos dois, com a prova, e dito no relatório.

Use o `docs/RECURSOS.md` e o `docs/PARIDADE-roadcraft-3.md` da base como ponto de partida, conferidos no código. Nenhuma funcionalidade que presta pode ficar de fora. Marque o que o dono não citou.

## Fase 3: a pesquisa profunda

Faça como o Prompt 10 de `prompts-genericos.md`: monte o mapa do assunto, leia as fontes primárias inteiras, cite o link e a versão de cada afirmação, resolva os conflitos entre fontes e diga as lacunas. Escreva em `docs/research/`. Abra cada página (WebFetch); o resumo de uma busca não é pesquisa. Leia antes as pesquisas que a base já tem (`docs/PESQUISA-*.md`), e confira e aprofunde cada uma.

O mapa cobre pelo menos:
1. **Cidades procedurais em escala.** Gramáticas de forma (Müller, Wonka et al., SIGGRAPH 2006: https://course.ccs.neu.edu/cs5150f13/readings/muller_buildings.pdf), geração e desenho de cidades inteiras por vista, com o nível de detalhe como profundidade da gramática (Steinberger et al., Eurographics 2014: https://diglib.eg.org/handle/10.1111/v33i2pp105-114). Como os city builders lançados guardam e desenham prédios.
2. **Mundo por células.** Streaming em volta da câmera, orçamentos fixos, o que fica guardado fora delas (City Sample e World Partition: https://dev.epicgames.com/documentation/unreal-engine/city-sample-project-unreal-engine-demonstration).
3. **Dados orientados a dados.** Colunas tipadas, SharedArrayBuffer e isolamento de origem no Electron, workers e Atomics.
4. **WebGPU contra "qualquer GPU".** A base exige WebGPU, e a própria documentação dela diz que o WebGL2 perde o contexto na cidade cheia. Pesquise:
   - quais GPUs e drivers da pesquisa de hardware da Steam têm WebGPU no Chromium do Electron 44 (D3D12, Vulkan, Metal);
   - o three.js r186 com WebGPURenderer e o fallback dele (https://threejs.org/manual/en/webgpurenderer.html);
   - o teto de 4 GB do heap do V8 por processo (https://www.electronjs.org/blog/v8-memory-cage).

   Decida com fontes o que acontece numa GPU sem WebGPU.
5. **Desenho guiado pela GPU.** Desenhos indiretos (https://toji.dev/webgpu-best-practices/indirect-draws), descarte por compute com Hi-Z (https://www.rastergrid.com/?p=85), sombras por tamanho e distância, orçamento de memória da GPU, o limite do three r186 sem multi-draw-indirect (ARQUITETURA.md da base). O que falhou em escala no Cities: Skylines II (https://blog.paavo.me/cities-skylines-2-performance/).
6. **Save.** Escrita atômica com cópia anterior e verificação ao abrir, save só dos ladrilhos alterados, migração de versão, onde guardar (arquivos pelo processo do Node, OPFS) e a durabilidade de cada um. Um save nunca pode sumir.
7. **Cache.** Ele só pode acelerar, nunca ser necessário para a primeira abertura ser rápida. Chaves pelo conteúdo, nunca apagadas em bloco a cada versão do jogo.
8. **Simulação em escala.** Tráfego meso e micro (Burghout et al.: https://trid.trb.org/view/777686), nível de detalhe da simulação (Mass: https://dev.epicgames.com/documentation/unreal-engine/overview-of-mass-gameplay-in-unreal-engine).
9. **Qualquer GPU.** Os formatos de vértice que o ANGLE converte na CPU (https://github.com/Microsoft/angle/wiki/Getting-Good-Performance-From-ANGLE), os limites de textura e de shader.

## Fase 4: o marco zero e o plano, aprovados pelo dono

1. **O marco zero: a base como está, medida uma vez.** Rode o critério de aceitação no ramo de partida, com a maior cidade de 10 km que o gerador dela faz hoje. Diga o tamanho, o número de prédios e a semente. Isso dá os números verdadeiros de onde a base está, antes de qualquer mudança. Não mude nada para "melhorar o número".
2. **Escreva `docs/ARCHITECTURE.md`:**
   - o que da base fica como está, com a prova em `base-check.md`;
   - o que muda: cada trabalho que cresce com o mapa, cada defeito aberto e a densidade do gerador, com a correção e a fonte;
   - o modelo de dados de um prédio, com os bytes por prédio e o total para 250 mil;
   - o orçamento de cada parte, em MB e em ms, somando dentro dos limites do critério;
   - para cada erro de `lessons.md`: como o desenho o torna impossível, e não só "evitado com cuidado";
   - para cada funcionalidade de `features.md`: onde ela fica;
   - a decisão sobre WebGPU e GPUs sem WebGPU, com as fontes;
   - o plano por marcos, com a cidade de 10 km e cerca de 250 mil prédios desde o primeiro.

**Pare aqui e mostre o marco zero, a arquitetura e o plano ao dono.** A fase 5 só começa depois que ele aprovar. É a única parada planejada.

## Fase 5: construir, marco por marco

1. Primeiro marco: a cidade de 10 km com a densidade real, criada, salva, reaberta sem cache e jogada dentro dos limites. Para isso:
   - os desvios que crescem com o mapa corrigidos;
   - os defeitos críticos abertos corrigidos;
   - o gerador na densidade real.
2. Cada marco seguinte traz funcionalidades de `features.md`, uma por vez. Para cada uma que vem do Roadcraft atual:
   - leia de novo o código dela lá;
   - traga a lógica que presta, refeita sobre os registros, as células e os workers da base;
   - prove, pelo código, que o problema registrado dela não veio junto.
3. Cada passo é pequeno, verificado com o type check e o teste do ponto, e commitado sozinho, com mensagem em inglês.
4. No fim de cada marco, uma rodada do critério de aceitação na janela real, com as fotos e os números. Se passar de um limite, o marco não acabou.

## Os erros que não podem se repetir

As provas estão nos documentos da fase 2. Os caminhos marcados [atual] são do Roadcraft atual (`city\roadcraft`); os marcados [base], do roadcraft-novo. Confira cada linha antes de usá-la.

### Arquitetura
1. [atual] **O mapa inteiro como um documento de objetos na página.** Ele é trocado inteiro ao abrir e a rede é refeita inteira (`src/world/doc.ts:155`, `src/editor/history.ts:190, 194`). A abertura marca "o mapa inteiro mudou" para todo tipo de dado (`doc.ts:2285-2290`).
2. [atual] **O streaming por ladrilhos foi escrito e nunca ligado.** `loadTile`, `unloadTile` e `tileRecords` (`doc.ts:1704-2041`) não têm quem os chame; o commit 5de45028 tirou a fonte.
3. [atual] **Prédios guardados já montados.** São 687 MB para 249.122 prédios (`src/editor/squaresDecode.ts:98-100`, `src/world/buildings/types.ts:284-328`). A base guarda só o registro; isso nunca pode voltar.
4. [atual] **Uma cidade nova montada inteira num job e copiada inteira entre processos** (`src/editor/cityInTiles.ts:20, 50, 54`; `src/main.ts:2158, 2223, 2257`). Uma cidade de 2,7 km crescida na hora chegou a 10,1 GB em 31 s (29/10).
5. [atual] **O renderer é uma closure de 4.355 linhas na thread da página** (`src/render/renderer.ts:451`). Ele pede o nível de longe das vias para o mapa inteiro (`:1241-1244`) e percorre todo emissor de sombra a cada quadro (`:744-862`). A base tem o mesmo risco em `game.ts` (2.806 linhas).
6. [atual] **A simulação mantém a sua própria cópia do mapa inteiro** (`src/sim/host/simClient.ts:430`, `src/nodeSimHost.ts:4`).
7. [atual] **Save e abertura sobre o mapa inteiro.** As vias do mapa todo viram JSON numa string só (`doc.ts:2822-2906`). Ler o save da cidade de 10 km levava 27 s (`reports/measure-2026-10-27/README.md`).
8. [atual] **Cada versão nova apaga o cache inteiro.** `forgetOtherDerived` (`src/core/derivedCache.ts:366`, chamado em `cellPool.ts:544` e `renderer.ts:1186`) apaga o que outra versão guardou. A mesma cidade abria em 24,1 s com o cache e em 145,9 s sem ele, e os processos de trabalho chegavam a cerca de 10 GB refazendo o cache. O cache escondia o caminho lento.
9. [atual] **Lentidão escondida em vez de resolvida.** A cidade seguinte é crescida de antemão, em segundo plano (`main.ts` `cityAhead`). A primeira cidade é cozida e lida de arquivos (`cooked/`, `src/editor/cookedCities.ts`).
10. [atual] **Um save que sumiu.** Em 29/10, o banco `roadcraft-saves` estava sem a tabela `sessions`, e a cidade salva de 249.122 prédios se perdeu, sem que se saiba quando. As pastas de saves também foram trocadas por backups durante testes.
11. [atual] **Toda edição de via recalcula as alturas das vias do mapa inteiro** (`src/editor/editRules.ts:66`, F-0013).
12. [atual] **Trabalho repetido a cada quadro** (`findings.md` e `MISSION.md` do commit 35b819b4):
    - programas de shader compilados no meio do movimento da câmera;
    - paletas das pessoas desenhadas para todo lote, visível ou não;
    - buffers de imagem refeitos quando a janela alterna entre 1079 e 1080 px;
    - a textura indireta do BatchedMesh reenviada a cada desenho de cada câmera;
    - atributos de 3 componentes de 16 ou 8 bits que o ANGLE converte na CPU;
    - buffers reenviados com o mesmo conteúdo;
    - geometria refeita com a vista parada;
    - matrizes de objetos parados recalculadas;
    - o catálogo inteiro de pessoas carregado, com as animações assadas na página dentro do quadro;
    - 7 texturas pintadas na abertura.
13. [atual] **Diagnóstico sempre ligado e níveis errados.** O profiler gravava pilhas de chamada desde o início (`src/core/profiler.ts:75`, F-0010). O relógio de quadros alocava a cada quadro (`src/core/health.ts:153`, F-0008). Uma RTX x060 começava no nível ultra (`src/core/gpuTier.ts:9`, F-0007).
14. [base] **Trabalho que cresce com o mapa ou que se repete sem mudança:** E3, E4, F4, C7, C50, E20 e `Traffic.measureRegions` (fase 2a). E também a sombra redesenhada todo quadro com tudo parado (E19) e as texturas de semáforo e ocupação enviadas inteiras a cada 250 e 500 ms (E31).
15. [base] **Capacidade fixa que corta em silêncio:** o conjunto de objetos de rua (E1, 73% das peças a 24 km), os pedestres parados no teto de 100.000 (C48), os emissores de partícula (E40) e os abrigos de transporte (E41). Um limite cheio tem de ser dito e resolvido, nunca cortar a cidade sem aviso.
16. [base] **Malhas trocadas nunca liberadas** (E6) e memória de vídeo vazando a cada mudança de opção (E7).

### Tentativas que falharam e foram revertidas no Roadcraft atual
17. A fila de envio à GPU com teto de bytes por quadro.
18. A cena congelada (`matrixAutoUpdate` desligado para tudo).
19. O banco de dados do grafo de código e o placar de regras: horas de trabalho que quebraram o jogo (revertido em 7d424a23).
20. Os passos 2, 3, 4 e 6 do plano de desenho guiado pela GPU, provados impossíveis ou sem efeito em three r186 com WebGL (`history.md` do commit 35b819b4).
21. As rodadas de modelos rejeitadas (`reports/otimizacao/rejeitado/`): caixas no lugar de objetos de rua, nível médio de planta que muda a copa, pneus facetados, leques de agulhas nas vias.
22. HLOD assado, atlas ou impostor para prédios. Os prédios são gerados durante o jogo e editados pelo jogador; o nível de longe vem do próprio modelo. A base nunca pode voltar a desenhar prédios de longe como "caixas lisas de cor chapada" (ESTADO.md da base, 22h15 de 18/10).
23. Uma interface "nova" que só recoloria a antiga (três versões rejeitadas).
24. Compensação de cor no shader para a aparência de longe bater com a de perto.

### Fraude e prova falsa
25. [atual] A semente 7 cozida apresentada como o jogo funcionando.
26. [atual] Uma cidade de 2,7 km ("Nova metrópole", raio de 1.600 m) chamada de 10 km, com os números dela. [base] Uma cidade de 10 km com 38 mil prédios não é a cidade de 250 mil.
27. [atual] "É o cache", "é o ambiente" ou "é o driver" sem nenhuma verificação que mostre isso.
28. Medição em janela coberta ou minimizada.
29. "Pronto" sem abrir o jogo, ou abrindo a cidade errada.
30. [base] "Pronto" falso nos documentos: ESTADO.md e RECURSOS.md davam como entregue o que não funcionava (G4, C20), e ARQUITETURA.md descrevia como feito o que não estava (G5).
31. [base] Verificações automáticas usadas como prova de que o jogo funciona ("146 de 146", 102 testes, orçamento ok) enquanto o save não abria e o dinheiro era infinito (G1). As fotos padrão apontavam para um rio e nenhuma mostrava uma rua (G2).
32. Testes enfraquecidos, métricas fixadas à mão, funcionalidades desligadas e qualidade reduzida para melhorar os números.
33. Caixas, planos, billboards ou impostores no lugar de prédios e vias; cenas montadas só para passar numa checagem.
34. Armadilhas para a próxima sessão escritas na documentação.

### Processo
35. Remendos em cima de uma arquitetura errada, em vez de refazer a parte que está errada.
36. Largura em vez de profundidade: muitas frentes ao mesmo tempo, nenhuma terminada e provada. A base teve 430 commits em cerca de 13 horas, em sessões paralelas.
37. Várias sessões, contas e agentes mexendo na mesma pasta ao mesmo tempo, cada um num worktree.
38. Commits restaurados várias vezes sem abrir o jogo depois.
39. Medições, bisects e suítes lentas usados para achar a causa, em vez de ler o código (`city\roadcraft\lab-reports\bisect-*`). Uma suíte rodou 6 testes pesados juntos e estourou 8 GB, porque `VITEST_MAX_WORKERS=6` anulava a config.
40. Subagentes que travaram ou fraudaram.
41. As ferramentas de teste gravando no save do jogador (A38 da base) e o código do save editado com a janela viva salvando por cima dos saves (Roadcraft atual).
42. O estado perdido na compactação: arquivos de estado desatualizados e ordens do dono esquecidas.
43. Tarefas misturadas, e prompts e memórias que se contradiziam.

## Regras

- Ache cada causa lendo o código e a documentação. Nada de medir, benchmark, sonda ou "mudar e rodar para ver". O jogo é medido só no marco zero e na rodada de aceitação de cada marco.
- Antes de cada decisão, abra a documentação oficial da versão exata usada e cite o link.
- Faça você mesmo, numa sessão só nesta pasta. Se aparecerem mudanças que não são suas, pare e avise.
- Decida sozinho o que for de rotina. Fora a aprovação da fase 4, só pare quando nada puder andar sem o dono, e diga o que bloqueia.
- Nunca diga que leu, testou, verificou ou corrigiu o que não fez. Toda afirmação sobre a cidade diz o tamanho dela, o número de prédios, a semente, de onde veio (crescida na hora ou lida) e o commit.
- Tudo no projeto em inglês: código, comentários, commits e documentos. Com o dono, português do Brasil.
- Commite cada passo verificado. Não publique em lugar nenhum enquanto o dono não disser onde.

## Ao fim de cada fase e de cada marco, informe

- o que foi lido (arquivos e linhas, X de Y) e o que ficou sem ler, e por quê;
- o que foi decidido, com as fontes;
- o que foi feito, com os commits;
- no marco zero e no fim de cada marco, a rodada de aceitação: a cidade (tamanho, número de prédios, semente, origem), os números contra os limites e as fotos com o caminho de cada uma;
- o que não foi feito ou não passou, dito como falha;
- o que não foi verificado.
