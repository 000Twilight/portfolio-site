import ParallaxSection from "../parallax/ParallaxSection";
import ParallaxLayer from "../parallax/ParallaxLayer";
import ParallaxImage from "../parallax/ParallaxImage";

export default function ZhangjiakouScene() {
    return (
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
                    src="https://i.ibb.co/9mHk68Gj/background.png"
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
                    src="https://i.ibb.co/DHhNwG0X/fog-7.png"
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
                    src="https://i.ibb.co/4gT3LR9K/mountain-10.png"
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
                    src="https://i.ibb.co/rW6cjXV/fog-6.png"
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
                    src="https://i.ibb.co/3y15rgKD/mountain-9.png"
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
                    src="https://i.ibb.co/zHWDdxRR/mountain-8.png"
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
                    src="https://i.ibb.co/jFSMJ2t/fog-5.png"
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
                    src="https://i.ibb.co/Fq5CHqZ6/mountain-7.png"
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
                    src="https://i.ibb.co/N2TjCDLQ/mountain-6.png"
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
                    src="https://i.ibb.co/23Xc3QwX/fog-4.png"
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
                    src="https://i.ibb.co/SSfDbsF/mountain-5.png"
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
                    src="https://i.ibb.co/chZkMKzX/fog-3.png"
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
                    src="https://i.ibb.co/39PKgGNS/mountain-4.png"
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
                    src="https://i.ibb.co/rKHGSD9S/mountain-3.png"
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
                    src="https://i.ibb.co/bj0s7gRP/fog-2.png"
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
                    src="https://i.ibb.co/7tHMfwZH/mountain-2.png"
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
                    src="https://i.ibb.co/Knh5tBS/mountain-1.png"
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
                    src="https://i.ibb.co/MDt2jKzR/sun-rays.png"
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
                    src="https://i.ibb.co/GfrKQFPh/black-shadow.png"
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
                    src="https://i.ibb.co/Y41vTxSN/fog-1.png"
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
    );
}