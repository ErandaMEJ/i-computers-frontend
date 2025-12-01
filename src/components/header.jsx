import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";

import { Link } from "react-router-dom";


export default function Header(){
    const [sideBarOpen, setSideBarOpen] = useState(false);

    return(
        <header className="w-full h-[100px] bg-accent flex relative">
            <TiThMenu onClick={()=>{setSideBarOpen(true)}} className ="text-white my-auto text-3xl ml-6 lg:hidden" />

            <img src="/logo.png" className="h-full" alt="Logo"/>
            <div className="w-full h-full hidden lg:flex text-xl font-bold text-secondary justify-center items-center gap-[30px]">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>

            </div>
            <Link to="/cart"className="absolute right-5 top-1/2 translate-y-[-50%] text-primary text-3xl">
                <FaCartShopping />


            </Link>
           { sideBarOpen&& <div className="fixed lg:hidden w-[100vw] h-screen top-0 left-0 bg-black/50 z-20 transition-all duration-300">
                <div className="w-[250px] h-screen  flex-col relative">
                    <div className="absolute bg-white w-full h-full  flex flex-col  left-[-250px] transform-flat translate-x-[250px] transition-transform duration-1000 ">
                        <div className="w-full h-[100px] bg-accent flex justify-center items-center">
                            <img src="/logo.png" className="h-full" alt="Logo"/>
                            <TiThMenu onClick={()=>{setSideBarOpen(false)}} className ="text-white my-auto text-3xl ml-6 lg:hidden" />
                               

                        </div>
                        <div className="w-full h-[400px] text-accent font-bold text-2xl flex flex-col pl-[20px] pt-[20px] ">
                            <a className="hover:text-secondary transition"
                               href="/"
                               onClick={()=>setSideBarOpen(false)}>
                                Home
                            </a>
                            <a className="hover:text-secondary transition"
                               href="/products"
                               onClick={()=>setSideBarOpen(false)}>
                                Products
                            </a>
                            <a className="hover:text-secondary transition"
                               href="/about"
                               onClick={()=>setSideBarOpen(false)}>
                                About
                            </a>
                            <a className="hover:text-secondary transition"
                               href="/contact"
                               onClick={()=>setSideBarOpen(false)}>
                                Contact
                            </a>
                        </div>

                    </div>

                </div>

            </div>}
            
            
        </header>
    )
}