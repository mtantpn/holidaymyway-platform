import SearchWidget from './SearchWidget'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-holiday-navy via-[#0f5a6e] to-holiday-teal py-20 sm:py-28 text-white">
      {/* Subtle dot-grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-holiday-gold animate-pulse" />
          UK-Based Travel Guides — Updated 2026
        </div>

        <h1 className="font-poppins text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Your Holiday,{' '}
          <span className="relative">
            <span className="text-holiday-gold">Your Way</span>
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80 sm:text-xl">
          Expert guides + best prices on flights, hotels, and experiences — built for UK travellers on every budget.
        </p>

        {/* Trust badges — genuine only */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {[
            '✓ UK-Based Guides',
            '✓ Prices in GBP',
            '✓ No Hidden Fees',
            '✓ Real Traveller Tips',
          ].map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-2xl px-4 sm:px-6">
        <SearchWidget />
      </div>
    </section>
  )
}
