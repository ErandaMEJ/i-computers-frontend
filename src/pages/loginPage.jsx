import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    console.log("Logging button clicked");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
        email: email,
        password: password,
      });

      console.log(res);
      localStorage.setItem("token", res.data.token);

      if (res.data.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success("Login successful! Welcome back.");
    } catch (err) {
      toast.error("Login failed! Please check your credentials and try again.");
      console.log("Error during login:");
      console.log(err);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('bg.jpg')] bg-center bg-cover bg-no-repeat flex items-center justify-center relative overflow-hidden">
      {/* Overlay gradient for better contrast */}
      <div className="absolute inset-0 bg-secondary/60 backdrop-blur-sm"></div>

      <div className="relative z-10 flex w-full h-full">
        {/* Left side */}
        <div className="w-1/2 flex flex-col justify-center items-center p-10">
          <img
            src="/logo.png"
            alt="logo"
            className="w-[220px] mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
          <h1 className="text-[48px] font-bold text-gold text-center leading-tight drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            Powering Your Digital World
          </h1>
          <p className="text-[20px] text-primary italic mt-4 text-center max-w-[400px] leading-relaxed">
            Best computers, parts, and tech support across Sri Lanka.
          </p>
        </div>

        {/* Right side - login box */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-[420px] h-[600px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 flex flex-col items-center transition-all duration-300 ">
            <h1 className="text-[42px] font-bold mb-6 text-primary tracking-wide">
              Login
            </h1>

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full h-[50px] mb-[20px] rounded-lg bg-white/20 text-primary placeholder:text-gray-300 p-4 text-[18px] border border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full h-[50px] mb-3 rounded-lg bg-white/20 text-primary placeholder:text-gray-300 p-4 text-[18px] border border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />

            <p className="text-primary text-sm w-full text-right mb-[15px]">
              Forgot your password?{" "}
              <Link
                to="/reset-password"
                className="text-gold underline hover:text-accent italic transition-colors"
              >
                Reset
              </Link>
            </p>

            <button
              onClick={login}
              className="w-full h-[50px] bg-accent text-primary text-[20px] font-semibold rounded-lg border-2 border-accent 
                         hover:bg-transparent hover:text-accent transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(46,140,214,0.4)]"
            >
              Login
            </button>

            <p className="text-primary mt-6 text-[16px]">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-gold underline italic hover:text-accent transition-colors"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
