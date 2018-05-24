// 4 LOC
function Card(suit, rank) {
  this.suit = suit;
  this.rank = rank;
}

// 8 LOC
Card.prototype.value = function() {
  if (this.rank === 'Jack' || this.rank === 'Queen' || this.rank === 'King') {
    return 10;
  } else if (this.rank === 'Ace') {
    return 11;
  } else { return this.rank; }
};

// 26 LOC
Card.prototype.unicode = function() {
  let uni = '&#x1F0';
  if(this.suit === 'Spades') {
    uni += 'A';
  } else if(this.suit === 'Hearts') {
    uni += 'B';
  } else if(this.suit === 'Diamonds') {
    uni += 'C';
  } else {
    uni += 'D';
  }

  if(this.rank === 10) {
    uni += 'A';
  } else if(this.rank === 'Jack') {
    uni += 'B';
  } else if(this.rank === 'Queen') {
    uni += 'D';
  } else if(this.rank === 'King') {
    uni += 'E';
  } else if(this.rank === 'Ace') {
    uni += 1;
  } else {
    uni += this.rank;
  }
  return uni;
};

// 14 lines
function Deck(num) {
  this.cards = [];
  this.num = num;
  let suit = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  let rank = [2,3,4,5,6,7,8,9,10,'Jack','Queen','King','Ace'];

  for (let i=0; i<num; i++) {
    for (let j=0; j<suit.length; j++) {
      for(let k=0; k<rank.length; k++) {
        this.cards.push(new Card(suit[j], rank[k]));
      }
    }
  }
}

// 8 LOC
Deck.prototype.shuffle = function() {
  for (let i=0; i<this.cards.length; i++) {
    let num = Math.floor(Math.random() * this.cards.length);
    let shuffledCard = this.cards.splice(i,1);
    shuffledCard = shuffledCard[0];
    this.cards.splice(num,0,shuffledCard);
  }
};

// 5 LOC
function Player() {
  this.name = undefined;
  this.money = 500;
  this.hand = [];
  this.bet = 0;
}

// 5 LOC
Player.prototype.deal = function() {
  this.hand.push(deck1.cards.shift());
  this.displayCard();
  this.displayTotal();
};

// 5 LOC
Player.prototype.displayCard = function() {
  var dealt = document.querySelector(`${this.name}.cards`);
  var length = (this.hand.length) - 1;
  dealt.innerHTML += this.hand[length].unicode();
};

// 7 LOC
Player.prototype.total = function() {
  let total = 0;
  for (let i=0; i<this.hand.length; i++) {
    total += this.hand[i].value();
  }
  return total;
};

// 5 LOC
Player.prototype.displayTotal = function() {
  const total = document.querySelector(`${this.name}.total`);
  total.innerHTML = 'Total: ' + this.total();
};

Player.prototype.displayMoney = function() {
  const money = document.querySelector('.money');
  money.textContent = `Money: ${p1.money}`;
};

Player.prototype.bust = function() {
  if(this.total() > 21) {
    this.bet = 0;
    console.log('Busted');
  }
};

function win() {
  if ((dealer.total() > 21) || (p1.total() > dealer.total())) {
    console.log(p1.money);
    p1.money += (p1.bet *2);
    p1.displayMoney();
    console.log('player wins');
  } else if (p1.total() === dealer.total()) {
    p1.money += p1.bet;
    console.log('push');
  } else {
    console.log('dealer wins');
  }
  // p1.hand = [];
  // dealer.hand = [];
}

function initialCardsDealt() { 
  p1.deal(); 
  p1.deal(); 
  dealer.deal(); 
  dealer.deal();
}

function wager() {
  let wager = document.querySelector('input[name=bet]');
  p1.bet = Number(wager.value);
  p1.money -= wager.value;
  wager.value = '';
  p1.displayMoney();
}

// 5 LOC
function clearCards() {
  for (let player of arrayPlayers) {
    let dealt = document.querySelector(`${player.name}.cards`);
    dealt.textContent = '';
  }
}

function reset() {
  p1.hand = [];
  p1.bet = 0;
  dealer.hand = [];
}

// Initialize/Instantiate
let p1 = new Player();
p1.name = '.user';
p1.displayMoney();

let dealer = new Player();
dealer.name = '.dealer';

const arrayPlayers = [p1, dealer];

let deck1 = new Deck(1);
deck1.shuffle();

const play = document.querySelector('button[name=play]');
play.addEventListener('click', startRound);

const hit = document.querySelector('button[name=hit]');
hit.addEventListener('click', function() { p1.deal(); p1.bust(); });

const stand = document.querySelector('button[name=stand]');
stand.addEventListener('click', function() {
  while ((dealer.total()<17) && (dealer.total()<=21)) {
    dealer.deal();
  }
  win();
});
// 10 LOC
function startRound() {
  p1.hand = [];
  dealer.hand = [];
  clearCards();
  initialCardsDealt();
  wager();
  hit.disabled = false;
  stand.disabled = false;
}