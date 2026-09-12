"use client";

import {
    createContext,
} from "react";

export interface RegisteredParallaxLayer {
    element: HTMLDivElement;

    parallaxElement: HTMLDivElement;

    speedX: number;
    speedY: number;
    speedZ: number;

    rotation: number;

    movement: number;

    scale: number;

    distance?: number;

    center: boolean;

    intro: boolean;
}

export interface ParallaxContextValue {
    registerLayer: (
        layer: RegisteredParallaxLayer
    ) => void;

    unregisterLayer: (
        element: HTMLDivElement
    ) => void;
}

export const ParallaxContext =
    createContext<
        ParallaxContextValue | undefined
    >(undefined);