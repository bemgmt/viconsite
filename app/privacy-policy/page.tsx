import type { Metadata } from "next"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Vicon Technology, Inc.",
  description:
    "Learn how Vicon Technology, Inc. collects, uses, secures, and protects your personal information.",
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy | VICON Technologies',
    description: 'Learn how Vicon Technology, Inc. collects, uses, secures, and protects your personal information.',
    url: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16 px-4 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">Vicon Technology, Inc.</p>
          <p className="text-muted-foreground mt-2 mb-10">Effective Date: [2/17/2026]</p>

          <div className="space-y-10 text-foreground leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">1. Introduction</h2>
              <p>
                Vicon Technology, Inc. ("Vicon," "we," "our," or "us") is committed to protecting your privacy.
              </p>
              <p>
                We build intelligent safety and energy systems designed to protect people, property, and
                communities. That same philosophy of protection extends to your personal information.
              </p>
              <p>We do not sell, rent, trade, or exploit your data.</p>
              <p>
                This Privacy Policy explains what information we collect, how we use it, and the rights you have
                regarding your information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">2. Information We Collect</h2>
              <p>
                We collect only the information necessary to operate our business responsibly and deliver our
                services effectively.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">A. Information You Provide Directly</h3>
                <p>This may include:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Company name</li>
                  <li>Property address</li>
                  <li>Project details</li>
                  <li>Dealer or distributor application information</li>
                </ul>
                <p>This information is typically collected when you:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Submit a contact form</li>
                  <li>Request a quote</li>
                  <li>Apply to become a dealer</li>
                  <li>Schedule a consultation</li>
                  <li>Sign a contract</li>
                  <li>Subscribe to updates</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">B. Technical &amp; Usage Information</h3>
                <p>When you visit our website, we may collect:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Pages visited</li>
                  <li>Time spent on site</li>
                  <li>Referral source</li>
                </ul>
                <p>This data helps us:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Improve website performance</li>
                  <li>Understand general traffic patterns</li>
                  <li>Protect against fraud or misuse</li>
                </ul>
                <p>We do not use this information to profile or exploit users.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">C. System &amp; Product Data (If Applicable)</h3>
                <p>If you install a Vicon system, limited operational data may be collected to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Monitor system performance</li>
                  <li>Ensure proper functioning</li>
                  <li>Provide remote diagnostics</li>
                  <li>Improve safety optimization</li>
                </ul>
                <p>This data is used strictly for:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Safety</li>
                  <li>System integrity</li>
                  <li>Engineering performance</li>
                </ul>
                <p>It is not used for advertising or resale.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Respond to inquiries</li>
                <li>Provide quotes and proposals</li>
                <li>Deliver and support products</li>
                <li>Process contracts and payments</li>
                <li>Improve product performance</li>
                <li>Ensure regulatory compliance</li>
                <li>Communicate service updates</li>
                <li>Enhance system safety and reliability</li>
              </ul>
              <p>We do not use your data for unrelated commercial exploitation.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">4. No Sale of Personal Information</h2>
              <p>Vicon does not:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Sell personal data</li>
                <li>Share personal data for third-party marketing</li>
                <li>Trade data with advertisers</li>
                <li>Monetize customer information</li>
              </ul>
              <p>
                Your information is used solely to support your interaction with Vicon and to provide safety and
                energy services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">5. Data Sharing</h2>
              <p>We may share information only with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Authorized dealers (if you request local installation)</li>
                <li>Engineering partners involved in your project</li>
                <li>Licensed contractors performing installations</li>
                <li>Payment processors</li>
                <li>Legal or regulatory authorities (when required by law)</li>
              </ul>
              <p>All partners are required to maintain confidentiality and security standards.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">6. Data Security</h2>
              <p>
                We implement reasonable administrative, technical, and physical safeguards to protect your
                information, including:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Encrypted communications where applicable</li>
                <li>Access controls</li>
                <li>Limited data access to authorized personnel</li>
                <li>Secure hosting infrastructure</li>
              </ul>
              <p>No internet transmission is 100% secure, but we take appropriate measures to reduce risk.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">7. Data Retention</h2>
              <p>We retain personal information only as long as necessary to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Fulfill contractual obligations</li>
                <li>Provide support and service</li>
                <li>Comply with legal requirements</li>
                <li>Maintain safety records</li>
              </ul>
              <p>When no longer required, data is securely deleted or anonymized.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">8. Your Privacy Rights (California Residents)</h2>
              <p>If you are a California resident, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Request access to your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Request information about how your data is used</li>
              </ul>
              <p>To exercise your rights, contact:</p>
              <p>
                info@vicontech.group
                <br />
                22515 Aspan Street, Suite F-G, Lake Forest, CA 92630
              </p>
              <p>We will respond within legally required timeframes.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">9. Cookies</h2>
              <p>We may use cookies or similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Improve website functionality</li>
                <li>Measure performance</li>
                <li>Analyze traffic patterns</li>
              </ul>
              <p>You may disable cookies in your browser settings.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">10. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy
                practices of external sites.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">11. Children's Privacy</h2>
              <p>
                Our services are not directed toward individuals under 18 years of age. We do not knowingly collect
                personal information from minors.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">12. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically to reflect operational or regulatory changes.
              </p>
              <p>The updated version will be posted on this page with a revised effective date.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">13. Contact Us</h2>
              <p>If you have questions about this Privacy Policy or your information, please contact:</p>
              <p>
                Vicon Technology, Inc.
                <br />
                Email: info@vicontech.group
              </p>
              <p>
                Website:{" "}
                <a className="text-primary underline underline-offset-4" href="https://www.vicontech.group">
                  www.vicontech.group
                </a>
              </p>
              <p>Vicon was built on proactive protection.</p>
              <p>
                That principle applies not only to fire and energy systems, but to your information as well.
              </p>
              <p>We believe safety includes privacy.</p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
