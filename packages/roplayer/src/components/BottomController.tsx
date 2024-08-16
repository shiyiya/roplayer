import { usePlayerStore } from '../atoms/player'

interface ControllerProps {
  children?: React.ReactNode
}

export const Controller = (props: ControllerProps) => {
  const showControls = usePlayerStore((s) => s.showControls)

  return (
    showControls && (
      <div className="w-full text-white">
        <div className="pointer-events-none flex justify-end pt-32 bg-gradient-to-t from-black to-transparent transition-opacity duration-200 absolute bottom-0 w-full"></div>
        <div className="pointer-events-auto z-10 pl-[calc(2rem+env(safe-area-inset-left))] pr-[calc(2rem+env(safe-area-inset-right))] pb-3 mb-[env(safe-area-inset-bottom)] absolute bottom-0 w-full">
          {props.children}
        </div>
      </div>
    )
  )
}
