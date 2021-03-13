console.log('about to fetch a rainbow');
fetch('rainbow.jpg')
  .then(response=>{
  console.log(response);
  return response.blob(); //triggers another promise
})
  .then(response_blob=>{  //use .then to chain response returned by promise triggered earlier
  console.log(response_blob);
  document.getElementById('rainbow').src = URL.createObjectURL(response_blob);
})
  .catch(error => {
  console.error('error!');
  console.error(error);
});
