export default function Testimonials() {
  const testimonials = [
    {
      quote: "It's peace of mind I didn't know was possible — knowing my family is protected even when I'm not home.",
      author: "Homeowner, Pasadena",
    },
    {
      quote: "Our family lives in Burbank, where wildfire season brings significant concern every year. After installing the VICON Smart Sprinkler Fire Protection System, we truly feel much more at ease. The system has been stable and requires almost no maintenance. When we need to activate it, we simply use the remote control to spray the roofline and yard for cooling and fire-prevention. As the demo home for Burbank, we're glad that more residents can see the system up close and learn how it works. We hope it can benefit many other families as well. This reflects our family's actual experience with the system.",
      author: "Duke Wang, Burbank Demo Home",
    },
  ]

  return (
    <section className="py-20 bg-background px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">What Homeowners Are Saying</h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-primary/5 border border-primary/20 rounded-lg p-8">
              <p className="text-lg italic text-foreground mb-4">"{testimonial.quote}"</p>
              <p className="text-primary font-bold">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
