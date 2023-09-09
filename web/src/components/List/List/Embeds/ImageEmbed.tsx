import { Image } from '@adobe/react-spectrum'

function ImageEmbed({ url }: { url: string }) {
  return <Image src={url} alt="" maxWidth="80vw" maxHeight="60vh" />
}

export default ImageEmbed
