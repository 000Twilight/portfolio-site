"use client";

import { useState, useEffect } from "react";
import ParallaxSection from "./parallax-section";
import ParallaxLayer from "./parallax-layer";
import ParallaxImage from "./parallax-image";

const ZHANGJIAKOU_IMAGES = [
    "/assets/images/zhangjiakou/background.png",
    "/assets/images/zhangjiakou/fog-7.png",
    "/assets/images/zhangjiakou/mountain-10.png",
    "/assets/images/zhangjiakou/fog-6.png",
    "/assets/images/zhangjiakou/mountain-9.png",
    "/assets/images/zhangjiakou/mountain-8.png",
    "/assets/images/zhangjiakou/fog-5.png",
    "/assets/images/zhangjiakou/mountain-7.png",
    "/assets/images/zhangjiakou/mountain-6.png",
    "/assets/images/zhangjiakou/fog-4.png",
    "/assets/images/zhangjiakou/mountain-5.png",
    "/assets/images/zhangjiakou/fog-3.png",
    "/assets/images/zhangjiakou/mountain-4.png",
    "/assets/images/zhangjiakou/mountain-3.png",
    "/assets/images/zhangjiakou/fog-2.png",
    "/assets/images/zhangjiakou/mountain-2.png",
    "/assets/images/zhangjiakou/mountain-1.png",
    "/assets/images/zhangjiakou/sun-rays.png",
    "/assets/images/zhangjiakou/black-shadow.png",
    "/assets/images/zhangjiakou/fog-1.png",
];

export default function ZhangjiakouScene() {
    const [loadedCount, setLoadedCount] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        let isMounted = true;
        let completed = 0;
        const total = ZHANGJIAKOU_IMAGES.length;

        const handleImageComplete = () => {
            if (!isMounted) return;
            completed++;
            setLoadedCount(completed);

            if (completed >= total) {
                // Short buffer to let the user see 100% completion before smooth reveal
                setTimeout(() => {
                    if (!isMounted) return;
                    setIsReady(true);
                    setTimeout(() => {
                        if (!isMounted) return;
                        setShowLoader(false);
                    }, 700);
                }, 250);
            }
        };

        ZHANGJIAKOU_IMAGES.forEach((src) => {
            const img = new Image();
            img.src = src;

            if (img.complete) {
                if ("decode" in img) {
                    img.decode()
                        .then(() => handleImageComplete())
                        .catch(() => handleImageComplete());
                } else {
                    handleImageComplete();
                }
            } else {
                img.onload = () => {
                    if ("decode" in img) {
                        img.decode()
                            .then(() => handleImageComplete())
                            .catch(() => handleImageComplete());
                    } else {
                        handleImageComplete();
                    }
                };
                img.onerror = () => handleImageComplete();
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    const progress = Math.min(100, Math.round((loadedCount / ZHANGJIAKOU_IMAGES.length) * 100));

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#070b12]">
            {/* Parallax Scene Container - smoothly reveals once all images are ready */}
            <div
                className={`w-full h-full transition-opacity duration-700 ease-out ${
                    isReady ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <ParallaxSection
                    intensity={1}
                    smoothing={0.6}
                    perspective={2300}
                    movementRange={{
                        x: 400,
                        y: 280,
                    }}
                    designWidth={1920}
                    designHeight={1080}
                    introAnimation
                    responsive
                    fitMode="cover"
                >
            {/* =====================================================
                BACKGROUND
            ====================================================== */}

            <ParallaxLayer
                speedX={0.3}
                speedY={0.38}
                speedZ={0}
                rotation={0}
                movement={1}
                scale={1}
                distance={-200}
                center
                className="
                    left-[calc(50%+50px)]
                    top-[calc(50%-390px)]
                    w-[3200px]
                "
                zIndex={1}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/background.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                FOG 7
            ====================================================== */}

            <ParallaxLayer
                speedX={0.27}
                speedY={0.32}
                speedZ={0}
                rotation={0}
                movement={1}
                scale={1}
                distance={850}
                center
                className="
                    left-[calc(50%+300px)]
                    top-[calc(50%-100px)]
                    w-[1900px]
                "
                zIndex={2}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/fog-7.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                MOUNTAIN 10
            ====================================================== */}

            <ParallaxLayer
                speedX={0.195}
                speedY={0.305}
                speedZ={0}
                rotation={0}
                movement={1}
                scale={1}
                distance={1100}
                center
                className="
                    left-[calc(50%+330px)]
                    top-[calc(50%+169px)]
                    w-[1200px]
                "
                zIndex={3}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/mountain-10.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                FOG 6
            ====================================================== */}

            <ParallaxLayer
                speedX={0.25}
                speedY={0.28}
                speedZ={0}
                rotation={0}
                movement={1}
                scale={1}
                distance={1400}
                center
                className="
                    left-[50%]
                    top-[calc(50%+285px)]
                    w-[2200px]
                    opacity-30
                "
                zIndex={4}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/fog-6.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                MOUNTAIN 9
            ====================================================== */}

            <ParallaxLayer
                speedX={0.125}
                speedY={0.155}
                speedZ={0.15}
                rotation={0.02}
                movement={1}
                scale={1}
                distance={1700}
                center
                className="
                    left-[calc(50%-557px)]
                    top-[calc(50%+313px)]
                    w-[670px]
                "
                zIndex={5}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/mountain-9.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                MOUNTAIN 8
            ====================================================== */}

            <ParallaxLayer
                speedX={0.1}
                speedY={0.11}
                speedZ={0}
                rotation={0.02}
                movement={1}
                scale={1}
                distance={1800}
                center
                className="
                    left-[calc(50%-102px)]
                    top-[calc(50%+146px)]
                    w-[910px]
                "
                zIndex={6}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/mountain-8.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                FOG 5
            ====================================================== */}

            <ParallaxLayer
                speedX={0.16}
                speedY={0.105}
                speedZ={0}
                rotation={0}
                movement={1}
                scale={1}
                distance={1900}
                center
                className="
                    left-[calc(50%+40px)]
                    top-[calc(50%+360px)]
                    w-[650px]
                "
                zIndex={7}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/fog-5.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                MOUNTAIN 7
            ====================================================== */}

            <ParallaxLayer
                speedX={0.1}
                speedY={0.1}
                speedZ={0}
                rotation={0.09}
                movement={1}
                scale={1}
                distance={2000}
                center
                className="
                    left-[calc(50%+495px)]
                    top-[calc(50%+223px)]
                    w-[738px]
                "
                zIndex={8}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/mountain-7.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                TITLE
            ====================================================== */}

            <ParallaxLayer
                speedX={0.07}
                speedY={0.07}
                speedZ={0}
                rotation={0.11}
                movement={1}
                scale={1}
                distance={0}
                center
                className="
                    left-[50%]
                    top-[calc(50%-130px)]
                    text-center
                    uppercase
                    text-white
                "
                zIndex={9}
                style={{
                    pointerEvents: "auto",
                }}
            >
                <div className="text-center">
                    <h2
                        className="
                            text-[6.5rem]
                            font-thin
                            leading-[0.8]
                        "
                    >
                        China
                    </h2>

                    <h1
                        className="
                            text-[7rem]
                            font-extrabold
                            leading-[0.8]
                        "
                    >
                        Zhangjiakou
                    </h1>
                </div>
            </ParallaxLayer>

            {/* =====================================================
                MOUNTAIN 6
            ====================================================== */}

            <ParallaxLayer
                speedX={0.065}
                speedY={0.05}
                speedZ={0.05}
                rotation={0.12}
                movement={1}
                scale={1}
                distance={2300}
                center
                className="
                    left-[calc(50%+590px)]
                    top-[calc(50%+120px)]
                    w-[408px]
                "
                zIndex={10}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/mountain-6.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                FOG 4
            ====================================================== */}

            <ParallaxLayer
                speedX={0.135}
                speedY={0.1}
                speedZ={0}
                rotation={0}
                movement={1}
                scale={1}
                distance={2400}
                center
                className="
                    left-[calc(50%+460px)]
                    top-[calc(50%+223px)]
                    w-[590px]
                    opacity-50
                "
                zIndex={11}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/fog-4.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                MOUNTAIN 5
            ====================================================== */}

            <ParallaxLayer
                speedX={0.08}
                speedY={0.05}
                speedZ={0.13}
                rotation={0.1}
                movement={1}
                scale={1}
                distance={2550}
                center
                className="
                    left-[calc(50%+230px)]
                    top-[calc(50%+320px)]
                    w-[725px]
                "
                zIndex={12}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/mountain-5.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                FOG 3
            ====================================================== */}

            <ParallaxLayer
                speedX={0.11}
                speedY={0.018}
                speedZ={0}
                rotation={0}
                movement={1}
                scale={1}
                distance={2800}
                center
                className="
                    left-[calc(50%+5px)]
                    top-[calc(50%+210px)]
                    w-[1600px]
                "
                zIndex={13}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/fog-3.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                MOUNTAIN 4
            ====================================================== */}

            <ParallaxLayer
                speedX={0.059}
                speedY={0.024}
                speedZ={0.35}
                rotation={0.14}
                movement={1}
                scale={1}
                distance={3200}
                center
                className="
                    left-[calc(50%-698px)]
                    top-[calc(50%+196px)]
                    w-[1100px]
                "
                zIndex={15}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/mountain-4.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                MOUNTAIN 3
            ====================================================== */}

            <ParallaxLayer
                speedX={0.04}
                speedY={0.018}
                speedZ={0.32}
                rotation={0.05}
                movement={1}
                scale={1}
                distance={3400}
                center
                className="
                    left-[calc(50%+750px)]
                    top-[calc(50%-20px)]
                    w-[630px]
                "
                zIndex={16}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/mountain-3.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                FOG 2
            ====================================================== */}

            <ParallaxLayer
                speedX={0.15}
                speedY={0.0115}
                speedZ={0}
                rotation={0}
                movement={1}
                scale={1}
                distance={3600}
                center
                className="
                    left-[calc(50%+698px)]
                    top-[calc(50%-20px)]
                    w-[1100px]
                "
                zIndex={16}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/fog-2.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                MOUNTAIN 2
            ====================================================== */}

            <ParallaxLayer
                speedX={0.0235}
                speedY={0.013}
                speedZ={0.42}
                rotation={0.15}
                movement={1}
                scale={1}
                distance={3800}
                center
                className="
                    left-[calc(50%+528px)]
                    top-[calc(50%+256px)]
                    w-[800px]
                "
                zIndex={17}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/mountain-2.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                MOUNTAIN 1
            ====================================================== */}

            <ParallaxLayer
                speedX={0.027}
                speedY={0.018}
                speedZ={0.53}
                rotation={0.2}
                movement={1}
                scale={1}
                distance={4000}
                center
                className="
                    left-[calc(50%-728px)]
                    top-[calc(50%+196px)]
                    w-[1100px]
                "
                zIndex={18}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/mountain-1.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                SUN RAYS
                Static overlay
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    right-0
                    top-0
                    z-[19]
                    w-[695px]
                "
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/sun-rays.png"
                />
            </div>

            {/* =====================================================
                BLACK SHADOW
                Static overlay
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-0
                    right-0
                    z-[20]
                    w-full
                "
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/black-shadow.png"
                />
            </div>

            {/* =====================================================
                FOG 1
            ====================================================== */}

            <ParallaxLayer
                speedX={0.12}
                speedY={0.01}
                speedZ={0}
                rotation={0}
                movement={1}
                scale={1}
                distance={4200}
                center
                className="
                    left-[calc(50%+100px)]
                    top-[calc(100%-355px)]
                    w-[1900px]
                    opacity-50
                "
                zIndex={21}
            >
                <ParallaxImage
                    src="/assets/images/zhangjiakou/fog-1.png"
                />
            </ParallaxLayer>

            {/* =====================================================
                VIGNETTE
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-[100]
                "
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0.7))",
                }}
            />
                </ParallaxSection>
            </div>

            {/* ── Atmospheric Preloader Scene ── */}
            {showLoader && (
                <div
                    aria-live="polite"
                    aria-label="Loading Zhangjiakou Parallax Scene"
                    className={`
                        absolute inset-0 z-[200] flex flex-col items-center justify-center
                        bg-[#070b12] text-white px-6 select-none
                        transition-all duration-700 ease-out
                        ${isReady ? "opacity-0 pointer-events-none scale-[1.02]" : "opacity-100 scale-100"}
                    `}
                    style={{
                        background:
                            "radial-gradient(ellipse at center, #0f1c2e 0%, #070b12 75%)",
                    }}
                >
                    {/* Atmospheric pulsing aura */}
                    <div className="absolute w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none animate-pulse" />

                    <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
                        {/* 3D Depth Isometric Stack Icon */}
                        <div className="relative mb-5 flex items-center justify-center">
                            <div className="relative w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md">
                                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                                </span>
                                <svg
                                    className="w-7 h-7 text-emerald-400/90"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                                    <polyline points="2 17 12 22 22 17" />
                                    <polyline points="2 12 12 17 22 12" />
                                </svg>
                            </div>
                        </div>

                        {/* Title & Subtitle */}
                        <p className="text-[10px] font-mono tracking-[0.28em] uppercase text-emerald-400 font-semibold mb-1">
                            Zhangjiakou 2.5D Parallax
                        </p>
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1.5">
                            {isReady ? "Scene Ready" : "Composing Atmosphere"}
                        </h3>
                        <p className="text-xs text-white/50 font-mono mb-6">
                            {isReady
                                ? "Synchronizing 20 depth planes..."
                                : `Rendering depth plane ${loadedCount} of ${ZHANGJIAKOU_IMAGES.length}...`}
                        </p>

                        {/* Progress Bar Container */}
                        <div className="w-64 sm:w-72">
                            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden border border-white/5 relative">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 transition-all duration-300 ease-out shadow-[0_0_14px_rgba(52,211,153,0.7)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <div className="flex items-center justify-between mt-2.5 text-[11px] font-mono">
                                <span className="text-white/40">
                                    {loadedCount}/{ZHANGJIAKOU_IMAGES.length} layers
                                </span>
                                <span className="text-emerald-400 font-semibold">
                                    {progress}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}