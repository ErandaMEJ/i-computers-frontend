import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <header className="w-full h-[100px] bg-accent flex relative">
      {/* Mobile Menu Button */}
      <TiThMenu
        onClick={() => setSideBarOpen(true)}
        className="text-white my-auto text-3xl ml-6 lg:hidden cursor-pointer"
      />

      {/* Logo */}
      <img src="/logo.png" className="h-full" alt="Logo" />

      {/* Desktop Links */}
      <div className="w-full h-full hidden lg:flex text-xl font-bold text-secondary justify-center items-center gap-[30px]">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Desktop User */}
      <div className="absolute right-24 top-0 h-full items-center hidden lg:flex">
        <UserData />
      </div>

      {/* Cart Button */}
      <Link
        to="/cart"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-3xl"
      >
        <FaCartShopping />
      </Link>

      {/* ---------------- Sidebar Overlay ---------------- */}
      {sideBarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSideBarOpen(false)}
        ></div>
      )}

      {/* ---------------- Animated Sidebar ---------------- */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-[260px] bg-white z-30 shadow-xl lg:hidden
          transform transition-transform duration-500 
          ${sideBarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="w-full h-[100px] bg-accent flex justify-between items-center px-4">
          <img src="/logo.png" className="h-full" alt="Logo" />
          <TiThMenu
            onClick={() => setSideBarOpen(false)}
            className="text-white text-3xl cursor-pointer"
          />
        </div>

        {/* Sidebar Links */}
        <div className="text-accent font-bold text-2xl flex flex-col pl-6 gap-6 mt-10">
          <Link
            to="/"
            className="hover:text-secondary transition"
            onClick={() => setSideBarOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-secondary transition"
            onClick={() => setSideBarOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/about"
            className="hover:text-secondary transition"
            onClick={() => setSideBarOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-secondary transition"
            onClick={() => setSideBarOpen(false)}
          >
            Contact
          </Link>

          <div className="flex justify-center bg-accent p-2 rounded-full w-[160px] mt-10">
            <UserData />
          </div>
        </div>
      </div>
    </header>
  );
}
