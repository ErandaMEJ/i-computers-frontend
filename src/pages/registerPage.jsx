import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function register() {
    if (firstName.trim() == "") return toast.error("First name is required.");
    if (lastName.trim() == "") return toast.error("Last name is required.");
    if (email.trim() == "") return toast.error("Email is required.");
    if (password.trim() == "") return toast.error("Password is required.");
    if (password !== confirmPassword) return toast.error("Passwords do not match.");
    if (password != confirmPassword) return toast.error("Passwords do not match.");

    setIsLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/", {
        email: email.trim(),
        password: password.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      navigate("/login");
      toast.success("Registration successful! Welcome to I computers.");
      setIsLoading(false);
    } catch (err) {
      toast.error("Registration failed! Please check your data and try again.");
      console.log(err);
      setIsLoading(false);
    }
  }

  const inputCls =
    "w-full h-12 rounded-xl bg-white/10 text-white placeholder:text-white/50 px-4 outline-none border border-white/15 focus:border-accent focus:ring-2 focus:ring-accent/20 transition";

  return (
    <div className="min-h-screen w-full bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative z-10 min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left side (desktop only) - unchanged */}
        <div className="hidden lg:flex flex-col justify-center items-center p-10">
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

        {/* Right side (mobile optimized + logo shown) */}
        <div className="flex justify-center items-center px-4 py-10">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-7">
            {/* ✅ Mobile logo */}
            <div className="lg:hidden flex justify-center mb-4">
              <img
                onClick={() => (window.location.href = "/")}
                src="/logo.png"
                alt="logo"
                className="w-28 cursor-pointer"
              />
            </div>

            <h1 className="text-3xl font-bold text-white text-center lg:text-left">
              Register
            </h1>
            <p className="mt-1 text-sm text-white/60 text-center lg:text-left">
              Create your account in a few seconds.
            </p>

            <div className="mt-6 space-y-3">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First name"
                className={inputCls}
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last name"
                className={inputCls}
              />
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
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm password"
                className={inputCls}
              />

              <button
                onClick={register}
                className="w-full h-12 rounded-xl bg-accent text-primary font-semibold hover:bg-accent/85 transition shadow-sm active:scale-[0.99]"
              >
                Register Now
              </button>

              <p className="pt-2 text-sm text-white/70 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-gold hover:text-white underline underline-offset-4"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {isLoading && <Loader />}
    </div>
  );
}