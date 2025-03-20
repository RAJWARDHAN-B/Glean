import React from "react"; // ✅ Fix: Import React
import Sidebar from "../components/Sidebar";
import Chatbot from "../components/Chatbot";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <h1 className="text-2xl text-gray-800 dark:text-white">
          Welcome to Glean
        </h1>
      </div>
      <Chatbot />
    </div>
  );
};

export default Home;
