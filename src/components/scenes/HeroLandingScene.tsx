import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ParallaxSection from "../parallax/ParallaxSection";
import ParallaxLayer from "../parallax/ParallaxLayer";
import { useFloating } from "../parallax/UseFloating";
import { useReducedMotion } from "../parallax/useReducedMotion";

export default function HeroLandingScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // ------------------------------------------------------------------------
    // Staggered Floating Cadences (Coprime periods prevent mechanical synchrony)
    // ------------------------------------------------------------------------
    const ambientGlowRef = useFloating(35, 6.0, 0);
    const coreRef = useFloating(16, 4.4, 0.2);
    const glassSlabRef = useFloating(20, 5.2, 0.5);
    const chromeSatellite1 = useFloating(18, 3.8, 0.8);
    const chromeSatellite2 = useFloating(24, 4.6, 1.2);
    const telemetryRef = useFloating(12, 6.2, 0.1);
    const macroLensLeft = useFloating(32, 3.4, 1.0);
    const macroLensRight = useFloating(28, 3.6, 1.4);
    const macroChromeOrb = useFloating(36, 3.2, 0.7);

    // ------------------------------------------------------------------------
    // Initial Cinematic Reveal Timeline
    // ------------------------------------------------------------------------
    useGSAP(
        () => {
            if (prefersReducedMotion) return;

            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.from(".scene-deep-bg", { opacity: 0, duration: 2.4 })
                .from(".scene-watermark", { scale: 0.94, opacity: 0, duration: 2.2 }, "-=2.0")
                .from(".scene-core-monolith", { scale: 0.75, opacity: 0, filter: "blur(18px)", duration: 1.8 }, "-=1.7")
                .from(".scene-midground-glass", { y: 55, opacity: 0, scale: 0.9, duration: 1.4, stagger: 0.08 }, "-=1.4")
                .from(".scene-foreground-macro", { y: 90, opacity: 0, scale: 0.85, duration: 1.5, stagger: 0.12 }, "-=1.0");
        },
        { scope: containerRef }
    );

    // ------------------------------------------------------------------------
    // Lightweight 60fps Dynamic Cursor Spotlight (Real-time specular tracking)
    // ------------------------------------------------------------------------
    useGSAP(
        () => {
            const spotlight = spotlightRef.current;
            if (!spotlight || prefersReducedMotion) return;

            const quickX = gsap.quickTo(spotlight, "x", { duration: 0.75, ease: "power3.out" });
            const quickY = gsap.quickTo(spotlight, "y", { duration: 0.75, ease: "power3.out" });

            const handlePointerMove = (e: PointerEvent) => {
                const bounds = containerRef.current?.getBoundingClientRect();
                if (!bounds) return;
                quickX(e.clientX - bounds.left);
                quickY(e.clientY - bounds.top);
            };

            window.addEventListener("pointermove", handlePointerMove, { passive: true });
            return () => window.removeEventListener("pointermove", handlePointerMove);
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050507] select-none">
            <ParallaxSection
                intensity={1.2}
                smoothing={0.7}
                movementRange={{ x: 420, y: 260 }}
                className="text-white"
            >
                {/* ============================================================
                    LAYER 1: Deep Celestial Void & Reactive Spotlight
                ============================================================= */}
                <ParallaxLayer speedX={0.015} speedY={0.015} movement={0.15} center zIndex={1}>
                    <div
                        className="scene-deep-bg absolute left-1/2 top-1/2 h-[220vw] w-[220vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.035]"
                        style={{
                            backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.8) 1px, transparent 1px)",
                            backgroundSize: "44px 44px",
                        }}
                    />
                    <div
                        ref={spotlightRef}
                        className="pointer-events-none absolute -left-[350px] -top-[350px] h-[700px] w-[700px] rounded-full blur-[100px] opacity-70"
                        style={{
                            background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(56,189,248,0.08) 40%, transparent 70%)",
                        }}
                    />
                    <div
                        ref={ambientGlowRef}
                        className="scene-deep-bg absolute left-[28%] top-[20%] h-[720px] w-[720px] rounded-full bg-gradient-to-tr from-blue-950/60 via-indigo-600/30 to-sky-500/15 blur-[160px]"
                    />
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 2: Receding 3D Horizon Ground Grid (Tron Plane)
                ============================================================= */}
                <ParallaxLayer speedX={0.025} speedY={0.025} movement={0.25} center zIndex={2}>
                    <div
                        className="scene-deep-bg absolute left-1/2 bottom-[-140px] -translate-x-1/2 w-[2600px] h-[750px] opacity-[0.05]"
                        style={{
                            transform: "perspective(600px) rotateX(78deg)",
                            transformOrigin: "center bottom",
                            backgroundImage:
                                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 3: Colossal Architectural Watermark (At Infinity)
                ============================================================= */}
                <ParallaxLayer speedX={0.035} speedY={0.035} movement={0.35} center zIndex={3} className="left-1/2 top-[36%]">
                    <div className="scene-watermark pointer-events-none flex flex-col items-center">
                        <span className="font-mono text-[15rem] font-black tracking-[0.25em] text-white/[0.022] leading-none select-none">
                            KINETIC
                        </span>
                    </div>
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 4: Distant Cyan/Indigo Laser Filaments
                ============================================================= */}
                <ParallaxLayer speedX={0.045} speedY={0.05} movement={0.45} center zIndex={4} className="left-1/2 top-[35%]">
                    <div
                        className="pointer-events-none w-[1000px] h-[1px] opacity-40"
                        style={{
                            transform: "rotate(-25deg)",
                            background:
                                "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.6) 45%, rgba(99,102,241,0.7) 55%, transparent 100%)",
                        }}
                    />
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 5: Distant Floating Glass Diamond Shard (Top-Left)
                ============================================================= */}
                <ParallaxLayer speedX={0.06} speedY={0.07} movement={0.55} center zIndex={6} className="left-[18%] top-[18%]">
                    <div
                        className="scene-midground-glass relative h-20 w-20 border border-white/15 border-t-white/35 border-l-white/25 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                        style={{ transform: "rotate(45deg) skewX(12deg)" }}
                    >
                        <div className="absolute inset-2 border border-white/10" />
                        <div className="absolute inset-0 flex items-center justify-center text-[9px] font-mono text-zinc-500">
                            +
                        </div>
                    </div>
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 6: Distant Titanium Orbital Ring (Top-Right)
                ============================================================= */}
                <ParallaxLayer speedX={0.07} speedY={0.08} movement={0.65} center zIndex={7} className="left-[82%] top-[20%]">
                    <div
                        className="scene-midground-glass relative h-28 w-28 rounded-full border border-white/10 border-t-white/30"
                        style={{ transform: "rotateX(60deg) rotateZ(30deg)" }}
                    >
                        <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                    </div>
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 7: Left Column Telemetry & Equalizer HUD
                ============================================================= */}
                <ParallaxLayer speedX={0.08} speedY={0.09} movement={0.75} center zIndex={9} className="left-[8%] top-[50%]">
                    <div
                        ref={telemetryRef}
                        className="scene-midground-glass hidden xl:flex flex-col gap-5 w-[190px] border-l border-white/10 pl-5 text-left font-mono"
                    >
                        <div>
                            <span className="text-[9px] uppercase tracking-widest text-zinc-500 block">KINETIC STATE</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                                <span className="text-xs font-semibold tracking-wider text-zinc-200">OSCILLATING // 120Hz</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-[9px] uppercase tracking-widest text-zinc-500 block">REFRACTION INDEX</span>
                            <span className="text-xs tracking-wider text-zinc-300">η = 1.524 • FLINT GLASS</span>
                        </div>
                        <div>
                            <span className="text-[9px] uppercase tracking-widest text-zinc-500 block">SPATIAL HARMONICS</span>
                            <div className="flex items-center gap-3 mt-1.5">
                                <span className="text-xs text-sky-400 font-bold">Z: +420</span>
                                <div className="flex items-end gap-[3px] h-3.5">
                                    <div className="w-[3px] h-2 bg-sky-400/60 rounded-full" />
                                    <div className="w-[3px] h-3 bg-sky-400/80 rounded-full" />
                                    <div className="w-[3px] h-3.5 bg-sky-400 rounded-full" />
                                    <div className="w-[3px] h-2.5 bg-sky-400/90 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 8: Right Column Optical Radar Reticle
                ============================================================= */}
                <ParallaxLayer speedX={0.09} speedY={0.095} movement={0.82} center zIndex={10} className="left-[92%] top-[48%]">
                    <div className="scene-midground-glass hidden xl:flex flex-col items-center gap-3">
                        <div className="relative h-28 w-28 rounded-full border border-white/15 flex items-center justify-center">
                            <div className="absolute inset-2 rounded-full border border-dashed border-white/10" />
                            <div className="absolute inset-6 rounded-full border border-white/10" />
                            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                            <div className="absolute top-1 text-[8px] font-mono text-zinc-500">00°</div>
                            <div className="absolute bottom-1 text-[8px] font-mono text-zinc-500">180°</div>
                            <div className="absolute right-1 text-[8px] font-mono text-zinc-500">90°</div>
                            <div className="absolute left-1 text-[8px] font-mono text-zinc-500">270°</div>
                        </div>
                        <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">GYRO // RADIAL</span>
                    </div>
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 9: 3D Faceted Glass Monolith Slab (Top-Left)
                ============================================================= */}
                <ParallaxLayer speedX={0.10} speedY={0.11} movement={0.90} center zIndex={13} className="left-[23%] top-[24%]">
                    <div
                        ref={glassSlabRef}
                        className="scene-midground-glass relative w-52 h-32 rounded-2xl border border-white/20 border-t-white/40 border-l-white/30 bg-gradient-to-br from-white/[0.12] via-white/[0.03] to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_20px_40px_rgba(0,0,0,0.6)]"
                        style={{
                            transform: "rotateX(28deg) rotateY(-32deg) rotateZ(12deg)",
                            transformStyle: "preserve-3d",
                        }}
                    >
                        <div className="absolute inset-2 border border-dashed border-white/15 rounded-xl flex flex-col justify-between p-3">
                            <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase">PRISM SLAB // 01</span>
                            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500">
                                <span>3D FACET</span>
                                <span className="text-sky-400">CHAMFER</span>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 10: Liquid Chrome Satellite Droplet 1 (Mid-Left)
                ============================================================= */}
                <ParallaxLayer speedX={0.12} speedY={0.13} movement={1.05} center zIndex={15} className="left-[16%] top-[42%]">
                    <div
                        ref={chromeSatellite1}
                        className="scene-midground-glass h-16 w-16 rounded-full border border-white/40 shadow-[0_0_30px_rgba(99,102,241,0.3),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-6px_12px_rgba(0,0,0,0.9)]"
                        style={{
                            background:
                                "radial-gradient(circle at 35% 25%, #ffffff 0%, #e2e8f0 14%, #94a3b8 28%, #1e293b 55%, #0f172a 75%, #020617 100%)",
                        }}
                    />
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 11: Liquid Chrome Satellite Droplet 2 (Mid-Right)
                ============================================================= */}
                <ParallaxLayer speedX={0.13} speedY={0.14} movement={1.12} center zIndex={16} className="left-[84%] top-[34%]">
                    <div
                        ref={chromeSatellite2}
                        className="scene-midground-glass h-20 w-20 rounded-full border border-white/40 shadow-[0_0_35px_rgba(56,189,248,0.35),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-6px_14px_rgba(0,0,0,0.9)]"
                        style={{
                            background:
                                "radial-gradient(circle at 35% 25%, #ffffff 0%, #cbd5e1 15%, #64748b 32%, #1e293b 58%, #020617 100%)",
                        }}
                    />
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 12: THE MASTER SCULPTURE: Liquid Chrome Sphere + 3D Gimbals
                ============================================================= */}
                <ParallaxLayer speedX={0.11} speedY={0.11} movement={1.00} center zIndex={20} className="left-1/2 top-[47%] w-full text-center">
                    <div ref={coreRef} className="scene-core-monolith pointer-events-auto flex flex-col items-center">
                        {/* Status Chip */}
                        <div className="mb-4 flex items-center gap-2.5 rounded-full border border-white/15 border-t-white/35 bg-white/[0.04] px-4 py-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-xl">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                            </span>
                            <span className="font-mono text-[11px] font-medium tracking-[0.25em] uppercase text-zinc-300">
                                ARCHETYPE // 01 • ZERO GRAVITY
                            </span>
                        </div>

                        {/* 3D Liquid Chrome Sphere + Triple Concentric Gimbal Rings */}
                        <div className="relative my-2 flex items-center justify-center h-64 w-64" style={{ transformStyle: "preserve-3d" }}>
                            {/* Outer Optical Ring */}
                            <div
                                className="absolute h-64 w-64 rounded-full border border-white/30 border-t-white/60 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                style={{ transform: "rotateX(68deg) rotateY(-18deg)" }}
                            />
                            {/* Middle Dashed Gyro Ring */}
                            <div
                                className="absolute h-52 w-52 rounded-full border border-dashed border-cyan-400/40"
                                style={{ transform: "rotateX(-45deg) rotateY(35deg)" }}
                            />
                            {/* Inner Translucent Halo */}
                            <div
                                className="absolute h-40 w-40 rounded-full border border-white/20"
                                style={{ transform: "rotateX(20deg) rotateY(-60deg)" }}
                            />

                            {/* Massive Liquid Chrome Core Sphere */}
                            <div
                                className="relative h-32 w-32 rounded-full border border-white/50 shadow-[0_0_80px_rgba(99,102,241,0.4),inset_0_3px_6px_rgba(255,255,255,0.9),inset_0_-12px_24px_rgba(0,0,0,0.95)] transition-transform duration-700 hover:scale-105"
                                style={{
                                    background:
                                        "radial-gradient(circle at 35% 25%, #ffffff 0%, #e2e8f0 14%, #94a3b8 28%, #1e293b 55%, #0f172a 75%, #020617 100%)",
                                }}
                            />
                        </div>

                        {/* Minimalist Monumental Typography */}
                        <h1 className="mt-3 text-[7.5rem] font-black tracking-[-0.04em] leading-[0.88] bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
                            CHRONOS
                        </h1>

                        <div className="mt-5 flex items-center gap-4 text-xs font-mono tracking-[0.32em] uppercase text-zinc-400">
                            <span>Kinetic Monolith</span>
                            <span className="h-1 w-1 rounded-full bg-zinc-600" />
                            <span>Precision Glass &amp; Chrome</span>
                            <span className="h-1 w-1 rounded-full bg-zinc-600" />
                            <span>Awwwards Spec</span>
                        </div>
                    </div>
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 13: Exploration Navigation Dock
                ============================================================= */}
                <ParallaxLayer speedX={0.15} speedY={0.14} movement={1.25} center zIndex={23} className="left-1/2 top-[84%]">
                    <div className="scene-core-monolith flex items-center gap-5 rounded-full border border-white/15 border-t-white/30 bg-white/[0.04] px-7 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                        <span className="font-mono text-xs tracking-widest text-zinc-300 uppercase">Explore Sculpture</span>
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white/10 text-zinc-300 text-sm">
                            ↓
                        </div>
                        <span className="h-3 w-[1px] bg-white/20" />
                        <span className="font-mono text-[10px] text-zinc-500 tracking-wider">[SCROLL TO DIVE]</span>
                    </div>
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 14: Midground Angled Glass Baffle (Bottom-Right)
                ============================================================= */}
                <ParallaxLayer speedX={0.18} speedY={0.16} movement={1.40} center zIndex={26} className="left-[78%] top-[72%]">
                    <div
                        className="scene-midground-glass relative w-44 h-24 rounded-xl border border-white/15 border-t-white/35 border-l-white/25 bg-gradient-to-br from-white/[0.10] via-white/[0.02] to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                        style={{ transform: "rotateX(35deg) rotateY(25deg)" }}
                    >
                        <div className="p-3 text-[9px] font-mono text-zinc-400">
                            <span>CHAMFER_B // REF</span>
                        </div>
                    </div>
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 15: Hardware Telemetry Sensor Capsule
                ============================================================= */}
                <ParallaxLayer speedX={0.20} speedY={0.18} movement={1.50} center zIndex={28} className="left-[28%] top-[82%]">
                    <div className="scene-midground-glass flex items-center gap-3 rounded-full border border-white/15 border-t-white/30 bg-white/[0.03] px-5 py-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                        <span className="font-mono text-xs text-zinc-300 tracking-wider">GSAP 3.12 // 120 FPS</span>
                    </div>
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 16: Extreme Foreground Macro Glass Blade (Bottom-Left)
                    [Crucial for Depth: Slices rapidly across camera lens]
                ============================================================= */}
                <ParallaxLayer speedX={0.28} speedY={0.22} movement={1.80} center zIndex={38} className="left-[12%] top-[82%]">
                    <div
                        ref={macroLensLeft}
                        className="scene-foreground-macro relative w-[360px] rounded-3xl border border-white/20 border-t-white/45 border-l-white/35 border-r-white/10 border-b-white/5 bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_30px_70px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
                    >
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                            <span className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                                OPTICAL PRISM
                            </span>
                            <span className="text-[10px] text-zinc-500">Z: +480</span>
                        </div>
                        <p className="mt-2 font-mono text-[11px] text-zinc-400 leading-normal">
                            High-velocity stereoscopic foreground blade. Sweeps directly over camera lens.
                        </p>
                    </div>
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 17: Extreme Foreground Macro Refraction Prism (Top-Right)
                ============================================================= */}
                <ParallaxLayer speedX={0.33} speedY={0.25} movement={2.05} center zIndex={42} className="left-[86%] top-[14%]">
                    <div
                        ref={macroLensRight}
                        className="scene-foreground-macro relative h-32 w-32 rounded-2xl border border-white/25 border-t-white/50 border-l-white/35 bg-gradient-to-br from-white/[0.18] via-white/[0.05] to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_20px_45px_rgba(0,0,0,0.8)]"
                        style={{ transform: "rotate(24deg) skewY(-8deg)" }}
                    >
                        <div className="absolute inset-2 border border-white/15 rounded-lg flex items-center justify-center">
                            <span className="font-mono text-[10px] text-cyan-400 tracking-widest">+2.05X</span>
                        </div>
                    </div>
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 18: Extreme Foreground Liquid Chrome Orb (Bottom-Right)
                    [Extreme Parallax: 2.25x Velocity Bleeding Off-Screen]
                ============================================================= */}
                <ParallaxLayer speedX={0.38} speedY={0.28} movement={2.25} center zIndex={45} className="left-[88%] top-[84%]">
                    <div
                        ref={macroChromeOrb}
                        className="scene-foreground-macro relative h-40 w-40 rounded-full border border-white/50 shadow-[0_0_60px_rgba(99,102,241,0.5),inset_0_3px_6px_rgba(255,255,255,0.9),inset_0_-10px_20px_rgba(0,0,0,0.95)]"
                        style={{
                            background:
                                "radial-gradient(circle at 32% 26%, #ffffff 0%, #e2e8f0 16%, #94a3b8 32%, #1e293b 60%, #0f172a 80%, #020617 100%)",
                        }}
                    >
                        <div className="pointer-events-none absolute -inset-2 rounded-full border border-white/25 border-t-white/50" />
                    </div>
                </ParallaxLayer>

                {/* ============================================================
                    LAYER 19: Anamorphic Horizontal Flare Overlay
                ============================================================= */}
                <div
                    className="pointer-events-none absolute left-0 right-0 top-0 h-[240px] z-[90] opacity-40"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(99,102,241,0.28) 0%, rgba(56,189,248,0.1) 50%, transparent 100%)",
                    }}
                />

                {/* ============================================================
                    LAYER 20: Cinema Perimeter Vignette
                ============================================================= */}
                <div
                    className="pointer-events-none absolute inset-0 z-[100]"
                    style={{
                        background:
                            "radial-gradient(circle at center, transparent 32%, rgba(5,5,7,0.65) 75%, #050507 100%)",
                    }}
                />
            </ParallaxSection>
        </div>
    );
}