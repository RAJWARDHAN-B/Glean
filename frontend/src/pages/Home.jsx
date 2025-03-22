import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chatbot from "../components/Chatbot";
import { toast } from "react-toastify";

const Home = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const AUTH_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbmFAZ21haWwuY29tIiwiZXhwIjoxNzQ1MjEzMjk5fQ.eO78FuvWjPnfqeC7U8GUJCTuSgCvgZSpmNMcacF4o1k";

  const handleFileUpload = async (e) => {
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];

    if (!file || file.type !== "application/pdf") {
      toast.error("Failed to upload. Please select a valid PDF.");
      return;
    }

    setPdfFile(file);
    setPdfUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const response = await fetch("https://glean.onrender.com/doc", {
        method: "POST",
        headers: {
          Authorization: AUTH_TOKEN, // Hardcoded Token
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      toast.success("PDF uploaded successfully!");

      console.log("Uploaded document ID:", data.document_id);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#1F2430] to-[#12171D] text-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col p-6 relative">
        <h1 className="text-3xl font-bold tracking-wide text-[#64FFDA] mb-6">
          Welcome to Glean
        </h1>

        <div className="mb-16 flex flex-1 space-x-6">
          {/* PDF Viewer */}
          <div className="w-1/2 h-full border border-slate-700 rounded-lg overflow-hidden shadow-md bg-[rgba(255,255,255,0.04)] backdrop-blur-sm">
            {pdfUrl ? (
              <iframe src={pdfUrl} className="w-full h-full" title="PDF Viewer" />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                No PDF uploaded
              </div>
            )}
          </div>

          {/* Summary Section */}
          <div className="w-1/2 h-full border border-slate-700 rounded-lg p-6 overflow-auto shadow-md bg-[rgba(255,255,255,0.04)] backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Document Summary</h2>
            {pdfFile ? (
              <p className="text-base leading-relaxed text-slate-300">
                <strong>Title:</strong> {pdfFile.name} <br />
                <strong>Summary:</strong> Processing...
              </p>
            ) : (
              <p className="italic text-slate-400">Upload a PDF to generate a summary.</p>
            )}
          </div>
        </div>

        {/* Upload PDF Button */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div
            className="w-80 h-12 p-3 border border-dashed border-slate-600 rounded-lg text-center cursor-pointer transition-colors duration-200 bg-[rgba(255,255,255,0.03)] backdrop-blur-sm hover:border-[#64FFDA] hover:bg-[rgba(100,255,218,0.08)]"
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
            <p className="text-base">
              {isUploading ? (
                <span className="text-[#64FFDA]">Uploading...</span>
              ) : pdfFile ? (
                <span className="text-[#64FFDA]">Uploaded: {pdfFile.name}</span>
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
