import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import BatterySpecs from "@/components/battery-specs"

export const metadata = {
  title: "Sanctuary Battery System - VICON",
  description: "Scalable 16kWh lithium iron phosphate battery system with integrated 12kW inverter for whole-home backup power",
}

export default function BatteryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                Sanctuary Battery System
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Keep your fire protection system and essential home equipment operational during power outages with our scalable, high-capacity battery backup solution.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Starting Capacity</p>
                  <p className="text-3xl font-bold text-accent">16 kWh</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Inverter Power</p>
                  <p className="text-3xl font-bold text-accent">12 kW</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Starting Price</p>
                  <p className="text-3xl font-bold text-primary">$12,800</p>
                </div>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg">
                Schedule Free Consultation
              </button>
            </div>
            <div className="relative">
              <img
                src="/batteryblack1.jpg"
                alt="Sanctuary Battery System"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose Sanctuary Battery?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">🔋</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Scalable Design</h3>
              <p className="text-muted-foreground">
                Start with 16 kWh and expand up to 60 kWh as your needs grow. Add capacity anytime without replacing your existing system.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Integrated Inverter</h3>
              <p className="text-muted-foreground">
                Built-in 12 kW grid-interactive inverter with 96.5% efficiency. Seamlessly switches between grid and battery power.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">LiFePO4 Technology</h3>
              <p className="text-muted-foreground">
                Lithium Iron Phosphate batteries offer superior safety, longer lifespan, and better performance than traditional lithium-ion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BatterySpecs />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Power Your Protection?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get a custom quote for your Sanctuary Battery System installation. Our experts will help you determine the perfect capacity for your needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105">
              Get a Quote
            </button>
            <button className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105">
              Download Spec Sheet
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

