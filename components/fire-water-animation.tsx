"use client"

import { useEffect, useRef } from "react"

export default function FireWaterAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation state
    let animationFrame: number
    let time = 0
    const FIRE_DURATION = 3000 // Fire burns for 3 seconds
    const WATER_DURATION = 2000 // Water falls for 2 seconds
    const SMOKE_DURATION = 3000 // Smoke lingers for 3 seconds
    const CYCLE_DURATION = FIRE_DURATION + WATER_DURATION + SMOKE_DURATION

    // Particle classes
    class FireParticle {
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      life: number
      maxLife: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + Math.random() * 100
        this.size = Math.random() * 30 + 20
        this.speedY = -Math.random() * 3 - 2
        this.speedX = (Math.random() - 0.5) * 2
        this.life = 1
        this.maxLife = Math.random() * 60 + 40
      }

      update() {
        this.y += this.speedY
        this.x += this.speedX
        this.life -= 1 / this.maxLife
        this.size *= 0.98
      }

      draw() {
        if (this.life <= 0) return
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
        gradient.addColorStop(0, `rgba(255, 200, 0, ${this.life * 0.8})`)
        gradient.addColorStop(0.5, `rgba(255, 100, 0, ${this.life * 0.6})`)
        gradient.addColorStop(1, `rgba(227, 30, 36, ${this.life * 0.2})`)
        ctx.fillStyle = gradient
        ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2)
      }
    }

    class WaterDroplet {
      x: number
      y: number
      speedY: number
      length: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = -Math.random() * 100
        this.speedY = Math.random() * 8 + 12
        this.length = Math.random() * 20 + 10
        this.opacity = Math.random() * 0.5 + 0.5
      }

      update() {
        this.y += this.speedY
      }

      draw() {
        ctx.strokeStyle = `rgba(100, 200, 255, ${this.opacity})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x, this.y + this.length)
        ctx.stroke()
      }
    }

    class SmokeParticle {
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      life: number
      maxLife: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height - Math.random() * 200
        this.size = Math.random() * 60 + 40
        this.speedY = -Math.random() * 1.5 - 0.5
        this.speedX = (Math.random() - 0.5) * 1
        this.life = 1
        this.maxLife = Math.random() * 120 + 80
      }

      update() {
        this.y += this.speedY
        this.x += this.speedX
        this.life -= 1 / this.maxLife
        this.size *= 1.01
      }

      draw() {
        if (this.life <= 0) return
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
        gradient.addColorStop(0, `rgba(80, 80, 80, ${this.life * 0.4})`)
        gradient.addColorStop(0.5, `rgba(60, 60, 60, ${this.life * 0.2})`)
        gradient.addColorStop(1, `rgba(40, 40, 40, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let fireParticles: FireParticle[] = []
    let waterDroplets: WaterDroplet[] = []
    let smokeParticles: SmokeParticle[] = []

    const animate = () => {
      time += 16 // Approximate 60fps
      const cycleTime = time % CYCLE_DURATION
      
      // Clear canvas with slight fade for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // FIRE PHASE (0-3000ms)
      if (cycleTime < FIRE_DURATION) {
        // Add new fire particles
        for (let i = 0; i < 3; i++) {
          fireParticles.push(new FireParticle())
        }
        // Update and draw fire
        fireParticles = fireParticles.filter((p) => p.life > 0)
        fireParticles.forEach((p) => {
          p.update()
          p.draw()
        })
      }

      // WATER PHASE (3000-5000ms)
      else if (cycleTime < FIRE_DURATION + WATER_DURATION) {
        // Add water droplets
        for (let i = 0; i < 5; i++) {
          waterDroplets.push(new WaterDroplet())
        }
        // Update and draw water
        waterDroplets = waterDroplets.filter((d) => d.y < canvas.height)
        waterDroplets.forEach((d) => {
          d.update()
          d.draw()
        })
      }

      // SMOKE PHASE (5000-8000ms)
      else {
        // Add smoke particles
        if (cycleTime < FIRE_DURATION + WATER_DURATION + 1000) {
          for (let i = 0; i < 2; i++) {
            smokeParticles.push(new SmokeParticle())
          }
        }
        // Update and draw smoke
        smokeParticles = smokeParticles.filter((p) => p.life > 0)
        smokeParticles.forEach((p) => {
          p.update()
          p.draw()
        })
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  )
}

