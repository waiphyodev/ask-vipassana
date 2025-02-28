"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

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
  // Check if we're in the browser and get the initial theme mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Update isDarkMode based on the document's data-theme attribute or prefers-color-scheme
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    // Optional: Set up listener for theme changes if your app supports switching themes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

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
          ? isDarkMode
            ? `rgba(30, 30, 35, ${bgOpacity})`
            : `rgba(255, 255, 255, ${bgOpacity})`
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
      blurAmount={10}
      bgOpacity={0.8}
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
