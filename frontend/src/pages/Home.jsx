import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chatbot from "../components/Chatbot";

const Home = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex flex-col justify-between">
        {/* Page Title */}
        <h1 className="text-2xl text-gray-800 dark:text-white">
          Welcome to Glean
        </h1>

        {/* PDF Upload Section (Bottom Left, Small Box) */}
        <div className="relative flex justify-start">
          <div
            className={`w-294 p-3 border-2 border-dashed ${
              dragging ? "border-blue-500 bg-blue-100 dark:bg-blue-900" : "border-gray-400"
            } rounded-lg text-center cursor-pointer bg-white dark:bg-gray-800`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              handleFileUpload(e);
              setDragging(false);
            }}
            onClick={() => document.getElementById("pdfUpload").click()}
          >
            <input
              type="file"
              id="pdfUpload"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {pdfFile ? (
                <span className="text-green-600 dark:text-green-400">
                  Uploaded: {pdfFile.name}
                </span>
              ) : (
                "Upload PDF"
              )}
            </p>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Home;
