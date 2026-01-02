import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";

function getStatusBadgeClass(statusRaw) {
  const s = String(statusRaw || "").toLowerCase().trim();

  let cls = "border-secondary/15 bg-primary/40 text-secondary/80";

  if (["pending", "awaiting", "unpaid"].includes(s)) {
    cls = "border-yellow-500/30 bg-yellow-500/15 text-yellow-700";
  } else if (["processing", "confirmed"].includes(s)) {
    cls = "border-sky-500/30 bg-sky-500/15 text-sky-700";
  } else if (["cancel_requested", "cancel-requested", "cancel request"].includes(s)) {
    cls = "border-orange-500/30 bg-orange-500/15 text-orange-700";
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setOrders(response.data);
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    }
  }, [loaded]);

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

          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-white/5 px-4 py-2 text-xs font-semibold text-secondary/70 w-fit">
            Total: {orders.length}
          </div>
        </div>

        {/* Loading */}
        {!loaded && (
          <div className="rounded-2xl border border-secondary/10 bg-white/5 shadow-sm p-8">
            <Loader />
          </div>
        )}

        {/* Empty */}
        {loaded && orders.length === 0 && (
          <div className="rounded-2xl border border-secondary/10 bg-white/5 shadow-sm p-10 text-center text-secondary/70">
            No orders found.
          </div>
        )}

        {/* ✅ Mobile Cards */}
        {loaded && orders.length > 0 && (
          <div className="sm:hidden grid gap-4">
            {orders.map((order, index) => {
              const badgeClass = getStatusBadgeClass(order.status);

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-secondary/10 bg-white/5 shadow-sm p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-secondary/60">Order ID</p>
                      <p className="font-semibold text-secondary break-all">
                        {order.orderId}
                      </p>
                      <p className="mt-1 text-xs text-secondary/60">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={[
                        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold shrink-0",
                        badgeClass,
                      ].join(" ")}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-secondary/60">Email</span>
                      <span className="text-secondary/85 break-all text-right">
                        {order.email}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span className="text-secondary/60">Name</span>
                      <span className="text-secondary/85 text-right">
                        {order.name}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span className="text-secondary/60">Total</span>
                      <span className="text-accent font-semibold text-right">
                        LKR. {order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <ViewOrderInfoCustomer order={order} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ✅ Desktop Table */}
        {loaded && orders.length > 0 && (
          <div className="hidden sm:block rounded-2xl border border-secondary/10 bg-white/5 shadow-sm overflow-hidden">
            {/* Top bar */}
            <div className="px-4 py-4 border-b border-secondary/10 bg-primary/40">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-secondary">
                  Orders Table
                </p>
                <p className="text-xs text-secondary/60">
                  Latest updates shown here
                </p>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[980px] text-sm">
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
                    const badgeClass = getStatusBadgeClass(order.status);

                    return (
                      <tr
                        key={index}
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
                              badgeClass,
                            ].join(" ")}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-right font-semibold text-accent whitespace-nowrap">
                          LKR. {order.total.toFixed(2)}
                        </td>

                        <td className="py-4 px-4 text-center">
                          <ViewOrderInfoCustomer order={order} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}