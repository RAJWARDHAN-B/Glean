import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([{ text: "Welcome to Glean! How can I help?", sender: "bot" }]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-3 bg-blue-500 text-white rounded-full shadow-lg">
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col p-4 mt-2">
          <div className="flex-1 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`p-3 rounded-md max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-300"}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              className="flex-1 p-2 border rounded"
              placeholder="Ask Glean..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
