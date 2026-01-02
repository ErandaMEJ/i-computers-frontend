import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <header className="w-full h-[68px] bg-accent flex relative border-b border-white/10 shadow-md">
      {/* Mobile Menu Button */}
      <TiThMenu
        onClick={() => setSideBarOpen(true)}
        className="text-white my-auto text-3xl ml-5 lg:hidden cursor-pointer hover:opacity-90 transition"
      />

      {/* Logo */}
      <img 
        onClick={() => window.location.href = "/"}
        src="/logo.png"
        className="h-[70px] my-auto ml-3 object-contain"
        alt="Logo"
      />

      {/* Desktop Links */}
      <div className="w-full h-full hidden lg:flex text-[18px] font-bold text-secondary justify-center items-center gap-10">
        <Link className="hover:text-primary/90 transition-colors" to="/">Home</Link>
        <Link className="hover:text-primary/90 transition-colors" to="/products">Products</Link>
        <Link className="hover:text-primary/90 transition-colors" to="/about">About</Link>
        <Link className="hover:text-primary/90 transition-colors" to="/contact">Contact</Link>
      </div>

      {/* Desktop User */}
      <div className="absolute right-[90px] top-0 h-full items-center hidden lg:flex">
        <div className="  px-2 py-1 flex items-center ">
          <UserData />
        </div>
      </div>

      {/* Cart Button */}
      <Link
        to="/cart"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
      >
        <div className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition">
          <FaCartShopping className="text-2xl" />
        </div>
      </Link>

      {/* --------------- Sidebar Overlay ---------------- */}
      {sideBarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSideBarOpen(false)}
        ></div>
      )}

      {/* ---------------- Animated Sidebar ---------------- */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-[250px] bg-white z-30 shadow-2xl lg:hidden
          transform transition-transform duration-500
          ${sideBarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="w-full h-[68px] bg-accent flex justify-between items-center px-4 border-b border-white/10">
          <img onClick={() => window.location.href = "/"} src="/logo.png" className="h-[70px] object-contain" alt="Logo" />
          <TiThMenu
            onClick={() => setSideBarOpen(false)}
            className="text-white text-3xl cursor-pointer hover:opacity-90 transition"
          />
        </div>

        {/* Sidebar Links */}
        <div className="text-accent font-bold text-xl flex flex-col pl-6 gap-6 mt-8">
          <Link
            to="/"
            className="hover:text-secondary transition-colors"
            onClick={() => setSideBarOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-secondary transition-colors"
            onClick={() => setSideBarOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/about"
            className="hover:text-secondary transition-colors"
            onClick={() => setSideBarOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-secondary transition-colors"
            onClick={() => setSideBarOpen(false)}
          >
            Contact
          </Link>

          <div className="flex justify-center bg-accent/95 p-2 rounded-full w-[170px] mt-10 border border-black/5 shadow-sm">
            <UserData />
          </div>
        </div>
      </div>
    </header>
  );
}