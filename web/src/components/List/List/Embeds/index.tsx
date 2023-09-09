import ImageEmbed from './ImageEmbed'
import YoutubeEmbed from './YouTubeEmbed'

function Embed({ url }: { url: string }) {
  const location = url.split('?')[0]
  if (
    location.endsWith('.jpg') ||
    location.endsWith('.png') ||
    location.endsWith('.gif') ||
    location.endsWith('.apng') ||
    location.endsWith('.avif') ||
    location.endsWith('.jpeg') ||
    location.endsWith('.svg') ||
    location.endsWith('.webp')
  ) {
    return <ImageEmbed url={url} />
  }

  if (
    url.startsWith('https://www.youtube.com/watch?') ||
    url.startsWith('https://youtu.be/')
  ) {
    return <YoutubeEmbed url={url} />
  }

  if (url.startsWith('https://') || url.startsWith('http://')) {
    return <a href={url}>Open Link</a>
  }

  return null
}

export default Embed
