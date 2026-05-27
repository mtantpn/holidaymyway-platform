function toEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`

  const ttMatch = url.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/)
  if (ttMatch) return `https://www.tiktok.com/embed/v2/${ttMatch[1]}`

  return null
}

export default function ArticleVideo({ url }: { url: string }) {
  const embedUrl = toEmbedUrl(url)
  if (!embedUrl) return null

  const isTikTok = embedUrl.includes('tiktok')

  return (
    <div className={`my-8 overflow-hidden rounded-xl ${isTikTok ? 'max-w-sm mx-auto' : 'w-full'}`}>
      <div className={`relative ${isTikTok ? 'pb-[177%]' : 'pb-[56.25%]'} h-0`}>
        <iframe
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title="Video"
        />
      </div>
    </div>
  )
}
