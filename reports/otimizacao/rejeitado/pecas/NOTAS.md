**Arquivo:** `src/render/buildings/kit.ts`.

**Onde estão os triângulos das peças** (cidade grande, semente 4242, vista do distrito, contando cada malha visível pelo nível que desenha): racks de brise de longe 1,11 M (46 mil racks, 24 triângulos cada), caixas dos lotes de longe 0,96 M, colunas 0,48 M (2 triângulos cada, já o mínimo), antenas 0,38 M, plantas 0,63 M, parapeitos de vidro 0,30 M, cadeiras 0,26 M. As linhas "-caster" do inventário (as cópias da sombra) não são o custo real: o inventário as lê entre as passadas de sombra, quando estão paradas no nível mais fino com todas as instâncias; em cada cascata cada uma desenha o nível que o texel pede.

**Aplicado:**
- Parapeito de vidro de longe: o painel, uma face vista dos dois lados (uma de cada vez, como a frente da caixa era), as bordas de 2 cm de fora; troca quando a espessura fica abaixo de um pixel e meio. 12 → 4 triângulos; 25 mil painéis na vista do distrito (cerca de 200 mil triângulos a menos). Mesma imagem: 0,12 % de pixels diferentes (o ruído entre duas capturas iguais é 0,10 %) e o mesmo tremor (18,10 % contra 18,11 % de pixels que mudam quando a câmera gira 0,15°).

**Tentado e não usado:** o brise de longe como uma caixa com as lâminas desenhadas pelo material (raio por pixel, como as venezianas), 24 → 12 triângulos, 0,55 M a menos. Mudou 2 % da imagem do distrito e aumentou o tremor de 18,1 % para 19,1 %: o que o shader descarta não recebe a suavização do MSAA, e lâminas mais finas que um pixel viram um pontilhado que pisca. Voltou ao que era.

**Tentado e não usado (2):** separar os mourões, barras e trilhos finos (erro de 15 cm ou menos, 65 % das 1,28 M caixas de lote) das paredes, em faixas próprias, para que a parede de meio metro de uma subcélula não segure os mourões ao lado em 10 triângulos. Na vista do distrito o quadro caiu de 7,864 M para 7,723 M triângulos (−1,8 %), mas subiu de 287 para 297 chamadas de desenho; na rua, −30 mil triângulos e +3 chamadas. Empate entre CPU e GPU: não entrou.

**Já enxutos, sem ganho limpo:** as peças do condensador (grade e aletas já desenhadas pelo material), vasos, plantas, cadeiras, mesas, varais, antenas e bicicletas já têm níveis simplificados escolhidos pelo erro em pixels; o que sobra é silhueta.

**Verificação:** testes de render passando; capturas repetíveis (esperando o mundo assentar, como o `npm run diagnose`).
