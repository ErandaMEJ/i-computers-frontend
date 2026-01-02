import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function resetPassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/validate-otp", {
        email: email,
        otp: otp,
        newPassword: newPassword,
      });
      toast.success("Password reset successful");
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Error resetting password. Try again later");
      setLoading(false);
    }
  }

  async function sendOtp() {
    setLoading(true);
    try {
      await axios.get(import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email);
      toast.success("OTP sent to your email");
      setLoading(false);
      setOtpSent(true);
    } catch (err) {
      console.log(err);
      toast.error("Error sending OTP Try again later");
      setLoading(false);
    }
  }

  const inputCls =
    "w-full h-12 rounded-xl bg-primary/40 border border-secondary/15 px-4 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition";
  const btnCls =
    "w-full h-12 rounded-xl bg-accent text-white font-semibold hover:bg-accent/85 transition";

  return (
    <div className="min-h-[calc(100vh-68px)] w-full bg-primary grid place-items-center px-4">
      {loading && <Loader />}

      <div className="w-full max-w-md rounded-3xl border border-secondary/10 bg-white/5 shadow-2xl p-7">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 w-fit rounded-full border border-secondary/10 bg-white/5 px-3 py-1 text-xs font-semibold text-secondary/70">
            Password Recovery
          </div>
          <h2 className="mt-3 text-2xl font-bold text-secondary">
            {otpSent ? "Enter OTP & New Password" : "Reset your password"}
          </h2>
          <p className="mt-1 text-sm text-secondary/60">
            {otpSent
              ? "Check your email for the OTP and set a new password."
              : "Enter your email and we’ll send an OTP."}
          </p>
        </div>

        {!otpSent ? (
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email address"
              className={inputCls}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendOtp} className={btnCls}>
              Send OTP
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="OTP code"
              className={inputCls}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="New password"
              className={inputCls}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className={inputCls}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={resetPassword} className={btnCls}>
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}