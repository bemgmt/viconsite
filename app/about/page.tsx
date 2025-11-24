import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Shield, Zap, Users, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">About VICON</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Pioneering AI-powered fire protection systems to safeguard homes and communities across Southern California
          </p>
        </div>
      </section>

      {/* Main Content - This section will be updated with text from aboutvicon.jpg */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <img
              src="/aboutvicon.jpg"
              alt="About VICON"
              className="w-full h-auto rounded-lg shadow-lg mb-8"
            />
            
            {/* Placeholder content - to be replaced with actual text from the image */}
            <div className="space-y-6 text-foreground">
              <p className="text-lg leading-relaxed">
                VICON Technologies is at the forefront of intelligent fire protection systems, combining cutting-edge
                artificial intelligence with proven fire suppression technology to create the most advanced home
                protection solution available today.
              </p>

              <p className="text-lg leading-relaxed">
                Founded with a mission to protect lives and property from the devastating effects of wildfires,
                VICON has developed a comprehensive ecosystem of smart sensors, precision water delivery systems,
                and AI-powered monitoring that works 24/7 to keep your home safe.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                To provide every homeowner in wildfire-prone areas with affordable, intelligent fire protection
                that responds faster than traditional systems and adapts to evolving threats.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Why VICON?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Shield className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Advanced Protection</h3>
                    <p className="text-muted-foreground">
                      AI-powered detection and response systems that identify threats before they become disasters
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Zap className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Rapid Response</h3>
                    <p className="text-muted-foreground">
                      Automated systems that activate in seconds, not minutes, when fire is detected
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Community Focus</h3>
                    <p className="text-muted-foreground">
                      Working with local communities to create comprehensive fire protection networks
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Award className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Proven Technology</h3>
                    <p className="text-muted-foreground">
                      Built on decades of fire suppression expertise enhanced with modern AI capabilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">Ready to Protect Your Home?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of homeowners who trust VICON to keep their families safe
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg">
              Schedule Free Consultation
            </Link>
            <Link href="/products" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg">
              View Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

