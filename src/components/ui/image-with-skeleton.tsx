"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithSkeletonProps extends ImageProps {
  containerClassName?: string;
}

export function ImageWithSkeleton({
  containerClassName = "",
  className = "",
  alt,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`${props.fill ? 'absolute inset-0' : 'relative w-full h-full'} overflow-hidden bg-[#F3F4F6] ${containerClassName}`}>
      {/* Skeleton / Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#E5E7EB] animate-pulse" />
      )}
      
      {/* Actual Image */}
      <Image
        {...props}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}
