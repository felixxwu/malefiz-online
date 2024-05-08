import { styled } from 'goober'
import { gameState, textOpacity } from '../../../signals'
import { mapList } from '../../../maps/mapList'
import { polygonToXY } from '../../../utils/polygonToXY'

const spacing = 0.3
const spokes = 5

export function PlayerGroup() {
  const players = gameState.value?.players
  if (!players) return null

  const pieces: {
    playerID: string
    pieceID: string
    colour: string
    x: number
    y: number
  }[] = []

  for (const player of players) {
    let startCirclePlayersIndex = 1
    for (const position of player.positions) {
      const circleData = mapList[gameState.value!.mapNum].map.find(
        circle => circle.id === position.circleId
      )!
      const pos = circleData.start
        ? (() => {
            const index = startCirclePlayersIndex++
            return {
              x: circleData.position.x + polygonToXY(index, spokes, spacing).x,
              y: circleData.position.y + polygonToXY(index, spokes, spacing).y,
            }
          })()
        : circleData.position
      pieces.push({
        playerID: player.id,
        pieceID: position.pieceId,
        colour: player.colour,
        x: pos.x,
        y: pos.y,
      })
    }
  }

  return (
    <Group>
      {pieces.map(piece => (
        <PlayerModel
          key={piece.pieceID}
          id={piece.pieceID}
          colour={piece.colour}
          x={piece.x}
          y={piece.y}
        />
      ))}
    </Group>
  )
}

function PlayerModel(props: { id: string; colour: string; x: number; y: number }) {
  return (
    <PlayerCircle
      id={'piece' + props.id}
      cx={0}
      cy={0}
      r={25}
      fill={props.colour}
      style={{ transform: `translate(${props.x * 100}px, ${props.y * 100}px)` }}
      opacity={textOpacity.value}
    />
  )
}

const PlayerCircle = styled('circle')`
  stroke: black;
  stroke-width: 2;
  transition: 300ms;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
  will-change: transform;
`

const Group = styled('g')`
  pointer-events: none;
`
