import { Button } from '../ui/Button'
import { useCastStore } from '../../atoms/cast'

export const Chromecast = () => {
  const isAvailable = useCastStore((s) => s.isAvailable)

  if (!isAvailable) return null

  return (
    <Button
      onClick={({ currentTarget }) => {
        const castButton = currentTarget.querySelector<HTMLDivElement>('google-cast-launcher')
        if (castButton) castButton.click()
      }}
    >
      <google-cast-launcher />
    </Button>
  )
}
