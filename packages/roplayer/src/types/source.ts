export type SourceType = 'file' | 'hls' | 'dash' | 'flv'

export type Qualities = 'hd' | 'ld' | 'sd'

export type FileSource = {
  type: 'file'
  url: string
  name?: string
}

export type StreamSource = {
  type: Omit<SourceType, 'file'>
  url: string
  name?: string
}

export type Source =
  | {
      type: 'file'
      name?: string
      qualities: Partial<Record<Qualities, FileSource>>
    }
  | StreamSource
