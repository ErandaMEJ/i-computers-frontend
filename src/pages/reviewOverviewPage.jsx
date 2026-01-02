// src/pages/OverviewPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader";

export default function ReviewOverviewPage() {
  const { productID } = uimport axios from "axios";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../utils/cart";
import { HiChevronRight } from "react-icons/hi";
import ReviewsSection from "../components/reviewsSection";
import StarRating from "../components/starRating";

export default function ProductOverview() {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProducts] = useState(null);
  const [status, setStatus] = useState("loading"); // loading , success , error

  const loadProduct = useCallback(async () => {
    try {
      setStatus("loading");
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID
      );
      setProducts(res.data);
      setStatus("success");
    } catch {
      toast.error("Product Not Found");
      setStatus("error");
    }
  }, [params.productID]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return (
    <>
      {status == "loading" && <Loader />}

      {status == "error" && (
        <h1 className="text-center mt-10 text-2xl">Error loading product.</h1>
      )}

      {status == "success" && product && (
        <div className="w-full min-h-[calc(100vh-68px)] overflow-y-auto pb-24 lg:pb-10 bg-primary">
          <div className="mx-auto max-w-7xl w-full">
            <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-6 py-5">
              {/* Mobile title */}
              <h1 className="text-2xl sm:text-3xl font-semibold lg:hidden text-center sticky top-0 bg-primary/90 backdrop-blur border-b border-secondary/10 py-3 z-10">
                {product.name}
              </h1>

              {/* LEFT: Images (bigger) */}
              <div className="w-full lg:w-1/2">
                <div className="rounded-3xl border border-secondary/10 bg-white/5 shadow-sm overflow-hidden">
                  {/* ✅ මෙතන height එකෙන් photo size ලොකු කරලා */}
                  <div className="w-full h-[340px] sm:h-[460px] lg:h-[620px]">
                    <ImageSlider images={product.images} />
                  </div>
                </div>
              </div>

              {/* RIGHT: Details */}
              <div className="w-full lg:w-1/2">
                <div className="rounded-3xl border border-secondary/10 bg-white/5 shadow-sm p-5 sm:p-6 flex flex-col gap-5">
                  <h1 className="text-3xl font-semibold hidden lg:block text-secondary">
                    {product.name}
                  </h1>

                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-sm sm:text-lg text-secondary/70">
                      {product.productID}
                    </h2>
                    <div className="flex items-center gap-2">
                      <StarRating value={product.rating ?? 0} />
                      <span className="text-sm text-secondary/70">
                        ({product.numReviews ?? 0})
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg text-secondary/80 flex items-center">
                    <HiChevronRight />
                    {product.category}
                  </h3>

                  {product.altNames && product.altNames.length > 0 && (
                    <h3 className="text-sm sm:text-md text-secondary/70">
                      {product.altNames.join(" | ")}
                    </h3>
                  )}

                  <div className="rounded-2xl border border-secondary/10 bg-primary/40 p-4">
                    <p className="text-sm sm:text-md text-justify text-secondary/90 max-h-44 overflow-y-auto pr-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-secondary/10 bg-primary/40 p-4">
                    {product.labelledPrice > product.price && (
                      <h2 className="text-secondary/70 line-through decoration-gold/70 decoration-2 text-lg">
                        LKR. {product.labelledPrice.toFixed(2)}
                      </h2>
                    )}
                    <h2 className="text-accent font-semibold text-3xl">
                      LKR. {product.price.toFixed(2)}
                    </h2>
                  </div>

                  {/* Desktop buttons */}
                  <div className="w-full hidden lg:flex flex-row gap-4">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-1/2 h-12 bg-secondary text-white rounded-2xl hover:bg-secondary/80 transition"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => {
                        navigate("/checkout", {
                          state: [
                            {
                              productID: product.productID,
                              name: product.name,
                              price: product.price,
                              labelledPrice: product.labelledPrice,
                              quantity: 1,
                              image: product.images[0],
                            },
                          ],
                        });
                      }}
                      className="w-1/2 h-12 bg-accent text-white rounded-2xl hover:bg-accent/80 transition"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="px-4 sm:px-6 pb-10">
              <div className="rounded-3xl border border-secondary/10 bg-white/5 shadow-sm p-5 sm:p-6">
                <ReviewsSection
                  product={product}
                  productID={params.productID}
                  onRefresh={loadProduct}
                />
              </div>
            </div>
          </div>

          {/* Mobile Sticky Bottom Bar */}
          <div className="lg:hidden fixed inset-x-0 bottom-0 z-20">
            <div className="mx-auto max-w-7xl px-4 pb-4">
              <div className="rounded-2xl border border-secondary/15 bg-primary/95 backdrop-blur shadow-xl">
                <div className="flex items-center justify-between px-4 pt-3">
                  <div>
                    <p className="text-[11px] text-secondary/60">Price</p>
                    <p className="text-lg font-semibold text-accent">
                      LKR. {product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-secondary/60">Rating</p>
                    <div className="flex items-center gap-2 justify-end">
                      <StarRating value={product.rating ?? 0} showValue={false} size={14} />
                      <span className="text-xs text-secondary/60">
                        ({product.numReviews ?? 0})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="h-12 rounded-2xl border border-secondary/15 bg-white/5 text-secondary font-semibold hover:bg-white/10 transition"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => {
                      navigate("/checkout", {
                        state: [
                          {
                            productID: product.productID,
                            name: product.name,
                            price: product.price,
                            labelledPrice: product.labelledPrice,
                            quantity: 1,
                            image: product.images[0],
                          },
                        ],
                      });
                    }}
                    className="h-12 rounded-2xl bg-accent text-white font-semibold hover:bg-accent/85 transition shadow-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              <div className="h-[env(safe-area-inset-bottom)]" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}seParams();
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  // review form state
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

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

  // user review submit (pending; admin must approve)
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
              <span className="text-2xl font-bold text-secondary">
                LKR. {product.price?.toFixed(2)}
              </span>
              {product.labelledPrice > product.price && (
                <span className="text-sm line-through text-gray-400">
                  LKR. {product.labelledPrice?.toFixed(2)}
                </span>
              )}
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-secondary text-white py-2 rounded-lg text-sm font-medium hover:bg-secondary/90 transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}