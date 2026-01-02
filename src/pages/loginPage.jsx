import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const inputCls =
    "w-full h-12 rounded-xl bg-white/10 text-white placeholder:text-white/50 px-4 outline-none border border-white/15 focus:border-accent focus:ring-2 focus:ring-accent/20 transition";
  const btnCls =
    "w-full h-12 rounded-xl font-semibold border border-accent bg-accent text-primary hover:bg-accent/85 transition shadow-sm active:scale-[0.99]";
  const btnGhost =
    "w-full h-12 rounded-xl font-semibold border border-white/15 bg-white/10 text-white hover:bg-white/15 transition";

  const goAfterLogin = (role) => navigate(role === "admin" ? "/admin" : "/");

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        const res = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/users/google-login",
          { token: response.access_token }
        );
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful!");
        goAfterLogin(res.data.role);
      } catch (err) {
        console.log(err);
        toast.error("Google login failed");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => toast.error("Google login failed"),
    onNonOAuthError: () => toast.error("Google login failed"),
  });

  async function login() {
    setIsLoading(true);
    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful! Welcome back.");
      goAfterLogin(res.data.role);
    } catch (err) {
      console.log(err);
      toast.error("Login failed! Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[url('/bg.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative z-10 min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left (desktop only) - unchanged */}
        <div className="hidden lg:flex flex-col justify-center px-16">
          <img
            onClick={() => (window.location.href = "/")}
            src="/logo.png"
            alt="logo"
            className="w-56 cursor-pointer"
          />
          <h1 className="mt-6 text-5xl font-bold text-gold leading-tight">
            Powering Your Digital World
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-md">
            Best computers, parts, and tech support across Sri Lanka.
          </p>
        </div>

        {/* Right (mobile optimized) */}
        <div className="flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl p-7">
            {/* ✅ Mobile logo (shows only on mobile) */}
            <div className="lg:hidden flex justify-center mb-4">
              <img
                onClick={() => (window.location.href = "/")}
                src="/logo.png"
                alt="logo"
                className="w-28 cursor-pointer"
              />
            </div>

            <h1 className="text-3xl font-bold text-white text-center lg:text-left">
              Login
            </h1>
            <p className="mt-1 text-sm text-white/60 text-center lg:text-left">
              Welcome back. Please sign in.
            </p>

            <form
              className="mt-6 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (!isLoading) login();
              }}
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className={inputCls}
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className={inputCls}
              />

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-white/70 hover:text-white underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className={btnCls} disabled={isLoading}>
                Login
              </button>

              <button
                type="button"
                onClick={() => googleLogin()}
                className={btnGhost}
                disabled={isLoading}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <GrGoogle /> Continue with Google
                </span>
              </button>

              <p className="pt-3 text-sm text-white/70 text-center">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-gold hover:text-white underline underline-offset-4"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {isLoading && <Loader />}
    </div>
  );
}