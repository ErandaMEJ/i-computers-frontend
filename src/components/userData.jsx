import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData(){
    const [user, setUser] = useState(null);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token != null){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then((response)=>{
                setUser(response.data);
            }).catch(()=>{
                setUser(null);
            })
        }
    }, [])
    const [selectedOption, setSelectedOption] = useState("user");

    return (
        <>
            {
                user?
                <div className="w-[150px] flex flex-row">
                    <img src={user.image} refererPolicy="no-referrer" className="w-[50px] rounded-full h-[50px]"/>
                    <select className="bg-transparent outline-none ml-2  text-white" value={selectedOption}
                     onChange={
                        (e)=>{
                            
                            if(e.target.value == "logout"){
                                localStorage.removeItem("token");
                                window.location.href = "/login";
                            }else if(e.target.value == "my-orders"){
                                window.location.href = "/orders";
                            }
                            setSelectedOption("user")
                        }
                    }>
                        <option className="bg-accent" value={"user"}>{user.firstName}</option>
                        <option className="bg-accent" value={"logout"}>Logout</option>
                        <option className="bg-accent" value={"my-orders"}>My Orders</option>
                        
                    </select>
                </div>:
                <div className="w-[150px] flex flex-row">
                    <Link to="/login" className="mx-2 px-4 py-2 bg-white text-black rounded-full hover:bg-black hover:text-white transition-colors duration-300">Login</Link> 
                    <Link to="/register" className="mx-2 px-4 py-2 bg-white rounded-full text-black hover:bg-black hover:text-white transition-colors duration-300"> Register</Link>
                </div>
                
            }
        </>
    )
}