// Preparação do Jogo:

// Você precisará de um baralho de cartas. Um baralho padrão tem 52 cartas, divididas em quatro naipes (copas, ouros, paus e espadas), cada um com 13 cartas (de 2 a 10, e depois valete, dama, rei e ás).
// Você pode criar um array que represente o baralho, onde cada carta é representada por um objeto com um valor e um naipe.
// Embaralhe o baralho para garantir que as cartas sejam distribuídas aleatoriamente.

const naipes = ['copas', 'ouros', 'espadas', 'paus']
const valores = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'As']
const baralho = [];

function criarbaralho(){
    for(let naipe of naipes){
        for(let valor of valores){
            baralho.push({valor: valor, naipe: naipe});
        }
    }
    return baralho;
}

function embaralhar(baralho){
    for(let i = baralho.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
    }
}


// Distribuição de Cartas:

// No início do jogo, o jogador e o dealer recebem duas cartas cada. O jogador pode ver uma carta do Dealer, e as suas duas cartas.
// As cartas são distribuídas aleatoriamente do baralho.

let reiniciado = false;
var dealerCartas = [];
var jogadorCartas = [];
let jogoIniciado = false;
function iniciar(){
    if(jogoIniciado === true){
        alert('Você ja iniciou o jogo')
    }else{
        jogoIniciado = true;
        const baralho = criarbaralho();
        embaralhar(baralho);

        for(let i = 0;i< 2; i++){
            dealerCartas.push(baralho.shift());
            jogadorCartas.push(baralho.shift());
        }
        mostrarCartas(dealerCartas, 'dealerCartas', false);
        mostrarCartas(jogadorCartas, 'jogadorCartas', true);

        let divMeio = document.getElementById('meio');
        let boaSorte = document.createElement('p');
        let botaoIniciar = document.getElementById('iniciar');

        if(reiniciado === false){
            boaSorte.textContent = "Boa sorte!";
            divMeio.replaceChild(boaSorte, botaoIniciar);
        }
    }
}

function mostrarCartas(mao, divId, mostrarTodas){
    const divCartas = document.getElementById(divId);
    divCartas.innerHTML = '';
    mao.forEach((carta, index) => {
        const cartaHTML = document.createElement('div');
        cartaHTML.classList.add('carta');
        if(index === 1 && divId === 'dealerCartas' && !mostrarTodas){
            cartaHTML.innerHTML = 
            `
                <div class="iconeCima">?</div>
                <div class="valorCarta">?</div>
                <div class="iconeBaixo">?</div>
            `;
        }else{
            const SimboloNaipe = obterSimbolo(carta.naipe);
            cartaHTML.innerHTML = 
            `
                <div class="iconeCima">${SimboloNaipe}</div>
                <div class="valorCarta">${carta.valor}</div>
                <div class="iconeBaixo">${SimboloNaipe}</div>
            `
        }
        divCartas.appendChild(cartaHTML);
    });
}

function obterSimbolo(naipe){
    switch(naipe){
        case 'copas':
            return '♥️';
        case 'ouros':
            return '♦️';
        case 'paus':
            return '♣️';
        case 'espadas':
            return '♠️';
        default:
            return '';
    }
}

// Pontuação das Cartas:

// As cartas numéricas (de 2 a 10) valem seu valor nominal.
// As figuras (valete, dama, rei) valem cada uma 10 pontos.
// O ás pode valer 1 ou 11, dependendo do que for melhor para a mão do jogador (se 11 levaria a uma pontuação menor ou igual a 21, caso contrário, vale 1).

function pontuar(mao){
    let pontuacao = 0;
    let possuiAs = false;

    for(let carta of mao){
        if(carta.valor === 'J' || carta.valor === 'Q' || carta.valor === 'K'){
            pontuacao += 10;
        }else if(carta.valor === 'As'){
            possuiAs = true;
            pontuacao += 1;
        }else{
            pontuacao += parseInt(carta.valor);
        }
    }
    if(possuiAs && pontuacao + 10 <= 21){
        pontuacao +=10;
    } 
    return pontuacao;
}

function contabilizar(){
    let dealerPontos = pontuar(dealerCartas);
    let jogadorPontos = pontuar(jogadorCartas);
    if(jogadorPontos > 21){
        ficar();
    }
    return dealerPontos, jogadorPontos;
}

// Jogada do Jogador:
// O jogador decide se quer "ficar" (permanecer com a pontuação atual) ou "pedir carta" (receber uma carta adicional).
// Se o jogador exceder 21 pontos, ele "estoura" e perde automaticamente.

function ficar(){
    if(jogoIniciado === true){
        let dealerPontos = pontuar(dealerCartas);
        let jogadorPontos = pontuar(jogadorCartas);
        document.getElementById('pontuacaoDealer').innerHTML = dealerPontos + "Pontos!";
        document.getElementById('pontuacaoJogador').innerHTML = jogadorPontos + "Pontos!";


        var botaoficar = document.getElementById('ficar');
        var botaoPedir = document.getElementById('pedir');
        botaoficar.remove();
        botaoPedir.remove();

        var botoes = document.getElementById('botoes');
        var botaoReiniciar = document.createElement('button');
        botaoReiniciar.classList.add('botao');
        botaoReiniciar.id = 'reiniciar';
        botaoReiniciar.textContent = 'Reiniciar';
        botaoReiniciar.addEventListener('click', reiniciar);
        botoes.appendChild(botaoReiniciar);
    }else{
        alert('inicie o jogo!');
    }
}
function pedir(){
    if(jogoIniciado === true){
        jogadorCartas.push(baralho.shift());
        mostrarCartas(jogadorCartas, 'jogadorCartas', true);
        contabilizar();
    }else{
        alert('inicie o jogo!');
    }
}

function reiniciar(){
    dealerCartas = [];
    jogadorCartas = [];
    jogoIniciado = false;
    
    var botoes = document.getElementById('botoes');

    var botaoReiniciar = document.getElementById('reiniciar');
    botaoReiniciar.remove();

    var botaoFicar = document.createElement('button');
    botaoFicar.textContent = ('Ficar');
    botaoFicar.classList.add('botao');
    botaoFicar.id = 'ficar';
    botaoFicar.addEventListener('click', ficar);

    var botaoPedir = document.createElement('button');
    botaoPedir.classList.add('botao');
    botaoPedir.textContent = 'Pedir'
    botaoPedir.id = 'pedir';
    botaoPedir.addEventListener('click', pedir);

    botoes.appendChild(botaoFicar);
    botoes.appendChild(botaoPedir);
    reiniciado = true;
    iniciar()
    
}