"use client"

import { useState } from "react"

type Package = {
  title: string
  price: number
  features: string[]
}

const packages: Record<string, Package> = {
  A: {
    title: "Package A – Standard Set (with 5-ton water tank)",
    price: 22200,
    features: [
      "Sprinkler main unit + jet system + wireless remote",
      "5-ton dedicated water tank",
    ],
  },
  B: {
    title: "Package B – Pool-Integrated Set",
    price: 22800,
    features: [
      "Sprinkler main unit + jet system + wireless remote",
      "Pool pressure-boost & strong suction system",
    ],
  },
  C: {
    title: "Package C – Standard Set + Energy Storage System",
    price: 30200,
    features: [
      "Sprinkler main unit + jet system + wireless remote",
      "5-ton dedicated water tank",
      "2 kW inverter + 14.3 kWh battery",
    ],
  },
  D: {
    title: "Package D – Pool System + Energy Storage System",
    price: 30800,
    features: [
      "Sprinkler main unit + jet system + wireless remote",
      "Pool pressure-boost & strong suction system",
      "2 kW inverter + 14.3 kWh battery",
    ],
  },
}

export default function PackageSelector() {
  const [step, setStep] = useState(1)
  const [hasPool, setHasPool] = useState<boolean | null>(null)
  const [usePool, setUsePool] = useState<boolean | null>(null)
  const [wantsTank, setWantsTank] = useState<boolean | null>(null)
  const [wantsEnergy, setWantsEnergy] = useState<boolean | null>(null)
  const [recommendedPackage, setRecommendedPackage] = useState<string | null>(null)

  const reset = () => {
    setStep(1)
    setHasPool(null)
    setUsePool(null)
    setWantsTank(null)
    setWantsEnergy(null)
    setRecommendedPackage(null)
  }

  const handlePoolAnswer = (answer: boolean) => {
    setHasPool(answer)
    setStep(2)
  }

  const handleStep2Answer = (answer: boolean) => {
    if (hasPool) {
      setUsePool(answer)
    } else {
      setWantsTank(answer)
    }
    setStep(3)
  }

  const handleEnergyAnswer = (answer: boolean) => {
    setWantsEnergy(answer)
    calculatePackage(answer)
    setStep(4)
  }

  const calculatePackage = (energy: boolean) => {
    if (hasPool && usePool) {
      setRecommendedPackage(energy ? "D" : "B")
    } else {
      setRecommendedPackage(energy ? "C" : "A")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 p-4 md:p-8">
      <style jsx>{`
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
        }
        .btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }
        .btn-secondary {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
        }
        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
        }
        .btn-reset {
          background: #6b7280;
          color: white;
        }
        .btn-reset:hover {
          background: #4b5563;
        }
      `}</style>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
          Vicon Fire-Protection Package Selector
        </h1>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Do you have a swimming pool?</h2>
            <div className="flex gap-4 flex-wrap">
              <button className="btn btn-primary" onClick={() => handlePoolAnswer(true)}>
                Yes
              </button>
              <button className="btn btn-secondary" onClick={() => handlePoolAnswer(false)}>
                No
              </button>
            </div>
          </div>
        )}

        {step === 2 && hasPool && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Would you like to use your pool as the water source?
            </h2>
            <div className="flex gap-4 flex-wrap">
              <button className="btn btn-primary" onClick={() => handleStep2Answer(true)}>
                Yes
              </button>
              <button className="btn btn-secondary" onClick={() => handleStep2Answer(false)}>
                No
              </button>
            </div>
          </div>
        )}

        {step === 2 && !hasPool && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Would you like a dedicated 5-ton water tank?
            </h2>
            <div className="flex gap-4 flex-wrap">
              <button className="btn btn-primary" onClick={() => handleStep2Answer(true)}>
                Yes
              </button>
              <button className="btn btn-secondary" onClick={() => handleStep2Answer(false)}>
                No
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Do you want backup energy storage (12 kW inverter + 16 kWh Sanctuary Battery)?
            </h2>
            <div className="flex gap-4 flex-wrap">
              <button className="btn btn-primary" onClick={() => handleEnergyAnswer(true)}>
                Yes
              </button>
              <button className="btn btn-secondary" onClick={() => handleEnergyAnswer(false)}>
                No
              </button>
            </div>
          </div>
        )}

        {step === 4 && recommendedPackage && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">
              Your Recommended Package
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {packages[recommendedPackage].title}
              </h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">
                ${packages[recommendedPackage].price.toLocaleString()}
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-gray-700">Features:</p>
                <ul className="list-disc list-inside space-y-1">
                  {packages[recommendedPackage].features.map((feature, idx) => (
                    <li key={idx} className="text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button className="btn btn-reset w-full mt-6" onClick={reset}>
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

