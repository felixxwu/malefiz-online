import { JSX } from 'preact/jsx-runtime'
import { arcadeItemSelection } from '../signals/signals'
import { objectMap } from '../utils/objectMap'
import { DoubleDice } from './RollAgain'
import { StoneMove } from './StoneMove'
import { LowRoller } from './LowRoller'
import { PositionSwap } from './PositionSwap'

export type Item = {
  name: string
  description: string
  colour: string
  icon: () => JSX.Element
  actionWhenActive: { onClick: () => void; text: string; showDie: boolean; clickable: boolean }
  alert: () => JSX.Element
  aiAction: () => void
  onPickup: (pieceId: string, circleId: string) => void
  onCircleClickWhenActive: ((circleId: string) => void) | null
}

export const itemDefs = {
  [StoneMove.name]: StoneMove,
  [DoubleDice.name]: DoubleDice,
  [LowRoller.name]: LowRoller,
  [PositionSwap.name]: PositionSwap,
} as const

export type ItemName = keyof typeof itemDefs
export type GameStateItem = {
  isActive: boolean
  isEnabled: boolean
  positions: { circleId: string; itemId: string }[]
}
export type GameStateItems = { [key in ItemName]: GameStateItem }

export function createGameItems(): GameStateItems {
  let selection: ItemName[] = []
  try {
    selection = arcadeItemSelection.value
  } catch (_) {}

  return objectMap(itemDefs, item => ({
    isActive: false,
    isEnabled: selection.includes(item.name),
    positions: [],
  }))
}
