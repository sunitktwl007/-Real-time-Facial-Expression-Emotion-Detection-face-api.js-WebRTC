# Facial Reaction Detection System

🎭 Real-time facial expression and emotion detection web application using face-api.js and deep learning models.

Detects and displays emotions (Happy, Sad, Angry, Surprised, Fearful, Disgusted, Neutral) from webcam feed with live visualization of face detections on video stream.

## ✨ Features

- **Real-time Face Detection** - Detects faces in video stream instantly
- **Emotion Recognition** - Identifies 7 different emotions with confidence scores
- **Live Visualization** - Visual overlays showing face detection box and emotion labels
- **Dynamic Mood Display** - Color-coded emotion display that updates in real-time
- **No Backend Required** - Runs entirely in the browser
- **Responsive Interface** - Beautiful UI with smooth animations and glowing effects

## 🛠️ Technologies

- **HTML5 Canvas & WebRTC API** - Video capture and real-time rendering
- **face-api.js** - TinyFaceDetector + FaceExpressionNet neural network models
- **Vanilla JavaScript** - Pure JS, no frameworks
- **CSS3** - Animations and responsive styling

## 📋 Usage

1. Open `index.html` in a modern web browser
2. Allow camera permissions when prompted
3. Face detection starts automatically
4. View real-time emotion recognition

## 🎯 Emotions Detected

| Emotion | Color |
|---------|-------|
| Happy | 🟢 Green |
| Sad | 🔵 Blue |
| Angry | 🔴 Red |
| Surprised | 🟡 Yellow |
| Fearful | 🟣 Magenta |
| Disgusted | 🔷 Cyan |
| Neutral | ⚪ White |

## 📁 Project Structure

```
├── index.html              # Main HTML file
├── script.js              # JavaScript logic for detection
├── style.css              # Styling and animations
├── models/                # Face-api.js AI models
│   ├── face_expression_model-shard1
│   ├── face_expression_model-weights_manifest.json
│   ├── tiny_face_detector_model-shard1
│   └── tiny_face_detector_model-weights_manifest.json
└── README.md              # This file
```

## 🚀 How It Works

1. **Library Loading** - face-api.js library loads from CDN
2. **Model Loading** - Pre-trained neural network models load from `/models` directory
3. **Camera Access** - Requests webcam permission from user
4. **Detection Loop** - Runs detection every 200ms
5. **Rendering** - Draws face box and emotion labels on canvas overlay

## 💡 Key JavaScript Functions

- `initializeApp()` - Main initialization function
- `waitForFaceAPI()` - Waits for face-api library to load
- `loadModels()` - Loads neural network models
- `setupCamera()` - Requests and initializes webcam
- `startDetection()` - Starts the detection loop

## 🔧 Requirements

- Modern web browser with WebRTC support (Chrome, Firefox, Edge, Safari)
- Working webcam
- Internet connection (for CDN libraries)

## 📝 Browser Support

- ✅ Chrome/Chromium (Best performance)
- ✅ Firefox
- ✅ Microsoft Edge
- ✅ Safari 15+

## ⚙️ Configuration

Camera parameters can be adjusted in `script.js` in the `setupCamera()` function:

```javascript
const stream = await navigator.mediaDevices.getUserMedia({
  video: { width: 640, height: 480 }  // Adjust resolution here
});
```

## 🎨 Customization

- **Colors**: Edit emotion colors in `startDetection()` function
- **Detection Speed**: Change interval from 200ms to desired value
- **Canvas Size**: Modify width/height in HTML video element
- **UI Styling**: Edit CSS in `style.css`

## 👨‍💻 Developer

Developed by **Sunit Katuwal (BSc CSIT)**

## 📄 License

This project uses open-source libraries and models. Please respect their respective licenses.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ for facial expression recognition**
