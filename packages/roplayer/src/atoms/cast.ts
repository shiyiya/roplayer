import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Source } from '../types/source'

export interface CastState {
  isAvailable: boolean
  isConnected: boolean
  init(): void
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

        if (!isAvailable) return

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
          s.remotePlayer = remotePlayer
          s.controller = controller
        })
      }

      const script = document.createElement('script')
      script.setAttribute('src', 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1')
      script.setAttribute('id', 'chromecast')
      document.body.appendChild(script)
    },
    setupSource(value: Source) {},
  })) as any
)
useCastStore.getState().init()
