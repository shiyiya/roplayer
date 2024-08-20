import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Source } from '../types/source'
import { Controller } from './controller'
import { usePlayerStore } from './player'

export interface CastState {
  cast?: typeof cast
  player?: cast.framework.RemotePlayer
  controller?: cast.framework.RemotePlayerController

  isAvailable: boolean
  isConnected: boolean

  init(): void
  initCastPlayer(): void
}

export const useCastStore = create<CastState>()(
  immer<CastState>((set, get) => ({
    isAvailable: false,
    isConnected: false,
    init() {
      window.__onGCastApiAvailable = (isAvailable) => {
        set((s) => {
          s.isAvailable = isAvailable
        })

        get().initCastPlayer()
      }

      const script = document.createElement('script')
      script.setAttribute('src', 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1')
      document.body.appendChild(script)
    },
    initCastPlayer() {
      const ins = cast.framework.CastContext.getInstance()
      ins.setOptions({
        receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      })

      const remotePlayer = new cast.framework.RemotePlayer()
      const controller = new cast.framework.RemotePlayerController(remotePlayer)

      function connectionChanged(e: cast.framework.RemotePlayerChangedEvent) {
        if (e.field === 'isConnected') {
          set((s) => {
            s.isConnected = true
          })
        }
      }
      controller.addEventListener(cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, connectionChanged)

      set((s) => {
        s.player = remotePlayer
        s.controller = controller
      })

      usePlayerStore.subscribe((s, p) => {
        if (s.source != p.source) {
          get().setupSource(s.source)
        }
      })
    },
    setupSource(source: Source) {
      const metaData = new chrome.cast.media.GenericMediaMetadata()
      metaData.title = source.name!

      const mediaInfo = new chrome.cast.media.MediaInfo(
        'video',
        source.type === 'hls' ? 'application/x-mpegurl' : 'video/mp4'
      )
      ;(mediaInfo as any).contentUrl = source.url
      mediaInfo.streamType = chrome.cast.media.StreamType.BUFFERED
      mediaInfo.metadata = metaData
      mediaInfo.customData = {}

      const request = new chrome.cast.media.LoadRequest(mediaInfo)
      request.autoplay = true
      request.currentTime = 0

      if (source.type === 'hls') {
        const staticMedia = chrome.cast.media as any
        const media = request.media as any
        media.hlsSegmentFormat = staticMedia.HlsSegmentFormat.FMP4
        media.hlsVideoSegmentFormat = staticMedia.HlsVideoSegmentFormat.FMP4
      }

      const session = cast.framework.CastContext.getInstance().getCurrentSession()
      session!.loadMedia(request)
    },
  })) as any
)

useCastStore.getState().init()
