import { Circle, Map } from './mapTypes'

export type Player = {
  id: string
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
  id: string
  playerToControl: string
  lastOnline: number
  isAI: boolean
  isHost: boolean
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
  stonePit: { x: number; y: number }
  diePit: { x: number; y: number }
}

export type Move = {
  from: Circle
  to: Circle
}

export type MoveWithScore = {
  move: Move
  score: number
}
