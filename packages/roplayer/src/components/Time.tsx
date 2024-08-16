import { useProgressStore } from '../atoms/progress'
import { formatTime } from '../helper/time'
import { Button } from './ui/Button'

export function Time() {
  const { time, duration, draggingTime } = useProgressStore((s) => s.progress)
  return (
    <Button>
      {formatTime(draggingTime > 0 ? draggingTime : time)} / {formatTime(duration)}
    </Button>
  )
}
