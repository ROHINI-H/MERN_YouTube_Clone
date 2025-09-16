import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Videos from "./pages/Videos";
import Channel from "./pages/Channel";
import { useState } from "react";
import { AuthProvider } from "./Context/AuthContext";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthProvider>
      <Router>
        <Header onSearch={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/video/:id" element={<Videos />} />
          <Route path="/channel" element={<Channel />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
