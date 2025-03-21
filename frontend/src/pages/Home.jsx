import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chatbot from "../components/Chatbot";
import { toast } from "react-toastify";

const Home = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];

    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setPdfUrl(URL.createObjectURL(file));
      toast.success("Uploaded successfully");
    } else {
      toast.error("Failed to upload PDF. Please try again with a valid PDF.");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 p-6 relative">
        <h1 className="text-2xl text-gray-800 dark:text-white mb-4">
          Welcome to Glean
        </h1>

        {/* Content Section */}
        <div className="mb-10 flex flex-1 space-x-4">
          {/* PDF Viewer (Left Half) */}
          <div className=" w-1/2 h-full border-2 border-gray-300 rounded-lg overflow-hidden">
            {pdfUrl ? (
              <iframe src={pdfUrl} className="w-full h-full" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                No PDF uploaded
              </div>
            )}
          </div>

          {/* Summary Section (Right Half) */}
          <div className="w-1/2 h-full bg-white dark:bg-gray-800 border-2 border-gray-300 rounded-lg p-4 overflow-auto">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Document Summary
            </h2>
            {pdfFile ? (
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                <strong>Title:</strong> {pdfFile.name} <br />
                <strong>Summary:</strong> This is a placeholder for the extracted legal summary. The AI model will generate key points, risk analysis, and essential clauses here. Future updates will bring real-time analysis. 🚀
              </p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">
                Upload a PDF to generate a summary.
              </p>
            )}
          </div>
        </div>

        {/* Centered Upload PDF Button (Small, Non-overlapping) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div
            className={`w-100 h-11 p-3 border-2 border-dashed border-gray-400 rounded-lg text-center cursor-pointer hover:border-blue-500 transition`}
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
                "Upload or Drag & Drop PDF here"
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
