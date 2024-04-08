# BlackJack21
 Criação de um blackjack. <br>
 Pages: https://lucassrsilva.github.io/BlackJack21/ <br>
Preparação do Jogo:

- Você precisará de um baralho de cartas. Um baralho padrão tem 52 cartas, divididas em quatro naipes (copas, ouros, paus e espadas), cada um com 13 cartas (de 2 a 10, e depois valete, dama, rei e ás).
Você pode criar um array que represente o baralho, onde cada carta é representada por um objeto com um valor e um naipe.
Embaralhe o baralho para garantir que as cartas sejam distribuídas aleatoriamente.
Distribuição de Cartas:

- No início do jogo, o jogador e o dealer recebem duas cartas cada. O jogador pode ver as duas cartas do dealer, mas só uma das suas próprias.
As cartas são distribuídas aleatoriamente do baralho.
Pontuação das Cartas:

- As cartas numéricas (de 2 a 10) valem seu valor nominal.
As figuras (valete, dama, rei) valem cada uma 10 pontos.
O ás pode valer 1 ou 11, dependendo do que for melhor para a mão do jogador (se 11 levaria a uma pontuação menor ou igual a 21, caso contrário, vale 1).
Jogada do Jogador:

- O jogador decide se quer "ficar" (permanecer com a pontuação atual) ou "pedir carta" (receber uma carta adicional).
Se o jogador exceder 21 pontos, ele "estoura" e perde automaticamente.



- Se nenhum dos jogadores estourar, o vencedor é aquele cuja pontuação estiver mais próxima de 21.
Se o jogador tiver uma pontuação maior que o dealer sem exceder 21, ele ganha.
Se o dealer tiver uma pontuação maior que o jogador sem exceder 21, ele ganha.
Se houver um empate, ninguém ganha.
