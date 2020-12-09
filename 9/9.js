const inherits = require('inherits');
const LinkedList = require('linked-list');

List.prototype.join = join;
Item.prototype.toString = toString;

inherits(List, LinkedList);
inherits(Item, LinkedList.Item);

function List(...args) {
  LinkedList.apply(this, args);
}

function Item(value, ...args) {
  this.value = value;
  LinkedList.Item.apply(this, args);
}

function join(delimiter) {
  return this.toArray().join(delimiter);
}

function toString() {
  return this.value;
}

const NUM_PLAYERS = 458;
const MARBLES = 72019 // * 100; // p2
const scores = {};
const list = new List(new Item(0), new Item(1));
let current = list.head.next;

for (let m = 2; m <= MARBLES; m++) {
  if (m % 23 === 0) {
    const currentPlayer = m % NUM_PLAYERS;

    if (!scores[currentPlayer]) { scores[currentPlayer] = 0; }
    scores[currentPlayer] += m;

    for (let i = 0; i < 7; i++) {
      current = current.prev;
      if (current === null) { // head
        current = list.tail;
      }
    }

    scores[currentPlayer] += current.value;

    const tmp = current;
    current = tmp.next;
    tmp.detach();

    if (current === null) {
      current = list.head;
    }
  } else {
    for (let i = 0; i < 1; i++) {
      current = current.next;
      if (current === null) { // tail
        current = list.head;
      }
    }
    current.append(new Item(m));
    current = current.next;
  }
}

let max = 0;
for (let i = 0; i < NUM_PLAYERS; i++) {
  if (scores[i] && scores[i] > max) {
    max = scores[i];
  }
}

console.log('Part one:', max); // uncomment above for p2
