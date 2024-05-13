import { ItemName } from '../items'
import { map } from '../signals/signals'
import { GameState, Stone } from '../types/gameTypes'
import { Circle } from '../types/mapTypes'
import { addDistancesToFinish } from './distanceToFinish'
import { objectToArray } from './objectToArray'

export type HashTable = {
  [circleId: string]: {
    circle?: Circle
    stone?: Stone
    item?: ItemName
    pieces?: { playerId: string; pieceId: string }[]
    distanceToFinish?: number
  }
}

export function mapToHashTable(gameState: GameState) {
  const hashTable: HashTable = {}
  for (const circle of map.value) {
    if (hashTable[circle.id]) {
      throw new Error(`Duplicate circle id: ${circle.id}`)
    }
    hashTable[circle.id] = { circle }
  }

  for (const stone of gameState.stones) {
    if (stone.circleId === null) {
      hashTable['null'] = { stone }
    } else {
      hashTable[stone.circleId!].stone = stone
    }
  }

  for (const player of gameState.players) {
    for (const position of player.positions.slice().reverse()) {
      if (hashTable[position.circleId].pieces) {
        hashTable[position.circleId].pieces!.push({
          playerId: player.id,
          pieceId: position.pieceId,
        })
      } else {
        hashTable[position.circleId].pieces = [
          {
            playerId: player.id,
            pieceId: position.pieceId,
          },
        ]
      }
    }
  }

  for (const item of objectToArray(gameState.items)) {
    for (const position of item.value.positions) {
      hashTable[position.circleId].item = item.key
    }
  }

  addDistancesToFinish(hashTable)

  return hashTable
}
