import { useState } from "react";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await API.post("/auth/register", { username, email, password });
    setMessage("✅ Registration successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 2000);
  } catch (err) {
    setMessage(err.response?.data?.message || "❌ Registration failed");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-3"
      >
        <h2 className="text-xl font-bold">Register</h2>
        {message && <p className="text-green-600">{message}</p>}

        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 w-full rounded">
          Register
        </button>
        <p className="text-sm">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;