import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../../lib/sanity/image'

type AuthorBioProps = {
  name: string
  slug?: string
  bio?: string
  photo?: any
}

export default function AuthorBio({ name, slug, bio, photo }: AuthorBioProps) {
  const photoUrl = photo?.asset
    ? urlFor(photo).width(80).height(80).url()
    : null

  const nameEl = slug ? (
    <Link
      href={`/blog/author/${slug}`}
      className="font-poppins text-lg font-semibold text-holiday-navy hover:text-holiday-teal transition-colors"
    >
      {name}
    </Link>
  ) : (
    <p className="font-poppins text-lg font-semibold text-holiday-navy">{name}</p>
  )

  return (
    <div className="mt-12 flex gap-4 rounded-xl bg-holiday-cream p-6">
      {photoUrl && (
        <Image
          src={photoUrl}
          alt={name}
          width={64}
          height={64}
          className="rounded-full object-cover shrink-0"
        />
      )}
      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Written by</p>
        {nameEl}
        {bio && <p className="mt-1 text-sm text-gray-600">{bio}</p>}
        {slug && (
          <Link
            href={`/blog/author/${slug}`}
            className="mt-2 inline-block text-sm text-holiday-teal hover:underline"
          >
            More articles by {name} →
          </Link>
        )}
      </div>
    </div>
  )
}
