import { usePlayerStore } from '../atoms/player'

export function Poster(props: { src: string }) {
  const { src } = props
  const { hasPlayedOnce } = usePlayerStore()

  if (hasPlayedOnce || !src) return

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-center bg-no-repeat bg-contain"
      style={{
        backgroundImage: `url(${src})`,
      }}
    />
  )
}
