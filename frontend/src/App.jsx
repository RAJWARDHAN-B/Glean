import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex justify-end">
        <ChatBox />
      </div>
    </div>
  );
}

export default App;
