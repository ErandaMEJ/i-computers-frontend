import { useState } from "react";

export default function ImageSlider(props) {
  const images = props.images || [];
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Main Image Area - takes remaining height */}
      <div className="w-full flex-1 flex items-center justify-center overflow-hidden rounded-2xl bg-black/5">
        <img
          src={images[currentImage]}
          className="w-full h-full object-contain"
          alt="product"
        />
      </div>

      {/* Thumbnails - fixed height strip */}
      <div className="w-full shrink-0 pt-3">
        <div className="w-full flex flex-row justify-center items-center gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => {
            return (
              <img
                key={index}
                src={image}
                className={[
                  "w-16 h-16 sm:w-[72px] sm:h-[72px] object-cover rounded-xl cursor-pointer",
                  "border transition",
                  currentImage == index
                    ? "border-accent"
                    : "border-secondary/15 hover:border-secondary/30",
                ].join(" ")}
                onClick={() => {
                  setCurrentImage(index);
                }}
                alt={`thumb-${index}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}