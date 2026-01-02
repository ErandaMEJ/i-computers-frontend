
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader";

export default function ProductDetailsPage() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  // review form state
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

 
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
  }, [productID]);

  // normal user review submit
  async function handleSubmitReview(e) {
    e.preventDefault();
    setReviewError("");
    setReviewMessage("");

    try {
      await axios.post(`${backendUrl}/products/${productID}/reviews`, {
        name,
        rating: Number(rating),
        comment,
      });

      setReviewMessage("Review submitted. Waiting for admin approval.");
      setName("");
      setRating(5);
      setComment("");

      await fetchProduct();
    } catch (err) {
      console.error(err);
      setReviewError(
        err.response?.data?.message || "Error adding review"
      );
    }
  }

  // admin approve
  async function handleApproveReview(reviewID) {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;

      await axios.patch(
        `${backendUrl}/products/${productID}/reviews/${reviewID}/approve`,
        {},
        config
      );

      await fetchProduct();
    } catch (err) {
      console.error(err);
      alert("Error approving review");
    }
  }

  // admin delete
  async function handleDeleteReview(reviewID) {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;

      await axios.delete(
        `${backendUrl}/products/${productID}/reviews/${reviewID}`,
        config
      );

      await fetchProduct();
    } catch (err) {
      console.error(err);
      alert("Error deleting review");
    }
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

  // user-visible reviews = approved reviews විතර
  const visibleReviews = (product.reviews || []).filter(
    (r) => r.isApproved
  );

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex justify-center p-4 bg-gray-50">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        {/* Product main info */}
        <div className="w-full bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 flex items-center justify-center">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full max-h-96 object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-lg">
                No Image
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <h1 className="text-2xl font-semibold text-gray-800">
              {product.name}
            </h1>
            <p className="text-gray-600">{product.description}</p>

            <div className="flex items-center gap-4 mt-2">
              <span className="text-2xl font-bold text-primary">
                Rs. {product.price?.toLocaleString()}
              </span>
              <span className="text-sm line-through text-gray-400">
                Rs. {product.labelledPrice?.toLocaleString()}
              </span>
            </div>

            <div className="mt-2 text-sm text-gray-700">
              Rating:{" "}
              <span className="font-semibold">
                {product.rating?.toFixed(1) || 0} / 5
              </span>{" "}
              ({product.numReviews} reviews)
            </div>

            <div className="mt-1 text-sm text-gray-500">
              Stock: {product.stock} | Brand: {product.brand} | Model:{" "}
              {product.model}
            </div>
          </div>
        </div>

        {/* Reviews + Form */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visible reviews */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Customer Reviews
            </h2>

            {visibleReviews.length === 0 && (
              <p className="text-gray-500 text-sm">
                No approved reviews yet.
              </p>
            )}

            <div className="space-y-4 max-h-80 overflow-y-auto">
              {visibleReviews.map((r) => (
                <div
                  key={r._id}
                  className="border border-gray-100 rounded-lg p-3"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-800">
                      {r.name}
                    </span>
                    <span className="text-sm text-yellow-500">
                      {r.rating} / 5
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Review form */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Write a Review
            </h2>

            {reviewError && (
              <div className="mb-2 text-sm text-red-500">{reviewError}</div>
            )}
            {reviewMessage && (
              <div className="mb-2 text-sm text-green-600">
                {reviewMessage}
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                >
                  <option value="1">1 - Very bad</option>
                  <option value="2">2 - Bad</option>
                  <option value="3">3 - OK</option>
                  <option value="4">4 - Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Admin review management */}
        {isAdmin && (
          <div className="w-full bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Admin: Manage Reviews
            </h2>

            {(!product.reviews || product.reviews.length === 0) && (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            )}

            <div className="space-y-3 max-h-80 overflow-y-auto">
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
                    <p className="text-sm text-gray-700 mt-1">
                      {r.comment}
                    </p>
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
        )}
      </div>
    </div>
  );
}