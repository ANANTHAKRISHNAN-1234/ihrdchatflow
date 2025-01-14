import React, { useRef, useEffect } from "react";
import { Send, Mic } from "lucide-react";
import "./ChatInput.css";

function ChatInput({ messages, setMessages, collegeLists, setCollegeLists }) {
  const textareaRef = useRef(null);

  const handleBackendRequest = async (e) => {
    const response = await fetch("http://127.0.0.1:5000/get_data", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        question: messages[messages.length - 1].message,
        colleges: collegeLists.colleges,
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
        <Mic className="h-5 w-5" />
      </button>
      <button
        className="p-2 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors"
        onClick={sendMsg}
      >
        <Send className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}

export default ChatInput;
