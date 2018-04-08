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