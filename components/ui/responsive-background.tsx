"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import Image from "next/image";

interface ResponsiveBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  imagePath?: string;
  overlayOpacity?: number;
  enableParallax?: boolean;
  blurAmount?: number;
  backgroundColor?: string;
}

export const ResponsiveBackground = ({
  className,
  children,
  imagePath = "/images/background/background-large.webp",
  overlayOpacity = 0.7,
  enableParallax = true,
  blurAmount = 0,
  backgroundColor = "#cf986e",
  ...props
}: ResponsiveBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Subtle parallax effect - image moves slightly slower than scroll
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? ["0%", "10%"] : ["0%", "0%"]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        className
      )}
      style={{ backgroundColor }}
      {...props}
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 z-0 h-[110%] w-full"
        style={{ y, backgroundColor }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }
        }}
      >
        <Image
          src={imagePath}
          alt="Background"
          fill
          priority
          sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
          className="opacity-100 dark:opacity-50 object-cover xl:object-center object-left will-change-transform"
          quality={70}
        />
      </motion.div>

      {/* Overlay for better text contrast */}
      <div
        className="absolute inset-0 z-10 bg-background"
        style={{
          opacity: overlayOpacity,
          backdropFilter: blurAmount > 0 ? `blur(${blurAmount}px)` : "none"
        }}
      />

      {/* Content */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </div>
  );
};
