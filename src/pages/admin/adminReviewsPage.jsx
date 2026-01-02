// pages/admin/AdminReviewsPage.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Badge({ status }) {
  const map = {
    pending: "bg-amber-500/15 text-amber-700 border-amber-500/20",
    approved: "bg-emerald-500/15 text-emerald-700 border-emerald-500/20",
    hidden: "bg-slate-500/15 text-slate-700 border-slate-500/20",
  };
  return <span className={`px-2 py-1 text-xs rounded-full border ${map[status] || "bg-black/5"}`}>{status}</span>;
}

function StarRow({ value }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        const active = n <= value;
        return <span key={n} className={active ? "text-[color:var(--gold)]" : "text-black/20"}>★</span>;
      })}
    </div>
  );
}

export default function AdminReviewsPage() {
  const token = useMemo(() => localStorage.getItem("token"), []);
  const [status, setStatus] = useState("pending");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  async function fetchReviews() {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_BACKEND_URL}/reviews/all?status=${encodeURIComponent(status)}&q=${encodeURIComponent(q)}`;
      const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      setReviews(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function setReviewStatus(id, newStatus) {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Updated");
      fetchReviews();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  }

  async function deleteReview(id) {
    if (!confirm("Delete this review?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted");
      fetchReviews();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Reviews</h1>
          <p className="text-sm text-black/60">Approve / hide / delete customer reviews</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search (name/title/comment)"
            className="h-11 w-[260px] max-w-full px-3 rounded-2xl border border-black/10 outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
          />
          <button onClick={fetchReviews} className="h-11 px-4 rounded-2xl border border-black/10 hover:bg-black/5">
            Search
          </button>
        </div>
      </div>

      <div className="mt-4 flex gap-2 flex-wrap">
        {[
          { k: "pending", label: "Pending" },
          { k: "approved", label: "Approved" },
          { k: "hidden", label: "Hidden" },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setStatus(t.k)}
            className={
              "px-4 py-2 rounded-2xl border text-sm font-medium " +
              (status === t.k ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white" : "border-black/10 hover:bg-black/5")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-3xl border border-black/10 overflow-hidden">
        <div className="grid grid-cols-[1.2fr_0.6fr_0.5fr] gap-3 px-4 py-3 bg-black/[0.03] text-sm font-semibold">
          <div>Review</div>
          <div>Product / User</div>
          <div className="text-right">Actions</div>
        </div>

        {loading ? (
          <div className="p-4 text-sm text-black/60">Loading...</div>
        ) : reviews.length === 0 ? (
          <div className="p-4 text-sm text-black/60">No reviews found.</div>
        ) : (
          <div className="divide-y divide-black/10">
            {reviews.map((r) => (
              <div key={r._id} className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.6fr_0.5fr] gap-3 px-4 py-4">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={r.userImage || "/default.jpg"} alt="" className="h-10 w-10 rounded-full object-cover border border-black/10" />
                      <div>
                        <p className="font-semibold">{r.userName}</p>
                        <div className="flex items-center gap-2">
                          <StarRow value={r.rating} />
                          <Badge status={r.status} />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-black/50">{new Date(r.createdAt).toLocaleString()}</p>
                  </div>

                  {r.title ? <p className="mt-2 font-medium">{r.title}</p> : null}
                  <p className="mt-1 text-sm text-black/70 whitespace-pre-wrap">{r.comment}</p>

                  {r.adminNote ? (
                    <p className="mt-2 text-xs text-black/60">
                      <span className="font-semibold">Admin note:</span> {r.adminNote}
                    </p>
                  ) : null}
                </div>

                <div className="text-sm">
                  <p className="text-black/60">ProductID</p>
                  <p className="font-mono">{r.productID}</p>
                  <p className="mt-2 text-black/60">Email</p>
                  <p className="font-mono break-all">{r.userEmail}</p>
                </div>

                <div className="flex lg:justify-end gap-2 flex-wrap">
                  {r.status !== "approved" && (
                    <button onClick={() => setReviewStatus(r._id, "approved")} className="h-10 px-3 rounded-2xl bg-emerald-600 text-white text-sm hover:opacity-95">
                      Approve
                    </button>
                  )}
                  {r.status !== "hidden" && (
                    <button onClick={() => setReviewStatus(r._id, "hidden")} className="h-10 px-3 rounded-2xl bg-slate-700 text-white text-sm hover:opacity-95">
                      Hide
                    </button>
                  )}
                  {r.status !== "pending" && (
                    <button onClick={() => setReviewStatus(r._id, "pending")} className="h-10 px-3 rounded-2xl border border-black/10 text-sm hover:bg-black/5">
                      Move to pending
                    </button>
                  )}
                  <button onClick={() => deleteReview(r._id)} className="h-10 px-3 rounded-2xl border border-red-500/30 text-red-700 text-sm hover:bg-red-500/10">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
