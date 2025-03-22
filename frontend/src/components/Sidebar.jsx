import React, { useContext, useState, useEffect } from "react";
import { PdfContext } from "../context/PdfContext";
import { FaBars, FaGripLines, FaFileAlt, FaPlus } from "react-icons/fa"; // Icons

const Sidebar = () => {
  const { cases, activeCase, setActiveCase, addNewCase } = useContext(PdfContext);

  // Retrieve sidebar state from localStorage
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return JSON.parse(localStorage.getItem("sidebarCollapsed")) || false;
  });

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
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
          onClick={toggleSidebar}
          className="text-[#64FFDA] p-2 rounded-full hover:bg-[#5be8e4] transition-colors"
        >
          {isCollapsed ? <FaGripLines size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Cases List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            onClick={() => setActiveCase(caseItem.id)}
            className={`p-3 flex items-center space-x-2 cursor-pointer transition-all rounded-full ${
              activeCase === caseItem.id
                ? "bg-[rgba(100,255,218,0.15)]"
                : "bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(100,255,218,0.1)]"
            }`}
          >
            <FaFileAlt size={18} className="text-[#64FFDA]" />
            {!isCollapsed && <span>{caseItem.title}</span>}
          </div>
        ))}
      </div>

      {/* Add New Case */}
      <div>
        <button
          onClick={addNewCase}
          className="w-full flex items-center justify-center space-x-2 p-3 rounded-full bg-[#64FFDA] text-[#1F2430] font-semibold hover:bg-[#5be8e4] transition-colors"
        >
          <FaPlus size={16} />
          {!isCollapsed && <span>New Case</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
