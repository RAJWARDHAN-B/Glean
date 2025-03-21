import React, { useContext } from "react";
import { PdfContext } from "../context/PdfContext"; // Global context for PDF cases

const Sidebar = () => {
  const { cases, activeCase, setActiveCase, addNewCase } = useContext(PdfContext);

  return (
    <div className="w-64 h-full bg-gradient-to-b from-[#1F2430] to-[#12171D] text-slate-100 p-4 border-r border-slate-700 flex flex-col space-y-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#64FFDA]">Glean Cases</h2>
      </div>
      
      {/* Cases list */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            onClick={() => setActiveCase(caseItem.id)}
            className={`p-3 cursor-pointer transition-colors 
              ${activeCase === caseItem.id 
                ? "bg-[rgba(100,255,218,0.15)]" 
                : "bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(100,255,218,0.1)]"} 
              rounded-full`}
          >
            {caseItem.title}
          </div>
        ))}
      </div>

      {/* Add New Case */}
      <div>
        <button
          onClick={addNewCase}
          className="w-full p-3 rounded-full bg-[#64FFDA] text-[#1F2430] font-semibold hover:bg-[#5be8e4] transition-colors"
        >
          + New Case
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
