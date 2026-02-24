"use client"

import { useEffect, useState } from "react"
import { Smartphone, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<{ outcome: "accepted" | "dismissed" }>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

const DISMISS_KEY = "vicon-a2hs-dismissed"
const DISMISS_DAYS = 7

function isIOS(): boolean {
  if (typeof window === "undefined") return false
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  )
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  )
}

function wasDismissed(): boolean {
  if (typeof window === "undefined") return true
  try {
    const stored = localStorage.getItem(DISMISS_KEY)
    if (!stored) return false
    const { at } = JSON.parse(stored) as { at: number }
    return Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}

function setDismissed() {
  try {
    localStorage.setItem(DISMISS_KEY, JSON.stringify({ at: Date.now() }))
  } catch {
    /* ignore */
  }
}

export default function AddToHomeScreen() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)
  const [isIOSDevice, setIsIOSDevice] = useState(false)

  useEffect(() => {
    if (isStandalone()) return
    if (wasDismissed()) return

    const onBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall)
    if (isIOS()) setIsIOSDevice(true)

    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall)
  }, [])

  useEffect(() => {
    if (isStandalone() || wasDismissed()) return
    if (!deferredPrompt && !isIOSDevice) return

    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [deferredPrompt, isIOSDevice])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    const { outcome } = await deferredPrompt.prompt()
    if (outcome === "accepted") {
      setVisible(false)
      setDeferredPrompt(null)
    }
  }

  const handleDismiss = () => {
    setVisible(false)
    setDismissed()
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-lg border border-primary/20 bg-primary/95 p-4 shadow-lg backdrop-blur-sm animate-in slide-in-from-bottom-4 md:left-auto md:right-6"
      role="dialog"
      aria-label="Add VICON to your home screen"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/20">
          <Smartphone className="text-accent" size={22} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-primary-foreground">Add VICON to your home screen</h3>
          {deferredPrompt ? (
            <p className="mt-1 text-sm text-primary-foreground/85">
              Get quick access and an app-like experience. Works offline too.
            </p>
          ) : isIOSDevice ? (
            <p className="mt-1 text-sm text-primary-foreground/85">
              Tap the Share button <span className="font-medium">↓</span> then &quot;Add to Home Screen&quot;
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="flex-shrink-0 rounded p-1 text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
          aria-label="Dismiss"
        >
          <X size={20} />
        </button>
      </div>
      {deferredPrompt && (
        <button
          type="button"
          onClick={handleInstall}
          className="mt-3 w-full rounded-lg bg-accent px-4 py-2.5 font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          Add to Home Screen
        </button>
      )}
    </div>
  )
}
