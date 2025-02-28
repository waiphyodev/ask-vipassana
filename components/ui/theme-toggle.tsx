"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { getInteractiveEffectClasses } from "@/utils/visual-effects"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle theme toggle with proper detection of current theme
  const toggleTheme = () => {
    // Always explicitly set to light or dark, overriding system preference
    if (resolvedTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }

    // Force the theme to apply by toggling a class after a small delay
    setTimeout(() => {
      document.body.classList.toggle("force-theme-refresh")

      // Ensure system preference is overridden by setting a localStorage flag
      localStorage.setItem("theme-preference-override", "true")
    }, 50)
  }

  if (!mounted) {
    // Return a placeholder while mounting to prevent hydration mismatch
    return <div className={cn("w-9 h-9", className)} />
  }

  // Use resolvedTheme for more reliable theme detection
  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "rounded-full w-9 h-9 transition-all duration-300 relative overflow-hidden",
        getInteractiveEffectClasses(),
        className
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <Sun className={cn(
        "h-[1.2rem] w-[1.2rem] transition-all duration-300",
        isDark ? "opacity-0 scale-0 rotate-90" : "opacity-100 scale-100 rotate-0"
      )} />
      <Moon className={cn(
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] transition-all duration-300",
        isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-90"
      )} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
