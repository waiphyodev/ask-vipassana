"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Breathing, FadeIn } from "@/components/ui/animation-wrapper"
import { Play, Pause, RotateCcw, X, Bell } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"

interface MeditationTimerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MeditationTimer({ open, onOpenChange }: MeditationTimerProps) {
  const [duration, setDuration] = useState(10) // Default 10 minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Create a function to play meditation bell sound
  const playCompletionSound = useCallback(() => {
    if (!soundEnabled) return;

    try {
      // Create AudioContext if not already created
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Configure a bell-like sound
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, ctx.currentTime); // A4 note

      // Envelope for the bell sound
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);

      // Connect and start
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 2);
    } catch (error) {
      console.error("Error playing completion sound:", error);
    }
  }, [soundEnabled]);

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
            playCompletionSound()
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
  }, [isActive, isPaused, isCompleted, playCompletionSound])

  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    localStorage.setItem("vipassana-timer-sound-enabled", (!soundEnabled).toString());
  }

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

    // Load sound preference
    const savedSoundEnabled = localStorage.getItem("vipassana-timer-sound-enabled")
    if (savedSoundEnabled !== null) {
      setSoundEnabled(savedSoundEnabled === "true")
    }
  }, [])

  // Calculate progress percentage
  const progressPercentage = isActive || isPaused || isCompleted
    ? 100 - (timeLeft / (duration * 60)) * 100
    : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto bg-background/95 backdrop-blur-md">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="text-lg font-medium text-center">Meditation Timer</DialogTitle>
        </DialogHeader>

        <div className="text-center py-2">
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

          {/* Sound Toggle */}
          <div className="flex items-center justify-center mb-4 text-sm">
            <Bell className="h-4 w-4 mr-2" />
            <span className="mr-2">Sound</span>
            <Switch
              checked={soundEnabled}
              onCheckedChange={toggleSound}
              aria-label="Toggle timer sound"
            />
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
      </DialogContent>
    </Dialog>
  )
}
