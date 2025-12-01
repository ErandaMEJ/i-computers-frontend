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

	const getStatusBadgeClasses = (status) => {
		switch (status?.toLowerCase()) {
			case "completed":
			case "paid":
				return "bg-emerald-100 text-emerald-800 border border-emerald-200";
			case "cancelled":
			case "canceled":
				return "bg-red-100 text-red-800 border border-red-200";
			case "processing":
				return "bg-blue-100 text-blue-800 border border-blue-200";
			default:
				// pending / default
				return "bg-yellow-100 text-yellow-800 border border-yellow-200";
		}
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
				overlayClassName="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50"
				className="w-full max-w-3xl mx-4 bg-primary rounded-2xl shadow-2xl outline-none"
			>
				<div className="flex flex-col h-full max-h-[90vh]">
					{/* Header */}
					<div className="flex items-start justify-between border-b border-secondary/10 px-6 py-4">
						<div>
							<h2 className="text-2xl font-bold text-secondary">
								Order Details
							</h2>
							<p className="text-sm text-secondary/70 mt-1">
								Review the full breakdown of this customer order.
							</p>
						</div>
						<button
							onClick={() => setIsModalOpen(false)}
							className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary/5 text-secondary hover:bg-secondary/10 transition"
							aria-label="Close"
						>
							<span className="text-lg leading-none">&times;</span>
						</button>
					</div>

					{/* Body */}
					<div className="px-6 py-4 space-y-6 overflow-y-auto">
						{/* Top summary */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<div>
									<p className="text-xs font-semibold tracking-wide text-secondary/60 uppercase">
										Order ID
									</p>
									<p className="text-sm font-semibold text-secondary">
										{order.orderId}
									</p>
								</div>
								<div>
									<p className="text-xs font-semibold tracking-wide text-secondary/60 uppercase">
										Customer Name
									</p>
									<p className="text-sm text-secondary">{order.name}</p>
								</div>
								<div>
									<p className="text-xs font-semibold tracking-wide text-secondary/60 uppercase">
										Email
									</p>
									<p className="text-sm text-secondary break-all">
										{order.email}
									</p>
								</div>
								{order.phone && (
									<div>
										<p className="text-xs font-semibold tracking-wide text-secondary/60 uppercase">
											Phone
										</p>
										<p className="text-sm text-secondary">{order.phone}</p>
									</div>
								)}
							</div>

							<div className="space-y-2">
								<div>
									<p className="text-xs font-semibold tracking-wide text-secondary/60 uppercase">
										Order Date &amp; Time
									</p>
									<p className="text-sm text-secondary">
										{formatDateTime(order.date)}
									</p>
								</div>
								<div>
									<p className="text-xs font-semibold tracking-wide text-secondary/60 uppercase">
										Status
									</p>
									<div className=" flex flex-row">
										<span
											className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClasses(
												order.status
											)}`}
										>
											<span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
											{order.status || "pending"}
										</span>
										<select
											value={status}
											onChange={(e) => setStatus(e.target.value)}
											className="ml-4 px-2 py-1 border border-secondary/20 rounded-lg text-sm text-secondary outline-none"
										>
											<option
												value="pending"
												className="bg-transparent border-1 border-accent rounded-full"
											>
												Pending
											</option>
											<option
												value="processing"
												className="bg-transparent border-1 border-accent rounded-full"
											>
												Processing
											</option>
											<option
												value="completed"
												className="bg-transparent border-1 border-accent rounded-full"
											>
												Completed
											</option>
											<option
												value="cancelled"
												className="bg-transparent border-1 border-accent rounded-full"
											>
												Cancelled
											</option>
										</select>
									</div>
								</div>
								<div>
									<p className="text-xs font-semibold tracking-wide text-secondary/60 uppercase">
										Total Amount
									</p>
									<p className="text-lg font-bold text-[color:var(--color-gold)]">
										{formatCurrency(order.total ?? orderTotalFromItems)}
									</p>
									{order.total != null &&
										orderTotalFromItems != null &&
										Number(order.total) !== Number(orderTotalFromItems) && (
											<p className="text-[11px] text-secondary/60 mt-0.5">
												Calculated from items:{" "}
												<span className="font-medium">
													{formatCurrency(orderTotalFromItems)}
												</span>
											</p>
										)}
								</div>
							</div>
						</div>

						{/* Address */}
						<div className="border border-secondary/10 rounded-xl p-4 bg-white/60">
							<p className="text-xs font-semibold tracking-wide text-secondary/60 uppercase mb-1">
								Delivery Address
							</p>
							<p className="text-sm text-secondary whitespace-pre-line">
								{order.address}
							</p>
						</div>

						{/* Notes (if any) */}

						<div className="border border-secondary/10 rounded-xl p-4 bg-white/60">
							<p className="text-xs font-semibold tracking-wide text-secondary/60 uppercase mb-1">
								Additional Notes
							</p>
							<textarea
								className="text-sm text-secondary/ whitespace-pre-line w-full outline-0"
								value={notes}
								onChange={(e) => {
									if (e.target.value == "") {
										setNotes(null);
									} else {
										setNotes(e.target.value);
									}
								}}
							></textarea>
						</div>

						{/* Items */}
						<div className="border border-secondary/10 rounded-xl bg-white overflow-hidden">
							<div className="flex items-center justify-between px-4 py-3 border-b border-secondary/10 bg-secondary/5">
								<p className="text-sm font-semibold text-secondary">
									Items in this order
								</p>
								<p className="text-xs text-secondary/60">
									{order.items?.length || 0} item
									{(order.items?.length || 0) !== 1 ? "s" : ""}
								</p>
							</div>

							{Array.isArray(order.items) && order.items.length > 0 ? (
								<div className="max-h-64 overflow-y-auto divide-y divide-secondary/10">
									{order.items.map((item, index) => {
										const lineTotal = (item.price || 0) * (item.quantity || 0);
										return (
											<div
												key={`${item.productID}-${index}`}
												className="flex items-center gap-4 px-4 py-3"
											>
												{/* Thumbnail */}
												<div className="flex-shrink-0">
													<div className="w-14 h-14 rounded-lg overflow-hidden bg-secondary/5 flex items-center justify-center">
														{item.image ? (
															<img
																src={item.image}
																alt={item.name}
																className="w-full h-full object-cover"
															/>
														) : (
															<span className="text-xs text-secondary/40">
																No image
															</span>
														)}
													</div>
												</div>

												{/* Details */}
												<div className="flex-1 min-w-0">
													<p className="text-sm font-semibold text-secondary truncate">
														{item.name}
													</p>
													<p className="text-xs text-secondary/60 mt-0.5">
														Product ID:{" "}
														<span className="font-medium">
															{item.productID}
														</span>
													</p>
													<p className="text-xs text-secondary/60 mt-0.5">
														Qty:{" "}
														<span className="font-medium">{item.quantity}</span>{" "}
														&nbsp;|&nbsp; Unit Price:{" "}
														<span className="font-medium">
															{formatCurrency(item.price)}
														</span>
													</p>
												</div>

												{/* Line total */}
												<div className="flex-shrink-0 text-right">
													<p className="text-sm font-semibold text-secondary">
														{formatCurrency(lineTotal)}
													</p>
												</div>
											</div>
										);
									})}
								</div>
							) : (
								<div className="px-4 py-6 text-center text-sm text-secondary/60">
									No items found for this order.
								</div>
							)}
						</div>
					</div>

					{/* Footer */}
					<div className="px-6 py-4 border-t border-secondary/10 flex justify-end gap-2">
						{(order.notes != notes || order.status != status) && (
							<button
								onClick={() => {
									const token = localStorage.getItem("token");
									axios.put(
										import.meta.env.VITE_BACKEND_URL +
											`/orders/${order.orderId}`,
										{
											status: status,
											notes: notes,
										},
										{
											headers: {
												Authorization: `Bearer ${token}`,
											},
										}
									).then(() => {
                                        toast.success("Order updated successfully.");
                                        window.location.reload();
                                        setIsModalOpen(false);
                                    }).catch(() => {
                                        toast.error("Failed to update order. Please try again.");
                                    });
								}}
								className="px-4 py-2 rounded-lg bg-secondary text-shadow-secondary text-white hover:text-secondary text-sm font-medium hover:bg-secondary/15 transition"
							>
								Save Changes
							</button>
						)}

						<button
							onClick={() => setIsModalOpen(false)}
							className="px-4 py-2 rounded-lg bg-secondary text-shadow-secondary text-white hover:text-secondary text-sm font-medium hover:bg-secondary/15 transition"
						>
							Close
						</button>
					</div>
				</div>
			</Modal>

			<button
				className="my-1 flex justify-center items-center font-bold  px-6 py-2 bg-accent/20 text-xs text-accent rounded-2xl text-shadow-accent hover:bg-accent hover:text-white transition-all duration-300"
				onClick={() => {
					setIsModalOpen(true);
				}}
			>
				View Info
			</button>
		</>
	);
}
