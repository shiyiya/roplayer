import { Spinner as _Spinner } from '@radix-ui/themes'
import { usePlayerStore } from '../atoms/player'

export const Spinner = () => {
  const { isLoading } = usePlayerStore()

  if (!isLoading) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none [&amp;>*]:pointer-events-auto">
      <div className="spinner text-4xl"></div>
    </div>
  )
}
