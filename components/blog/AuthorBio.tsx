import Image from 'next/image'
import { urlFor } from '../../lib/sanity/image'

type Author = { name: string; bio?: string; photo?: any }

export default function AuthorBio({ author }: { author: Author }) {
  const photoUrl = author.photo?.asset
    ? urlFor(author.photo).width(80).height(80).url()
    : null

  return (
    <div className="mt-12 flex gap-4 rounded-xl bg-holiday-cream p-6">
      {photoUrl && (
        <Image
          src={photoUrl}
          alt={author.name}
          width={64}
          height={64}
          className="rounded-full object-cover shrink-0"
        />
      )}
      <div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Written by</p>
        <p className="font-poppins text-lg font-semibold text-holiday-navy">{author.name}</p>
        {author.bio && <p className="mt-1 text-sm text-gray-600">{author.bio}</p>}
      </div>
    </div>
  )
}
