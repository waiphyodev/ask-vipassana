"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Use a simpler approach with React.ComponentProps
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Initialize with user preference if override flag exists
  React.useEffect(() => {
    const hasOverride = localStorage.getItem("theme-preference-override")
    if (hasOverride === "true") {
      // Ensure the theme is applied from localStorage rather than system preference
      const currentTheme = localStorage.getItem("theme")
      if (currentTheme) {
        document.documentElement.classList.toggle("dark", currentTheme === "dark")
      }
    }
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
