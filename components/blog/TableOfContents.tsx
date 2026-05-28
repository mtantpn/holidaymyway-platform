'use client'

import { useEffect, useRef, useState } from 'react'

export interface TocHeading {
  id: string
  text: string
  level: 2 | 3
}

interface Props {
  headings: TocHeading[]
}

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>('')
  const [open, setOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!headings.length) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  return (
    <nav
      aria-label="Table of contents"
      className="my-8 rounded-xl border border-gray-200 bg-white overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-poppins font-semibold text-holiday-navy text-sm">
          Jump to section
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ol className="px-5 pb-4 space-y-1 border-t border-gray-100">
          {headings.map((h, i) => (
            <li
              key={h.id}
              className={h.level === 3 ? 'pl-4' : ''}
            >
              <a
                href={`#${h.id}`}
                onClick={() => setOpen(false)}
                className={`flex items-start gap-2 py-1 text-sm transition-colors rounded ${
                  activeId === h.id
                    ? 'text-holiday-teal font-medium'
                    : 'text-gray-600 hover:text-holiday-navy'
                }`}
              >
                <span className="shrink-0 text-gray-400 text-xs mt-0.5 w-4 text-right">
                  {h.level === 2 ? i + 1 + '.' : ''}
                </span>
                <span className="leading-snug">{h.text}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  )
}
