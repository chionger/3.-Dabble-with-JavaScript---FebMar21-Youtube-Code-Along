// function setup() {
//   createCanvas(600, 400);
//   background(0);
//   let button = createButton('press');
//   console.log(this);
//   button.mousePressed(changeBackground);
//
//   function changeBackground() {
//     background(random(255));
//     console.log(this);
//   }
// }

// function setup() {
//   createCanvas(600, 400);
//   background(0);
//   let button = createButton('press');
//   console.log(this);
//   button.mousePressed(function () {
//       background(random(255));
//       console.log(this);
//     });
// }

function setup() {
  createCanvas(600, 400);
  background(0);
  let button = createButton('press');
  console.log(this);
  button.mousePressed(()=>
      background(random(255))
    );
}
