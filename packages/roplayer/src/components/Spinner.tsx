import { Spinner as _Spinner } from '@radix-ui/themes'
import { usePlayerStore } from '../atoms/player'
import { Center } from './Center'

export const Spinner = () => {
  const { isLoading } = usePlayerStore()

  return (
    <Center>
      <_Spinner size="1" loading={isLoading} className="w-9 h-9 absolute inset-0 m-auto text-green-500" />
    </Center>
  )
}
