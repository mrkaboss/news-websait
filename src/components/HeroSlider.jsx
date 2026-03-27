import { useState, useEffect } from "react";

export default function HeroSlider() {

  const slides = [
    {
      title: "Artificial Intelligence changing the world",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
    },
    {
      title: "Technology shaping the future",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      title: "Innovation in modern technology",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev)=> (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden rounded-xl">

      <img
        src={slides[current].image}
        className="w-full h-full object-cover transition-all duration-700"
      />

      <div className="absolute bottom-10 left-10 text-white">
        <h2 className="text-3xl font-bold bg-black/50 p-3 rounded">
          {slides[current].title}
        </h2>
      </div>

    </div>
  );
}