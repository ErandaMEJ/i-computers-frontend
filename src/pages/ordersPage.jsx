import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";

function getStatusBadge(statusRaw) {
  const s = String(statusRaw || "").toLowerCase().trim();

  // default (gray)
  let cls =
    "border-secondary/15 bg-primary/40 text-secondary/80";

  if (["pending", "awaiting", "unpaid"].includes(s)) {
    cls = "border-yellow-500/30 bg-yellow-500/15 text-yellow-700";
  } else if (["processing", "confirmed"].includes(s)) {
    cls = "border-sky-500/30 bg-sky-500/15 text-sky-700";
  } else if (["delivered", "completed", "complete"].includes(s)) {
    cls = "border-emerald-500/30 bg-emerald-500/15 text-emerald-700";
  } else if (["cancelled", "canceled", "rejected", "failed"].includes(s)) {
    cls = "border-red-500/30 bg-red-500/15 text-red-700";
  }

  return cls;
}

export default function ordersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // ✅ row-level loading state for delete
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.log("Orders load error:", err?.response?.data || err);
          setLoaded(true);
        });
    }
  }, [loaded]);

  async function deleteOrder(order) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to manage orders");
      return;
    }

    // ✅ pick an id: prefer _id, else orderId
    const id = order?._id || order?.orderId;

    if (!id) {
      toast.error("Cannot delete: order id missing");
      return;
    }

    const ok = confirm("Do you want to delete this order?");
    if (!ok) return;

    setDeletingId(id);
    try {
      // ✅ expected backend endpoint: DELETE /orders/:id
      await axios.delete(import.meta.env.VITE_BACKEND_URL + "/orders/" + id, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Order deleted");
      // remove from UI
      setOrders((prev) => prev.filter((o) => (o?._id || o?.orderId) !== id));
    } catch (err) {
      console.log("Delete order error:", err?.response?.data || err);
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to delete order"
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-68px)] bg-primary text-secondary">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-secondary">
              My Orders
            </h1>
            <p className="text-sm text-secondary/60">
              Track your order history and view details
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-white/5 px-4 py-2 text-xs font-semibold text-secondary/70">
            Total: {orders.length}
          </div>
        </div>

        {/* Table Card */}
        <div className="rounded-2xl border border-secondary/10 bg-white/5 shadow-sm overflow-hidden">
          {/* Top bar */}
          <div className="px-4 py-4 border-b border-secondary/10 bg-primary/40">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-secondary">Orders Table</p>
              <p className="text-xs text-secondary/60">Latest updates shown here</p>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            {loaded ? (
              <table className="w-full min-w-[1020px] text-sm">
                <thead className="sticky top-0 z-10 bg-accent text-white">
                  <tr className="text-xs uppercase tracking-wide">
                    <th className="py-3 px-4 text-left">Order ID</th>
                    <th className="py-3 px-4 text-left">Customer Email</th>
                    <th className="py-3 px-4 text-left">Customer Name</th>
                    <th className="py-3 px-4 text-left">Order Date</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-right">Total</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-secondary/10">
                  {orders.map((order, index) => {
                    const id = order?._id || order?.orderId;
                    const statusClass = getStatusBadge(order?.status);

                    const isPending =
                      String(order?.status || "").toLowerCase().trim() ===
                      "pending";

                    return (
                      <tr
                        key={id || index}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4 px-4 font-semibold text-secondary whitespace-nowrap">
                          {order.orderId}
                        </td>

                        <td className="py-4 px-4 text-secondary/80 break-all">
                          {order.email}
                        </td>

                        <td className="py-4 px-4 text-secondary/80">
                          {order.name}
                        </td>

                        <td className="py-4 px-4 text-secondary/70 whitespace-nowrap">
                          {new Date(order.date).toLocaleDateString()}
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={[
                              "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                              statusClass,
                            ].join(" ")}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-right font-semibold text-accent whitespace-nowrap">
                          LKR. {order.total.toFixed(2)}
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <ViewOrderInfoCustomer order={order} />

                            <button
                              onClick={() => deleteOrder(order)}
                              disabled={!id || deletingId === id || !isPending}
                              className="
                                h-9 px-3 rounded-xl
                                border border-red-500/25 bg-red-500/10
                                text-xs font-semibold text-red-700
                                hover:bg-red-500/15 transition
                                disabled:opacity-50 disabled:cursor-not-allowed
                              "
                              title={
                                !isPending
                                  ? "Only pending orders can be deleted"
                                  : "Delete order"
                              }
                            >
                              {deletingId === id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-8">
                <Loader />
              </div>
            )}
          </div>

          {loaded && orders.length === 0 && (
            <div className="p-10 text-center text-secondary/70">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}