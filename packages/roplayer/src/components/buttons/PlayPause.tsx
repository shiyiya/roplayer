import { usePlayerStore } from '../../atoms/player'
import { Center } from '../Center'

export function PlayPause() {
  const { isPlaying, play, showControls, pause, isLoading } = usePlayerStore()
  if (!showControls || isLoading) return
  return (
    <Center>
      <button onClick={!isPlaying ? play : pause} type="button" className="text-gray-500 text-lg p-2 rounded bg-white">
        {isPlaying ? 'pause' : 'play'}
      </button>
    </Center>
  )
}
