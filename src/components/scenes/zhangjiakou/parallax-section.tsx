"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ParallaxContext, type RegisteredParallaxLayer } from "./parallax-context";
import { useParallax } from "./use-parallax";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ParallaxSectionProps {
    children?: React.ReactNode;
    className?: string;
    intensity?: number;
    smoothing?: number;
    perspective?: number;
    movementRange?: { x: number; y: number };
    designWidth?: number;
    designHeight?: number;
    introAnimation?: boolean;
    responsive?: boolean;
    fitMode?: "cover" | "contain";
    enabled?: boolean;
}

export default function ParallaxSection({
    children,
    className = "",
    intensity = 1,
    smoothing = 0.6,
    perspective = 2300,
    movementRange = { x: 400, y: 280 },
    designWidth = 1920,
    designHeight = 1080,
    introAnimation = false,
    responsive = true,
    fitMode = "cover",
    enabled = true,
}: ParallaxSectionProps) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const registeredLayers = useRef<RegisteredParallaxLayer[]>([]);

    // No more state updates for layer registration!
    const registerLayer = useCallback((layer: RegisteredParallaxLayer) => {
        const existing = registeredLayers.current.find((item) => item.element === layer.element);
        if (!existing) {
            registeredLayers.current.push(layer);
        }
    }, []);

    const unregisterLayer = useCallback((element: HTMLDivElement) => {
        registeredLayers.current = registeredLayers.current.filter(
            (layer) => layer.element !== element
        );
    }, []);

    const contextValue = useMemo(() => ({ registerLayer, unregisterLayer }), [registerLayer, unregisterLayer]);
    const prefersReducedMotion = useReducedMotion();
    const [sceneScale, setSceneScale] = useState(1);

    useEffect(() => {
        if (!responsive) {
            setSceneScale(1);
            return;
        }
        const updateScale = () => {
            const widthScale = window.innerWidth / designWidth;
            const heightScale = window.innerHeight / designHeight;
            setSceneScale(fitMode === "cover" ? Math.max(widthScale, heightScale) : Math.min(widthScale, heightScale));
        };
        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, [responsive, designWidth, designHeight, fitMode]);

    const animationEnabled = enabled && !prefersReducedMotion;

    useParallax({
        sectionRef,
        layersRef: registeredLayers,
        intensity,
        introAnimation: introAnimation && animationEnabled,
        smoothing,
        enabled: animationEnabled,
        movementRange,
    });

    return (
        <ParallaxContext value={contextValue}>
            <section
                ref={sectionRef}
                className={`relative h-screen w-full overflow-hidden ${className}`}
            >
                <div
                    className="absolute left-1/2 top-1/2"
                    style={{
                        width: `${designWidth}px`,
                        height: `${designHeight}px`,
                        transform: `translate(-50%, -50%) scale(${sceneScale})`,
                        transformOrigin: "center center",
                        perspective: `${perspective}px`,
                        transformStyle: "preserve-3d",
                    }}
                >
                    {children}
                </div>
            </section>
        </ParallaxContext>
    );
}