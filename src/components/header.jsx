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
        onClick={() => (window.location.href = "/")}
        src="/logo.png"
        className="h-[70px] my-auto ml-3 object-contain"
        alt="Logo"
      />

      {/* Desktop Links */}
      <div className="w-full h-full hidden lg:flex text-[18px] font-bold text-secondary justify-center items-center gap-10">
        <Link className="hover:text-primary/90 transition-colors" to="/">
          Home
        </Link>
        <Link className="hover:text-primary/90 transition-colors" to="/products">
          Products
        </Link>
        <Link className="hover:text-primary/90 transition-colors" to="/about">
          About
        </Link>
        <Link className="hover:text-primary/90 transition-colors" to="/contact">
          Contact
        </Link>
      </div>

      {/* Desktop User */}
      <div className="absolute right-[90px] top-0 h-full items-center hidden lg:flex">
        <div className="px-2 py-1 flex items-center ">
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
          className="fixed inset-0 bg-black/55 backdrop-blur-[2px] z-20 lg:hidden"
          onClick={() => setSideBarOpen(false)}
        />
      )}

      {/* ---------------- Animated Sidebar ---------------- */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-[280px] z-30 lg:hidden
          transform transition-transform duration-300
          ${sideBarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Shell */}
        <div className="h-full bg-white/95 backdrop-blur border-r border-black/10 shadow-2xl">
          {/* Sidebar Header */}
          <div className="w-full h-[68px] bg-accent flex justify-between items-center px-4 border-b border-white/10">
            <img
              onClick={() => (window.location.href = "/")}
              src="/logo.png"
              className="h-[64px] object-contain cursor-pointer"
              alt="Logo"
            />
            <button
              type="button"
              onClick={() => setSideBarOpen(false)}
              className="h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
              aria-label="Close menu"
            >
              <TiThMenu className="text-2xl" />
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="px-4 py-5">
            <p className="text-xs font-semibold text-secondary/50 uppercase tracking-wide px-2">
              Menu
            </p>

            <div className="mt-3 flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "Products" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((i) => (
                <Link
                  key={i.to}
                  to={i.to}
                  onClick={() => setSideBarOpen(false)}
                  className="
                    flex items-center justify-between
                    px-4 py-3 rounded-2xl
                    text-secondary font-semibold
                    hover:bg-black/5 transition
                  "
                >
                  {i.label}
                  <span className="text-secondary/40">›</span>
                </Link>
              ))}
            </div>

            {/* User card */}
            <div className="mt-6 rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
              <p className="text-xs font-semibold text-secondary/50 uppercase tracking-wide px-2">
                Account
              </p>
              <div className="mt-2 flex justify-center">
                <UserData />
              </div>
            </div>
          </div>

          {/* Bottom safe space */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </div>
    </header>
  );
}