import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  const hero = {
    title: "Smart Fire Protection — VICON Takes the Lead",
    subtitle:
      "AI-powered wildfire sprinkler system with precision targeting and instant response — protecting your home before flames can spread.",
    cta: "Protect Your Home for $200/month",
    ctaLink: "/contact",
    image: "/optimized/viconbanner-1920.webp",
  }

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          priority
          quality={68}
          sizes="(max-width: 768px) 100vw, (max-width: 1536px) 95vw, 1536px"
          loading="eager"
          className="object-cover"
        />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-transparent" />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
          {hero.title}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          {hero.subtitle}
        </p>
        <Link href={hero.ctaLink} className="group bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(227,30,36,0.4)] hover:shadow-[0_0_40px_rgba(227,30,36,0.7)] inline-block">
          <span className="inline-block group-hover:translate-x-1 transition-transform">
            {hero.cta}
          </span>
        </Link>
      </div>
    </div>
  )
}
