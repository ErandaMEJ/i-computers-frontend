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
    
    if (firstName.trim()==""){
        toast.error("First name is required.");
        return;
    }
    if (lastName.trim()==""){
        toast.error("Last name is required.");
        return;
    }
    if (email.trim() == "") {
      toast.error("Email is required.");
      return;
    }
    if (password.trim() == "") {
      toast.error("Password is required.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (password != confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/", 
      {
        email: email.trim(),
        password: password.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      }
    );
        console.log();
        navigate("/login");
        
      

      toast.success("Registration successful! Welcome to I computers.");
      setIsLoading(false);
      
    } catch (err) {
      toast.error("Registration failed! Please check your data and try again.");      
      console.log(err);
      setIsLoading(false);
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
            <h1 className="text-[20px] font-semibold mb-[20px] text-primary tracking-wide">
              Register
            </h1>

            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="Enter your first name"
              className="w-full h-[50px] mb-[20px] rounded-lg bg-white/20 text-primary placeholder:text-gray-300 p-4 text-[18px] border border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />

            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Enter your last name"
              className="w-full h-[50px] mb-[20px] rounded-lg bg-white/20 text-primary placeholder:text-gray-300 p-4 text-[18px] border border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />

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
              className="w-full h-[50px] mb-[20px] rounded-lg bg-white/20 text-primary placeholder:text-gray-300 p-4 text-[18px] border border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />

            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm your password"
              className="w-full h-[50px] mb-[20px] rounded-lg bg-white/20 text-primary placeholder:text-gray-300 p-4 text-[18px] border border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />              
            
            <button
              onClick={register}
              className="w-full h-[50px] bg-accent text-primary text-[20px] font-semibold rounded-lg border-2 border-accent 
                         hover:bg-transparent hover:text-accent transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(46,140,214,0.4)]"
            >
              Register Now
            </button>

            <p className="text-primary mt-6 text-[16px]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-gold underline italic hover:text-accent transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div> 
            {isLoading && <Loader />}           
      </div>        
    </div>
  );
}
