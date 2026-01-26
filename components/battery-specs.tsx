import { Battery, Zap, Thermometer, Scale, Ruler, Shield } from "lucide-react"

export default function BatterySpecs() {
  const expansionOptions = [
    {
      name: "Base System",
      capacity: "14.3 kWh",
      price: "$12,800",
      description: "Includes accessories and installation",
    },
    {
      name: "+1 Expansion",
      capacity: "32 kWh",
      price: "$17,600",
      description: "Double your capacity",
    },
    {
      name: "+2 Expansions",
      capacity: "48 kWh",
      price: "$18,000",
      description: "Triple your capacity",
    },
    {
      name: "+3 Expansions",
      capacity: "60 kWh Max",
      price: "$23,500",
      description: "Maximum system capacity",
    },
  ]

  const keyFeatures = [
    {
      icon: Battery,
      title: "Scalable Design",
      value: "60 kWh max",
      description: "System expansion available anytime",
    },
    {
      icon: Zap,
      title: "Integrated Inverter",
      value: "18 kW / 13.2 kW peak",
      description: "Grid-interactive capability",
    },
    {
      icon: Thermometer,
      title: "Wide Temperature Range",
      value: "-4°F to 131°F",
      description: "Operates in extreme conditions",
    },
    {
      icon: Scale,
      title: "Weight",
      value: "290 lbs",
      description: "Compact and manageable",
    },
    {
      icon: Ruler,
      title: "Dimensions",
      value: '45" × 18.5" × 10.45"',
      description: "Space-efficient design",
    },
    {
      icon: Shield,
      title: "Certification",
      value: "UL & EMI",
      description: "Meets North American standards",
    },
  ]

  return (
    <section className="py-20 bg-muted/30 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Sanctuary Battery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Scalable lithium iron phosphate battery system with integrated inverter for whole-home backup power
          </p>
          <div className="w-24 h-1 bg-accent mx-auto mt-6" />
        </div>

        {/* Expansion Options */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">Expansion Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expansionOptions.map((option, idx) => (
              <div
                key={idx}
                className="bg-card p-6 rounded-lg border-2 border-border hover:border-accent transition-all hover:shadow-lg"
              >
                <h4 className="text-xl font-bold text-foreground mb-2">{option.name}</h4>
                <p className="text-3xl font-bold text-accent mb-2">{option.capacity}</p>
                <p className="text-2xl font-semibold text-primary mb-3">{option.price}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="bg-card p-6 rounded-lg border border-border hover:border-accent/50 transition-all"
                >
                  <Icon className="text-accent mb-4" size={32} />
                  <h4 className="text-lg font-bold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-2xl font-semibold text-primary mb-2">{feature.value}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detailed Specs Table */}
        <div className="bg-card rounded-lg p-8 border border-border">
          <h3 className="text-2xl font-bold mb-6 text-foreground">Complete Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Battery Specs */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-accent">Battery</h4>
              <dl className="space-y-3">
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Type</dt>
                  <dd className="font-semibold text-foreground">Lithium Iron Phosphate</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Capacity</dt>
                  <dd className="font-semibold text-foreground">14.3 kWh</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Voltage Range</dt>
                  <dd className="font-semibold text-foreground">40 - 58.4 VDC</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Rated Voltage</dt>
                  <dd className="font-semibold text-foreground">51.2 VDC</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Operating Temp</dt>
                  <dd className="font-semibold text-foreground">-4°F to 131°F</dd>
                </div>
              </dl>
            </div>

            {/* Inverter Specs */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-accent">Inverter</h4>
              <dl className="space-y-3">
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Continuous Power</dt>
                  <dd className="font-semibold text-foreground">18 kW</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Peak Power</dt>
                  <dd className="font-semibold text-foreground">13.2 kW</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Max Efficiency</dt>
                  <dd className="font-semibold text-foreground">96.5%</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Output Voltage</dt>
                  <dd className="font-semibold text-foreground">120/240V Split-Phase</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted-foreground">Grid Frequency</dt>
                  <dd className="font-semibold text-foreground">60 Hz</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

