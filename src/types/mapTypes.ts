export type Circle = {
  id: string
  position: {
    x: number
    y: number
  }
  neighbours: string[]
  text?: string
  fontSize?: number
  onClick?: () => void
}

export type Map = Circle[]
