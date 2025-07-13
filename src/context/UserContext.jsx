import React, { createContext, useState } from 'react'
import run from '../gemini';
export const datacontext = createContext();

function UserContext({children}) {
  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("Listening...");
  let [response, setResponse] = useState(false);

  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.lang = "en-US";
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
    text_speak.lang = "en-US";
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
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    console.log(transcript);
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
    if(command.includes("open") && command.includes("youtube")){
      window.open("https://www.youtube.com/","_blank")
      speakCommand("Opening Youtube")
      setPrompt("Opening Youtube...")
      setResponse(true);
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 3000);
    }
    else if(command.includes("open") && command.includes("google")){
      window.open("https://www.google.com/","_blank")
      speakCommand("Opening Google")
      setResponse(true);
      setPrompt("Opening Google...")
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 3000);
    }
    else if(command.includes("open") && command.includes("instagram")){
      window.open("https://www.instagram.com/","_blank")
      speakCommand("Opening Instagram")
      setResponse(true);
      setPrompt("Opening Instagram...")
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 3000);
    }
    else if(command.includes("date") || command.includes("today") || command.includes("what day")){
      let today = new Date();
      let dateString = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      speakCommand(`Today is ${dateString}`);
      setResponse(true);
      setPrompt(`Today is ${dateString}`);
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 4000);
    }
    else if(command.includes("time") || command.includes("what time")){
      let now = new Date();
      let timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      speakCommand(`The current time is ${timeString}`);
      setResponse(true);
      setPrompt(`Current time: ${timeString}`);
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 4000);
    }
    else if(command.includes("hello") || command.includes("hi") || command.includes("hey")){
      speakCommand("Hello! I'm Victor, your AI assistant. How can I help you today?");
      setResponse(true);
      setPrompt("Hello! How can I help you?");
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 5000);
    }
    else if(command.includes("thank you") || command.includes("thanks")){
      speakCommand("You're welcome! I'm always here to help you.");
      setResponse(true);
      setPrompt("You're welcome!");
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 3000);
    }
    else if(command.includes("your name") || command.includes("who are you") || command.includes("what are you")){
      speakCommand("I'm Victor, your advanced virtual assistant. I'm here to help you with questions, open websites, and have conversations!");
      setResponse(true);
      setPrompt("I'm Victor, your AI assistant!");
      setTimeout(() => {
        setResponse(false);
        setSpeaking(false);
      }, 6000);
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
    setResponse
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
