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
    return 13;
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
  var total = document.querySelector(`${this.name}.total`);
  total.innerHTML = 'Total: ' + this.total();
};

Player.prototype.bust = function() {
  if(this.total() > 21) {
    alert('Busted');
  }
};

// Initialize/Instantiate
let p1 = new Player();
p1.name = '.user';

let dealer = new Player();
dealer.name = '.dealer';

let deck1 = new Deck(1);
deck1.shuffle();

let wager = document.querySelector('input[name=bet]');
const bet = wager.value;

// 15 LOC
function test() {
  p1.deal();
  p1.deal();
  dealer.deal();
  dealer.deal();
  
  let wager = document.querySelector('input[name=bet]');
  p1.money -= wager.value;
  console.log(p1.money);
  let bet = wager.value;
  wager.value = '';

  const hit = document.querySelector('button[name=hit]');
  hit.addEventListener('click', function() {
    p1.deal();
    p1.bust();
  });
}

const play = document.querySelector('button[name=play]');
play.addEventListener('click', test);

const stand = document.querySelector('button[name=stand]');
stand.addEventListener('click', function() {
  while(dealer.total()<17) {
    dealer.deal();
  }
  win();
});

function win() {
  if(p1.total() > dealer.total()) {
    console.log('player wins')
  } else {
    console.log('dealer wins');
  }
}