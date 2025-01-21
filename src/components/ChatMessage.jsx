import React, { useEffect, useRef } from "react";
import { Volume2 } from "lucide-react";

function ChatMessage({ message, isUser, messages, setMessages }) {

  function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = speechSynthesis.getVoices()[0];
        speechSynthesis.speak(utterance);
    } else {
        console.error("Speech Synthesis not supported in this browser.");
    }
}
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] p-4 rounded-xl ${
          isUser ? "bg-[#0369a1] text-white" : "bg-white/20 text-white"
        }`}
      >
        <div className="flex items-start space-x-2">
          <p className="leading-relaxed flex-1">{message}</p>
          <button className="text-white/80 hover:text-white transition-colors">
            <Volume2 onClick={() => speakText(message)} className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
