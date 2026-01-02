// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { productID } = useParams(); // /products/:productID route එකෙන් param එක
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Review form state
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  // product එක load කරන්න
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`/api/products/${productID}`);
        setProduct(res.data);
      } catch (err) {
        setError("Error loading product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productID]);

  // Review submit handler
  async function handleSubmitReview(e) {
    e.preventDefault();
    setReviewError("");
    setReviewMessage("");

    try {
      await axios.post(`/api/products/${productID}/reviews`, {
        name,
        rating,
        comment,
      });

      // review add උනට පස්සේ product එක නැවත load කරලා UI update කරන්න
      const updated = await axios.get(`/api/products/${productID}`);
      setProduct(updated.data);

      setReviewMessage("Review added!");
      setName("");
      setRating(5);
      setComment("");
    } catch (err) {
      setReviewError(
        err.response?.data?.message || "Error adding review"
      );
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error || !product) return <div>{error || "Product not found"}</div>;

  return (
    <div>
      {/* Product basic info */}
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>
        Rating: {product.rating?.toFixed(1) || 0} ({product.numReviews} reviews)
      </p>

      {/* ⭐ Reviews list */}
      <h2>Reviews</h2>
      {(!product.reviews || product.reviews.length === 0) && (
        <p>No reviews yet</p>
      )}

      <ul>
        {product.reviews?.map((r) => (
          <li key={r._id}>
            <strong>{r.name}</strong> - {r.rating}/5
            <p>{r.comment}</p>
          </li>
        ))}
      </ul>

      {/* ⭐ Review form */}
      <h3>Write a review</h3>
      {reviewError && <p style={{ color: "red" }}>{reviewError}</p>}
      {reviewMessage && <p style={{ color: "green" }}>{reviewMessage}</p>}

      <form onSubmit={handleSubmitReview}>
        <div>
          <label>Your name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Rating</label>
          <select
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
          <label>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <button type="submit">Send review</button>
      </form>
    </div>
  );
}ස්