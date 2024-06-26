import { styled } from 'goober'
import { circleHovered, gameState, pieceDragged, textOpacity } from '../../../signals/signals'
import { mapList } from '../../../maps/mapList'
import { polygonToXY } from '../../../utils/polygonToXY'
import { getUserControllingPlayer } from '../../../signals/queries/getUserControllingPlayer'
import { playerDefs } from '../../../config/playerDefs'
import { headList } from '../../../playermodel/heads'
import { PlayerModel } from '../../../types/gameTypes'
import { eyesList } from '../../../playermodel/eyes'
import { mouthList } from '../../../playermodel/mouthes'
import { consts } from '../../../config/consts'

const spacing = 0.3
const spokes = 5

export function PlayerGroup() {
  const gameStatePlayers = gameState.value?.players
  if (!gameStatePlayers) return null

  const pieces: {
    playerID: string
    pieceID: string
    colour: string
    x: number
    y: number
  }[] = []

  for (const player of gameStatePlayers) {
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

  pieces.sort((a, b) => (a.pieceID < b.pieceID ? -1 : 1))

  return (
    <Group opacity={textOpacity.value}>
      {pieces.map(piece => {
        const circleHoveredValue = circleHovered.value
        const pieceIsBeingDragged = piece.pieceID === pieceDragged.value?.id && circleHoveredValue
        const { x, y } = pieceIsBeingDragged ? circleHoveredValue.position : piece
        const userForPlayer = getUserControllingPlayer(piece.playerID)
        const model =
          userForPlayer?.playerModel ?? playerDefs.find(p => p.id === piece.playerID)?.model!
        return (
          <PlayerModelGroup key={piece.pieceID} colour={piece.colour} x={x} y={y} model={model} />
        )
      })}
    </Group>
  )
}

export function PlayerModelGroup(props: {
  colour: string
  x?: number
  y?: number
  model: PlayerModel
}) {
  const Eyes = eyesList[props.model.eyes]
  const Head = headList[props.model.head]
  const Mouth = mouthList[props.model.mouth]
  return (
    <g
      style={{
        transform: `translate(${(props.x ?? 0) * 100}px, ${(props.y ?? 0) * 100}px)`,
        transition: `700ms ${consts.customEaseOut}`,
        filter: 'drop-shadow(0 0 3px rgba(0, 0, 0, 0.3))',
        willChange: 'transform',
      }}
    >
      <Head colour={props.colour} />
      <Eyes colour={props.colour} />
      <Mouth colour={props.colour} />
    </g>
  )
}

const Group = styled('g')`
  pointer-events: none;
`
