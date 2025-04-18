# CAMPO MINADO

**Número da Lista**: X<br>
**Conteúdo da Disciplina**: Grafos 1<br>

## Alunos

|Matrícula | Aluno |
| -- | -- |
| 222015248  |  Rafael Gomes Pereira |
| 222025324  |  João Lucas Araujo Siqueira |

## Sobre

Este trabalho tem como objetivo implementar o algoritmo de Grafos 1 denominado BFS, a busca em largura. Esse algoritmo é aplicado no jogo campo minado, em uma lógica semelhante ao Flood Fill. Nesse caso, temos um grafo implícito, que é uma tabela/matriz representando o campo de jogo, e os vizinhos de cada célula são exatamente as 8 células ao redor, incluindo as diagonais. O algoritmo BFS entra em ação quando uma campo/célula com zero bombas ao redor é revelado, assim todas os campos adjacentes que também tem valor zero são revelados por esse algoritmo.

## Screenshots

<center>

<p>
  <img src="/assets/telaInicio.png" width="300" alt="Captura de tela da interface principal">
  <br>
  <sub>Captura de tela da interface principal</sub>
</p>

---

<p>
  <img src="/assets/telaJogoVencido.png" width="300" alt="Captura de tela da interface quando se vence o jogo">
  <br>
  <sub>Captura de tela da interface quando se vence o jogo</sub>
</p>

---

<p>
  <img src="/assets/telaJogoTerminado.png" width="300" alt="Captura de tela da interface da tabela preenchida">
  <br>
  <sub>Captura de tela da interface da tabela preenchida</sub>
</p>

---

<p>
  <img src="/assets/telaTabelaPontuacao.png" width="300" alt="Captura de tela da interface da tabela de pontuacao">
  <br>
  <sub>Captura de tela da interface da tabela de pontuação</sub>
</p>

---

<p>
  <img src="/assets/telaDerrota.png" width="300" alt="Captura de tela da interface da derrota na partida ">
  <br>
  <sub>Captura de tela da interface da derrota na partida</sub>
</p>

---

</center>

## Vídeo de Apresentação

Neste vídeo, apresentamos o trabalho desenvolvido, abordando os principais pontos desenvolvidos ao longo do projeto.

[Assista no Youtube](https://youtu.be/pwgeXTZMVvQ)

---

## Instalação

### Pré-requisitos

- Git
- Navegador

---

**Linguagem**: Javascript <br>

**Framework**: Não foi utilizado nenhum framework<br>

**Pré-requisitos:** Git e navegador instalados.<br>

Para executar o projeto localmente, basta clonar o repositório e abrir o arquivo _index.html_, que o jogo será aberto em seu navegador padrão:


```bash
git clone https://github.com/projeto-de-algoritmos-2025/Grafos1_Campo-Minado.git
```

Para acessar o projeto online, acesse o site:
[https://projeto-de-algoritmos-2025.github.io/Grafos1_Campo-Minado/](https://projeto-de-algoritmos-2025.github.io/Grafos1_Campo-Minado/)

---

## Uso

- Para iniciar o jogo, clique com o botão esquerdo em qualquer campo, o timer será iniciado.
- O campo clicado com o botão esquerdo do mouse será revelado com o número de bombas que existem nos 8 campos ao redor dele, contando as diagonais.
- Se o campo revelado tiver zero bombas ao redor, a BFS entra em ação e abre todos os campos que também tem zero bombas ao redor, revelando uma grande área.
- Quando tiver certeza da localização de uma bomba, clique com o botão direito do mouse sobre o campo, para marcá-lo.
- Ao final, se tiver revelado todos os campos e marcado todas as 10 bombas corretamente, você venceu, uma janela se abrirá mostrando o tempo gasto e solicitando um nome para salvar localmente o seu desempenho.
- Caso contrário, se revelar um campo com bomba, você perdeu, todas as bombas serão reveladas, e você deve reiniciar o jogo.

## Outros

- A qualquer momento você pode "Ver Melhores Tempos" que estarão rankeados em ordem crescente, e limpá-los se desejar.
- Se para um determinado campo você tiver marcado a quantidade correta de bombas ao redor dele, você pode clicar sobre ele com o botão direito, para revelar todos os adjacentes a ele, agilizando a partida.




