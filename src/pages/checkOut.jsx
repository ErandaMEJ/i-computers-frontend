import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cart, setCart] = useState(location.state);

  // ✅ Trending mini section state
  const [trending, setTrending] = useState([]);
  const [trendingStatus, setTrendingStatus] = useState("idle"); // idle | loading | success | error

  if (location.state == null) {
    navigate("/products");
  }

  const isEmptyCart = !cart || cart.length === 0;

  // ✅ Load trending products only when cart is empty
  useEffect(() => {
    if (!isEmptyCart) return;
    if (trendingStatus !== "idle") return;

    setTrendingStatus("loading");

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/products")
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setTrending(list.slice(0, 6));
        setTrendingStatus("success");
      })
      .catch(() => {
        setTrendingStatus("error");
      });
  }, [isEmptyCart, trendingStatus]);

  // ✅ Empty cart state
  if (isEmptyCart) {
    return (
      <div className="w-full min-h-[calc(100vh-68px)] bg-primary">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="rounded-2xl border border-secondary/10 bg-white/5 p-8 sm:p-10 text-center shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-semibold text-secondary">
              Your cart is empty
            </h1>
            <p className="mt-2 text-sm text-secondary/70">
              Add some products to continue checkout.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/products"
                className="h-12 px-6 rounded-2xl bg-accent text-white font-semibold flex items-center justify-center hover:bg-accent/85 transition"
              >
                Browse Products
              </Link>

              <Link
                to="/cart"
                className="h-12 px-6 rounded-2xl border border-secondary/15 bg-white/5 text-secondary font-semibold flex items-center justify-center hover:bg-white/10 transition"
              >
                Go to Cart
              </Link>
            </div>
          </div>

          {/* Trending products mini section */}
          <div className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-secondary">
                  Trending Products
                </h2>
                <p className="text-sm text-secondary/60">
                  Popular picks you might like
                </p>
              </div>

              <Link
                to="/products"
                className="text-sm font-semibold text-accent hover:text-accent/80 transition"
              >
                View all →
              </Link>
            </div>

            <div className="mt-5">
              {trendingStatus === "loading" && (
                <div className="rounded-2xl border border-secondary/10 bg-white/5 p-6 text-secondary/70">
                  Loading trending products...
                </div>
              )}

              {trendingStatus === "error" && (
                <div className="rounded-2xl border border-secondary/10 bg-white/5 p-6 text-secondary/70">
                  Couldn’t load trending products right now.
                </div>
              )}

              {trendingStatus === "success" && trending.length === 0 && (
                <div className="rounded-2xl border border-secondary/10 bg-white/5 p-6 text-secondary/70">
                  No products available.
                </div>
              )}

              {trendingStatus === "success" && trending.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {trending.map((p) => (
                    <Link
                      key={p.productID}
                      to={`/overview/${p.productID}`}
                      className="group rounded-2xl border border-secondary/10 bg-white/5 overflow-hidden shadow-sm hover:shadow-md hover:border-secondary/20 transition"
                    >
                      <div className="w-full aspect-square bg-black/5 overflow-hidden">
                        <img
                          src={p?.images?.[0] || "/placeholder.png"}
                          alt={p?.name || "Product"}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </div>

                      <div className="p-3">
                        <p className="text-sm font-semibold text-secondary line-clamp-2 min-h-[40px]">
                          {p?.name}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-accent">
                          LKR. {Number(p?.price ?? 0).toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function getCartTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  function submitOrder() {
    const token = localStorage.getItem("token");

    if (token == null) {
      toast.error("You must be logged in to place an order.");
      navigate("/login");
      return;
    }

    const orderItems = [];
    cart.forEach((item) => {
      orderItems.push({
        productID: item.productID,
        quantity: item.quantity,
      });
    });

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/orders",
        {
          name: name,
          address: address,
          phone: phone,
          items: orderItems,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        toast.success("Order placed successfully");
        navigate("/orders");
      })
      .catch(() => {
        toast.error("Error placing order. Please try again.");
      });
  }

  return (
    <div className="w-full min-h-[calc(100vh-68px)] bg-primary">
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-secondary">
              Checkout
            </h1>
            <p className="text-sm text-secondary/60">
              Review your items and place the order
            </p>
          </div>

          <Link
            to="/cart"
            className="inline-flex items-center justify-center h-10 px-4 rounded-xl border border-secondary/15 bg-white/5 text-sm font-semibold text-secondary hover:bg-white/10 transition w-fit"
          >
            Back to Cart
          </Link>
        </div>

        {/* Cart Items */}
        <div className="grid gap-4">
          {cart.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full rounded-2xl border border-secondary/10 bg-white/5 shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="p-4 sm:p-5 flex gap-4">
                  {/* Image */}
                  <img
                    src={item.image}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-secondary/10 bg-white"
                    alt={item.name}
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-base sm:text-lg font-semibold text-secondary truncate">
                          {item.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-secondary/60 mt-1">
                          {item.productID}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        {item.labelledPrice > item.price && (
                          <p className="text-xs sm:text-sm text-secondary/60 line-through decoration-gold/70 decoration-2">
                            LKR. {item.labelledPrice.toFixed(2)}
                          </p>
                        )}
                        <p className="text-sm sm:text-lg font-semibold text-accent">
                          LKR. {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* ✅ +/- Stepper + Line total */}
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-2xl border border-secondary/15 bg-primary/40 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => {
                            const copiedCart = [...cart];
                            copiedCart[index].quantity -= 1;
                            if (copiedCart[index].quantity < 1) {
                              copiedCart.splice(index, 1);
                            }
                            setCart(copiedCart);
                          }}
                          className="w-11 h-11 flex items-center justify-center text-xl font-bold text-secondary hover:bg-white/10 transition select-none"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <div className="min-w-[52px] h-11 flex items-center justify-center text-sm font-semibold text-secondary border-x border-secondary/15">
                          {item.quantity}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const copiedCart = [...cart];
                            copiedCart[index].quantity += 1;
                            setCart(copiedCart);
                          }}
                          className="w-11 h-11 flex items-center justify-center text-xl font-bold text-secondary hover:bg-white/10 transition select-none"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-secondary/60">Subtotal</p>
                        <p className="text-base sm:text-lg font-semibold text-secondary">
                          LKR. {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shipping / Customer Details */}
        <div className="mt-6 rounded-2xl border border-secondary/10 bg-white/5 shadow-sm p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-secondary">Customer Details</h2>
          <p className="text-sm text-secondary/60 mt-1">
            Please enter your delivery information.
          </p>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-secondary/70 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-3 rounded-xl border border-secondary/15 bg-primary/40 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
                placeholder="Your full name"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-secondary/70 mb-2">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="px-4 py-3 rounded-xl border border-secondary/15 bg-primary/40 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
                placeholder="+94 7X XXX XXXX"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-xs font-semibold text-secondary/70 mb-2">
                Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="px-4 py-3 rounded-xl border border-secondary/15 bg-primary/40 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition min-h-[110px]"
                placeholder="House no, street, city..."
              />
            </div>
          </div>
        </div>

        {/* Summary + Order */}
        <div className="mt-6 rounded-2xl border border-secondary/10 bg-white/5 shadow-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs text-secondary/60">Total</p>
              <p className="text-2xl font-semibold text-accent">
                LKR. {getCartTotal().toFixed(2)}
              </p>
              <p className="text-xs text-secondary/60 mt-1">
                Delivery charges (if any) will be confirmed after review.
              </p>
            </div>

            <button
              onClick={submitOrder}
              className="h-12 w-full sm:w-auto px-8 rounded-2xl bg-accent text-white font-semibold hover:bg-accent/85 transition shadow-sm active:scale-[0.99]"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}