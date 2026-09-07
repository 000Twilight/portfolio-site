import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./useReducedMotion";

export interface FloatingConfig {
    yOffset?: number;
    duration?: number;
    delay?: number;
    xOffset?: number;
    rotOffset?: number;
}

// ----------------------------------------------------------------------
// Overload 1: Positional arguments (useFloating(35, 6, 0))
// ----------------------------------------------------------------------
export function useFloating<T extends HTMLElement = HTMLDivElement>(
    yOffset?: number,
    duration?: number,
    delay?: number,
    xOffset?: number,
    rotOffset?: number
): RefObject<T | null>;

// ----------------------------------------------------------------------
// Overload 2: Modern options object (useFloating({ yOffset: 35, duration: 6 }))
// ----------------------------------------------------------------------
export function useFloating<T extends HTMLElement = HTMLDivElement>(
    options: FloatingConfig
): RefObject<T | null>;

// ----------------------------------------------------------------------
// Implementation
// ----------------------------------------------------------------------
export function useFloating<T extends HTMLElement = HTMLDivElement>(
    arg1?: number | FloatingConfig,
    arg2?: number,
    arg3?: number,
    arg4?: number,
    arg5?: number
): RefObject<T | null> {
    const ref = useRef<T>(null);
    const prefersReducedMotion = useReducedMotion();

    let y = 15;
    let duration = 3;
    let delay = 0;
    let x = 3;
    let rot = 0.6;

    // Explicit type-guards that compile cleanly in all TypeScript modes:
    if (typeof arg1 === "number") {
        y = arg1;
        if (typeof arg2 === "number") duration = arg2;
        if (typeof arg3 === "number") delay = arg3;
        x = typeof arg4 === "number" ? arg4 : Math.max(3, y * 0.2);
        rot = typeof arg5 === "number" ? arg5 : (y > 20 ? 1.2 : 0.6);
    } else if (typeof arg1 === "object" && arg1 !== null) {
        if (typeof arg1.yOffset === "number") y = arg1.yOffset;
        if (typeof arg1.duration === "number") duration = arg1.duration;
        if (typeof arg1.delay === "number") delay = arg1.delay;
        x = typeof arg1.xOffset === "number" ? arg1.xOffset : Math.max(3, y * 0.2);
        rot = typeof arg1.rotOffset === "number" ? arg1.rotOffset : (y > 20 ? 1.2 : 0.6);
    }

    useGSAP(
        () => {
            const el = ref.current;
            if (!el || prefersReducedMotion) return;

            // 1. Primary Y Axis (Natural harmonic sine oscillation)
            gsap.to(el, {
                y: y,
                duration: duration,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: delay,
                force3D: true,
            });

            // 2. Secondary X Axis (Coprime frequency: prevents mechanical repetition)
            if (x !== 0) {
                gsap.to(el, {
                    x: x,
                    duration: duration * 1.37,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: delay + 0.25,
                    force3D: true,
                });
            }

            // 3. Organic micro-roll (keeps heavy glass cards feeling physical)
            if (rot !== 0) {
                gsap.to(el, {
                    rotation: rot,
                    duration: duration * 1.61,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: delay + 0.5,
                    force3D: true,
                });
            }
        },
        { dependencies: [y, duration, delay, x, rot, prefersReducedMotion], scope: ref }
    );

    return ref;
}

export default useFloating;