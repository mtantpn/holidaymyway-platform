const steps = [
  {
    icon: '🔍',
    number: '01',
    title: 'Search a Destination',
    description: 'Tell us where you want to go — or browse our destination guides for inspiration from £200.',
  },
  {
    icon: '📖',
    number: '02',
    title: 'Read Expert Guides',
    description: 'Get real tips on flights, hotels, costs, and things to do from UK travellers who\'ve been there.',
  },
  {
    icon: '✈️',
    number: '03',
    title: 'Book with Confidence',
    description: 'Use our curated links to find the best prices across top booking sites — flights, hotels, activities.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-holiday-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-poppins text-3xl font-bold text-holiday-navy sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-gray-500">From inspiration to booking in three easy steps</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line between steps */}
              {i < steps.length - 1 && (
                <div className="absolute top-10 left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] hidden h-0.5 bg-holiday-teal/20 sm:block" />
              )}
              <div className="mx-auto mb-5 flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-gray-100">
                <span className="text-3xl">{step.icon}</span>
                <span className="text-[10px] font-bold text-holiday-teal">{step.number}</span>
              </div>
              <h3 className="mb-2 font-poppins text-xl font-semibold text-holiday-navy">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
