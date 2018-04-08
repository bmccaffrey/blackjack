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