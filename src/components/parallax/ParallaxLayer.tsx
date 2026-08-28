import {
    useContext,
    useLayoutEffect,
    useRef,
    type CSSProperties,
    type ReactNode,
} from "react";

import { ParallaxContext } from "./ParallaxContext";

export interface ParallaxLayerProps {
    children: ReactNode;

    speedX?: number;
    speedY?: number;
    speedZ?: number;

    rotation?: number;

    movement?: number;

    scale?: number;

    distance?: number;

    center?: boolean;

    className?: string;

    style?: CSSProperties;

    zIndex?: number;

    intro?: boolean;
}

export default function ParallaxLayer({
    children,

    speedX = 0,
    speedY = 0,
    speedZ = 0,

    rotation = 0,

    movement = 1,

    scale = 1,

    distance,

    center = false,

    className = "",

    style,

    zIndex,

    intro = true,
}: ParallaxLayerProps) {
    const context =
        useContext(ParallaxContext);

    const elementRef =
        useRef<HTMLDivElement | null>(null);

    const parallaxElementRef =
        useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const element =
            elementRef.current;

        const parallaxElement =
            parallaxElementRef.current;

        if (
            !element ||
            !parallaxElement ||
            !context
        ) {
            return;
        }

        context.registerLayer({
            element,

            parallaxElement,

            speedX,
            speedY,
            speedZ,

            rotation,

            movement,
            scale,

            distance,

            center,

            intro,
        });

        return () => {
            context.unregisterLayer(
                element
            );
        };
    }, [
        context,

        speedX,
        speedY,
        speedZ,

        rotation,

        movement,
        scale,

        distance,

        center,

        intro,
    ]);

    return (
        <div
            ref={elementRef}
            className={`
                absolute
                pointer-events-none
                ${className}
            `}
            style={{
                zIndex,
                ...style,
            }}
        >
            <div
                ref={parallaxElementRef}
                className="transform-gpu pointer-events-none"
                style={{
                    transformStyle:
                        "preserve-3d",
                    backfaceVisibility:
                        "hidden",
                    willChange:
                        "transform",
                }}
            >
                {children}
            </div>
        </div>
    );
}