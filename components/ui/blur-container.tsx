"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BlurContainerProps {
  children: ReactNode;
  className?: string;
  blurAmount?: number;
  bgOpacity?: number;
  borderRadius?: string;
  isGlass?: boolean;
}

export function BlurContainer({
  children,
  className,
  blurAmount = 5,
  bgOpacity = 0.7,
  borderRadius = "1rem",
  isGlass = true,
}: BlurContainerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        isGlass && "backdrop-blur",
        className
      )}
      style={{
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
        backgroundColor: isGlass
          ? `rgba(255, 255, 255, ${bgOpacity})`
          : undefined,
        borderRadius,
      }}
    >
      {children}
    </div>
  );
}

// Specialized blur containers for different use cases
export function CardBlur({
  children,
  className,
}: Omit<BlurContainerProps, "blurAmount" | "bgOpacity" | "borderRadius" | "isGlass">) {
  return (
    <BlurContainer
      className={cn("p-4", className)}
      blurAmount={2}
      bgOpacity={0.5}
      borderRadius="1rem"
      isGlass={true}
    >
      {children}
    </BlurContainer>
  );
}

export function ModalBlur({
  children,
  className,
}: Omit<BlurContainerProps, "blurAmount" | "bgOpacity" | "borderRadius" | "isGlass">) {
  return (
    <BlurContainer
      className={cn("p-6", className)}
      blurAmount={10}
      bgOpacity={0.8}
      borderRadius="1.5rem"
      isGlass={true}
    >
      {children}
    </BlurContainer>
  );
}

export function FloatingBlur({
  children,
  className,
}: Omit<BlurContainerProps, "blurAmount" | "bgOpacity" | "borderRadius" | "isGlass">) {
  return (
    <BlurContainer
      className={cn("p-3 shadow-lg", className)}
      blurAmount={5}
      bgOpacity={0}
      borderRadius="0.75rem"
      isGlass={true}
    >
      {children}
    </BlurContainer>
  );
}
