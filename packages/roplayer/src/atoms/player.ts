import { create } from 'zustand'
import { exitFullscreen, requestFullscreenIfSupport } from '../helper/fullscreen'
import { useProgressStore } from './progress'
import { Source } from '../types/source'

type PlayerStore = {
  $player: HTMLDivElement
  $video: HTMLVideoElement

  // MediaState
  isPlaying: boolean
  isPaused: boolean
  isLoading: boolean
  isFullScreen: boolean
  volume: number
  muted?: boolean
  playbackRate: number

  // PlayerState
  showControls: boolean
  hasPlayedOnce: boolean
  source: Source

  addPlayerEventListener: (element: HTMLDivElement) => void
  addVideoEventListener: (videoElement: HTMLVideoElement) => void

  // Controls
  play: () => void
  pause: () => void
  togglePlay: () => void
  mute: () => void
  unmute: () => void
  setVolume: (val: number) => void
  seek: (time: number) => void
  toggleFullScreen: () => void
}

export const usePlayerStore = create<PlayerStore>()((set, get) => ({
  $player: null as any,
  $video: null as any,
  isPlaying: false,
  isPaused: true,
  isLoading: false,
  hasPlayedOnce: false,
  showControls: true,
  volume: 1,
  playbackRate: 1,
  isFullScreen: false,
  source: {
    type: 'hls',
    url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  },
  toggleFullScreen: () => {
    if (get().isFullScreen) {
      exitFullscreen()
    } else {
      requestFullscreenIfSupport(get().$player, get().$video!)
    }

    set((state) => ({
      isFullScreen: !state.isFullScreen,
    }))
  },
  addPlayerEventListener: ($root) => {
    let timer: any
    set((state) => ({
      $player: $root,
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
      $video: $video,
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
    get().$video.play()
    set((state) => ({
      isPlaying: true,
    }))
  },
  pause() {
    get().$video.pause()
    set((state) => ({
      isPlaying: false,
    }))
  },
  seek(val: number) {
    const time = Math.min(useProgressStore.getState().progress.duration, Math.max(0, val))
    get().$video.currentTime = time
    useProgressStore.setState((state) => {
      state.progress.draggingTime = -1
      state.progress.time = time
      return state
    })
  },
  mute: () => {
    get().$video.muted = true
    set((s) => ({ muted: true }))
  },
  unmute: () => {
    get().$video.muted = false
    set((s) => ({ muted: false }))
  },
  setVolume: (val: number) => {
    const volume = Math.min(1, Math.max(0, val))
    get().$video.volume = volume
    set((s) => ({ volume: volume }))
  },
}))
