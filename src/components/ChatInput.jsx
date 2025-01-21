import React, { useRef, useEffect, useState } from "react";
import { Send, Mic } from "lucide-react";
import "./ChatInput.css";

function ChatInput({ messages, setMessages, collegeLists, setCollegeLists }) {
  const textareaRef = useRef(null);
  const [isListening, setIsListening] = useState(false)
  const [speechRecognition, setSpeechRecognition] = useState(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("Speech recognition not supported");
    } else {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.maxResults = 10;
      recognition.interimResults = true;
      recognition.onstart = () => {
        setIsListening(true);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.onerror = (event) => {
        console.log("Error occurred in recognition: " + event.error);
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        textareaRef.current.value = transcript;
        console.log(transcript)
      };
      setSpeechRecognition(recognition);
    }
  }, []);

  const handleMicClick = () => {
    if (speechRecognition) {
      if (isListening) {
        speechRecognition.stop();
      } else {
        speechRecognition.start();
      }
    }
  };

  const handleBackendRequest = async (e) => {
    const response = await fetch("http://127.0.0.1:5000/get_data", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        question: messages[messages.length - 1].message,
        colleges: collegeLists,
      }),
    });

    if (!response.ok) {
      console.error("No response bruh!");
    }

    console.log(response.status + "successs ahda monu");

    const data = await response.json();
    console.log(data["output"]);
    //setResponseData(data['output']);
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: data["output"], isUser: false },
    ]);
    //speakText(data['output'])
  };
  useEffect(() => {
    if (messages.length > 0 && messages.length % 2 == 0) {
      console.log("end message: " + messages[messages.length - 1]);
      handleBackendRequest();
    }
  }, [messages]);
  const sendMsg = () => {
    const message = textareaRef.current.value;
    console.log(message);
    if (message !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message, isUser: true },
      ]);
      textareaRef.current.value = ""; // clear the textarea
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default Enter behavior (like submitting forms)
      sendMsg();
    }
  };

  return (
    <div className="flex msg-box items-center space-x-2 bg-white/5 rounded-lg p-2">
      <input
        type="text"
        placeholder="Type your message..."
        ref={textareaRef}
        className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-white/50"
        onKeyDown={handleKeyDown}
      />
      <button className="p-2 text-white/80 hover:text-white transition-colors">
      {isListening ? (
          <Mic onClick={handleMicClick} className="h-5 w-5 text-red-500 animate-pulse" style={{
            boxShadow: "0 0 20px rgb(255, 167, 167)",
            animation: "pulse 2s infinite",
            borderRadius: '50%'
          }} />
        ) : (
          <Mic onClick={handleMicClick} className="h-5 w-5" />
        )}
      </button>
      <button
        className="p-2 rounded-full bg-[#0369a1] hover:bg-purple-600 transition-colors"
        onClick={sendMsg}
      >
        <Send className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}

export default ChatInput;
