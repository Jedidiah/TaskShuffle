import qs from 'query-string'
import { LiteYoutubeEmbed } from 'react-lite-yt-embed'

function extractYoutubeIdFromUrl(url = '') {
  if (url.startsWith('https://www.youtube.com/watch?')) {
    const queryString = qs.parse(url.split('?')[1])
    console.log({ url, queryString })

    return queryString.v ? String(queryString.v) : undefined
  }

  if (url.startsWith('https://youtu.be/')) {
    return url.replace('https://youtu.be/', '').split('?')[0]
  }

  return undefined
}

function YoutubeEmbed({ url }: { url: string }) {
  const id = extractYoutubeIdFromUrl(url)
  const { t = undefined } = qs.parse(url.split('?')[1]) ?? {}
  return id ? (
    <div style={{ height: '70vh', maxWidth: '90vw', aspectRatio: '16 / 9' }}>
      <LiteYoutubeEmbed
        id={id}
        noCookie
        lazyImage
        params={{ t: String(t) }}
        mute={false}
      ></LiteYoutubeEmbed>
    </div>
  ) : null
}

export default YoutubeEmbed
