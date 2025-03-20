import React from "react"; // ✅ Ensure React is imported
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <ThemeProvider>
      <Home />
      <ToastContainer/>
    </ThemeProvider>
  );
}

export default App;
