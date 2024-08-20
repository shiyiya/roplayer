export interface Controller {
  play: () => void
  pause: () => void
  togglePlay: () => void
  mute: () => void
  unmute: () => void
  setVolume: (val: number) => void
  seek: (time: number) => void
  toggleFullscreen(): void
  togglePictureInPicture(): void
  setPlaybackRate(rate: number): void
  destroy(): void
}
