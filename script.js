console.log('Script loaded');

const video = document.getElementById('video');
const mood = document.getElementById('mood');
const errorDiv = document.getElementById('error');
const statusDiv = document.getElementById('status');

if (!video || !mood || !errorDiv) {
  console.error('ERROR: Missing HTML elements');
}

// Main initialization
window.addEventListener('load', initializeApp);

async function initializeApp() {
  console.log('Page loaded, starting initialization...');
  statusDiv.innerText = 'Initializing...';
  statusDiv.style.color = 'blue';
  
  try {
    // Step 1: Wait for face-api library to load
    console.log('Waiting for face-api library...');
    await waitForFaceAPI();
    console.log('face-api library ready');
    
    // Step 2: Load models
    console.log('Loading AI models...');
    statusDiv.innerText = 'Loading AI models...';
    await loadModels();
    console.log('Models loaded successfully');
    
    // Step 3: Get camera access
    console.log('Requesting camera access...');
    statusDiv.innerText = 'Requesting camera permission...';
    await setupCamera();
    console.log('Camera ready');
    
    // Step 4: Start detection
    console.log('Starting face detection...');
    statusDiv.innerText = 'Ready! Face detection active...';
    statusDiv.style.color = 'green';
    startDetection();
    
  } catch (error) {
    console.error('ERROR:', error.message);
    statusDiv.innerText = 'ERROR: ' + error.message;
    statusDiv.style.color = 'red';
    errorDiv.innerText = error.message;
  }
}

function waitForFaceAPI() {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const checkInterval = setInterval(() => {
      if (window.faceapi) {
        clearInterval(checkInterval);
        resolve();
      } else if (attempts++ > 50) {
        clearInterval(checkInterval);
        reject(new Error('face-api failed to load from CDN. Check internet connection.'));
      }
    }, 100);
  });
}

function loadModels() {
  return new Promise(async (resolve, reject) => {
    try {
      const MODEL_URL = './models/';
      
      await Promise.all([
        faceapi.nets.tinyFaceDetector.load(MODEL_URL),
        faceapi.nets.faceExpressionNet.load(MODEL_URL)
      ]);
      
      resolve();
    } catch (error) {
      reject(new Error('Could not load models from ./models/. Make sure model files exist.'));
    }
  });
}

function setupCamera() {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      
      video.srcObject = stream;
      
      // Wait for video to load
      video.onloadedmetadata = async () => {
        try {
          await video.play();
          console.log('Video is playing');
          resolve();
        } catch (error) {
          reject(new Error('Could not play video: ' + error.message));
        }
      };
      
      // Timeout if metadata doesn't load
      setTimeout(() => {
        reject(new Error('Video metadata failed to load'));
      }, 3000);
      
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        reject(new Error('Camera permission denied. Please allow camera access.'));
      } else if (error.name === 'NotFoundError') {
        reject(new Error('No camera found on this device.'));
      } else if (error.name === 'NotReadableError') {
        reject(new Error('Camera is being used by another application.'));
      } else {
        reject(new Error('Camera error: ' + error.message));
      }
    }
  });
}

function startDetection() {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.querySelector('.camera-wrapper').appendChild(canvas);
  
  const displaySize = {
    width: video.width,
    height: video.height
  };
  faceapi.matchDimensions(canvas, displaySize);
  
  setInterval(async () => {
    try {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();
      
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      
      if (resizedDetections.length > 0) {
        const expressions = resizedDetections[0].expressions;
        const emotion = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );
        
        mood.innerText = 'Mood: ' + emotion.charAt(0).toUpperCase() + emotion.slice(1);
        
        const colors = {
          happy: '#00ff00',
          sad: '#0000ff',
          angry: '#ff0000',
          surprised: '#ffff00',
          fearful: '#ff00ff',
          disgusted: '#00ffff',
          neutral: '#ffffff'
        };
        
        mood.style.color = colors[emotion] || '#ffffff';
      } else {
        mood.innerText = 'Mood: No face detected';
        mood.style.color = '#ffffff';
      }
    } catch (error) {
      console.error('Detection error:', error);
    }
  }, 200);
}

// Run detection on video
video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.querySelector('.camera-wrapper').appendChild(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceExpressions();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    // Clear and draw
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    if(detections[0]){
      const expressions = detections[0].expressions;
      const maxEmotion = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
      mood.innerText = `Mood: ${maxEmotion.toUpperCase()}`;

      const colors = { happy:'#00ffcc', sad:'#3498db', angry:'red', surprised:'#ffcc00', neutral:'white' };
      mood.style.color = colors[maxEmotion] || 'white';
    }
  }, 200);
});