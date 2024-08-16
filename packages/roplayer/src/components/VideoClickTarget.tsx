import classNames from 'classnames'
import { usePlayerStore } from '../atoms/player'

export function VideoClickTarget() {
  const togglePlay = usePlayerStore((s) => s.togglePlay)
  const toggleFullScreen = usePlayerStore((s) => s.toggleFullScreen)

  return <div className={classNames('absolute inset-0')} onDoubleClick={toggleFullScreen} onPointerUp={togglePlay} />
}
