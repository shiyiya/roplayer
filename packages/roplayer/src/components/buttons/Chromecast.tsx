import { Button } from '../ui/Button'
import { useCastStore } from '../../atoms/cast'

export const Chromecast = () => {
  const isAvailable = useCastStore((s) => s.isAvailable)

  if (!isAvailable) return null

  return (
    <Button>
      {/* @ts-ignore */}
      <google-cast-launcher />
    </Button>
  )
}
