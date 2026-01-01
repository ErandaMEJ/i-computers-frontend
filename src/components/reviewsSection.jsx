import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../utils/api";
import StarRating from "./starRating";
import { fetchMe, getCachedMe } from "../utils/me";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return "";
  }
}

function pickDisplayName(me) {
 
  return (
    me?.name ||
    me?.fullName ||
    me?.username ||
    me?.email ||
    ""
  );
}

export default function ReviewsSection({ product, productID, onRefresh }) {
  const approvedReviews = useMemo(() => {
    const list = product?.reviews ?? [];
    
    return list.filter((r) => r?.isApproved);
  }, [product]);

  const [me, setMe] = useState(() => getCachedMe());
  const [nameLocked, setNameLocked] = useState(false);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setNameLocked(false);
      return;
    }

    
    const cached = getCachedMe();
    if (cached) {
      const dn = pickDisplayName(cached);
      if (dn) {
        setName(dn);
        setNameLocked(true);
      }
    }

    
    fetchMe()
      .then((u) => {
        setMe(u);
        const dn = pickDisplayName(u);
        if (dn) {
          setName(dn);
          setNameLocked(true);
        }
      })
      .catch(() => {
        
        setNameLocked(false);
      });
  }, []);

  async function submitReview(e) {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      toast.error("Name and comment are required");
      return;
    }

    const r = Number(rating);
    if (Number.isNaN(r) || r < 1 || r > 5) {
      toast.error("Rating 1 to 5 ");
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/products/${productID}/reviews`, {
        name: name.trim(),
        rating: r,
        comment: comment.trim(),
      });

      toast.success("Review added (Admin approval pending)");
      setComment("");
      setRating(5);

      
      if (!nameLocked) setName("");

      if (onRefresh) await onRefresh();

    } catch (err) {
        console.log("Add review error:", err?.response?.data || err);

        toast.error(
            err?.response?.data?.error ||  // ✅ backend error.message
            err?.response?.data?.message ||
            "Error adding review"
        );
    

    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full mt-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-2xl font-semibold text-secondary">Reviews</h2>

        <div className="flex items-center gap-3">
          <StarRating value={product?.rating ?? 0} />
          <span className="text-secondary/70 text-sm">
            ({product?.numReviews ?? 0} approved)
          </span>
        </div>
      </div>

      {/* ✅ Approved list only */}
      <div className="mt-5 grid grid-cols-1 gap-4">
        {approvedReviews.length === 0 ? (
          <div className="p-4 rounded-2xl border border-gray-200 text-secondary/70 bg-white">
            No reviews yet.
          </div>
        ) : (
          approvedReviews
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((r) => (
              <div
                key={r._id}
                className="p-4 rounded-2xl border border-gray-200 bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-secondary">{r.name}</p>
                    <p className="text-xs text-secondary/60">
                      {formatDate(r.createdAt)}
                    </p>
                  </div>
                  <StarRating value={r.rating} showValue={false} size={14} />
                </div>

                <p className="mt-3 text-secondary/90 whitespace-pre-wrap">
                  {r.comment}
                </p>
              </div>
            ))
        )}
      </div>

      {/* Add review */}
      <div className="mt-8 p-5 rounded-2xl bg-white border border-gray-200">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-secondary">Add a review</h3>

          {me && (
            <p className="text-xs text-secondary/60">
              Logged in as: <span className="font-semibold">{pickDisplayName(me)}</span>
            </p>
          )}
        </div>

        <form onSubmit={submitReview} className="mt-4 grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full p-3 rounded-xl border border-gray-300 outline-none disabled:bg-gray-100"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              readOnly={nameLocked}
            />

            <select
              className="w-full p-3 rounded-xl border border-gray-300 outline-none"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} Star{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <textarea
            className="w-full p-3 rounded-xl border border-gray-300 outline-none min-h-[110px]"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={800}
          />

          <button
            disabled={submitting}
            className="w-full md:w-[220px] h-12 bg-secondary text-white rounded-2xl hover:bg-secondary/80 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>

          <p className="text-xs text-secondary/60">
            Note: Your review will be publicly visible after admin approval.
          </p>
        </form>
      </div>
    </div>
  );
}