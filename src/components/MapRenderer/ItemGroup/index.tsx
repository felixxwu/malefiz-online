import { styled } from 'goober'
import { ItemName } from '../../../items'
import { gameState, gameStateHashTable, textOpacity } from '../../../signals/signals'
import { objectToArray } from '../../../utils/objectToArray'
import { polygonToXY } from '../../../utils/polygonToXY'

export function ItemGroup() {
  if (!gameState.value) return null

  const items: { name: ItemName; itemId: string; x: number; y: number }[] = []
  objectToArray(gameState.value.items).forEach(item => {
    console.log(`item`, item)
    if (item.value.isEnabled) {
      item.value.positions.forEach(pos => {
        const position = gameStateHashTable.value[pos.circleId].circle!.position
        items.push({ name: item.key, itemId: pos.itemId, ...position })
      })
    }
  })

  items.sort((a, b) => a.itemId.localeCompare(b.itemId))
  console.log(`items`, items)

  return (
    <Group>
      {items.map(item => (
        <polygon
          id={'item' + item.itemId}
          key={item.itemId}
          style={{
            transform: `translate(${item.x * 100}px, ${item.y * 100}px)`,
            stroke: 'black',
            strokeWidth: '5',
            filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))',
            willChange: 'transform',
            transition: '300ms',
            fill: 'yellow',
            opacity: textOpacity.value,
            strokeLinejoin: 'round',
          }}
          points={[0, 1, 2, 3, 4]
            .map(i => polygonToXY(i, 5, 20))
            .map(({ x, y }) => `${x},${y}`)
            .join(' ')}
        />
      ))}
    </Group>
  )
}

const Group = styled('g')`
  pointer-events: none;
`
