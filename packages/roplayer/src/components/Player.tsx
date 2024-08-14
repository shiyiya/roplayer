import { useEffect, useRef } from 'react'
import { Video } from './Video'
import { usePlayerStore } from '../atoms/player'

interface PlayerProps {
  children?: React.ReactNode
  className?: string
}

export function Player(props: PlayerProps) {
  const divEl = useRef<HTMLDivElement>(null)
  const { addPlayerEventListener } = usePlayerStore()

  useEffect(() => {
    if (divEl.current) {
      addPlayerEventListener(divEl.current)
    }
  }, [])

  return (
    <div className="relative overflow-hidden" ref={divEl}>
      {props.children}
    </div>
  )
}
