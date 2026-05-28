import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '../../lib/sanity/image'
import type { TocHeading } from './TableOfContents'

export function extractHeadings(content: any[]): TocHeading[] {
  if (!content?.length) return []
  return content
    .filter((b) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
    .map((b) => ({
      id: b._key as string,
      text: (b.children as any[] ?? []).map((c: any) => c.text ?? '').join(''),
      level: (b.style === 'h2' ? 2 : 3) as 2 | 3,
    }))
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlFor(value).width(900).url()
      return (
        <figure className="my-8">
          <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '16/9' }}>
            <Image
              src={imageUrl}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 900px"
            />
          </div>
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">{value.alt}</figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ value, children }: any) => (
      <h2 id={value._key} className="font-poppins text-2xl font-bold text-holiday-navy mt-10 mb-4 scroll-mt-24">
        {children}
      </h2>
    ),
    h3: ({ value, children }: any) => (
      <h3 id={value._key} className="font-poppins text-xl font-semibold text-holiday-navy mt-8 mb-3 scroll-mt-24">
        {children}
      </h3>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target={value.href?.startsWith('http') ? '_blank' : undefined}
        rel={value.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-holiday-teal underline hover:text-holiday-teal/80"
      >
        {children}
      </a>
    ),
  },
}

export default function ArticleBody({ content }: { content: any[] }) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-poppins prose-headings:text-holiday-navy prose-a:text-holiday-teal">
      <PortableText value={content} components={portableTextComponents} />
    </div>
  )
}
