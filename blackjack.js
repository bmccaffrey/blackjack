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
}

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