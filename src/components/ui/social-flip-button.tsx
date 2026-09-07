"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import {
    FaGithub,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";
import { Mail, MessageCircle } from "lucide-react";

export interface SocialItem {
    letter?: React.ReactNode;
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
}

interface SocialFlipButtonProps {
    items?: SocialItem[];
    className?: string;
    itemClassName?: string;
    frontClassName?: string;
    backClassName?: string;
}

const defaultItems: SocialItem[] = [
    { letter: "C", icon: <FaGithub size={20} />, label: "Github", href: "#" },
    { letter: "O", icon: <FaTwitter size={20} />, label: "Twitter", href: "#" },
    { letter: "N", icon: <FaLinkedin size={20} />, label: "LinkedIn", href: "#" },
    { letter: "T", icon: <FaInstagram size={20} />, label: "Instagram", href: "#" },
    { letter: "A", icon: <FaFacebook size={20} />, label: "Facebook", href: "#" },
    { letter: "C", icon: <Mail size={20} />, label: "Email", href: "#" },
    { letter: "T", icon: <MessageCircle size={20} />, label: "Discord", href: "#" },
];

const SocialFlipNode = ({
    item,
    index,
    isHovered,
    setTooltipIndex,
    tooltipIndex,
    itemClassName,
    frontClassName,
    backClassName,
}: {
    item: SocialItem;
    index: number;
    isHovered: boolean;
    setTooltipIndex: (val: number | null) => void;
    tooltipIndex: number | null;
    itemClassName?: string;
    frontClassName?: string;
    backClassName?: string;
}) => {
    const Wrapper = item.href ? "a" : "div";
    const wrapperProps = item.href
        ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
        : { onClick: item.onClick };

    const nodeRef = useRef<HTMLDivElement>(null);
    const flipRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!flipRef.current || !tooltipRef.current) return;

        if (isHovered && tooltipIndex === index) {
            // Flip animation
            gsap.to(flipRef.current, {
                rotateY: 180,
                duration: 0.8,
                ease: "back.out(1.5)",
                delay: index * 0.08,
            });

            // Tooltip animation
            gsap.fromTo(
                tooltipRef.current,
                {
                    opacity: 0,
                    y: 10,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    y: -50,
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out",
                }
            );
        } else {
            // Reset flip
            gsap.to(flipRef.current, {
                rotateY: 0,
                duration: 0.8,
                ease: "back.out(1.5)",
                delay: index * 0.08,
            });

            // Hide tooltip
            gsap.to(tooltipRef.current, {
                opacity: 0,
                y: 10,
                scale: 0.8,
                duration: 0.2,
                ease: "power2.in",
            });
        }
    }, [isHovered, tooltipIndex, index]);

    return (
        <Wrapper
            {...wrapperProps}
            className={cn("relative h-10 w-10 cursor-pointer", itemClassName)}
            style={{ perspective: "1000px" }}
            onMouseEnter={() => setTooltipIndex(index)}
            onMouseLeave={() => setTooltipIndex(null)}
        >
            {/* Tooltip */}
            <div
                ref={tooltipRef}
                className="absolute left-1/2 z-50 whitespace-nowrap rounded-lg bg-[#1F2937] px-3 py-1.5 text-xs font-semibold text-[#F9FAFB] shadow-md opacity-0 pointer-events-none"
                style={{
                    transform: "translateX(-50%)",
                }}
            >
                {item.label}
                {/* Arrow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-[#1F2937]" />
            </div>

            {/* Flip Container */}
            <div
                ref={flipRef}
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front - Logo (Before Hover) */}
                <div
                    ref={nodeRef}
                    className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] text-base text-[#1F2937] shadow-xs transition-colors",
                        frontClassName
                    )}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {item.icon}
                </div>

                {/* Back - On Hover */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-xl bg-[#1F2937] text-base font-bold text-[#F9FAFB] shadow-xs",
                        backClassName
                    )}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    {item.letter ?? item.icon}
                </div>
            </div>
        </Wrapper>
    );
};

export default function SocialFlipButton({
    items = defaultItems,
    className,
    itemClassName,
    frontClassName,
    backClassName,
}: SocialFlipButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

    const topBorderRef = useRef<HTMLDivElement>(null);
    const bottomBorderRef = useRef<HTMLDivElement>(null);
    const topAnimationRef = useRef<gsap.core.Timeline | null>(null);
    const bottomAnimationRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!topBorderRef.current || !bottomBorderRef.current) return;

        // Top border animation
        topAnimationRef.current = gsap.timeline({ repeat: -1 });
        topAnimationRef.current.fromTo(
            topBorderRef.current,
            { x: "-100%" },
            { x: "100%", duration: 2.5, ease: "none" }
        );

        // Bottom border animation (reverse direction)
        bottomAnimationRef.current = gsap.timeline({ repeat: -1 });
        bottomAnimationRef.current.fromTo(
            bottomBorderRef.current,
            { x: "100%" },
            { x: "-100%", duration: 2.5, ease: "none" }
        );

        return () => {
            topAnimationRef.current?.kill();
            bottomAnimationRef.current?.kill();
        };
    }, []);

    return (
        <div className={cn("flex items-center justify-center gap-4", className)}>
            <div
                className="group relative flex items-center justify-center gap-2 rounded-2xl bg-white border border-[#E5E7EB] p-2.5 shadow-xs"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setTooltipIndex(null);
                }}
            >
                {/* Border Lines Container - Subtle highlight */}
                <div className="absolute -inset-[1px] overflow-hidden rounded-2xl pointer-events-none">
                    <div
                        ref={topBorderRef}
                        className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#1F2937]/20 to-transparent"
                    />
                    <div
                        ref={bottomBorderRef}
                        className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#1F2937]/20 to-transparent"
                    />
                </div>

                {items.map((item, index) => (
                    <SocialFlipNode
                        key={index}
                        item={item}
                        index={index}
                        isHovered={isHovered}
                        setTooltipIndex={setTooltipIndex}
                        tooltipIndex={tooltipIndex}
                        itemClassName={itemClassName}
                        frontClassName={frontClassName}
                        backClassName={backClassName}
                    />
                ))}
            </div>
        </div>
    );
}