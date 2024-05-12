import { arcadeItemSelection } from '../signals/signals'
import { objectMap } from '../utils/objectMap'
import { DoubleDice } from './DoubleDice'
import { StoneMove } from './StoneMove'

export const items = {
  [StoneMove.name]: StoneMove,
  [DoubleDice.name]: DoubleDice,
} as const

export type ItemName = keyof typeof items
export type GameStateItem = {
  isActive: boolean
  isEnabled: boolean
}
export type GameStateItems = { [key in ItemName]: GameStateItem }

export function createGameItems(): GameStateItems {
  let selection: ItemName[] = []
  try {
    selection = arcadeItemSelection.value
  } catch (_) {}

  return objectMap(items, item => ({
    isActive: false,
    isEnabled: selection.includes(item.name),
  }))
}
