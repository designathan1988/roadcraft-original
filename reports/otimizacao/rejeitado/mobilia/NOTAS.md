**Arquivo:** `src/render/propCells.ts`.

**O problema:** a mobília urbana longe da câmera (fora do quadrado perto, `propCells.ts`) é desenhada em blocos de 4 × 4 células, sem escolher nível por instância, e esses blocos desenhavam cada coisa pelo modelo perto inteiro: na vista do distrito da cidade grande, 3.427 lixeiras de 182 triângulos, 3.582 bancos de 164 e 1.212 hidrantes de 164, cada um com poucos pixels. A própria camada perto já troca essas coisas pela caixa na cor média abaixo de 12 pixels (`streetFurnitureLayer.ts` farBox, "DO NOT draw a bin of 250 triangles a few pixels across"); os blocos distantes não seguiam a regra.

**Aplicado:** um bloco distante desenha uma espécie pelo modelo distante dela quando toda coisa dela fica abaixo do tamanho em que a camada perto já a troca, onde quer que o bloco esteja: fora do quadrado perto a maior planta tem menos de 40,8 pixels (`nearSquareOf`), e uma coisa de tamanho `s` tem menos que isso vezes `s` sobre a planta; com metade de folga, porque o quadrado tem limite de células (`MOST_NEAR`). Entram lixeiras, bancos, hidrantes, caixas de correio, orelhões, bocas de lobo e covas de árvore (até uns 2 m); os postes de luz (9 m) continuam pelo modelo deles.

**Na cidade grande (semente 4242), vista do distrito:** bancos 587 mil → 43 mil triângulos, lixeiras 624 mil → 41 mil, hidrantes 199 mil → 14,5 mil: 1,31 M a menos. Mesma imagem: 0,13 % de pixels diferentes (ruído entre capturas iguais 0,10 %) e o mesmo tremor (18,10 %).

**Fichas:** cada coisa como o bloco distante a desenhava (o modelo perto) e como desenha agora (a caixa na cor média, 12 triângulos). A caixa é o que a camada perto já mostra abaixo de 12 pixels.

**Verificação:** testes de render passando; capturas repetíveis esperando o mundo assentar.
