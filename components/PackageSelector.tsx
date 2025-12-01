"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

type PackageConfig = {
  baseSystem: boolean
  poolSystem: boolean
  waterTank5Ton: boolean
  waterTank16Ton: boolean
  additionalUnits: number
  hasSolar: boolean
  hasEVehicle: boolean
  squareFootage: number
}

export default function PackageSelector() {
  const { addToCart } = useCart()
  const [step, setStep] = useState(1)
  const [squareFootage, setSquareFootage] = useState<number | null>(null)
  const [customSquareFootage, setCustomSquareFootage] = useState("")
  const [hasPool, setHasPool] = useState<boolean | null>(null)
  const [usePool, setUsePool] = useState<boolean | null>(null)
  const [hasSolar, setHasSolar] = useState<boolean | null>(null)
  const [hasEVehicle, setHasEVehicle] = useState<boolean | null>(null)
  const [packageConfig, setPackageConfig] = useState<PackageConfig | null>(null)

  const reset = () => {
    setStep(1)
    setSquareFootage(null)
    setCustomSquareFootage("")
    setHasPool(null)
    setUsePool(null)
    setHasSolar(null)
    setHasEVehicle(null)
    setPackageConfig(null)
  }

  const calculateUnitsNeeded = (sqft: number): number => {
    return Math.ceil(sqft / 4000)
  }

  const handleSquareFootageSelect = (sqft: number) => {
    setSquareFootage(sqft)
    setStep(2)
  }

  const handleCustomSquareFootage = () => {
    const sqft = parseInt(customSquareFootage)
    if (sqft && sqft > 12000) {
      setSquareFootage(sqft)
      setStep(2)
    }
  }

  const handlePoolAnswer = (answer: boolean) => {
    setHasPool(answer)
    if (answer) {
      setStep(3) // Ask if they want to use pool
    } else {
      setStep(4) // Skip to solar question
    }
  }

  const handleUsePoolAnswer = (answer: boolean) => {
    setUsePool(answer)
    setStep(4) // Go to solar question
  }

  const handleSolarAnswer = (answer: boolean) => {
    setHasSolar(answer)
    setStep(5) // Go to E-vehicle question
  }

  const handleEVehicleAnswer = (answer: boolean) => {
    setHasEVehicle(answer)
    calculatePackage()
    setStep(6) // Show results
  }

  const calculatePackage = () => {
    if (!squareFootage) return

    const unitsNeeded = calculateUnitsNeeded(squareFootage)
    const additionalUnits = Math.max(0, unitsNeeded - 1)

    const config: PackageConfig = {
      baseSystem: true,
      poolSystem: hasPool === true && usePool === true,
      waterTank5Ton: hasPool === false || usePool === false,
      waterTank16Ton: false,
      additionalUnits,
      hasSolar: hasSolar === true,
      hasEVehicle: hasEVehicle === true,
      squareFootage: squareFootage,
    }

    setPackageConfig(config)
  }

  const calculateTotalPrice = (): number => {
    if (!packageConfig) return 0

    let total = 18600 // Base VICON Intelligent Sprinkler System

    if (packageConfig.poolSystem) {
      total += 4200 // Swimming Pool System
    }

    if (packageConfig.waterTank5Ton) {
      total += 3600 // 5-Ton Water Tank
    }

    if (packageConfig.waterTank16Ton) {
      total += 6250 // 16-Ton Water Tank
    }

    // Additional units (each additional unit is a full system)
    total += packageConfig.additionalUnits * 18600

    // TODO: Add solar and E-vehicle pricing logic later

    return total
  }

  const handleAddToCart = () => {
    if (!packageConfig) return

    const unitsNeeded = calculateUnitsNeeded(packageConfig.squareFootage)
    let packageName = `VICON Fire Protection Package (${packageConfig.squareFootage.toLocaleString()} sq ft)`

    const features: string[] = []
    features.push(`${unitsNeeded} VICON Intelligent Sprinkler System${unitsNeeded > 1 ? 's' : ''}`)

    if (packageConfig.poolSystem) {
      features.push("Swimming Pool System")
    }

    if (packageConfig.waterTank5Ton) {
      features.push("5-Ton Water Storage Tank")
    }

    if (packageConfig.waterTank16Ton) {
      features.push("16-Ton Water Storage Tank")
    }

    const packageProduct = {
      id: `custom-package-${Date.now()}`,
      name: packageName,
      price: calculateTotalPrice(),
      image: "/nozzle2.jpg",
    }

    addToCart(packageProduct)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-lg p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-foreground">
          Find Your Perfect Package
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Answer a few questions to get a customized fire protection solution
        </p>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  s < step
                    ? "bg-primary text-primary-foreground"
                    : s === step
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              {s < 5 && (
                <div
                  className={`w-12 h-1 mx-2 transition-all ${
                    s < step ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Square Footage */}
        {step === 1 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground text-center">
              What is the approximate square footage of your home?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleSquareFootageSelect(4000)}
                className="p-6 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-left group"
              >
                <div className="text-lg font-semibold text-foreground group-hover:text-accent">
                  ≤ 4,000 sq ft
                </div>
                <div className="text-sm text-muted-foreground mt-1">1 unit needed</div>
              </button>
              <button
                onClick={() => handleSquareFootageSelect(6000)}
                className="p-6 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-left group"
              >
                <div className="text-lg font-semibold text-foreground group-hover:text-accent">
                  4,001 - 8,000 sq ft
                </div>
                <div className="text-sm text-muted-foreground mt-1">2 units needed</div>
              </button>
              <button
                onClick={() => handleSquareFootageSelect(10000)}
                className="p-6 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all text-left group"
              >
                <div className="text-lg font-semibold text-foreground group-hover:text-accent">
                  8,001 - 12,000 sq ft
                </div>
                <div className="text-sm text-muted-foreground mt-1">3 units needed</div>
              </button>
              <div className="p-6 border-2 border-border rounded-lg">
                <div className="text-lg font-semibold text-foreground mb-3">&gt; 12,000 sq ft</div>
                <input
                  type="number"
                  placeholder="Enter square footage"
                  value={customSquareFootage}
                  onChange={(e) => setCustomSquareFootage(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground mb-2"
                />
                <button
                  onClick={handleCustomSquareFootage}
                  disabled={!customSquareFootage || parseInt(customSquareFootage) <= 12000}
                  className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pool Question */}
        {step === 2 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground text-center">
              Do you have a swimming pool?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handlePoolAnswer(true)}
                className="p-8 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <div className="text-xl font-semibold text-foreground group-hover:text-accent">
                  Yes
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  I have a swimming pool
                </div>
              </button>
              <button
                onClick={() => handlePoolAnswer(false)}
                className="p-8 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <div className="text-xl font-semibold text-foreground group-hover:text-accent">
                  No
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  I don't have a swimming pool
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Use Pool as Water Source */}
        {step === 3 && hasPool && (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground text-center">
              Would you like to use your pool as the water source?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleUsePoolAnswer(true)}
                className="p-8 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <div className="text-xl font-semibold text-foreground group-hover:text-accent">
                  Yes
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Use pool water for fire suppression
                </div>
              </button>
              <button
                onClick={() => handleUsePoolAnswer(false)}
                className="p-8 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <div className="text-xl font-semibold text-foreground group-hover:text-accent">
                  No
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Use dedicated water tank instead
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Solar Question */}
        {step === 4 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground text-center">
              Do you have solar installed?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleSolarAnswer(true)}
                className="p-8 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <div className="text-xl font-semibold text-foreground group-hover:text-accent">
                  Yes
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  I have solar panels installed
                </div>
              </button>
              <button
                onClick={() => handleSolarAnswer(false)}
                className="p-8 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <div className="text-xl font-semibold text-foreground group-hover:text-accent">
                  No
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  I don't have solar panels
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: E-Vehicle Question */}
        {step === 5 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground text-center">
              Do you have E-Vehicles?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleEVehicleAnswer(true)}
                className="p-8 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <div className="text-xl font-semibold text-foreground group-hover:text-accent">
                  Yes
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  I have electric vehicles
                </div>
              </button>
              <button
                onClick={() => handleEVehicleAnswer(false)}
                className="p-8 border-2 border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <div className="text-xl font-semibold text-foreground group-hover:text-accent">
                  No
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  I don't have electric vehicles
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Results */}
        {step === 6 && packageConfig && (
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground text-center">
              Your Customized Package
            </h3>

            <div className="bg-muted/30 rounded-lg p-6 border border-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <div className="font-semibold text-foreground">Property Size</div>
                    <div className="text-sm text-muted-foreground">
                      {packageConfig.squareFootage.toLocaleString()} sq ft
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Units Needed</div>
                    <div className="font-semibold text-foreground">
                      {calculateUnitsNeeded(packageConfig.squareFootage)}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">VICON Intelligent Sprinkler System</span>
                    <span className="font-semibold text-foreground">$18,600</span>
                  </div>

                  {packageConfig.additionalUnits > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">
                        Additional Units × {packageConfig.additionalUnits}
                      </span>
                      <span className="font-semibold text-foreground">
                        ${(packageConfig.additionalUnits * 18600).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {packageConfig.poolSystem && (
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Swimming Pool System</span>
                      <span className="font-semibold text-foreground">$4,200</span>
                    </div>
                  )}

                  {packageConfig.waterTank5Ton && (
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">5-Ton Water Storage Tank</span>
                      <span className="font-semibold text-foreground">$3,600</span>
                    </div>
                  )}

                  {packageConfig.waterTank16Ton && (
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">16-Ton Water Storage Tank</span>
                      <span className="font-semibold text-foreground">$6,250</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-foreground">Total Price</span>
                    <span className="text-3xl font-bold text-primary">
                      ${calculateTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 text-right">
                    or ${Math.round(calculateTotalPrice() / 60).toLocaleString()}/month with financing
                  </div>
                </div>
              </div>
            </div>

            {(packageConfig.hasSolar || packageConfig.hasEVehicle) && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="text-sm text-foreground">
                  <strong>Note:</strong> Additional recommendations for your{" "}
                  {packageConfig.hasSolar && "solar system"}
                  {packageConfig.hasSolar && packageConfig.hasEVehicle && " and "}
                  {packageConfig.hasEVehicle && "electric vehicle"}
                  {" "}will be provided during consultation.
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={reset}
                className="px-6 py-3 border-2 border-border rounded-lg hover:bg-muted transition-all text-foreground font-semibold"
              >
                Start Over
              </button>
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all font-semibold"
              >
                Add to Cart
              </button>
              <Link
                href="/contact"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold text-center"
              >
                Contact Consultant
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

