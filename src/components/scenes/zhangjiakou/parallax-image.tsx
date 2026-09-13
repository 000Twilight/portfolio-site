"use client";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
interface ParallaxImageProps {
    src: string;

    alt?: string;

    className?: string;

    loading?: "eager" | "lazy";
}

export default function ParallaxImage({
    src,
    alt = "",
    className = "",
    loading = "eager",
}: ParallaxImageProps) {
    return (
        <ImageWithSkeleton
            src={src}
            alt={alt}
            width={1000}
            height={1000}
            sizes="100vw"
            priority={loading === "eager"}
            className={`
                block
                w-full
                h-auto
                select-none
                ${className}
            `}
        />
    );
}