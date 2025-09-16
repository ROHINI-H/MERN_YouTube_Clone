import { useState, useContext } from "react";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", { email, password });
    login(res.data.user, res.data.token);
    setMessage("✅ Login successful! Redirecting to homepage...");
    setTimeout(() => navigate("/"), 1500);
  } catch (err) {
    setMessage(err.response?.data?.message || "❌ Login failed");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-3"
      >
        <h2 className="text-xl font-bold">Login</h2>
        {message && <p className="text-green-600">{message}</p>}

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
        <button className="bg-blue-500 text-white px-4 py-2 w-full rounded">
          Login
        </button>
        <p className="text-sm">
          No account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;