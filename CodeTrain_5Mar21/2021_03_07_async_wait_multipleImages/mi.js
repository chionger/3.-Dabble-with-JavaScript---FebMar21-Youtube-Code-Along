console.log('about to fetch a poem');
const filenames =[
  'images/mys1.jpg',
  'images/mys2.jpg',
  'images/mys3.jpg'
];

catchImages(filenames)
  .then(response => {
    console.log('Yay !');
  })
  .catch(error => {
  console.error('error!');
  console.error(error);
});

async function catchImages(){
  for (let filename of filenames){
    const response = await fetch(filename);
    const blob = await response.blob();
    const img = document.createElement('img');
    img.src = URL.createObjectURL(blob);
    img.width = '200'
    document.body.append(img);
  }
};

// fetch('rainbow.jpg')
//   .then(response=>{
//   console.log(response);
//   return response.blob(); //triggers another promise
// })
//   .then(response_blob=>{  //use .then to chain response returned by promise triggered earlier
//   console.log(response_blob);
//   document.getElementById('rainbow').src = URL.createObjectURL(response_blob);
// })
//   .catch(error => {
//   console.error('error!');
//   console.error(error);
// });
