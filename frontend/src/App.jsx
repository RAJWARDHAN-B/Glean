import React from "react"; // ✅ Ensure React is imported
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

export default App;
