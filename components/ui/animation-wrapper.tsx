"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BaseAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  enableHover?: boolean;
}

// Fade animation component
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
  enableHover = false,
}: BaseAnimationProps) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={enableHover ? { scale: 1.02 } : undefined}
    >
      {children}
    </motion.div>
  );
}

// Slide up animation component
export function SlideUp({
  children,
  className,
  delay = 0,
  duration = 0.8,
  enableHover = false,
}: BaseAnimationProps) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={enableHover ? { scale: 1.02 } : undefined}
    >
      {children}
    </motion.div>
  );
}

// Scale animation component
export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
  enableHover = false,
}: BaseAnimationProps) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={enableHover ? { scale: 1.02 } : undefined}
    >
      {children}
    </motion.div>
  );
}

// Breathing animation component
export function Breathing({
  children,
  className,
  duration = 2,
  enableHover = false,
}: Omit<BaseAnimationProps, "delay">) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.9, 1, 0.9],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
      whileHover={enableHover ? { scale: 1.02 } : undefined}
    >
      {children}
    </motion.div>
  );
}

// Main wrapper that selects the appropriate animation component
export function AnimationWrapper({
  children,
  className,
  variant = "fade",
  delay = 0,
  duration,
  enableHover = false,
}: BaseAnimationProps & { variant?: "fade" | "slideUp" | "scale" | "breathing" | "none" }) {
  if (variant === "none") {
    return <div className={className}>{children}</div>;
  }

  if (variant === "slideUp") {
    return (
      <SlideUp
        className={className}
        delay={delay}
        duration={duration}
        enableHover={enableHover}
      >
        {children}
      </SlideUp>
    );
  }

  if (variant === "scale") {
    return (
      <ScaleIn
        className={className}
        delay={delay}
        duration={duration}
        enableHover={enableHover}
      >
        {children}
      </ScaleIn>
    );
  }

  if (variant === "breathing") {
    return (
      <Breathing
        className={className}
        duration={duration}
        enableHover={enableHover}
      >
        {children}
      </Breathing>
    );
  }

  // Default to fade
  return (
    <FadeIn
      className={className}
      delay={delay}
      duration={duration}
      enableHover={enableHover}
    >
      {children}
    </FadeIn>
  );
}
