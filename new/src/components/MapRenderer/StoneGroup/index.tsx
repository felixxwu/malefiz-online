import { styled } from 'goober'
import { gameState, textOpacity } from '../../../signals'
import { mapList } from '../../../maps/mapList'
import { polygonToXY } from '../../../utils/polygonToXY'

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
        <polygon
          id={'stone' + stone.id}
          style={{
            transform: `translate(${stone.x * 100}px, ${stone.y * 100}px)`,
            stroke: 'black',
            strokeWidth: '5',
            filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))',
            willChange: 'transform',
            transition: '300ms',
            fill: 'white',
            opacity: textOpacity.value,
            strokeLinejoin: 'round',
          }}
          points={[0, 1, 2, 3, 4, 5, 6, 7]
            .map(i => polygonToXY(i, 8, 25))
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
