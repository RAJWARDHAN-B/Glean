import React from "react"; // ✅ Ensure React is imported
import { useTheme } from "../context/ThemeContext"; // ✅ Ensure correct import
import { FiSun, FiMoon } from "react-icons/fi";

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-64 h-screen bg-gray-200 dark:bg-gray-800 p-4 flex flex-col">
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleTheme}
        className="self-end text-gray-700 dark:text-gray-300"
      >
        {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      {/* Sidebar Title */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        Sidebar
      </h2>

      {/* Sidebar Navigation (Placeholder) */}
      <ul className="mt-4 space-y-2">
        <li className="p-2 bg-gray-300 dark:bg-gray-700 rounded">
          <a href="#" className="text-gray-800 dark:text-white">
            Dashboard
          </a>
        </li>
        <li className="p-2 bg-gray-300 dark:bg-gray-700 rounded">
          <a href="#" className="text-gray-800 dark:text-white">
            Documents
          </a>
        </li>
        <li className="p-2 bg-gray-300 dark:bg-gray-700 rounded">
          <a href="#" className="text-gray-800 dark:text-white">
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
