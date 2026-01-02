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

function emailToDisplayName(email) {
  if (!email) return "";

  const localPart = String(email).split("@")[0] || "";

  const cleaned = localPart
    .replace(/[._-]+/g, " ") // "." "_" "-" -> space
    .replace(/\d+/g, "") // remove numbers (123)
    .replace(/\s+/g, " ") // collapse spaces
    .trim();

  if (!cleaned) return localPart;

  // Title Case
  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function pickDisplayName(me) {
  return (
    me?.name ||
    me?.fullName ||
    me?.username ||
    emailToDisplayName(me?.email) || // ✅ email-based display name
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

  // allow user to edit name only when they press Edit
  const [isEditingName, setIsEditingName] = useState(false);
  const [accountDefaultName, setAccountDefaultName] = useState("");

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setNameLocked(false);
      setIsEditingName(true); // not logged-in -> editable
      return;
    }

    const cached = getCachedMe();
    if (cached) {
      const dn = pickDisplayName(cached);
      if (dn) {
        setName(dn);
        setAccountDefaultName(dn);
        setNameLocked(true);
        setIsEditingName(false); // logged-in -> locked by default
      }
    }

    fetchMe()
      .then((u) => {
        setMe(u);
        const dn = pickDisplayName(u);
        if (dn) {
          setName(dn);
          setAccountDefaultName(dn);
          setNameLocked(true);
          setIsEditingName(false);
        }
      })
      .catch(() => {
        setNameLocked(false);
        setIsEditingName(true);
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
      await api.post(`/products/${encodeURIComponent(productID)}/reviews`, {
        name: name.trim(),
        rating: r,
        comment: comment.trim(),
      });

      toast.success("Review added (Admin approval pending)");
      setComment("");
      setRating(5);

      // logged-in users: keep name as-is
      if (!nameLocked) setName("");

      if (onRefresh) await onRefresh();
    } catch (err) {
      console.log("Add review error:", err?.response?.data || err);

      toast.error(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Error adding review"
      );
    } finally {
      setSubmitting(false);
    }
  }

  const emailValue = me?.email || "";
  const canToggleNameEdit = Boolean(localStorage.getItem("token")); // logged-in only

  return (
    <div className="w-full mt-2 ">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between ml-3">
        <div>
          <h2 className="text-2xl font-semibold text-secondary">Reviews</h2>
          <p className="text-sm text-secondary/50">
            Only approved reviews are shown publicly.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-secondary/10 bg-white/5 px-4 py-3">
          <StarRating value={product?.rating ?? 0} />
          <span className="text-secondary/70 text-sm">
            ({product?.numReviews ?? 0} approved)
          </span>
        </div>
      </div>

      {/* Approved reviews list */}
      <div className="mt-6 grid grid-cols-1 gap-4">
        {approvedReviews.length === 0 ? (
          <div className="rounded-2xl border border-secondary/10 bg-white/5 p-6 text-secondary/70">
            <p className="font-semibold text-secondary">No reviews yet</p>
            <p className="mt-1 text-sm text-secondary/70">
              Be the first to leave a review.
            </p>
          </div>
        ) : (
          approvedReviews
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((r) => (
              <div
                key={r._id}
                className="rounded-2xl border border-secondary/10 bg-white/5 p-5 shadow-sm"
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

                <p className="mt-3 text-secondary/85 whitespace-pre-wrap leading-relaxed">
                  {r.comment}
                </p>
              </div>
            ))
        )}
      </div>

      {/* Add review */}
      <div className="mt-8 rounded-2xl border border-secondary/10 bg-white/5 p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-secondary">Add a review</h3>
            <p className="text-xs text-secondary/60 mt-1">
              Your review will be visible after admin approval.
            </p>
          </div>

          {/* Email display */}
          <div className="rounded-xl border border-secondary/10 bg-primary/40 px-3 py-2 text-xs text-secondary/70">
            <p>
              Email:{" "}
              <span className="font-semibold text-secondary break-all">
                {emailValue || "Not logged in"}
              </span>
            </p>
          </div>
        </div>

        <form onSubmit={submitReview} className="mt-5 grid grid-cols-1 gap-4">
          {/* Name + Email row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name with Edit toggle */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-secondary/70">
                  Display name
                </label>

                {canToggleNameEdit && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="text-[11px] font-semibold text-secondary/60 hover:text-secondary transition"
                      onClick={() => {
                        if (accountDefaultName) setName(accountDefaultName);
                        setIsEditingName(false);
                      }}
                    >
                      Reset
                    </button>

                    <button
                      type="button"
                      className="text-[11px] font-semibold text-accent hover:text-accent/80 transition"
                      onClick={() => {
                        setIsEditingName((v) => !v);
                      }}
                    >
                      {isEditingName ? "Done" : "Edit"}
                    </button>
                  </div>
                )}
              </div>

              <input
                className="w-full rounded-xl border border-secondary/15 bg-primary/40 px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-70"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                autoComplete="name"
                readOnly={canToggleNameEdit ? !isEditingName : false}
              />

              {canToggleNameEdit && !isEditingName && (
                <p className="mt-2 text-[11px] text-secondary/60">
                  Name is locked. Click <span className="font-semibold">Edit</span> to change.
                </p>
              )}
            </div>

            {/* Email input read-only */}
            <div>
              <label className="block text-xs font-semibold text-secondary/70 mb-2">
                Email
              </label>
              <input
                className="w-full rounded-xl border border-secondary/15 bg-primary/30 px-4 py-3 outline-none"
                value={emailValue}
                placeholder="Not logged in"
                readOnly
              />
              <p className="mt-2 text-[11px] text-secondary/60">
                Email is shown from your account (read-only).
              </p>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-semibold text-secondary/70 mb-2">
              Rating
            </label>
            <select
              className="w-full rounded-xl border border-secondary/15 bg-primary/40 px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
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

          {/* Comment */}
          <div>
            <label className="block text-xs font-semibold text-secondary/70 mb-2">
              Comment
            </label>
            <textarea
              className="w-full rounded-xl border border-secondary/15 bg-primary/40 px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 min-h-[130px]"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={800}
            />
            <div className="mt-2 flex items-center justify-between text-[11px] text-secondary/60">
              <span>Be respectful and helpful.</span>
              <span>{comment.length}/800</span>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              disabled={submitting}
              className="h-12 w-full sm:w-[220px] rounded-2xl bg-accent text-white font-semibold hover:bg-accent/90 transition disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>

            <div className="text-xs text-secondary/60">
              By submitting, you agree that your review may be moderated.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}