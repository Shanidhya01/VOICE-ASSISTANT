import React, { createContext, useState } from 'react'
import run from '../gemini';
export const datacontext = createContext();

function UserContext({children}) {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("Listening...");
  let [response, setResponse] = useState(false);
  let [language, setLanguage] = useState("en-US"); // Default to English

  // Language detection function
  function detectLanguage(text) {
    // Simple Hindi detection - check for Devanagari script
    const hindiPattern = /[\u0900-\u097F]/;
    if (hindiPattern.test(text)) {
      return "hi-IN";
    }
    // Check for common Hindi words in Latin script
    const hindiWordsPattern = /(namaste|kaise|hain|aap|mera|naam|kya|hai|hindi|boliye)/i;
    if (hindiWordsPattern.test(text)) {
      return "hi-IN";
    }
    return "en-US";
  }

  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    // Detect language for appropriate speech synthesis
    let detectedLang = detectLanguage(text);
    text_speak.lang = detectedLang;
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    
    // Add event listener for when speech ends
    text_speak.onend = () => {
      console.log("Speech ended");
      // Reset states after speech completes
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 1000); // Small delay after speech ends
    };
    
    text_speak.onerror = (e) => {
      console.error("Speech synthesis error:", e);
      // Reset states if speech fails
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 1000);
    };
    
    window.speechSynthesis.speak(text_speak);
  }

  // Separate function for command responses (like "Opening YouTube")
  function speakCommand(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    // Detect language for appropriate speech synthesis
    let detectedLang = detectLanguage(text);
    text_speak.lang = detectedLang;
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
    // Don't handle state reset here - let the timeout in takeCommand handle it
  }

  async function aiResponse(prompt){
    let text = await run(prompt);
    // Fix the text processing logic
    let newText = text.split("**").join("").split("*").join("").replace(/google/gi,"Sanidhya Kumar");
    setResponse(true); // Set to true to show AI response gif first
    setPrompt(newText);
    speak(newText); // The speak function will handle resetting states when done
    console.log(newText);
    // Removed the timeout since speak() function now handles state reset
  }

  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  
  // Set up recognition for both languages
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  // Function to switch recognition language
  function setRecognitionLanguage(lang) {
    recognition.lang = lang;
    setLanguage(lang);
  }
  
  // Start with English, but we'll add language switching capability
  recognition.lang = language;
  
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    console.log("Recognized:", transcript);
    
    // Detect the language of the recognized speech
    let detectedLang = detectLanguage(transcript);
    if (detectedLang !== language) {
      setLanguage(detectedLang);
    }
    
    setPrompt(transcript); // Update prompt with the recognized text
    setResponse(false); // Keep showing listening gif until AI response starts
    takeCommand(transcript.toLowerCase());
  }
  
  recognition.onend = () => {
    // Don't set speaking to false immediately, let takeCommand handle it
  }
  
  recognition.onerror = (e) => {
    console.error("Speech recognition error:", e.error);
    setSpeaking(false);
    speakCommand("Sorry, I couldn't understand what you said. Please try again.");
  }
  
  function takeCommand(command){
    // YouTube commands - English & Hindi
    if((command.includes("open") && command.includes("youtube")) || 
       (command.includes("youtube") && (command.includes("kholo") || command.includes("chalao"))) ||
       command.includes("यूट्यूब")){
      window.open("https://www.youtube.com/","_blank")
      let isHindi = detectLanguage(command) === "hi-IN";
      speakCommand(isHindi ? "YouTube khol raha hun" : "Opening Youtube")
      setPrompt(isHindi ? "YouTube khol raha hun..." : "Opening Youtube...")
      setResponse(true);
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 3000);
    }
    // Google commands - English & Hindi
    else if((command.includes("open") && command.includes("google")) || 
            (command.includes("google") && (command.includes("kholo") || command.includes("chalao"))) ||
            command.includes("गूगल")){
      window.open("https://www.google.com/","_blank")
      let isHindi = detectLanguage(command) === "hi-IN";
      speakCommand(isHindi ? "Google khol raha hun" : "Opening Google")
      setResponse(true);
      setPrompt(isHindi ? "Google khol raha hun..." : "Opening Google...")
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 3000);
    }
    // Instagram commands - English & Hindi
    else if((command.includes("open") && command.includes("instagram")) || 
            (command.includes("instagram") && (command.includes("kholo") || command.includes("chalao"))) ||
            command.includes("इंस्टाग्राम")){
      window.open("https://www.instagram.com/","_blank")
      let isHindi = detectLanguage(command) === "hi-IN";
      speakCommand(isHindi ? "Instagram khol raha hun" : "Opening Instagram")
      setResponse(true);
      setPrompt(isHindi ? "Instagram khol raha hun..." : "Opening Instagram...")
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 3000);
    }
    // Date commands - English & Hindi
    else if(command.includes("date") || command.includes("today") || command.includes("what day") ||
            command.includes("aaj") || command.includes("tarikh") || command.includes("din") ||
            command.includes("आज") || command.includes("तारीख")){
      let today = new Date();
      let isHindi = detectLanguage(command) === "hi-IN" || 
                   command.includes("aaj") || command.includes("tarikh") || command.includes("आज");
      
      if(isHindi) {
        let hindiDateString = today.toLocaleDateString('hi-IN', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        speakCommand(`Aaj ki tarikh hai ${hindiDateString}`);
        setPrompt(`Aaj ki tarikh: ${hindiDateString}`);
      } else {
        let dateString = today.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        speakCommand(`Today is ${dateString}`);
        setPrompt(`Today is ${dateString}`);
      }
      setResponse(true);
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 4000);
    }
    // Time commands - English & Hindi
    else if(command.includes("time") || command.includes("what time") ||
            command.includes("samay") || command.includes("kitna") || command.includes("baje") ||
            command.includes("समय") || command.includes("बजे")){
      let now = new Date();
      let isHindi = detectLanguage(command) === "hi-IN" || 
                   command.includes("samay") || command.includes("baje") || command.includes("समय");
      
      if(isHindi) {
        let timeString = now.toLocaleTimeString('hi-IN', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        });
        speakCommand(`Abhi samay hai ${timeString}`);
        setPrompt(`Samay: ${timeString}`);
      } else {
        let timeString = now.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        });
        speakCommand(`The current time is ${timeString}`);
        setPrompt(`Current time: ${timeString}`);
      }
      setResponse(true);
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 4000);
    }
    // Greetings - English & Hindi
    else if(command.includes("hello") || command.includes("hi") || command.includes("hey") ||
            command.includes("namaste") || command.includes("namaskar") || command.includes("adaab") ||
            command.includes("नमस्ते") || command.includes("हैलो")){
      let isHindi = detectLanguage(command) === "hi-IN" || 
                   command.includes("namaste") || command.includes("namaskar") || command.includes("नमस्ते");
      
      if(isHindi) {
        speakCommand("Namaste! Main Victor hun, aapka AI assistant. Main aapki kaise madad kar sakta hun?");
        setPrompt("Namaste! Kaise madad kar sakta hun?");
      } else {
        speakCommand("Hello! I'm Victor, your AI assistant. How can I help you today?");
        setPrompt("Hello! How can I help you?");
      }
      setResponse(true);
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 5000);
    }
    // Thank you - English & Hindi
    else if(command.includes("thank you") || command.includes("thanks") ||
            command.includes("dhanyawad") || command.includes("shukriya") || command.includes("dhanyawaad") ||
            command.includes("धन्यवाद") || command.includes("शुक्रिया")){
      let isHindi = detectLanguage(command) === "hi-IN" || 
                   command.includes("dhanyawad") || command.includes("shukriya") || command.includes("धन्यवाद");
      
      if(isHindi) {
        speakCommand("Koi baat nahi! Main hamesha aapki madad ke liye yahan hun.");
        setPrompt("Koi baat nahi!");
      } else {
        speakCommand("You're welcome! I'm always here to help you.");
        setPrompt("You're welcome!");
      }
      setResponse(true);
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 3000);
    }
    // Name/Identity - English & Hindi
    else if(command.includes("your name") || command.includes("who are you") || command.includes("what are you") ||
            command.includes("tumhara naam") || command.includes("tum kaun") || command.includes("aap kaun") ||
            command.includes("तुम्हारा नाम") || command.includes("आप कौन")){
      let isHindi = detectLanguage(command) === "hi-IN" || 
                   command.includes("tumhara") || command.includes("kaun") || command.includes("नाम");
      
      if(isHindi) {
        speakCommand("Main Victor hun, aapka advanced virtual assistant. Main aapki sawalon mein madad kar sakta hun, websites khol sakta hun, aur baat-cheet kar sakta hun!");
        setPrompt("Main Victor hun, aapka AI assistant!");
      } else {
        speakCommand("I'm Victor, your advanced virtual assistant. I'm here to help you with questions, open websites, and have conversations!");
        setPrompt("I'm Victor, your AI assistant!");
      }
      setResponse(true);
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 6000);
    }
    // Language switch commands
    else if(command.includes("switch to hindi") || command.includes("hindi mein baat karo") ||
            command.includes("हिंदी में बात करो")){
      setRecognitionLanguage("hi-IN");
      speakCommand("Theek hai, ab main Hindi mein baat karunga!");
      setPrompt("अब Hindi में बात कर रहे हैं");
      setResponse(true);
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 3000);
    }
    else if(command.includes("switch to english") || command.includes("english mein baat karo") ||
            command.includes("अंग्रेजी में बात करो")){
      setRecognitionLanguage("en-US");
      speakCommand("Okay, I'll speak in English now!");
      setPrompt("Now speaking in English");
      setResponse(true);
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 3000);
    }
    else{
      // Small delay to show the transition from listening to AI response
      setTimeout(() => {
        setResponse(true); // This will show the AI gif
        aiResponse(command); // AI response will handle its own state reset when speech ends
      }, 500); // Half second delay
    }
  }
  let value = {
    recognition,
    speaking,
    setSpeaking,
    speak,
    prompt,
    setPrompt,
    response,
    setResponse,
    language,
    setLanguage,
    setRecognitionLanguage
  }
  return (
    <div>
      <datacontext.Provider value={value}>
      {children}
      </datacontext.Provider>
    </div>
  )
}

export default UserContext
