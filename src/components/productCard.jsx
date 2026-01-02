import { Link } from "react-router-dom";
import StarRating from "./starRating";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <Link
      to={"/overview/" + product.productID}
      className="
        group relative w-full max-w-[320px] mx-auto
        overflow-hidden rounded-2xl
        border border-secondary/10 bg-white/5
        shadow-sm transition
        hover:shadow-xl hover:border-secondary/20
      "
    >
      {/* Image */}
      <div className="relative w-full h-[220px] bg-black/5">
        <img
          src={product.images[1]}
          className="w-full h-full absolute inset-0 object-cover"
          alt={product.name}
        />
        <img
          src={product.images[0]}
          className="w-full h-full absolute inset-0 object-cover primary-image transition-opacity duration-300 group-hover:opacity-0"
          alt={product.name}
        />

        {/* subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* View Details chip (instead of big button) */}
        <div
          className="
            absolute top-3 right-3
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
        >
          <span
            className="
              inline-flex items-center justify-center
              rounded-full border border-white/20
              bg-black/40 px-3 py-1
              text-xs font-semibold text-white
              backdrop-blur
            "
          >
            View Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <h1 className="text-center text-[15px] font-semibold text-secondary line-clamp-2 min-h-[40px]">
          {product.name}
        </h1>

        <div className="flex items-center justify-center gap-2">
          <StarRating value={product?.rating ?? 0} showValue={false} size={14} />
          <span className="text-xs text-secondary/60">
            ({product?.numReviews ?? 0})
          </span>
        </div>

        <div className="flex flex-col items-center">
          {product.labelledPrice > product.price && (
            <h2 className="text-secondary/70 line-through decoration-gold/70 decoration-2 text-sm">
              LKR. {product.labelledPrice.toFixed(2)}
            </h2>
          )}
          <h2 className="text-secondary text-2xl font-semibold">
            LKR. {product.price.toFixed(2)}
          </h2>
        </div>

        {/* tiny hint (optional) */}
        <div className="pt-2 flex justify-center">
          <span className="text-[11px] text-secondary/50">
            Click card to view details
          </span>
        </div>
      </div>
    </Link>
  );
}