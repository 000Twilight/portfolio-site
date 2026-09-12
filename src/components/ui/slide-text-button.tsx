"use client";

/**
 * @author: @kokonut-labs
 * @description: Slide Text Button with animated vertical text transition
 * @version: 1.0.0
 * @date: 2025-11-02
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SlideTextButtonProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    text?: string;
    hoverText?: string;
    href?: string;
    className?: string;
    variant?: "default" | "ghost" | "custom";
    icon?: React.ReactNode;
    iconPlacement?: "left" | "right";
}

export default function SlideTextButton({
    text = "Browse Components",
    hoverText,
    href = "/docs",
    className,
    variant = "default",
    icon,
    iconPlacement = "left",
    ...props
}: SlideTextButtonProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);
    
    const slideText = hoverText ?? text;
    let variantStyles = "";
    
    if (variant === "ghost") {
        variantStyles = "border border-black/10 text-black hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5";
    } else if (variant === "default") {
        variantStyles = "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90";
    }

    return (
        <div
            className={cn(
                "relative transition-all duration-500 ease-out",
                isMounted ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            )}
        >
            {href ? (
                <Link
                    className={cn(
                        "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg px-8 font-medium text-md tracking-tighter transition-all duration-300 md:min-w-56",
                        variantStyles,
                        className
                    )}
                    href={href}
                    {...(props as any)}
                >
                    <ButtonInner text={text} slideText={slideText} icon={icon} iconPlacement={iconPlacement} />
                </Link>
            ) : (
                <button
                    className={cn(
                        "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg px-8 font-medium text-md tracking-tighter transition-all duration-300 md:min-w-56",
                        variantStyles,
                        className
                    )}
                    {...(props as any)}
                >
                    <ButtonInner text={text} slideText={slideText} icon={icon} iconPlacement={iconPlacement} />
                </button>
            )}
        </div>
    );
}

function ButtonInner({ text, slideText, icon, iconPlacement }: { text: string; slideText: string; icon?: React.ReactNode; iconPlacement: "left" | "right" }) {
    return (
        <span className="relative inline-flex items-center justify-center gap-2 transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
            <span className="flex items-center gap-2 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                {icon && iconPlacement === "left" && <span className="shrink-0">{icon}</span>}
                <span className="font-medium whitespace-nowrap">{text}</span>
                {icon && iconPlacement === "right" && <span className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{icon}</span>}
            </span>
            <span className="absolute top-full left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 w-full">
                {icon && iconPlacement === "left" && <span className="shrink-0">{icon}</span>}
                <span className="font-medium whitespace-nowrap">{slideText}</span>
                {icon && iconPlacement === "right" && <span className="shrink-0">{icon}</span>}
            </span>
        </span>
    );
}