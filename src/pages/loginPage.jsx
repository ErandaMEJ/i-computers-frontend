import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"

export default function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function login(){
        console.log("Logging button clicked");
        console.log("Email:", email);
        console.log("Password:", password);


        try{

            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login",{
            email: email,
            password: password
        })

        console.log(res)

        localStorage.setItem("token", res.data.token);

        if(res.data.role == "admin"){
            //window.location.href = "/admin";
            navigate("/admin");
        }else{
            //window.location.href = "/";
            navigate("/");
        }

        //alert("Login successful! Welcome back.");

        toast.success("Login successful! Welcome back.");

        }catch(err){

           // alert("Login failed! Please check your credentials and try again.");
            toast.error("Login failed! Please check your credentials and try again.");

            console.log("Error during login:")
            console.log(err)
        }


        
    }

    return(

        <div className="w-full h-screen bg-[url('bg.jpg')] bg-center bg-cover bg-no-repeat flex" >
            <div className="w-[50%] h-full flex justify-center items-center flex-col p-[50px]">
                <img src="/logo.png" alt="logo" className="w-[250px] mb-[10px] object-cover backdrop-blur-[1px]"/>
                <h1 className="text-[50px] text-gold  text-shadow-lg/40  font-bold text-center ">Powering Your Digital World.</h1>
                <p className="text-[20px] text-white text-shadow-lg/35 italic text-center backdrop-blur-[1px]">Best computers, parts, and tech support across Sri Lanka.</p>
            </div>

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center p-[30px]  ">
                    <h1 className="text-[40px] font-bold mb-[20px] text-primary text-shadow-white">Login</h1>

                    <input
                        onChange={
                            (e)=>{
                                setEmail(e.target.value)
                            }
                        }
                        
                    type="email" placeholder="your email" className="w-full h-[50px] mb-[20px] rounded-lg border text-white border-accent p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-gold "/>

                    <input
                        onChange={
                            (e)=>{
                                setPassword(e.target.value)
                            }
                        }

                    type="password" placeholder="your password" className="w-full h-[50px]  rounded-lg border text-white border-accent p-[10px] text-[20px] focus:outline-none focus:ring-2 focus:ring-gold "/>


                    <p className="text-white not-italic w-full text-right mb-[10px]">Forgot your password? <Link to="/reset-password" className="text-gold underline italic">Reset</Link></p>.

                    <button onClick={login}className="w-full h-[50px] bg-accent text-primary text-[20px] font-bold rounded-lg border-[2px] border-accent hover:bg-transparent hover:text-accent ">Login</button>
                    <p className="text-primary mt-[20px] not-italic">Don't have an account? <Link to="/register" className="text-gold underline italic">Register</Link></p>
                </div>

            </div>
            
        </div>
    )
}