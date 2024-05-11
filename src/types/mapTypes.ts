import { JSX } from 'preact/jsx-runtime'

export type Circle = {
  id: string
  position: {
    x: number
    y: number
  }
  neighbours: string[]
  start: string | null
  finish: boolean
  safeZone: boolean
  zoomInPoint: boolean
  text?: { content: string; x?: number; y?: number }[]
  fontSize?: number
  custom?: () => JSX.Element
  onClick?: () => void
}

export type Map = Circle[]
