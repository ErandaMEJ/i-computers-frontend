import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import { api } from "../../utils/api";
import StarRating from "../../components/starRating";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return "";
  }
}

export default function AdminProductReviews() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading");
  const [workingId, setWorkingId] = useState(null);

  async function load() {
    setStatus("loading");
    try {
      // get product (for name/rating)
      const pRes = await api.get(`/products/${productID}`);
      setProduct(pRes.data);

      // get all reviews (admin endpoint)
      const rRes = await api.get(`/products/${productID}/reviews/admin`);
      setReviews(rRes.data || []);

      setStatus("success");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load reviews");
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, [productID]);

  const pending = useMemo(
    () => (reviews || []).filter((r) => !r.isApproved),
    [reviews]
  );
  const approved = useMemo(
    () => (reviews || []).filter((r) => r.isApproved),
    [reviews]
  );

  async function approve(reviewID) {
    setWorkingId(reviewID);
    try {
      await api.patch(`/products/${productID}/reviews/${reviewID}/approve`);
      toast.success("Review approved");
      await load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Approve failed");
    } finally {
      setWorkingId(null);
    }
  }

  async function remove(reviewID) {
    const ok = confirm("Delete this review?");
    if (!ok) return;

    setWorkingId(reviewID);
    try {
      await api.delete(`/products/${productID}/reviews/${reviewID}`);
      toast.success("Review deleted");
      await load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    } finally {
      setWorkingId(null);
    }
  }

  if (status === "loading") return <Loader />;

  if (status === "error") {
    return (
      <div className="p-6">
        <p className="text-secondary">Error loading product reviews.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-secondary">
            {product?.name || "Product"} — Reviews
          </h1>
          <p className="text-sm text-secondary/60">{productID}</p>

          <div className="mt-2 flex items-center gap-3">
            <StarRating value={product?.rating ?? 0} />
            <span className="text-sm text-secondary/70">
              ({product?.numReviews ?? 0} approved)
            </span>
          </div>
        </div>

        <button
          onClick={load}
          className="h-10 px-4 rounded-xl bg-secondary text-white hover:bg-secondary/80"
        >
          Refresh
        </button>
      </div>

      {/* Pending */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-secondary">
          Pending ({pending.length})
        </h2>

        <div className="mt-3 grid grid-cols-1 gap-3">
          {pending.length === 0 ? (
            <div className="p-4 bg-white border border-gray-200 rounded-2xl text-secondary/70">
              No pending reviews.
            </div>
          ) : (
            pending
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((r) => (
                <div
                  key={r._id}
                  className="p-4 bg-white border border-gray-200 rounded-2xl"
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

                  <div className="mt-4 flex gap-3">
                    <button
                      disabled={workingId === r._id}
                      onClick={() => approve(r._id)}
                      className="h-10 px-4 rounded-xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
                    >
                      Approve
                    </button>

                    <button
                      disabled={workingId === r._id}
                      onClick={() => remove(r._id)}
                      className="h-10 px-4 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Approved */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-secondary">
          Approved ({approved.length})
        </h2>

        <div className="mt-3 grid grid-cols-1 gap-3">
          {approved.length === 0 ? (
            <div className="p-4 bg-white border border-gray-200 rounded-2xl text-secondary/70">
              No approved reviews.
            </div>
          ) : (
            approved
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((r) => (
                <div
                  key={r._id}
                  className="p-4 bg-white border border-gray-200 rounded-2xl"
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

                  <div className="mt-4">
                    <button
                      disabled={workingId === r._id}
                      onClick={() => remove(r._id)}
                      className="h-10 px-4 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}