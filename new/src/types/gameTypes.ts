import { Circle } from './mapTypes'

export type PlayerID = string

export type Player = {
  id: PlayerID
  colour: string
  positions: { pieceId: string; circleId: string }[]
  name: string
}

export type Stone = {
  stoneId: string
  circleId: string | null
}

export type User = {
  playerToControl: PlayerID
  timeJoined: number
}

export type UserID = `user${string}`

export type GameState = {
  mapNum: number
  created: number
  players: Player[]
  playerTurn: PlayerID | null
  dieRoll: number | null
  stones: Stone[]
  stonePit: { x: number; y: number }
  diePit: { x: number; y: number }
  [user: UserID]: User
}

export type Move = {
  from: Circle
  to: Circle
}

export type MoveWithScore = {
  move: Move
  score: number
}
