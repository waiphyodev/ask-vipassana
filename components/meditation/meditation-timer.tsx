"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Breathing, FadeIn } from "@/components/ui/animation-wrapper"
import { ModalBlur } from "@/components/ui/blur-container"
import { Play, Pause, RotateCcw, X } from "lucide-react"

interface MeditationTimerProps {
  onClose: () => void
}

export function MeditationTimer({ onClose }: MeditationTimerProps) {
  const [duration, setDuration] = useState(10) // Default 10 minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle timer start
  const startTimer = () => {
    setIsActive(true)
    setIsPaused(false)
    setIsCompleted(false)
  }

  // Handle timer pause
  const pauseTimer = () => {
    setIsPaused(true)
  }

  // Handle timer resume
  const resumeTimer = () => {
    setIsPaused(false)
  }

  // Handle timer reset
  const resetTimer = () => {
    setIsActive(false)
    setIsPaused(false)
    setIsCompleted(false)
    setTimeLeft(duration * 60)
  }

  // Handle duration change
  const handleDurationChange = (mins: number) => {
    if (!isActive) {
      setDuration(mins)
      setTimeLeft(mins * 60)
    }
  }

  // Timer effect
  useEffect(() => {
    if (isActive && !isPaused && !isCompleted) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout)
            setIsActive(false)
            setIsCompleted(true)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, isPaused, isCompleted])

  // Save timer preferences to localStorage
  useEffect(() => {
    localStorage.setItem("vipassana-timer-duration", duration.toString())
  }, [duration])

  // Load timer preferences from localStorage
  useEffect(() => {
    const savedDuration = localStorage.getItem("vipassana-timer-duration")
    if (savedDuration) {
      const parsedDuration = parseInt(savedDuration, 10)
      if (!isNaN(parsedDuration) && parsedDuration > 0) {
        setDuration(parsedDuration)
        setTimeLeft(parsedDuration * 60)
      }
    }
  }, [])

  // Calculate progress percentage
  const progressPercentage = isActive || isPaused || isCompleted
    ? 100 - (timeLeft / (duration * 60)) * 100
    : 0

  return (
    <FadeIn duration={0.5}>
      <ModalBlur className="relative max-w-md mx-auto">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="text-center py-2">
          <h3 className="text-lg font-medium mb-6">Meditation Timer</h3>

          {/* Timer Display */}
          <div className="relative mb-8 flex justify-center">
            <Breathing
              duration={3}
              className="h-32 w-32 rounded-full border-2 border-primary/30 flex items-center justify-center"
            >
              <div className="text-2xl font-medium">
                {formatTime(timeLeft)}
              </div>
            </Breathing>

            {/* Progress circle */}
            <svg
              className="absolute top-0 left-1/2 -translate-x-1/2"
              width="128"
              height="128"
              viewBox="0 0 128 128"
            >
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeWidth="4"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.6"
                strokeWidth="4"
                strokeDasharray="377"
                strokeDashoffset={377 - (377 * progressPercentage) / 100}
                transform="rotate(-90 64 64)"
              />
            </svg>
          </div>

          {/* Duration Selection */}
          {!isActive && !isPaused && (
            <div className="flex justify-center space-x-2 mb-6">
              {[5, 10, 15, 20, 30].map((mins) => (
                <Button
                  key={mins}
                  variant={duration === mins ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleDurationChange(mins)}
                  className="min-w-[40px]"
                >
                  {mins}
                </Button>
              ))}
            </div>
          )}

          {/* Timer Controls */}
          <div className="flex justify-center space-x-4">
            {!isActive && !isPaused ? (
              <Button onClick={startTimer} className="rounded-full px-6">
                <Play className="mr-2 h-4 w-4" />
                Start
              </Button>
            ) : (
              <>
                {isPaused ? (
                  <Button onClick={resumeTimer} className="rounded-full px-6">
                    <Play className="mr-2 h-4 w-4" />
                    Resume
                  </Button>
                ) : (
                  <Button onClick={pauseTimer} className="rounded-full px-6">
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={resetTimer}
                  className="rounded-full"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </>
            )}
          </div>

          {/* Completion Message */}
          {isCompleted && (
            <FadeIn className="mt-6 text-muted-foreground">
              <p>Meditation session completed.</p>
              <p className="text-sm mt-2">Take a moment to notice how you feel.</p>
            </FadeIn>
          )}

          <p className="text-xs text-muted-foreground mt-8">
            Find a comfortable position, close your eyes, and focus on your breath.
          </p>
        </div>
      </ModalBlur>
    </FadeIn>
  )
}
