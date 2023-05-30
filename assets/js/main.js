let hasFlippedCard = false;
let lockBoard = false;
let firstCard,secondCard;

let win = false;

const startMin = 1;
let time = startMin * 60;
const count_down = document.getElementById('countdown');

setInterval(updateCountDown,1000);

function updateCountDown()
{
    const min = Math.floor(time/60);
    let sec = time % 60;
    sec = sec < 10 ? '0' + sec : sec;
    count_down.innerHTML = `${min}:${sec}`;
    time--;
    if(time == 0 )
    {
        alert("Time out!!");
    }
}

/*--------------memory card-----------*/
const cards = document.querySelectorAll('.memory-card');

function flipCard()
{
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard)
    {   //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
       //second click
        secondCard = this;
        checkForMatch();
}
function checkForMatch()
{
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch? disableCards() : unFlipCards();
}

function disableCards()
{
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unFlipCards()
{
    lockBoard = true
    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
}, 1500);

}

function  resetBoard()
{
    [hasFlippedCard,lockBoard] = [false,false];
    [firstCard,secondCard] = [null,null];
}

(function  shuffle()
{
    cards.forEach(card =>
    {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card =>
card.addEventListener('click',flipCard));