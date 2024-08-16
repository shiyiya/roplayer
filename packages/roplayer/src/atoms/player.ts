import { create } from 'zustand'
import { exitFullscreen, requestFullscreenIfSupport } from '../helper/fullscreen'
import { useProgressStore } from './progress'

type PlayerStore = {
  isPlaying: boolean
  isPaused: boolean
  isLoading: boolean // buffering or not
  hasPlayedOnce: boolean // has the video played at all?
  volume: number
  playbackRate: number
  addPlayerEventListener: (element: HTMLDivElement) => void
  addVideoEventListener: (videoElement: HTMLVideoElement) => void
  play: () => void
  pause: () => void
  showControls: boolean
  seekTo: (time: number) => void
  togglePlay: () => void
  isFullScreen: boolean
  toggleFullScreen: () => void
  $videoPlayer: HTMLDivElement | null
  $videoElement: HTMLVideoElement | null
}

export const usePlayerStore = create<PlayerStore>()((set, get) => ({
  $videoElement: null,
  $videoPlayer: null,
  isPlaying: false,
  isPaused: true,
  isLoading: false,
  hasPlayedOnce: false,
  showControls: true,
  volume: 1,
  playbackRate: 1,
  isFullScreen: false,
  toggleFullScreen: () => {
    if (get().isFullScreen) {
      exitFullscreen()
    } else {
      requestFullscreenIfSupport(get().$videoPlayer!, get().$videoElement!)
    }

    set((state) => ({
      isFullScreen: !state.isFullScreen,
    }))
  },
  addPlayerEventListener: ($root) => {
    let timer: any
    set((state) => ({
      $videoPlayer: $root,
    }))
    $root.addEventListener('mouseenter', () => {
      if (get().isPlaying) {
        clearTimeout(timer)
        set((state) => ({
          showControls: true,
        }))
      }
    })
    $root.addEventListener('mouseleave', () => {
      if (get().isPlaying) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          set((state) => ({
            showControls: false,
          }))
        }, 2000)
      }
    })
  },
  addVideoEventListener($video: HTMLVideoElement) {
    set((state) => ({
      $videoElement: $video,
    }))

    useProgressStore.getState().addEventListener($video)

    //ended
    $video.addEventListener('ended', () => {
      set((state) => ({
        isPlaying: false,
        isPaused: true,
        showControls: true,
      }))
    })

    $video.addEventListener('play', () => {
      set((state) => ({
        isPlaying: true,
        isPaused: false,
        hasPlayedOnce: true,
      }))
    })
    $video.addEventListener('pause', () => {
      set((state) => ({
        isPlaying: false,
        isPaused: true,
      }))
    })
    $video.addEventListener('waiting', () => {
      set((state) => ({
        isLoading: true,
      }))
    })
    $video.addEventListener('playing', () => {
      set((state) => ({
        isLoading: false,
      }))
    })

    $video.addEventListener('volumechange', () => {
      set((state) => ({
        volume: $video.volume,
      }))
    })
    $video.addEventListener('ratechange', () => {
      set((state) => ({
        playbackRate: $video.playbackRate,
      }))
    })

    //fullscreen
    $video.addEventListener('fullscreenchange', () => {
      set((state) => ({
        isFullScreen: document.fullscreenElement !== null,
      }))
    })
  },
  togglePlay() {
    if (get().isPlaying) {
      get().pause()
    } else {
      get().play()
    }
  },
  play() {
    get().$videoElement?.play()
    set((state) => ({
      isPlaying: true,
    }))
  },
  pause() {
    get().$videoElement?.pause()
    set((state) => ({
      isPlaying: false,
    }))
  },

  seekTo(time: number) {
    get().$videoElement!.currentTime = time
    useProgressStore.setState((state) => {
      state.progress.draggingTime = -1
      state.progress.time = time
      return state
    })
  },
}))
