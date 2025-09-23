
function CarouselSlide({ image, title, description, slideNumber, totalSlides }) {
  return (
    <div
      id={`slide${slideNumber}`}
      className="carousel-item relative w-full flex items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center gap-6 px-6 md:px-24 text-center">
        {/* Avatar */}
        <img
          src={image}
          alt={title}
          className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-yellow-500 shadow-lg object-cover"
        />

        {/* Description */}
        <p className="text-base md:text-xl text-gray-200 leading-relaxed max-w-2xl">
          {description}
        </p>

        {/* Title */}
        <h3 className="text-lg md:text-2xl font-semibold text-yellow-400">~ {title}</h3>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute flex justify-between items-center left-3 right-3 top-1/2 -translate-y-1/2 px-2">
        <a
          href={`#slide${slideNumber === 1 ? totalSlides : slideNumber - 1}`}
          className="btn btn-circle btn-sm md:btn-md bg-gray-800 text-white hover:bg-yellow-500 transition-all duration-300"
        >
          ❮
        </a>
        <a
          href={`#slide${(slideNumber % totalSlides) + 1}`}
          className="btn btn-circle btn-sm md:btn-md bg-gray-800 text-white hover:bg-yellow-500 transition-all duration-300"
        >
          ❯
        </a>
      </div>
    </div>

  );
}

export default CarouselSlide;
