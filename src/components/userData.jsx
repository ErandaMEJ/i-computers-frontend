import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, []);

  return (
    <>
      {user ? (
        <div className="relative">
          {/* Button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="
              inline-flex items-center gap-3
              rounded-full border border-white/15 bg-white/10
              px-3 py-2 text-white
              hover:bg-white/15 transition
              select-none
            "
          >
            <img
              src={user.image}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-white/20 bg-white/10"
              alt="avatar"
            />

            <span className="font-semibold max-w-[110px] truncate">
              {user.firstName}
            </span>

            <span
              className={[
                "transition-transform opacity-80",
                open ? "rotate-180" : "rotate-0",
              ].join(" ")}
            >
              ▾
            </span>
          </button>

          {/* Overlay click to close */}
          {open && (
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          )}

          {/* ✅ Dropdown (WHITE) */}
          <div
            className={[
              "absolute right-0 top-full mt-2 w-60 z-50",
              "rounded-2xl border border-secondary/10 bg-white/95 backdrop-blur",
              "shadow-xl shadow-black/15 overflow-hidden",
              "transition duration-150 transform origin-top-right",
              open
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none",
            ].join(" ")}
          >
            {/* user info */}
            <div className="px-4 py-3">
              <p className="text-xs text-secondary/60">Signed in as</p>
              <p
                className="text-sm font-semibold text-secondary truncate"
                title={user.email || user.firstName}
              >
                {user.email || user.firstName}
              </p>
            </div>

            <div className="h-px bg-secondary/10" />

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                window.location.href = "/orders";
              }}
              className="w-full text-left px-4 py-3 text-sm font-semibold text-secondary hover:bg-black/5 transition"
            >
              My Orders
            </button>

            <div className="h-px bg-secondary/10" />

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-500/10 transition"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-2 rounded-full border border-white/15 bg-white/10 text-white font-semibold hover:bg-white/15 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Register
          </Link>
        </div>
      )}
    </>
  );
}