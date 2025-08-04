# English Pronunciation Practice App

A simple web application for practicing English pronunciation through fill-in-the-blank exercises. Users listen to audio pronunciations and complete sentences with missing words.

## Features

- 🎵 Audio playback for sentence pronunciation
- ✏️ Fill-in-the-blank interface
- ✅ Instant feedback on answers
- 📱 Responsive design for mobile and desktop
- ⚙️ Easy configuration through JSON file
- 🎯 Progress tracking

## Setup

1. **Download or clone this repository**
2. **Add your audio files**: Create an `audio` folder and add your MP3 files
3. **Configure questions**: Edit `questions.json` with your sentences and audio file paths
4. **Open the app**: Simply open `index.html` in a web browser

## Configuration

Edit `questions.json` to customize your questions:

```json
{
  "questions": [
    {
      "sentenceBefore": "The weather is ",
      "sentenceAfter": " today.",
      "correctAnswer": "beautiful",
      "audioFile": "audio/weather_beautiful.mp3"
    }
  ]
}
```

### Configuration Fields

- `sentenceBefore`: Text that appears before the blank
- `sentenceAfter`: Text that appears after the blank
- `correctAnswer`: The correct word to fill in the blank
- `audioFile`: Path to the audio file (relative to the project root)

## File Structure

```
Accent_Prototype_2/
├── index.html          # Main application file
├── styles.css          # Styling and layout
├── script.js           # Application logic
├── questions.json      # Question configuration
├── README.md           # This file
└── audio/              # Audio files folder
    ├── weather_beautiful.mp3
    ├── love_exercise.mp3
    └── ...
```

## How to Use

1. **Start the app**: Open `index.html` in your web browser
2. **Listen**: Click the "Play Audio" button to hear the sentence
3. **Answer**: Type the missing word in the input field
4. **Check**: Click "Check Answer" to see if you're correct
5. **Continue**: Click "Next Question" to proceed

## Audio File Requirements

- **Format**: MP3 files recommended
- **Naming**: Use descriptive names (e.g., `weather_beautiful.mp3`)
- **Location**: Place all audio files in the `audio/` folder
- **Paths**: Reference files in `questions.json` as `audio/filename.mp3`

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

### Styling
Edit `styles.css` to change colors, fonts, and layout.

### Functionality
Modify `script.js` to add features like:
- Score tracking
- Timer functionality
- Different question types
- Export results

## Troubleshooting

**Audio not playing?**
- Check that audio files exist in the correct location
- Ensure audio files are valid MP3 format
- Try refreshing the page

**Questions not loading?**
- Verify `questions.json` has valid JSON syntax
- Check that the file is in the same directory as `index.html`

**Mobile issues?**
- The app is responsive and should work on mobile devices
- Ensure you're using a modern browser

## License

This project is open source and available under the MIT License. 