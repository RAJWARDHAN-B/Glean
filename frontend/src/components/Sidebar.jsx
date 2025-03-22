import React, { useState, useEffect } from "react";
import { FaBars, FaGripLines, FaFileAlt } from "react-icons/fa"; // Icons
import { getUserDocuments } from "../api"; // Import API call
import { toast } from "react-toastify";

const Sidebar = ({ onSelectDoc }) => {
  const [docs, setDocs] = useState([]);
  const [activeDoc, setActiveDoc] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return JSON.parse(localStorage.getItem("sidebarCollapsed")) || false;
  });

  const token = localStorage.getItem("token"); // Get auth token

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    if (token) {
      fetchUserDocuments();
    }
  }, []);

  const fetchUserDocuments = async () => {
    try {
      const docIds = await getUserDocuments(token);
      setDocs(docIds);
    } catch (error) {
      toast.error("Failed to fetch user documents");
    }
  };

  const handleDocSelect = (docId) => {
    setActiveDoc(docId);
    onSelectDoc(docId);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } h-full bg-gradient-to-b from-[#1F2430] to-[#12171D] text-slate-100 p-4 border-r border-slate-700 flex flex-col space-y-4 transition-all duration-300`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-2xl font-bold text-[#64FFDA] transition-all duration-300">
            Glean Cases
          </h2>
        )}
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#64FFDA] p-2 rounded-full hover:bg-[#5be8e4] transition-colors"
        >
          {isCollapsed ? <FaGripLines size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Cases List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {docs.length > 0 ? (
          docs.map((docId) => (
            <div
              key={docId}
              onClick={() => handleDocSelect(docId)}
              className={`p-3 flex items-center space-x-2 cursor-pointer transition-all rounded-full ${
                activeDoc === docId
                  ? "bg-[rgba(100,255,218,0.15)]"
                  : "bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(100,255,218,0.1)]"
              }`}
            >
              <FaFileAlt size={18} className="text-[#64FFDA]" />
              {!isCollapsed && <span>{docId}</span>}
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-400 italic">
            No documents uploaded
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
