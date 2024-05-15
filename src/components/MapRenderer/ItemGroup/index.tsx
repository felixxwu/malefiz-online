import { keyframes, styled } from 'goober'
import { ItemName, itemDefs } from '../../../items'
import { gameState, gameStateHashTable } from '../../../signals/signals'
import { objectToArray } from '../../../utils/objectToArray'
import { JSX } from 'preact/jsx-runtime'
import { seededRandom } from '../../../utils/seededRandom'
import { ItemSvg } from './ItemSvg'

export function ItemGroup() {
  if (!gameState.value) return null

  const items: {
    name: ItemName
    itemId: string
    x: number
    y: number
    colour: string
    icon: () => JSX.Element
  }[] = []
  objectToArray(gameState.value.items).forEach(item => {
    if (item.value.isEnabled) {
      item.value.positions.forEach(pos => {
        const position = gameStateHashTable.value[pos.circleId].circle!.position
        items.push({
          name: item.key,
          itemId: pos.itemId,
          colour: itemDefs[item.key].colour,
          icon: itemDefs[item.key].icon,
          ...position,
        })
      })
    }
  })

  items.sort((a, b) => a.itemId.localeCompare(b.itemId))

  return (
    <Group>
      {items.map(item => (
        <g
          style={{
            transform: `translate(${item.x * 100}px, ${item.y * 100}px)`,
          }}
        >
          <AnimationGroup
            style={{
              animationDelay: `${seededRandom(item.itemId) * -3}s`,
            }}
          >
            <ItemSvg colour={item.colour} Icon={item.icon} />
          </AnimationGroup>
        </g>
      ))}
    </Group>
  )
}

const spin = keyframes`
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
`

const AnimationGroup = styled('g')`
  animation: ${spin} 3s infinite;
`

const Group = styled('g')`
  pointer-events: none;
`
