import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";

export default function ViewOrderInfo(props) {
  const order = props.order;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState(order.notes);
  const [status, setStatus] = useState(order.status);

  if (!order) return null;

  const formatDateTime = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    return d.toLocaleString();
  };

  const formatCurrency = (value) => {
    if (value == null) return "-";
    return `Rs. ${Number(value).toFixed(2)}`;
  };

  const getStatusBadgeClasses = (statusValue) => {
    const s = String(statusValue || "").toLowerCase().trim();
    if (["completed", "paid", "delivered"].includes(s)) {
      return "bg-emerald-500/15 text-emerald-700 border border-emerald-500/25";
    }
    if (["cancelled", "canceled"].includes(s)) {
      return "bg-red-500/15 text-red-700 border border-red-500/25";
    }
    if (["processing", "confirmed"].includes(s)) {
      return "bg-sky-500/15 text-sky-700 border border-sky-500/25";
    }
    return "bg-yellow-500/15 text-yellow-700 border border-yellow-500/25"; // pending/default
  };

  const orderTotalFromItems =
    Array.isArray(order.items) && order.items.length > 0
      ? order.items.reduce(
          (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
          0
        )
      : order.total;

  const isDirty = order.notes != notes || order.status != status;

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        overlayClassName="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        className="w-full max-w-4xl bg-primary rounded-3xl shadow-2xl outline-none border border-secondary/10 overflow-hidden"
      >
        <div className="flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="px-6 py-5 border-b border-secondary/10 bg-gradient-to-r from-white/5 via-white/0 to-white/5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-secondary">
                  Order Details
                </h2>
                <p className="text-sm text-secondary/60 mt-1">
                  Review the full breakdown of this customer order and update status/notes.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-secondary/10 bg-white/5 text-secondary hover:bg-white/10 transition"
                aria-label="Close"
              >
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-6 overflow-y-auto">
            {/* Summary cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left info */}
              <div className="lg:col-span-2 rounded-2xl border border-secondary/10 bg-white/5 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-semibold tracking-wide text-secondary/60 uppercase">
                      Order ID
                    </p>
                    <p className="text-sm font-semibold text-secondary mt-1">
                      {order.orderId}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold tracking-wide text-secondary/60 uppercase">
                      Order Date &amp; Time
                    </p>
                    <p className="text-sm text-secondary mt-1">
                      {formatDateTime(order.date)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold tracking-wide text-secondary/60 uppercase">
                      Customer Name
                    </p>
                    <p className="text-sm text-secondary mt-1">{order.name}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold tracking-wide text-secondary/60 uppercase">
                      Email
                    </p>
                    <p className="text-sm text-secondary mt-1 break-all">
                      {order.email}
                    </p>
                  </div>

                  {order.phone && (
                    <div className="sm:col-span-2">
                      <p className="text-[11px] font-semibold tracking-wide text-secondary/60 uppercase">
                        Phone
                      </p>
                      <p className="text-sm text-secondary mt-1">{order.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right summary */}
              <div className="rounded-2xl border border-secondary/10 bg-white/5 p-4">
                <p className="text-[11px] font-semibold tracking-wide text-secondary/60 uppercase">
                  Status
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <span
                    className={[
                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
                      getStatusBadgeClasses(status),
                    ].join(" ")}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
                    {status || "pending"}
                  </span>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="flex-1 min-w-[140px] px-3 py-2 rounded-xl border border-secondary/15 bg-primary/40 text-sm text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="mt-5">
                  <p className="text-[11px] font-semibold tracking-wide text-secondary/60 uppercase">
                    Total Amount
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-[color:var(--color-gold)]">
                    {formatCurrency(order.total ?? orderTotalFromItems)}
                  </p>

                  {order.total != null &&
                    orderTotalFromItems != null &&
                    Number(order.total) !== Number(orderTotalFromItems) && (
                      <p className="text-[11px] text-secondary/60 mt-1">
                        Calculated from items:{" "}
                        <span className="font-semibold">
                          {formatCurrency(orderTotalFromItems)}
                        </span>
                      </p>
                    )}
                </div>
              </div>
            </div>

            {/* Address + Notes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Address */}
              <div className="rounded-2xl border border-secondary/10 bg-white/5 p-4">
                <p className="text-[11px] font-semibold tracking-wide text-secondary/60 uppercase mb-2">
                  Delivery Address
                </p>
                <p className="text-sm text-secondary whitespace-pre-line leading-relaxed">
                  {order.address || "-"}
                </p>
              </div>

              {/* Notes */}
              <div className="rounded-2xl border border-secondary/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold tracking-wide text-secondary/60 uppercase">
                    Additional Notes
                  </p>
                  <span className="text-[11px] text-secondary/50">
                    {notes ? `${String(notes).length}/800` : "0/800"}
                  </span>
                </div>

                <textarea
                  className="mt-2 w-full min-h-[110px] rounded-xl border border-secondary/15 bg-primary/40 px-3 py-2 text-sm text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 whitespace-pre-line"
                  placeholder="Add internal notes for this order..."
                  value={notes ?? ""}
                  maxLength={800}
                  onChange={(e) => {
                    if (e.target.value == "") {
                      setNotes(null);
                    } else {
                      setNotes(e.target.value);
                    }
                  }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="rounded-2xl border border-secondary/10 bg-white/5 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-secondary/10 bg-primary/40">
                <p className="text-sm font-semibold text-secondary">
                  Items in this order
                </p>
                <p className="text-xs text-secondary/60">
                  {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                </p>
              </div>

              {Array.isArray(order.items) && order.items.length > 0 ? (
                <div className="max-h-72 overflow-y-auto divide-y divide-secondary/10">
                  {order.items.map((item, index) => {
                    const lineTotal = (item.price || 0) * (item.quantity || 0);

                    return (
                      <div
                        key={`${item.productID}-${index}`}
                        className="flex items-center gap-4 px-4 py-4"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-secondary/10 bg-white/5 flex items-center justify-center shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-secondary/50">No image</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-secondary truncate">
                            {item.name}
                          </p>

                          <div className="mt-1 text-xs text-secondary/60 space-y-1">
                            <p>
                              Product ID:{" "}
                              <span className="font-semibold text-secondary/80">
                                {item.productID}
                              </span>
                            </p>
                            <p>
                              Qty:{" "}
                              <span className="font-semibold text-secondary/80">
                                {item.quantity}
                              </span>{" "}
                              &nbsp;|&nbsp; Unit:{" "}
                              <span className="font-semibold text-secondary/80">
                                {formatCurrency(item.price)}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-xs text-secondary/60">Line total</p>
                          <p className="text-sm font-semibold text-secondary">
                            {formatCurrency(lineTotal)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-sm text-secondary/60">
                  No items found for this order.
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-secondary/10 bg-primary/40">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-xs text-secondary/60">
                {isDirty ? "You have unsaved changes." : "No changes to save."}
              </div>

              <div className="flex items-center justify-end gap-2">
                {isDirty && (
                  <button
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      axios
                        .put(
                          import.meta.env.VITE_BACKEND_URL + `/orders/${order.orderId}`,
                          { status: status, notes: notes },
                          { headers: { Authorization: `Bearer ${token}` } }
                        )
                        .then(() => {
                          toast.success("Order updated successfully.");
                          window.location.reload();
                          setIsModalOpen(false);
                        })
                        .catch(() => {
                          toast.error("Failed to update order. Please try again.");
                        });
                    }}
                    className="h-10 px-4 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/85 transition"
                  >
                    Save Changes
                  </button>
                )}

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="h-10 px-4 rounded-xl border border-secondary/15 bg-white/5 text-secondary text-sm font-semibold hover:bg-white/10 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Trigger */}
      <button
        className="my-1 inline-flex items-center justify-center h-9 px-4 rounded-xl border border-accent/25 bg-accent/10 text-xs font-semibold text-accent hover:bg-accent hover:text-white transition"
        onClick={() => setIsModalOpen(true)}
      >
        View Info
      </button>
    </>
  );
}