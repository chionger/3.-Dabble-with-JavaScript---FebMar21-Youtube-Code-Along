console.log('about to fetch a rainbow');

catchRainbow()
  .then(response => {
    console.log('Yay !');
  })
  .catch(error => {
    console.error('error!');
    console.error(error);
  });

async function catchRainbow() {
  const response = await fetch('rainbow.jpg');
  const blob = await response.blob();
  document.getElementById('rainbow').src = URL.createObjectURL(blob);
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
