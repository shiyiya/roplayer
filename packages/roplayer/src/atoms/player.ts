import { create } from 'zustand'
import { exitFullscreen, requestFullscreenIfSupport } from '../helper/fullscreen'

type PlayerStore = {
  isPlaying: boolean
  isPaused: boolean
  isSeeking: boolean // seeking with progress bar
  isDragSeeking: boolean // is seeking for our custom progress bar
  isLoading: boolean // buffering or not
  hasPlayedOnce: boolean // has the video played at all?
  volume: number
  playbackRate: number
  addPlayerEventListener: (element: HTMLDivElement) => void
  addVideoEventListener: (videoElement: HTMLVideoElement) => void
  play: () => void
  pause: () => void
  showControls: boolean
  currentTime: number
  duration: number
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
  isSeeking: false,
  isDragSeeking: false,
  hasPlayedOnce: false,
  showControls: true,
  volume: 1,
  playbackRate: 1,
  currentTime: 0,
  duration: 0,
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
  addPlayerEventListener: (element) => {
    let timer: any
    set((state) => ({
      $videoPlayer: element,
    }))
    element.addEventListener('mouseenter', () => {
      if (get().isPlaying) {
        clearTimeout(timer)
        set((state) => ({
          showControls: true,
        }))
      }
    })
    element.addEventListener('mouseleave', () => {
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
  addVideoEventListener(videoElement: HTMLVideoElement) {
    // time
    videoElement.addEventListener('timeupdate', () => {
      set((state) => ({
        currentTime: videoElement.currentTime,
      }))
    })

    //duration
    videoElement.addEventListener('durationchange', () => {
      set((state) => ({
        duration: videoElement.duration,
      }))
    })
    //ended
    videoElement.addEventListener('ended', () => {
      set((state) => ({
        isPlaying: false,
        isPaused: true,
        showControls: true,
      }))
    })

    set((state) => ({
      $videoElement: videoElement,
    }))
    videoElement.addEventListener('play', () => {
      set((state) => ({
        isPlaying: true,
        isPaused: false,
        hasPlayedOnce: true,
      }))
    })
    videoElement.addEventListener('pause', () => {
      console.log('pause')

      set((state) => ({
        isPlaying: false,
        isPaused: true,
      }))
    })
    videoElement.addEventListener('waiting', () => {
      set((state) => ({
        isLoading: true,
      }))
    })
    videoElement.addEventListener('playing', () => {
      set((state) => ({
        isLoading: false,
      }))
    })
    videoElement.addEventListener('seeking', () => {
      set((state) => ({
        isSeeking: true,
      }))
    })
    videoElement.addEventListener('seeked', () => {
      set((state) => ({
        isSeeking: false,
      }))
    })
    videoElement.addEventListener('volumechange', () => {
      set((state) => ({
        volume: videoElement.volume,
      }))
    })
    videoElement.addEventListener('ratechange', () => {
      set((state) => ({
        playbackRate: videoElement.playbackRate,
      }))
    })

    //fullscreen
    videoElement.addEventListener('fullscreenchange', () => {
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
    set((state) => ({
      currentTime: time,
    }))
  },
}))
