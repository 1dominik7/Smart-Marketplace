import { useState } from "react";
import Lightbox from "react-spring-lightbox";

const images = [
  {
    src: "screenshots/Login.png",
    loading: "lazy",
    alt: "Sign in screen",
  },
  {
    src: "screenshots/Register.png",
    loading: "lazy",
    alt: "Sign up screen",
  },
  {
    src: "screenshots/Home.png",
    loading: "lazy",
    alt: "Home screen",
  },
  {
    src: "screenshots/Category.png",
    loading: "lazy",
    alt: "Items filtered by category",
  },
  {
    src: "screenshots/AddProduct.png",
    loading: "lazy",
    alt: "Add product screen",
  },
  {
    src: "screenshots/SingleProduct.png",
    loading: "lazy",
    alt: "Product screen",
  },
  {
    src: "screenshots/YouItems.png",
    loading: "lazy",
    alt: "Your posted items",
  },
  {
    src: "screenshots/Conversation.png",
    loading: "lazy",
    alt: "Conversation screen",
  },
  {
    src: "screenshots/Product.png",
    loading: "lazy",
    alt: "Product screen",
  }
];

const Grid= ({ images, onClick }) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-white rounded shadow-lg hover:shadow-xl p-4 cursor-pointer hover:scale-[1.02] transition-all"
            onClick={() => onClick(index)}
          >
            <img
              src={image.src}
              alt={`Image ${index + 1}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};


const Button= ({ visible, onClick, title }) => {
  if (!visible) return null;

  return (
    <button onClick={onClick} className="text-white p-4 cursor-pointer z-50">
      {title}
    </button>
  );
};

const Gallery = () => {
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);

  const handleOnImagePress = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  return (
    <>
      <Grid images={images} onClick={handleOnImagePress} />
      <Lightbox
        isOpen={showModal}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        images={images}
        currentIndex={currentImageIndex}
        onClose={() => setShowModal(false)}
        renderImageOverlay={() => (
          <div className="absolute top-0 text-center flex items-center justify-center p-4">
            <p className="bg-primary bg-opacity-30 text-white font-semibold px-4 py-2 rounded text-sm">
              {images[currentImageIndex].alt}
            </p>
          </div>
        )}
        renderPrevButton={() => (
          <Button
            onClick={gotoPrevious}
            title="Previous"
            visible={currentImageIndex > 0}
          />
        )}
        renderNextButton={() => (
          <Button
            onClick={gotoNext}
            title="Next"
            visible={currentImageIndex < images.length - 1}
          />
        )}
        className="bg-gray-900 bg-opacity-50 backdrop-blur-sm"
      />
    </>
  );
};

export default Gallery;
