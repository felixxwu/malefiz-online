export type Circle = {
  id: string
  position: {
    x: number
    y: number
  }
  neighbours: string[]
  start: boolean
  finish: boolean
  text?: string
  fontSize?: number
  onClick?: () => void
}

export type Map = Circle[]
