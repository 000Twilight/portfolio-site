"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { RegisteredParallaxLayer } from "./parallax-context";

export function useParallax({
    sectionRef,
    layersRef,
    intensity,
    smoothing,
    enabled,
    movementRange,
}: any) {
    useGSAP(() => {
        const section = sectionRef.current;
        const layers = layersRef.current;

        if (!section || layers.length === 0 || !enabled) return;

        // 1. Initial State setup - strictly GSAP, no CSS strings
        layers.forEach((layer: RegisteredParallaxLayer) => {
            gsap.set(layer.parallaxElement, {
                xPercent: layer.center ? -50 : 0,
                yPercent: layer.center ? -50 : 0,
                scale: layer.scale,
                force3D: true, // Hardware acceleration[cite: 9]
            });
        });

        // 2. Setup fast setters for mouse tracking
        // Single tracking coordinates
        const mouse = { x: 0, y: 0 };

        const updateLayers = () => {
            layers.forEach((layer: RegisteredParallaxLayer) => {
                const moveX = -mouse.x * movementRange.x * layer.speedX * layer.movement * intensity;
                const moveY = mouse.y * movementRange.y * layer.speedY * layer.movement * intensity;
                const rotX = -mouse.y * (layer.rotation || 4) * intensity;
                const rotY = mouse.x * (layer.rotation || 6) * intensity;

                gsap.set(layer.parallaxElement, {
                    x: moveX,
                    y: moveY,
                    rotateX: rotX,
                    rotateY: rotY,
                    transformPerspective: 1200,
                    force3D: true,
                });
            });
        };

        // quickTo is much smoother and won't "teleport"
        const setSmoothX = gsap.quickTo(mouse, "x", { duration: smoothing, ease: "power3.out", onUpdate: updateLayers });
        const setSmoothY = gsap.quickTo(mouse, "y", { duration: smoothing, ease: "power3.out", onUpdate: updateLayers });

        const handlePointerMove = (e: PointerEvent) => {
            const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
            const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
            setSmoothX(normalizedX);
            setSmoothY(normalizedY);
        };

        const handlePointerLeave = () => {
            setSmoothX(0);
            setSmoothY(0);
        };

        section.addEventListener("pointermove", handlePointerMove, { passive: true });
        section.addEventListener("pointerleave", handlePointerLeave);

        return () => {
            section.removeEventListener("pointermove", handlePointerMove);
            section.removeEventListener("pointerleave", handlePointerLeave);
        };
    }, { dependencies: [intensity, smoothing, enabled, movementRange], scope: sectionRef });
}