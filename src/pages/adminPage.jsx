import { Link, Route, Routes } from "react-router-dom";
import { HiClipboardList } from "react-icons/hi";
import { FaBoxes, FaUserFriends } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddProductPage from "./admin/adiminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminProductReviews from "./admin/adminProductReviews";
import AdminReviewsPage from "./admin/aminReviewsPage";

export default function AdminPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      window.location.href = "/";
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.role == "admin") setUser(response.data);
        else window.location.href = "/";
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  const navItem =
    "w-full flex items-center gap-3 h-11 px-4 rounded-xl text-secondary/90 hover:bg-white/10 hover:text-secondary transition";

  return (
    <div className="w-full h-full flex bg-accent">
      {user ? (
        <>
          {/* Sidebar */}
          <div className="w-[300px] h-full p-4">
            <div className="h-[72px] flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4">
              <img onClick={() => window.location.href = "/"} src="/logo.png" className="h-12 w-12 object-contain" alt="logo" />
              <h1 className="text-xl font-bold text-secondary">Admin Panel</h1>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-2">
              <Link to="/admin" className={navItem}>
                <HiClipboardList /> Orders
              </Link>
              <Link to="/admin/products" className={navItem}>
                <FaBoxes /> Products
              </Link>
              <Link to="/admin/users" className={navItem}>
                <FaUserFriends /> Users
              </Link>
              <Link to="/admin/reviews" className={navItem}>
                <MdRateReview /> Reviews
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="w-[calc(100%-300px)] h-full p-4">
            <div className="w-full h-full rounded-3xl border border-secondary/10 bg-primary shadow-xl overflow-y-auto">
              <Routes path="/">
                <Route path="/" element={<AdminOrdersPage />} />
                <Route path="/products" element={<AdminProductPage />} />
                <Route path="/add-product" element={<AdminAddProductPage />} />
                <Route path="/update-product" element={<AdminUpdateProductPage />} />
                <Route path="/users" element={<AdminUsersPage />} />
                <Route path="/reviews" element={<AdminReviewsPage />} />
                <Route path="/reviews/:productID" element={<AdminProductReviews />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}