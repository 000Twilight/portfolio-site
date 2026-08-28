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
        <img
            src={src}
            alt={alt}
            loading={loading}
            decoding="async"
            draggable={false}
            className={`
                block
                w-full
                select-none
                ${className}
            `}
        />
    );
}