"use client";

import { cn } from "@/lib/utils";

// Adjust effect intensity to create softer, more organic effects
// aligned with the "Organic Minimalism" aesthetic
let effectIntensity = 0.6;

// Get glow effect classes for message bubbles
export const getGlowEffectClasses = (baseClasses: string = "", isUser = false): string => {
  // Update color values to match design style guide with stronger values
  const userGlowColor = "rgba(210, 136, 90, 0.15)"; // Soft, desaturated orange from style guide
  const assistantGlowColor = "rgba(229, 217, 201, 0.25)"; // Soft, desaturated tan color

  // Dark mode glow colors
  const darkUserGlowColor = "rgba(210, 136, 90, 0.3)";
  const darkAssistantGlowColor = "rgba(229, 217, 201, 0.2)";

  if (effectIntensity < 0.3) {
    // Subtle effects
    return baseClasses;
  } else if (effectIntensity < 0.7) {
    // Medium effects - softer shadows with greater spread for organic feel
    return cn(
      baseClasses,
      isUser
        ? `shadow-[0_6px_24px_${userGlowColor}] dark:shadow-[0_6px_24px_${darkUserGlowColor}]`
        : `shadow-[0_6px_24px_${assistantGlowColor}] dark:shadow-[0_6px_24px_${darkAssistantGlowColor}]`
    );
  } else {
    // Strong effects - still maintaining softness
    return cn(
      baseClasses,
      isUser
        ? `shadow-[0_8px_30px_${userGlowColor}] dark:shadow-[0_8px_30px_${darkUserGlowColor}]`
        : `shadow-[0_8px_30px_${assistantGlowColor}] dark:shadow-[0_8px_30px_${darkAssistantGlowColor}]`
    );
  }
};

// Get shine animation classes
export const getShineAnimationClasses = (baseClasses: string = ""): string => {
  if (effectIntensity < 0.3) {
    // No shine for subtle effects
    return baseClasses;
  } else {
    // Very subtle shine animation - softer and slower for natural feel
    return cn(
      baseClasses,
      "relative overflow-hidden",
      "after:absolute after:content-[''] after:w-[200%] after:h-[200%] after:bg-gradient-to-r after:from-transparent after:via-white/8 after:to-transparent after:-left-full after:top-0 after:transform after:-rotate-45 after:animate-shine-slow after:z-0"
    );
  }
};

// Apply hover effect classes based on current intensity
export const getHoverEffectClasses = (baseClasses: string = ""): string => {
  if (effectIntensity < 0.3) {
    // Subtle effects
    return cn(
      baseClasses,
      "transition-all duration-500 hover:brightness-102"
    );
  } else if (effectIntensity < 0.7) {
    // Medium effects - slower transitions for organic feel
    return cn(
      baseClasses,
      "transition-all duration-500 hover:brightness-104 hover:scale-[1.005] hover:shadow-md"
    );
  } else {
    // Strong effects - still maintaining subtlety
    return cn(
      baseClasses,
      "transition-all duration-500 hover:brightness-105 hover:scale-[1.01] hover:shadow-lg"
    );
  }
};

// Apply click effect classes based on current intensity
export const getClickEffectClasses = (baseClasses: string = ""): string => {
  if (effectIntensity < 0.3) {
    // Subtle effects
    return cn(
      baseClasses,
      "transition-all duration-300 active:brightness-98"
    );
  } else if (effectIntensity < 0.7) {
    // Medium effects - gentler scale change
    return cn(
      baseClasses,
      "transition-all duration-300 active:brightness-95 active:scale-[0.99]"
    );
  } else {
    // Strong effects - softer than before
    return cn(
      baseClasses,
      "transition-all duration-300 active:brightness-90 active:scale-[0.985] active:shadow-inner"
    );
  }
};

// Combine hover and click effects
export const getInteractiveEffectClasses = (baseClasses: string = ""): string => {
  const hoverClasses = getHoverEffectClasses();
  const clickClasses = getClickEffectClasses();

  // Combine classes without duplicating the base transition classes
  return cn(
    baseClasses,
    "transition-all duration-500",
    hoverClasses.replace("transition-all duration-500", ""),
    clickClasses.replace("transition-all duration-300", "")
  );
};

// Get delete button effect classes
export const getDeleteButtonEffectClasses = (): string => {
  return cn(
    "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
    getInteractiveEffectClasses("text-[#D2885A] hover:text-[#D2885A]/90 dark:text-[#D2885A]/90 dark:hover:text-[#D2885A]")
  );
};

// Get refresh button effect classes
export const getRefreshButtonEffectClasses = (): string => {
  return cn(
    "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
    getInteractiveEffectClasses("text-[#D2885A] hover:text-[#D2885A]/90 dark:text-[#D2885A]/90 dark:hover:text-[#D2885A]")
  );
};
