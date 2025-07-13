import React, { useContext, useEffect } from 'react'
import "./App.css"
import va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/UserContext';
import speakimg from  "./assets/speak.gif"
import aigif from "./assets/aiVoice.gif"
function App() {
  let { speaking, recognition, setSpeaking, speak, prompt, setPrompt, response, setResponse } = useContext(datacontext);

  const handleMicClick = () => {
    if (recognition) {
      setSpeaking(true);
      recognition.start();
    } else {
      speak("Sorry, speech recognition is not supported in your browser.");
    }
  };
  
  return (
    <div className='main'>
      <img src={va} alt='AI Assistant' id='victor'/>
      <span data-text="I'm Victor, Your Advanced Virtual Assistant">I'm Victor, Your Advanced Virtual Assistant</span>
      { !speaking ? <button onClick={() => {
        setPrompt("Listening...");
        setSpeaking(true);
        setResponse(false);
        recognition.start();
      }}>Click Here <CiMicrophoneOn/></button>
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
