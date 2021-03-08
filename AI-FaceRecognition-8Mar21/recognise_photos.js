const imageUpload = document.getElementById('imageUpload');

Promise.all([
faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
faceapi.nets.ssdMobilenetv1.loadFromUri('./models')
]).then(startup);

async function startup(){
  const container = document.createElement('div');
  container.style.position = 'relative';
  document.body.append(container);
  const labeledFaceDescriptors = await loadLabeledImages();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors,0.6);
  let image;
  let canvas;
  document.body.append('Loaded.');
  imageUpload.addEventListener('change', async() => {
    if (image) image.remove();
    if (canvas) canvas.remove();
    image = await faceapi.bufferToImage(imageUpload.files[0]);
    // const image = await faceapi.bufferToImage(imageUpload.files[0]);
    container.append(image);
    // const canvas = faceapi.createCanvasFromMedia(image);
    canvas = faceapi.createCanvasFromMedia(image);
    container.append(canvas);
    const displaySize = {width: image.width, height: image.height};
    faceapi.matchDimensions(canvas, displaySize);
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const results = resizedDetections.map(d=> faceMatcher.findBestMatch(d.descriptor));
    results.forEach((result,i) => {
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {label: result.toString()});
      drawBox.draw(canvas);
    });
  });
};

 function loadLabeledImages(){
  // const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark'];
  const labels =['Deku', 'Denki','Rei', 'Ochako'];
  return Promise.all(
    labels.map(async label => {
      const descriptions = [];
      for (let i= 1; i<= 1; i++) {
        const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/chionger/imagesforFaceRecognition/main/Labelled_Images/${label}/${i}.jpg`);
        console.log(`img = /${label}/${i}.jpg`);
        // setTimeout(10000);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
        console.log('label = ', label);
        console.log('descriptions = ', descriptions);
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })) //be careful about breaking up the brackets.
  };
