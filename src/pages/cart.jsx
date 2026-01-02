import { useState } from "react";
import { addToCart, getCart, getCartTotal } from "../utils/cart";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="w-full min-h-[calc(100vh-68px)] bg-primary">
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-secondary">
              Your Cart
            </h1>
            <p className="text-sm text-secondary/60">
              {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center justify-center h-10 px-4 rounded-xl border border-secondary/15 bg-white/5 text-sm font-semibold text-secondary hover:bg-white/10 transition w-fit"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Empty state */}
        {cart.length === 0 && (
          <div className="rounded-2xl border border-secondary/10 bg-white/5 p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-secondary">
              Cart is empty
            </h2>
            <p className="mt-2 text-sm text-secondary/70">
              Browse products and add items to your cart.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex h-12 px-6 rounded-2xl bg-accent text-white font-semibold items-center justify-center hover:bg-accent/85 transition"
            >
              Browse Products
            </Link>
          </div>
        )}

        {/* Items */}
        <div className="grid gap-4">
          {cart.map((item, index) => {
            return (
              <div
                key={index}
                className="
                  w-full rounded-2xl border border-secondary/10 bg-white/5
                  shadow-sm hover:shadow-md transition overflow-hidden
                "
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

                    {/* Quantity + subtotal */}
                    <div className="mt-4 flex items-center justify-between gap-3">
                      {/* ✅ +/- stepper */}
                      <div className="inline-flex items-center rounded-2xl border border-secondary/15 bg-primary/40 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(item, -1);
                            const newCart = getCart();
                            setCart(newCart);
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
                            addToCart(item, 1);
                            const newCart = getCart();
                            setCart(newCart);
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

        {/* Footer summary */}
        {cart.length > 0 && (
          <div className="mt-6 rounded-2xl border border-secondary/10 bg-white/5 shadow-sm p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs text-secondary/60">Total</p>
                <p className="text-2xl font-semibold text-accent">
                  LKR. {getCartTotal().toFixed(2)}
                </p>
                <p className="text-xs text-secondary/60 mt-1">
                  Taxes / delivery (if any) may be added at checkout.
                </p>
              </div>

              <Link
                to="/checkout"
                className="h-12 w-full sm:w-auto px-8 rounded-2xl bg-accent text-white font-semibold flex items-center justify-center hover:bg-accent/85 transition shadow-sm active:scale-[0.99]"
                state={cart}
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}