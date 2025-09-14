import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        navigate("/");
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-3" >
                <h2 className="text-xl font-bold">Login</h2>
                <input type="email" placeholder="Email" className="border-2 border-cyan-500 rounded-2xl p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="border-2 border-cyan-500 rounded-2xl p-2 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-blue-500 text-white px-4 py-2 w-full rounded"> Login </button>
                <p className="text-sm">
                    No account? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
            </form>
        </div>
    )
}

export default Login;