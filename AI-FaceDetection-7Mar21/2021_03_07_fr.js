const video = document.getElementById("video");

Promise.all([
faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startup);

function startup(){
  navigator.mediaDevices.getUserMedia({
      audio: false,
      video:true,
    }).then(stream=>{
        video.srcObject=stream;
    }).catch(console.error);
  };

// window.addEventListener('load', startup, false);
video.addEventListener('play',()=>{
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = {width: video.width, height: video.height}
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    },100);
});
//
//
// async function getMedia() {
//   let stream = null;
//
//   try {
//     stream = await navigator.mediaDevices.getUserMedia();
//     console.log('Stream successful.')  /* use the stream */
//   } catch(err) {
//     console.log('An error has occurred.');
//     /* handle the error */
//   }
// }
//
// navigator.mediaDevices.getUserMedia()
// .then(function(stream) {
// console.log('access to camera successful, creating stream')})
// .catch(function(err) {
// /* handle the error */
// console.log("Error occurred in getUserMedia");
// });
//
// getMedia(true, true);
