import React, { useContext, useEffect } from 'react'
import "./App.css"
import va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/UserContext';
import speakimg from  "./assets/speak.gif"
import aigif from "./assets/aiVoice.gif"
function App() {
  let { speaking, recognition, setSpeaking, speak, prompt, setPrompt, response, setResponse, language, setRecognitionLanguage } = useContext(datacontext);

  const handleMicClick = () => {
    if (recognition) {
      setSpeaking(true);
      recognition.start();
    } else {
      speak("Sorry, speech recognition is not supported in your browser.");
    }
  };

  const toggleLanguage = () => {
    const newLang = language === "en-US" ? "hi-IN" : "en-US";
    setRecognitionLanguage(newLang);
    const message = newLang === "hi-IN" ? "अब हिंदी में बात करें" : "Now speaking in English";
    speak(message);
  };
  
  return (
    <div className='main'>
      {/* Language Toggle Button */}
      <div className='language-toggle'>
        <button onClick={toggleLanguage} className='lang-btn'>
          {language === "en-US" ? "🇮🇳 हिंदी" : "🇺🇸 English"}
        </button>
      </div>
      
      <img src={va} alt='AI Assistant' id='victor'/>
      <span data-text="I'm Victor, Your Advanced Virtual Assistant">
        {language === "en-US" ? "I'm Victor, Your Advanced Virtual Assistant" : "मैं विक्टर हूं, आपका एडवांस वर्चुअल असिस्टेंट"}
      </span>
      
      { !speaking ? <button onClick={() => {
        setPrompt(language === "en-US" ? "Listening..." : "सुन रहा हूं...");
        setSpeaking(true);
        setResponse(false);
        recognition.start();
      }}>
        {language === "en-US" ? "Click Here" : "यहाँ क्लिक करें"} <CiMicrophoneOn/>
      </button>
      :
      <div className='response'>
        {!response ? 
          <img src={speakimg} alt='Listening'  id ='speak'/>
          :
          <img src={aigif} alt='AI Speaking'  id ='aigif'/> 
        }
        <p>{prompt}</p>
      </div>
      }
    </div>
  )
}

export default App
