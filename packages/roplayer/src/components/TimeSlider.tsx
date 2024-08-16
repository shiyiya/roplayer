import { usePlayerStore } from '../atoms/player'
import { useProgressStore } from '../atoms/progress'
import { Slider } from '../components/ui/Slider'

export const TimeSlider = () => {
  const seek = usePlayerStore((s) => s.seek)

  const {
    progress: { time = 0, duration = 0, draggingTime },
    setDraggingTime,
  } = useProgressStore()

  return (
    <Slider
      max={duration}
      step={1}
      value={[draggingTime == -1 ? time : draggingTime]}
      onPointerDown={() => setDraggingTime(time)}
      onValueChange={(value) => setDraggingTime(value[0])}
      onValueCommit={(value) => {
        seek(value[0])
      }}
    />
  )
}
