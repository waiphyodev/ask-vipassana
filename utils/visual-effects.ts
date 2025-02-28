"use client";

import { cn } from "@/lib/utils";

// Animation intensity level (0.0 to 1.0)
let effectIntensity = 0.7;

// Function to set the effect intensity level
export const setEffectIntensity = (level: number) => {
  // Ensure intensity is between 0 and 1
  effectIntensity = Math.max(0, Math.min(1, level));
};

// Function to get the current effect intensity level
export const getEffectIntensity = (): number => {
  return effectIntensity;
};

// Apply hover effect classes based on current intensity
export const getHoverEffectClasses = (baseClasses: string = ""): string => {
  if (effectIntensity < 0.3) {
    // Subtle effects
    return cn(
      baseClasses,
      "transition-all duration-300 hover:brightness-105"
    );
  } else if (effectIntensity < 0.7) {
    // Medium effects
    return cn(
      baseClasses,
      "transition-all duration-300 hover:brightness-105 hover:scale-[1.01] hover:shadow-md"
    );
  } else {
    // Strong effects
    return cn(
      baseClasses,
      "transition-all duration-300 hover:brightness-110 hover:scale-[1.02] hover:shadow-lg"
    );
  }
};

// Apply click effect classes based on current intensity
export const getClickEffectClasses = (baseClasses: string = ""): string => {
  if (effectIntensity < 0.3) {
    // Subtle effects
    return cn(
      baseClasses,
      "transition-all duration-150 active:brightness-95"
    );
  } else if (effectIntensity < 0.7) {
    // Medium effects
    return cn(
      baseClasses,
      "transition-all duration-150 active:brightness-90 active:scale-[0.98]"
    );
  } else {
    // Strong effects
    return cn(
      baseClasses,
      "transition-all duration-150 active:brightness-85 active:scale-[0.97] active:shadow-inner"
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
    "transition-all duration-300",
    hoverClasses.replace("transition-all duration-300", ""),
    clickClasses.replace("transition-all duration-150", "")
  );
};

// Get delete button effect classes
export const getDeleteButtonEffectClasses = (): string => {
  return cn(
    "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
    getInteractiveEffectClasses("text-red-500 hover:text-red-600")
  );
};

// Get refresh button effect classes
export const getRefreshButtonEffectClasses = (): string => {
  return cn(
    "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
    getInteractiveEffectClasses("text-blue-500 hover:text-blue-600")
  );
};
