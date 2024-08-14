import {
  Center,
  Controller,
  PlayButton,
  Player,
  Poster,
  Spinner,
  TimeSlider,
  Video,
} from '../../../packages/roplayer/src'
import { createRoot } from 'react-dom/client'

const App = () => {
  return (
    <div className="w-full h-full">
      <Player>
        <Video
          src={
            `https://sf16-sg.larksuitecdn.com/obj/tos-alisg-v-0051c001-sg/ooJsZoBhUNY7A01quEvAqhqaUoHWEA3iziZ1b`
            //'https://media.w3.org/2010/05/sintel/trailer.mp4'
          }
        />
        <Poster src="https://files.vidstack.io/sprite-fight/poster.webp" />

        <Center>
          <PlayButton />
        </Center>
        <Spinner />
        <Controller>
          <TimeSlider />
        </Controller>
      </Player>
    </div>
  )
}

createRoot(document.getElementById('app')!).render(<App />)
