const cards = document.querySelectorAll('.memory-card');//constante para selecionar todos os elementos memory-card

let hasFlippedCard = false;
let lockBoard = false; //para garantir que quando o jogador clicar na segunda carta, a if lockboard return trava o tabuleiro
let firstCard, secondCard;

function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return; //verifica se a segunda carta não é a mesma que a primeira (se for duplo click por exemplo)

    this.classList.add('flip'); //chama a função flip para a carta clicada

    if (!hasFlippedCard) { //ao primeiro click, se não houver carta virada
        hasFlippedCard = true; // 
        firstCard = this;

        return;
    }

    secondCard = this;

    checkForMatch(); //aqui vai ser para verificar se formam um par ou não
}


function checkForMatch(){ //se as cartas formam um par, disableCards é chamada, senão unflipCards é chamada
    let isMatch = firstCard.dataset.thing === secondCard.dataset.thing; //condição avaliada
    isMatch ? disableCards() : unflipCards(); //expressão a ser executada se for true e o terceiro se for false
}

function disableCards(){ //remove o detector de evento das cartas que são um par para garantir que elas não sejam desviradas
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(){ //remove a classe flip e com o timer de 1500ms faz com que depois desse tempo as cartas voltem pra posição original
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard(){ //para resetar as cartas após a rodada
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){ //função para embaralhar as cartas (IIFE para ser execeutada logo após a definição, imediato)
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12); //gera um numero aleatorio de 0 a 12 e atribui a order
        card.style.order = ramdomPos; //order é a propriedade dos flex-itens que tem valor inteiro
    });
})();


cards.forEach(card => card.addEventListener('click', flipCard));

