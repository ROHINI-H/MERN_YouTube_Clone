import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Videos from "./pages/Videos";
import Channel from "./pages/Channel";
import { useState } from "react";
import { AuthProvider } from "./Context/AuthContext";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);   // mobile
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop

  return (
    <AuthProvider>
      <Router>
        <Header
          onSearch={setSearchQuery}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onCollapseSidebar={() => setSidebarCollapsed((prev) => !prev)}
        />

        {/* Layout wrapper with Sidebar */}
        <div className="flex">
          <Sidebar
            isOpen={isSidebarOpen}
            collapsed={isSidebarCollapsed}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main content */}
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/video/:id" element={<Videos />} />
              <Route path="/channel" element={<Channel />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}
