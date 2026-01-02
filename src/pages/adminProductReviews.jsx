// src/pages/AdminProductReviews.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader";



export default function AdminProductReviews() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");
  const isAdmin = user?.isAdmin === true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  async function fetchProduct() {
    try {
      setLoaded(false);
      const res = await axios.get(`${backendUrl}/products/${productID}`);
      setProduct(res.data);
      setLoaded(true);
    } catch (err) {
      console.error(err);
      setError("Error loading product");
      setLoaded(true);
    }
  }

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productID]);

  // admin approve review
  async function handleApproveReview(reviewID) {
    if (!token) {
      alert("No auth token found");
      return;
    }

    try {
      await axios.patch(
        `${backendUrl}/products/${productID}/reviews/${reviewID}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchProduct();
    } catch (err) {
      console.error(err);
      alert("Error approving review");
    }
  }

  // admin delete review
  async function handleDeleteReview(reviewID) {
    if (!token) {
      alert("No auth token found");
      return;
    }

    try {
      await axios.delete(
        `${backendUrl}/products/${productID}/reviews/${reviewID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchProduct();
    } catch (err) {
      console.error(err);
      alert("Error deleting review");
    }
  }

  if (!isAdmin) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center text-red-500">
        Access denied. Admins only.
      </div>
    );
  }

  if (!loaded && !error) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center text-red-500">
        {error || "Product not found"}
      </div>
    );
  }

  <Link to={`/admin/products/${product.productID}/reviews`}>Manage Reviews
  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex justify-center p-4 bg-gray-50">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Reviews for: {product.name} ({product.productID})
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          Current rating:{" "}
          <span className="font-semibold">
            {product.rating?.toFixed(1) || 0} / 5
          </span>{" "}
          ({product.numReviews} approved reviews)
        </p>

        {(!product.reviews || product.reviews.length === 0) && (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {(product.reviews || []).map((r) => (
            <div
              key={r._id}
              className="border border-gray-100 rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">
                    {r.name}
                  </span>
                  <span className="text-sm text-yellow-500">
                    {r.rating} / 5
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {r.isApproved ? "Approved" : "Pending"}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{r.comment}</p>
              </div>

              <div className="flex gap-2">
                {!r.isApproved && (
                  <button
                    onClick={() => handleApproveReview(r._id)}
                    className="px-3 py-1 text-xs rounded bg-green-500 text-white hover:bg-green-600"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDeleteReview(r._id)}
                  className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  </Link>
}