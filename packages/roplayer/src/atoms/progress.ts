import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { parseTimeRanges } from '../helper/time'

export interface ProgressState {
  progress: {
    time: number
    duration: number
    buffered: { start: number; end: number }[]
    draggingTime: number
  }
  setDraggingTime(time: number): void
  addEventListener(videoElement: HTMLVideoElement): void
}

export const useProgressStore = create<ProgressState>()(
  immer<ProgressState>((set, get) => ({
    progress: {
      time: 0,
      duration: 0,
      buffered: [],
      draggingTime: -1,
    },
    setDraggingTime(time: number) {
      set((s) => {
        s.progress.draggingTime = time
      })
    },
    addEventListener($video: HTMLVideoElement) {
      $video.addEventListener('durationchange', () => {
        set((state) => {
          state.progress.duration = $video.duration
        })
      })
      $video.addEventListener('timeupdate', () => {
        set((state) => {
          state.progress.time = $video.currentTime
        })
      })
      $video.addEventListener('progress', () => {
        set((state) => {
          state.progress.buffered = parseTimeRanges($video.buffered)
        })
      })
    },
  })) as any
)
