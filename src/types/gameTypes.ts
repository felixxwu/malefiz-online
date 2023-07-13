import { Map } from './mapTypes'

export type Player = {
  id: string
  colour: string
  positions: { pieceId: string; circleId: string }[]
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
}
