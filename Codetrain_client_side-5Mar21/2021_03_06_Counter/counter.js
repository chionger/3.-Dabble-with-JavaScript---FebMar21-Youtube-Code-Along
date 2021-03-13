let counter1;

function setup() {
  noCanvas();
  console.log(this);
  counter1 = new Counter(100, 500);
  counter1.start();
  counter2 = new Counter(200, 700);
  counter2.start();
  counter3 = new Counter(300, 350);
  counter3.start();
}

// function draw() {
//   counter1.countIt();
// }

class Counter {
  constructor(start, wait) {
    this.count = start;
    this.wait = wait;
    this.p = createP(''); //make a paragraph element
    console.log('In Counter constructor', this);
  }

  start() {
  setInterval(() => {
  console.log('In setInterval of object', this);
    this.countIt();
  }, this.wait);
  }

  countIt() {
  this.count++;
  this.p.html(this.count);
}
}
