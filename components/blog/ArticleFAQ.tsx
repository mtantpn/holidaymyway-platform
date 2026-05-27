interface FAQ { question: string; answer: string }

export default function ArticleFAQ({ faqs }: { faqs: FAQ[] }) {
  if (!faqs || faqs.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <section className="mt-12 border-t border-gray-100 pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 className="mb-6 font-poppins text-2xl font-bold text-holiday-navy">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-xl border border-gray-200 bg-white open:border-holiday-teal/40"
          >
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-poppins font-semibold text-holiday-navy list-none">
              {faq.question}
              <span className="ml-4 shrink-0 text-holiday-teal transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>
            <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
