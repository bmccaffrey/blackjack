// 4 LOC
function Card(suit, rank) {
  this.suit = suit;
  this.rank = rank;
}

// 8 LOC
Card.prototype.value = function() {
  var value;
  if (this.rank === 'Jack' || this.rank === 'Queen' || this.rank === 'King') {
    return 10;
  } else if (this.rank === 'Ace') {
    return 13;
  } else { return this.rank; }
};

// 26 LOC
Card.prototype.unicode = function() {
  let uni = '&#x1F0';
  if(this.suit === "Spades") {
    uni += 'A';
  } else if(this.suit === "Hearts") {
    uni += 'B';
  } else if(this.suit === "Diamonds") {
    uni += 'C';
  } else {
    uni += 'D';
  }

  if(this.rank === 10) {
    uni += 'A';
  } else if(this.rank === "Jack") {
    uni += 'B';
  } else if(this.rank === "Queen") {
    uni += 'D';
  } else if(this.rank === "King") {
    uni += 'E';
  } else if(this.rank === "Ace") {
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
  let suit = ["Clubs", "Diamonds", "Hearts", "Spades"];
  let rank = [2,3,4,5,6,7,8,9,10,'Jack','Queen','King','Ace'];
  let array1 = [];
  for (i=0; i<num; i++) {
    for (j=0; j<suit.length; j++) {
      for(k=0; k<rank.length; k++) {
        this.cards.push(new Card(suit[j], rank[k]));
      }
    }
  }
}

// 8 LOC
Deck.prototype.shuffle = function() {
  for (i=0; i<this.cards.length; i++) {
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
}

// 1 LOC
Player.prototype.deal = function() {
  this.hand.push(deck1.cards.shift());
};

// 7 LOC
Player.prototype.total = function() {
  total = 0;
  for (i=0; i<this.hand.length; i++) {
    total += this.hand[i].value();
  }
  return total;
};