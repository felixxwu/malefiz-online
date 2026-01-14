import { EventName } from '../events'
import { GameStateItems } from '../items'
import { Circle } from './mapTypes'

export type PlayerID = string

export type Player = {
  id: PlayerID
  colour: string
  positions: { pieceId: string; circleId: string }[]
  name: string
  aiTemper: number
  stats: Stats
}

export type Stone = {
  stoneId: string
  circleId: string | null
}

export type PlayerModel = {
  eyes: number
  mouth: number
  head: number
}

export type User = {
  playerToControl: PlayerID
  timeJoined: number
  playerModel: PlayerModel
  emoji: string | null
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
  items: GameStateItems
  alert: Alert
  turnsUntilEvent: number
  eventsEnabled: EventName[]
  [user: UserID]: User
}

export type Stats = {
  distanceMoved: number
  sixesRolled: number
  piecesTaken: number
  stonesTaken: number
  itemsTaken: number
}

export type Alert = {
  id: string
  meta?: any
} | null

export type Move = {
  from: Circle
  to: Circle
}

export type MoveWithScore = {
  move: Move
  score: number
}
