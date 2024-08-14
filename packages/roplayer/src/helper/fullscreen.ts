export const requestFullscreen = (div: HTMLDivElement, videoElement: HTMLVideoElement) => {
  if (div.requestFullscreen) {
    div.requestFullscreen()
  } else if (videoElement.requestFullscreen) {
    videoElement.requestFullscreen()
  }
}

export const requestFullscreenIfSupport = (div: HTMLDivElement, videoElement: HTMLVideoElement) => {
  if (document.fullscreenEnabled) {
    requestFullscreen(div, videoElement)
  }
}

export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}
