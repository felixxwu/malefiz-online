import { gameState, gameStateHashTable } from '../signals/signals'
import { objectMap } from './objectMap'
import { objectToArray } from './objectToArray'

export function getNewItems(excludeCircleIds: string[]) {
  const gameStateItems = gameState.value!.items

  const addNewItem = Math.random() < 1 / 3
  if (!addNewItem) {
    return objectMap(gameStateItems, item => ({
      ...item,
      isActive: false,
    })) // dont add item this round
  }

  const currentItems = gameStateItems
  const itemsArray = objectToArray(currentItems).filter(item => item.value.isEnabled)
  if (!itemsArray.length) return gameStateItems // no items enabled

  const randomItem = itemsArray[Math.floor(Math.random() * itemsArray.length)]
  const circlesArray = objectToArray(gameStateHashTable.value)
  const validCircles = circlesArray.filter(
    circle =>
      circle.value.circle &&
      !circle.value.item &&
      !circle.value.pieces &&
      !circle.value.stone &&
      !circle.value.circle.finish &&
      !circle.value.circle.start &&
      !excludeCircleIds.includes(circle.value.circle.id)
  )
  const randomValidCircle = validCircles[Math.floor(Math.random() * validCircles.length)]

  return objectMap(gameStateItems, (item, key) =>
    key === randomItem.key
      ? {
          isActive: false,
          isEnabled: true,
          positions: [
            ...gameStateItems[randomItem.key].positions,
            { circleId: randomValidCircle.key, itemId: Date.now().toString() },
          ],
        }
      : {
          ...item,
          isActive: false,
        }
  )
}
