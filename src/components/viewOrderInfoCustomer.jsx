import { useState } from "react";
import Modal from "react-modal";

export default function ViewOrderInfoCustomer(props) {
  const order = props.order;
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (["cancel_requested", "cancel-requested", "cancel request"].includes(s)) {
      return "bg-orange-500/15 text-orange-700 border border-orange-500/25";
    }
    return "bg-yellow-500/15 text-yellow-700 border border-yellow-500/25";
  };

  const orderTotalFromItems =
    Array.isArray(order.items) && order.items.length > 0
      ? order.items.reduce(
          (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
          0
        )
      : order.total;

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        overlayClassName="
          fixed inset-0 z-50 bg-black/50 backdrop-blur-sm
          flex items-end sm:items-center justify-center
          p-0 sm:p-4
        "
        className="
          w-full sm:max-w-4xl
          bg-primary outline-none border border-secondary/10 shadow-2xl
          rounded-t-3xl sm:rounded-3xl
          overflow-hidden
        "
      >
        <div className="flex flex-col max-h-[92vh] sm:max-h-[90vh]">
          {/* Header (sticky on mobile) */}
          <div className="sticky top-0 z-10 px-4 sm:px-6 py-4 border-b border-secondary/10 bg-primary/95 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-secondary">
                  Order Details
                </h2>
                <p className="text-xs sm:text-sm text-secondary/60 mt-1">
                  Review your order information and item breakdown.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-secondary/10 bg-white/5 text-secondary hover:bg-white/10 transition"
                aria-label="Close"
              >
                <span className="text-2xl leading-none">&times;</span>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-4 sm:px-6 py-5 space-y-5 overflow-y-auto">
            {/* Summary cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left info */}
              <div className="lg:col-span-2 rounded-2xl border border-secondary/10 bg-white/5 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-semibold tracking-wide text-secondary/60 uppercase">
                      Order ID
                    </p>
                    <p className="text-sm font-semibold text-secondary mt-1 break-all">
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
                      Name
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

                <div className="mt-2">
                  <span
                    className={[
                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
                      getStatusBadgeClasses(order.status),
                    ].join(" ")}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
                    {order.status || "pending"}
                  </span>
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
              <div className="rounded-2xl border border-secondary/10 bg-white/5 p-4">
                <p className="text-[11px] font-semibold tracking-wide text-secondary/60 uppercase mb-2">
                  Delivery Address
                </p>
                <p className="text-sm text-secondary whitespace-pre-line leading-relaxed">
                  {order.address || "-"}
                </p>
              </div>

              <div className="rounded-2xl border border-secondary/10 bg-white/5 p-4">
                <p className="text-[11px] font-semibold tracking-wide text-secondary/60 uppercase mb-2">
                  Additional Notes
                </p>
                <textarea
                  className="w-full min-h-[110px] rounded-xl border border-secondary/15 bg-primary/40 px-3 py-2 text-sm text-secondary outline-none resize-none"
                  value={order.notes || "No additional notes provided."}
                  disabled
                />
              </div>
            </div>

            {/* Items */}
            <div className="rounded-2xl border border-secondary/10 bg-white/5 overflow-hidden">
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-secondary/10 bg-primary/40">
                <p className="text-sm font-semibold text-secondary">
                  Items in this order
                </p>
                <p className="text-xs text-secondary/60 whitespace-nowrap">
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
                        className="px-4 py-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          {/* Thumbnail */}
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-secondary/10 bg-white/5 flex items-center justify-center shrink-0">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs text-secondary/50">
                                No image
                              </span>
                            )}
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-secondary">
                              {item.name}
                            </p>

                            <div className="mt-1 text-xs text-secondary/60 space-y-1">
                              <p className="break-all">
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

                          {/* Line total */}
                          <div className="sm:text-right">
                            <p className="text-xs text-secondary/60">Line total</p>
                            <p className="text-sm font-semibold text-secondary">
                              {formatCurrency(lineTotal)}
                            </p>
                          </div>
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

          {/* Footer (sticky on mobile) */}
          <div className="sticky bottom-0 px-4 sm:px-6 py-4 border-t border-secondary/10 bg-primary/95 backdrop-blur flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="h-11 w-full sm:w-auto px-5 rounded-2xl border border-secondary/15 bg-white/5 text-secondary text-sm font-semibold hover:bg-white/10 transition"
            >
              Close
            </button>
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