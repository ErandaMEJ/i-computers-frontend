import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function StarRating({ value = 0, size = 16, showValue = true }) {
  const v = Number(value || 0);

  const full = Math.floor(v);
  const hasHalf = v - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-gold">
        {Array.from({ length: full }).map((_, i) => (
          <FaStar key={`f-${i}`} size={size} />
        ))}
        {hasHalf && <FaStarHalfAlt size={size} />}
        {Array.from({ length: empty }).map((_, i) => (
          <FaRegStar key={`e-${i}`} size={size} />
        ))}
      </div>

      {showValue && (
        <span className="text-secondary/70 text-sm">
          {v.toFixed(1)} / 5
        </span>
      )}
    </div>
  );
}