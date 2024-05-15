import { styled } from 'goober'
import { gameState, textOpacity } from '../../../signals/signals'
import { mapList } from '../../../maps/mapList'
import { Stone } from './Stone'
import { consts } from '../../../config/consts'

export function StoneGroup() {
  const stones = gameState.value?.stones
  if (!stones) return null

  const stonesWithPositions = stones
    .map(stone => {
      const circle = mapList[gameState.value!.mapNum].map.find(
        circle => circle.id === stone.circleId
      )
      const pos = circle ? circle.position : gameState.value!.stonePit
      return { ...pos, id: stone.stoneId }
    })
    .sort((a, b) => a.id.localeCompare(b.id))

  return (
    <Group>
      {stonesWithPositions.map(stone => (
        <g
          id={'stone' + stone.id}
          style={{
            transform: `translate(${stone.x * 100}px, ${stone.y * 100}px)`,
            willChange: 'transform',
            transition: `500ms ${consts.customEase}`,
            opacity: textOpacity.value,
          }}
        >
          <Stone />
        </g>
      ))}
    </Group>
  )
}

const Group = styled('g')`
  pointer-events: none;
`
