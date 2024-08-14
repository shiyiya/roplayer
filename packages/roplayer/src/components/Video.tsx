import { ReactNode, useEffect, useMemo, useRef } from 'react'
import { usePlayerStore } from '../atoms/player'

interface VideoProps {
  src?: string
  controls?: boolean
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onError?: () => void
  onTimeUpdate?: () => void
  onLoadedMetadata?: () => void
  onLoadedData?: () => void
  onCanPlay?: () => void
  onCanPlayThrough?: () => void
  onSeeking?: () => void
  onSeeked?: () => void
  onDurationChange?: () => void
  onRateChange?: () => void
  onVolumeChange?: () => void
  onSuspend?: () => void
  onAbort?: () => void
  onEmptied?: () => void
  onStalled?: () => void
  onPlayThrough?: () => void
  onWaiting?: () => void
  onPlaying?: () => void
  onProgress?: () => void

  className?: string
  children?: ReactNode
}

export function Video(props: VideoProps) {
  const { addVideoEventListener } = usePlayerStore()
  const videoEl = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoEl.current) {
      addVideoEventListener(videoEl.current)
    }
  }, [])

  if (!props.src) {
    return null
  }

  return (
    <video ref={videoEl} {...props} className="w-full h-full">
      {props.children}
    </video>
  )
}
