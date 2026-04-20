const board = document.querySelector('.game-board');
const symbols = ['🐶','🐱','🐼','🦁','🐸','🐵','🐧','🐢'];
let cards = [...symbols, ...symbols]; // duplicate for pairs

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Render cards
cards.forEach(symbol => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.textContent = '?'; // hidden initially
  board.appendChild(card);
});

// Game logic
let flippedCards = [];
let matchedCount = 0;

board.addEventListener('click', e => {
  const card = e.target;
  if (!card.classList.contains('card') || card.classList.contains('flipped')) return;

  card.textContent = card.dataset.symbol;
  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
      matchedCount += 1;
      flippedCards = [];
      if (matchedCount === symbols.length) {
        setTimeout(() => alert('🎉 You won!'), 500);
      }
    } else {
      setTimeout(() => {
        card1.textContent = '?';
        card2.textContent = '?';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 800);
    }
  }
});

