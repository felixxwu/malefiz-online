import { Map } from './mapTypes'

export type Player = {
  id: string
  colour: string
  positions: { pieceId: string; circleId: string }[]
  name: string
}

export type Stone = {
  stoneId: string
  circleId: string | null
}

export type User = {
  id: string
  playerToControl: string
  lastOnline: number
}

export type GameState = {
  map: Map
  players: Player[]
  created: number
  users: User[]
  playerTurn: string
  dieRoll: number | null
  gameStateHash: string
  stones: Stone[]
}
