"use client";

/**
 * CoverImage
 *
 * Renders the first image from a pre-scanned list of image paths.
 * Because the list is built server-side (via getFolderImages), every
 * path is guaranteed to exist — no 404s hit the browser console.
 *
 * Falls back to a styled gradient placeholder when no images are available.
 *
 * Usage:
 *   // Server component — scan once
 *   const images = getFolderImages("assets/images/projects/bazaarku");
 *   // …pass to client component…
 *   <CoverImage images={images} alt="…" colorIndex={0} />
 */

import Image from "next/image";
import { useState } from "react";

interface CoverImageProps {
  /** Absolute-from-root paths, e.g. ["/assets/images/projects/bazaarku/1.png"] */
  images: string[];
  alt: string;
  /** 0-based index used to pick accent colour for the gradient fallback */
  colorIndex: number;
  className?: string;
}

function GradientFallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)",
      }}
    >
      {/* Subtle diagonal grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #1F2937 0, #1F2937 1px, transparent 0, transparent 50%)",
          backgroundSize: "16px 16px",
        }}
      />
      <span className="font-mono text-xs text-[#9CA3AF] tracking-wider uppercase z-10">
        Preview
      </span>
    </div>
  );
}

export function CoverImage({ images, alt, colorIndex: _colorIndex, className }: CoverImageProps) {
  const [failed, setFailed] = useState(false);

  // No images provided or first one already failed → show placeholder
  if (!images.length || failed) {
    return <GradientFallback />;
  }

  return (
    <Image
      key={images[0]}
      src={images[0]}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${className ?? ""}`}
      onError={() => setFailed(true)}
    />
  );
}
