import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to LegalBuddy! How can I help?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user's message to the chat
    const userMessage = { text: input.trim(), sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    
    // Store the question and clear input
    const question = input.trim();
    setInput("");
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Make a POST request to the /ask endpoint on your Flask server
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: question }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.answer) {
        // Add server response to the chat
        setMessages((prev) => [
          ...prev,
          { text: data.answer, sender: "bot" },
        ]);
      } else {
        // Handle error in the response
        setMessages((prev) => [
          ...prev,
          { 
            text: `Sorry, I couldn't find an answer: ${data.error || "Unknown error"}`, 
            sender: "bot" 
          },
        ]);
      }
    } catch (error) {
      console.error("Error connecting to the server:", error);
      setMessages((prev) => [
        ...prev,
        { 
          text: "Error connecting to the server. Please make sure your Flask application is running.", 
          sender: "bot" 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-200"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
      
      {/* Chatbox */}
      {isOpen && (
        <div className="w-80 h-[450px] bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col p-4 mt-2 fixed right-4 bottom-14 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="py-2 px-3 bg-blue-500 text-white rounded-t-lg mb-3 -mt-4 -mx-4">
            <h3 className="text-lg font-medium">LegalBuddy</h3>
            <p className="text-xs opacity-75">AI Legal Document Assistant</p>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[90%] ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="flex gap-2 mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
            <input
              type="text"
              className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Ask LegalBuddy..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              className={`bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors ${
                isLoading || !input.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading || !input.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;