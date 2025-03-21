import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon, FiMenu, FiX, FiHome, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-gray-200 dark:bg-gray-900 p-4 flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="self-end text-gray-700 dark:text-gray-300 mb-4"
      >
        {collapsed ? <FiMenu size={24} /> : <FiX size={24} />}
      </button>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className="text-gray-700 dark:text-gray-300 mb-6"
      >
        {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      {/* Sidebar Navigation */}
      <ul className="space-y-4">
        <li
          className="flex items-center p-2 bg-gray-300 dark:bg-gray-700 rounded cursor-pointer"
        >
          <FiHome className="text-gray-800 dark:text-white" size={20} />
          {!collapsed && <span className="ml-3 text-gray-800 dark:text-white">Home</span>}
        </li>
        <li
          className="flex items-center p-2 bg-gray-300 dark:bg-gray-700 rounded cursor-pointer"
        >
          <FiLogOut className="text-gray-800 dark:text-white" size={20} />
          {!collapsed && <span className="ml-3 text-gray-800 dark:text-white">Logout</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
