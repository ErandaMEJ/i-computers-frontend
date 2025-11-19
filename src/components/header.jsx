import { FaCartShopping } from "react-icons/fa6";

import { Link } from "react-router-dom";


export default function Header(){
    return(
        <header className="w-full h-[100px] bg-accent flex relative">
            <img src="/logo.png" className="h-full" alt="Logo"/>
            <div className="w-full h-full flex text-xl font-bold text-secondary justify-center items-center gap-[30px]">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>

            </div>
            <Link to="/cart"className="absolute right-5 top-1/2 translate-y-[-50%] text-primary text-3xl">
                <FaCartShopping />


            </Link>
            
            
        </header>
    )
}