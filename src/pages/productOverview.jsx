import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../utils/cart";
import { HiChevronRight } from "react-icons/hi";
import ReviewsSection from "../components/reviewsSection";
import StarRating from "../components/starRating";
import { api } from "../utils/api"; // ✅ use shared axios instance (baseURL correct)

export default function ProductOverview() {
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"

  const loadProduct = useCallback(async () => {
    try {
      setStatus("loading");
      const res = await api.get(`/products/${encodeURIComponent(params.productID)}`);
      setProduct(res.data);
      setStatus("success");
    } catch (err) {
      console.log("Product load error:", err?.response?.data || err);
      toast.error(err?.response?.data?.message || "Product Not Found");
      setStatus("error");
    }
  }, [params.productID]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  if (status === "loading") return <Loader />;

  if (status === "error") {
    return (
      <main className="w-full min-h-[calc(100vh-68px)] bg-primary px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-secondary/10 bg-white/5 p-8 text-center">
          <h1 className="text-2xl font-semibold text-secondary">Product not found</h1>
          <p className="mt-2 text-sm text-secondary/70">
            The product you’re looking for doesn’t exist or is unavailable.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={loadProduct}
              className="h-11 rounded-xl bg-secondary px-5 text-sm font-semibold text-white hover:bg-secondary/85 transition"
            >
              Retry
            </button>
            <Link
              to="/products"
              className="h-11 rounded-xl border border-secondary/15 bg-white/5 px-5 text-sm font-semibold text-secondary flex items-center justify-center hover:bg-white/10 transition"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // status === "success"
  const safeImages = Array.isArray(product?.images) ? product.images : [];
  const primaryImage = safeImages?.[0];

  return (
    <main className="w-full min-h-[calc(100vh-68px)] bg-primary">
      {/* Top area */}
      <section className="mx-auto max-w-7xl px-4 py-5 sm:py-7">
        {/* Breadcrumb-ish */}
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-secondary/60">
          <Link to="/products" className="hover:text-secondary transition-colors">
            Products
          </Link>
          <HiChevronRight className="opacity-70" />
          <span className="text-secondary/80">{product?.category || "Category"}</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Images */}
          <div className="rounded-2xl border border-secondary/10 bg-white/5 p-3 sm:p-4 shadow-sm">
            <ImageSlider images={safeImages} />
          </div>

          {/* Right: Details */}
          <div className="rounded-2xl border border-secondary/10 bg-white/5 p-5 sm:p-6 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-semibold text-secondary">
              {product?.name}
            </h1>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-secondary/60">{product?.productID}</p>

              <div className="flex items-center gap-2">
                <StarRating value={product?.rating ?? 0} />
                <span className="text-sm text-secondary/70">
                  ({product?.numReviews ?? 0})
                </span>
              </div>
            </div>

            {/* Category + alt names */}
            <div className="mt-4 flex flex-wrap gap-2">
              {product?.category && (
                <span className="rounded-full border border-secondary/10 bg-white/5 px-3 py-1 text-xs font-semibold text-secondary/80">
                  {product.category}
                </span>
              )}
              {product?.brand && (
                <span className="rounded-full border border-secondary/10 bg-white/5 px-3 py-1 text-xs font-semibold text-secondary/80">
                  {product.brand}
                </span>
              )}
              {product?.model && (
                <span className="rounded-full border border-secondary/10 bg-white/5 px-3 py-1 text-xs font-semibold text-secondary/80">
                  {product.model}
                </span>
              )}
            </div>

            {product?.altNames?.length > 0 && (
              <p className="mt-3 text-sm text-secondary/70">
                Also known as: <span className="text-secondary/85">{product.altNames.join(" • ")}</span>
              </p>
            )}

            {/* Description */}
            <div className="mt-5">
              <h2 className="text-sm font-semibold text-secondary">Description</h2>
              <p className="mt-2 text-sm leading-relaxed text-secondary/80 whitespace-pre-wrap">
                {product?.description}
              </p>
            </div>

            {/* Price box */}
            <div className="mt-6 rounded-2xl border border-secondary/10 bg-primary/40 p-4">
              {Number(product?.labelledPrice) > Number(product?.price) && (
                <p className="text-sm text-secondary/60 line-through decoration-gold/70 decoration-2">
                  LKR. {Number(product.labelledPrice).toFixed(2)}
                </p>
              )}
              <p className="mt-1 text-3xl font-semibold text-accent">
                LKR. {Number(product?.price ?? 0).toFixed(2)}
              </p>
              <p className="mt-2 text-xs text-secondary/60">
                {product?.isAvailable ? "In stock / Available" : "Currently unavailable"}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Added to cart");
                }}
                className="h-12 rounded-2xl bg-secondary text-white font-semibold hover:bg-secondary/85 transition disabled:opacity-60"
                disabled={!product?.isAvailable}
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  if (!product?.isAvailable) {
                    toast.error("This product is unavailable");
                    return;
                  }
                  navigate("/checkout", {
                    state: [
                      {
                        productID: product.productID,
                        name: product.name,
                        price: product.price,
                        labelledPrice: product.labelledPrice,
                        quantity: 1,
                        image: primaryImage,
                      },
                    ],
                  });
                }}
                className="h-12 rounded-2xl bg-accent text-white font-semibold hover:bg-accent/85 transition disabled:opacity-60"
                disabled={!product?.isAvailable}
              >
                Buy Now
              </button>
            </div>

            {/* Tiny reassurance row */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-secondary/60">
              <span className="rounded-full border border-secondary/10 bg-white/5 px-3 py-1">
                Genuine parts
              </span>
              <span className="rounded-full border border-secondary/10 bg-white/5 px-3 py-1">
                Local support
              </span>
              <span className="rounded-full border border-secondary/10 bg-white/5 px-3 py-1">
                Fast delivery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-2xl border border-secondary/10 bg-white/5 p-5 sm:p-6 shadow-sm">
          <ReviewsSection product={product} productID={params.productID} onRefresh={loadProduct} />
        </div>
      </section>
    </main>
  );
}