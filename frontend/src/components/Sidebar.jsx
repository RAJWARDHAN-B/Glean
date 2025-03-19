import { useState } from "react";
import { Menu, Home, FileText, Settings } from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-screen bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"} p-4 flex flex-col`}>
      {/* Toggle Button */}
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="mb-6">
        <Menu size={24} />
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <Home size={20} /> {!isCollapsed && "Dashboard"}
        </a>
        <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <FileText size={20} /> {!isCollapsed && "Documents"}
        </a>
        <a href="#" className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
          <Settings size={20} /> {!isCollapsed && "Settings"}
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
