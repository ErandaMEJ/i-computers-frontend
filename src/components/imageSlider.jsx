import { useState } from "react";

export default function ImageSlider(props) {
  const images = props.images;
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div className="w-full lg:w-[500px] h-full flex flex-col justify-center  items-center">
      <img
        src={images[currentImage]}
        className="w-full aspect-square object-contain"
      />
      <div className="w-full h-[100px] flex flex-row justify-center items-center gap-4">
        {images.map((image, index) => {
          return (
            <img
              key={index}
              src={image}
              className={`w-[80px] h-[80px] object-cover rounded-lg cursor-pointer ${
                currentImage == index && "border-2 border-accent"
              }`}
              onClick={() => {
                setCurrentImage(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
