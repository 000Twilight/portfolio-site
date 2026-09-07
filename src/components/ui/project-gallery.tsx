"use client";

import { useState } from "react";
import { ImageWithSkeleton } from "./image-with-skeleton";

interface ProjectGalleryProps {
  images: string[];
  alt: string;
  mode?: "landscape" | "portrait";
}

export function ProjectGallery({ images, alt, mode = "landscape" }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  const isPortrait = mode === "portrait";

  return (
    <div className={`mt-10 ${isPortrait ? "grid grid-cols-1 sm:grid-cols-5 gap-6 md:gap-10" : ""}`}>
      {/* Main image */}
      <div className={`relative w-full rounded-2xl overflow-y-auto border border-[#E5E7EB] bg-[#F3F4F6] ${isPortrait ? "sm:col-span-2 aspect-[9/16]" : "max-h-[500px] sm:max-h-[650px]"}`}>
        <ImageWithSkeleton
          src={images[activeIndex]}
          alt={alt}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 1024px"
          style={{ width: '100%', height: 'auto' }}
          priority
          draggable={false}
          className="transition-opacity duration-300 pointer-events-none select-none"
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className={`${isPortrait ? "sm:col-span-3 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 h-fit" : "mt-3 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2"}`}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`relative ${isPortrait ? "aspect-[9/16]" : "aspect-[4/3]"} rounded-xl overflow-hidden transition-all duration-200 ${
                i === activeIndex 
                  ? "ring-2 ring-[#1F2937] ring-offset-2 opacity-100" 
                  : "border border-[#E5E7EB] opacity-60 hover:opacity-100"
              } bg-[#F3F4F6]`}
              aria-label={`View image ${i + 1}`}
            >
              <ImageWithSkeleton
                src={src}
                alt={`${alt} — thumbnail ${i + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 150px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
