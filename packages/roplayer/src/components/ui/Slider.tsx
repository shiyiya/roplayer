import * as _Slider from '@radix-ui/react-slider'

export interface TimeSliderProps {
  max: number
  step: number
  value: number[]
  onChange: (value: number) => void
  onCommit: (value: number) => void
  onPointerDown: () => void
}

export const Slider = (
  props: Pick<_Slider.SliderProps, 'max' | 'step' | 'value' | 'onValueCommit' | 'onPointerDown' | 'onValueChange'>
) => {
  return (
    <_Slider.Root
      // orientation="vertical"
      className="relative flex items-center select-none touch-none w-full h-[32px]"
      {...props}
    >
      <_Slider.Track className="bg-blackA7 relative grow rounded-full h-[5px] bg-[#7f8d9b40] ">
        <_Slider.Range className="absolute bg-white rounded-full h-full" />
      </_Slider.Track>
      <_Slider.Thumb
        className="block w-4 h-4 bg-white shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-blackA5"
        aria-label="Volume"
      />
    </_Slider.Root>
  )
}
