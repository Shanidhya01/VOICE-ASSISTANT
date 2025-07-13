# 🤖 Victor AI Assistant

A futuristic, voice-controlled AI assistant built with React and powered by Google's Gemini AI. Victor features a stunning cyberpunk interface with real-time speech recognition and synthesis capabilities.

![Victor AI Assistant](./src/assets/ai.png)

## ✨ Features

### 🎤 Voice Interaction
- **Real-time Speech Recognition** - Speak naturally to Victor
- **Text-to-Speech Synthesis** - Victor responds with voice
- **Smart State Management** - UI adapts to speech duration automatically

### 🧠 AI Capabilities
- **Gemini AI Integration** - Powered by Google's advanced AI model
- **Contextual Responses** - Understands and responds to complex queries
- **Personality** - Victor has a friendly, helpful personality

### 🎯 Quick Commands
- **Website Navigation**: "Open YouTube", "Open Google", "Open Instagram"
- **Date & Time**: "What's the date today?", "What time is it?"
- **Greetings**: "Hello", "Hi", "Hey"
- **Identity**: "What's your name?", "Who are you?"
- **Courtesy**: "Thank you", "Thanks"

### 🎨 Cyberpunk UI
- **Futuristic Design** - Neon cyan and magenta color scheme
- **Animated Backgrounds** - Floating particles and gradient effects
- **Glass Morphism** - Modern blur effects and transparency
- **Responsive Design** - Works on desktop and mobile devices
- **Visual Feedback** - Different animations for listening and speaking states

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Ai-Assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Gemini API**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Update the API key in `src/gemini.js`:
   ```javascript
   let apiKey = "YOUR_API_KEY_HERE"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173`
   - Allow microphone permissions when prompted

## 🏗️ Project Structure

```
Ai-Assistant/
├── src/
│   ├── assets/
│   │   ├── ai.png          # Victor's avatar
│   │   ├── speak.gif       # Listening animation
│   │   └── aiVoice.gif     # Speaking animation
│   ├── context/
│   │   └── UserContext.jsx # Global state management
│   ├── App.jsx             # Main component
│   ├── App.css             # Cyberpunk styling
│   ├── gemini.js           # AI integration
│   └── main.jsx            # App entry point
├── public/
│   └── vite.svg
├── package.json
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **CSS3** - Advanced animations and effects

### AI & Speech
- **Google Gemini AI** - Natural language processing
- **Web Speech API** - Browser-native speech recognition
- **Speech Synthesis API** - Text-to-speech conversion

### UI/UX
- **CSS Grid & Flexbox** - Responsive layouts
- **CSS Animations** - Smooth transitions and effects
- **Glass Morphism** - Modern design trends
- **Responsive Design** - Mobile-first approach

## 🎮 How to Use

1. **Start Conversation**
   - Click the "Click Here" button
   - Wait for the listening animation
   - Speak clearly into your microphone

2. **Voice Commands**
   ```
   "Open YouTube"          → Opens YouTube in new tab
   "What time is it?"      → Tells current time
   "What's the date?"      → Tells current date
   "Hello Victor"          → Greeting response
   "What's your name?"     → Introduction
   "Thank you"             → Polite response
   ```

3. **AI Questions**
   - Ask any question naturally
   - Victor will process with Gemini AI
   - Receive intelligent, contextual responses

## ⚙️ Configuration

### Speech Settings
Modify speech parameters in `UserContext.jsx`:
```javascript
text_speak.lang = "en-US";    // Language
text_speak.rate = 1;          // Speed (0.1 - 10)
text_speak.volume = 1;        // Volume (0 - 1)
text_speak.pitch = 1;         // Pitch (0 - 2)
```

### AI Model Settings
Customize Gemini AI in `gemini.js`:
```javascript
const generationConfig = {
  temperature: 1,           // Creativity (0 - 1)
  topP: 0.95,              // Nucleus sampling
  topK: 40,                // Top-k sampling
  maxOutputTokens: 8192,   // Response length
};
```

## 🎨 Customization

### Colors & Theme
The cyberpunk theme uses these primary colors:
- **Cyan**: `#22dde7`, `#4fe0ea`
- **Magenta**: `#ed047d`, `#237,4,125`
- **Green**: `#10b981`
- **Dark**: `#0a0a0a`, `#1a1a2e`, `#16213e`

### Adding New Commands
Add custom commands in the `takeCommand` function:
```javascript
else if(command.includes("your-trigger")) {
  speakCommand("Your response");
  setResponse(true);
  setPrompt("Display text");
  setTimeout(() => {
    setResponse(false);
    setSpeaking(false);
  }, 3000);
}
```

## 📱 Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Speech Recognition | ✅ | ❌ | ✅ | ✅ |
| Speech Synthesis | ✅ | ✅ | ✅ | ✅ |
| CSS Effects | ✅ | ✅ | ✅ | ✅ |

**Note**: Speech recognition requires HTTPS in production.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Drag & drop 'dist' folder to Netlify
```

## 🐛 Troubleshooting

### Common Issues

**Microphone not working:**
- Check browser permissions
- Ensure HTTPS in production
- Try refreshing the page

**AI responses not working:**
- Verify Gemini API key
- Check internet connection
- Check browser console for errors

**Speech synthesis not working:**
- Try different browsers
- Check device volume settings
- Ensure speakers/headphones connected

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Sanidhya Kumar**
- GitHub: [@Shanidhya01](https://github.com/Shanidhya01)

## 🙏 Acknowledgments

- Google Gemini AI for powerful language processing
- React team for the amazing framework
- Web Speech API for browser-native speech capabilities
- The open-source community for inspiration

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] Voice customization options
- [ ] Chat history persistence
- [ ] Custom wake words
- [ ] Integration with smart home devices
- [ ] Dark/Light theme toggle
- [ ] Voice training for better recognition

---

⭐ **Star this repository if you found it helpful!**

🤖 **"Hello! I'm Victor, your advanced virtual assistant. How can I help you today?"**
