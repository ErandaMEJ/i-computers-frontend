import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import Loader from "../components/loader"
import { useNavigate } from "react-router-dom"

export default function ForgetPasswordPage() {
    const [otpSent, setOtpSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    async function resetPassword() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        setLoading(true)
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/validate-otp", {
                email: email,
                otp: otp,
                newPassword: newPassword
            })
            toast.success("Password reset successful")
            setLoading(false)
            navigate("/login")

        }catch(err) {
            console.log(err)
            toast.error("Error resetting password. Try again later")
            setLoading(false)
        }
    }

    async function sendOtp() {
        setLoading(true)
        try {
            await axios.get(import.meta.env.VITE_BACKEND_URL + "/users/send-otp/"+email)
            toast.success("OTP sent to your email")
            setLoading(false)
            setOtpSent(true)

        }catch(err) {
            console.log(err)
            toast.error("Error sending OTP Try again later")
            setLoading(false)
        }
    }

    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            {
                loading && (
                    <Loader />
                )
            }
            {
                otpSent ?
                <div className="w-[400px] h-[500px] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center p-6">
                    <h2 className="text-2xl font-bold mb-4">Enter OTP and New Password</h2>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"                        
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter New Password"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"                        
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"                        
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button 
                        onClick={resetPassword}
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Reset Password                        

                    </button>

                </div>:
                <div className="w-[400px] h-[400px] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center p-6">
                    <h2 className="text-2xl font-bold mb-4">Reset your password</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"                        
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button 
                        onClick={sendOtp}
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Send OTP                        

                    </button>
                </div>
            }

        </div>
    )
    
}