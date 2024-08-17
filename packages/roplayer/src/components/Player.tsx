import { useEffect, useRef } from 'react'
import { Video } from './Video'
import { usePlayerStore } from '../atoms/player'
import { VideoClickTarget } from './VideoClickTarget'
import { Fullscreen } from './buttons/Fullscreen'
import { Time } from './Time'
import { Spinner } from './Spinner'
import { Controller } from './BottomController'
import { PlayButton } from './buttons/PlayButton'
import { Poster } from './Poster'
import { TimeSlider } from './TimeSlider'
import { Chromecast } from './buttons/Chromecast'

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
    <div className="relative overflow-hidden w-full h-full select-none bg-black" ref={divEl}>
      <Video
        playsInline
        src={
          `https://sf16-sg.larksuitecdn.com/obj/tos-alisg-v-0051c001-sg/ooJsZoBhUNY7A01quEvAqhqaUoHWEA3iziZ1b`
          //'https://media.w3.org/2010/05/sintel/trailer.mp4'
        }
      />
      <Poster src="https://files.vidstack.io/sprite-fight/poster.webp" />

      <VideoClickTarget />
      <Spinner />

      <Controller>
        <TimeSlider />
        <div className="hidden lg:flex justify-between">
          <div className="flex space-x-3 items-center">
            <PlayButton />
            <Time />
          </div>
          <div className="flex items-center space-x-3">
            <Fullscreen />
            <Chromecast />
          </div>
        </div>
      </Controller>
    </div>
  )
}
