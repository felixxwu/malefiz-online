import { Circle } from './mapTypes'

type PlayerID = string

export type Player = {
  id: PlayerID
  colour: string
  positions: { pieceId: string; circleId: string }[]
  name: string
  isAI: boolean
}

export type Stone = {
  stoneId: string
  circleId: string | null
}

export type User = {
  playerToControl: PlayerID
  timeJoined: number
  name: string
}

export type GameState = {
  mapNum: number
  created: number
  players: Player[]
  playerTurn: PlayerID
  dieRoll: number | null
  stones: Stone[]
  stonePit: { x: number; y: number }
  diePit: { x: number; y: number }
  [user: `user${string}`]: User
}

export type Move = {
  from: Circle
  to: Circle
}

export type MoveWithScore = {
  move: Move
  score: number
}
