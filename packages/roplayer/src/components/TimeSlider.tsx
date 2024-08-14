import { useEffect, useState } from 'react'
import { usePlayerStore } from '../atoms/player'
import * as Slider from '@radix-ui/react-slider'

export const TimeSlider = () => {
  const playerValue = usePlayerStore()

  const { currentTime = 0, duration = 0, isDragSeeking } = playerValue
  const [controlledCurrentTime, setControlledCurrentTime] = useState(currentTime)
  useEffect(() => {
    if (isDragSeeking) return
    setControlledCurrentTime(currentTime)
  }, [currentTime, isDragSeeking])

  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none w-full h-[32px]"
      max={duration}
      step={1}
      value={[controlledCurrentTime]}
      onPointerDown={() => usePlayerStore.setState({ isDragSeeking: true })}
      onValueChange={(value) => setControlledCurrentTime(value[0])}
      onValueCommit={(value) => {
        playerValue.seekTo(value[0])
        usePlayerStore.setState({ isDragSeeking: false })
      }}
    >
      <Slider.Track className="bg-blackA7 relative grow rounded-full h-[5px] bg-[#7f8d9b40] ">
        <Slider.Range className="absolute bg-white rounded-full h-full" />
      </Slider.Track>
      <Slider.Thumb
        className="block w-4 h-4 bg-white shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-blackA5"
        aria-label="Volume"
      />
    </Slider.Root>
  )
}
