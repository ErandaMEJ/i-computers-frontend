import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import { api } from "../../utils/api";

export default function AdminReviewsPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  async function load() {
    setStatus("loading");
    try {
      const res = await api.get("/products"); // admin => all products
      setProducts(res.data || []);
      setStatus("success");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load products");
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const rows = useMemo(() => {
    return (products || []).map((p) => {
      const reviews = p.reviews || [];
      const pending = reviews.filter((r) => !r.isApproved).length;
      const approved = reviews.filter((r) => r.isApproved).length;
      return {
        productID: p.productID,
        name: p.name,
        pending,
        approved,
        total: reviews.length,
      };
    });
  }, [products]);

  if (status === "loading") return <Loader />;

  if (status === "error") {
    return (
      <div className="p-6">
        <p className="text-secondary">Error loading review dashboard.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-secondary">Reviews</h1>
          <p className="text-sm text-secondary/60">
            Pending reviews are highlighted and shown first.
          </p>
        </div>

        <button
          onClick={load}
          className="h-10 px-4 rounded-xl bg-secondary text-white hover:bg-secondary/80 transition"
        >
          Refresh
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3">
        {rows.length === 0 ? (
          <div className="p-4 bg-white border border-gray-200 rounded-2xl">
            No products.
          </div>
        ) : (
          rows
            .slice()
            .sort((a, b) => b.pending - a.pending)
            .map((r) => {
              const hasPending = r.pending > 0;

              return (
                <Link
                  key={r.productID}
                  to={`/admin/reviews/${r.productID}`}
                  className={[
                    "p-4 rounded-2xl border transition",
                    hasPending
                      ? "border-accent/40 bg-accent/5 shadow-sm"
                      : "bg-white border-gray-200 hover:border-secondary",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-2">
                      {hasPending && (
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
                      )}

                      <div>
                        <p className="text-secondary font-semibold">{r.name}</p>
                        <p className="text-xs text-secondary/60">{r.productID}</p>
                      </div>
                    </div>

                    <div className="text-right text-sm">
                      <p className="text-secondary/80">
                        Pending:{" "}
                        <span className="font-semibold text-accent">
                          {r.pending}
                        </span>
                      </p>
                      <p className="text-secondary/70">
                        Approved: {r.approved} | Total: {r.total}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
        )}
      </div>
    </div>
  );
}