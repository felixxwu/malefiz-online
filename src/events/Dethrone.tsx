import { keyframes, styled } from 'goober'
import { Event } from '.'
import { updateGame } from '../dbactions/updateGame'
import { gameState, gameStateHashTable, map } from '../signals/signals'
import { EventAlert } from './EventAlert'
import { consts } from '../config/consts'
import { PlayerModelGroup } from '../components/MapRenderer/PlayerGroup'
import { playerDefs } from '../config/playerDefs'

export const Dethrone = {
  name: 'Dethrone',
  description: 'Remove the piece furthest ahead.',
  alert: () => (
    <EventAlert event={Dethrone}>
      <DethroneGraphic />
    </EventAlert>
  ),
  onActivate: async () => {
    // Find all pieces with their distances to finish
    const allPieces: Array<{
      playerId: string
      pieceId: string
      circleId: string
      distanceToFinish: number
    }> = []

    for (const player of gameState.value!.players) {
      for (const position of player.positions) {
        const distance = gameStateHashTable.value[position.circleId].distanceToFinish ?? Infinity
        // Only consider pieces not already at start
        if (!gameStateHashTable.value[position.circleId].circle?.start) {
          allPieces.push({
            playerId: player.id,
            pieceId: position.pieceId,
            circleId: position.circleId,
            distanceToFinish: distance,
          })
        }
      }
    }

    // Find the piece closest to finish (smallest distance)
    if (allPieces.length === 0) return

    const closestPiece = allPieces.reduce((closest, current) =>
      current.distanceToFinish < closest.distanceToFinish ? current : closest
    )

    // Send that piece back to its start
    await updateGame({
      players: gameState.value!.players.map(player => {
        if (player.id === closestPiece.playerId) {
          return {
            ...player,
            positions: player.positions.map(pos => {
              if (pos.pieceId === closestPiece.pieceId) {
                return {
                  ...pos,
                  circleId: map.value.find(circle => circle.start === player.id)!.id,
                }
              } else {
                return pos
              }
            }),
          }
        } else {
          return player
        }
      }),
    })
  },
} as const satisfies Event

function DethroneGraphic() {
  return (
    <Svg>
      <circle cx='-100' cy='0' r={consts.circleRadius} fill='black' />
      <circle cx='0' cy='0' r={consts.circleRadius} fill='black' />
      <circle cx='100' cy='0' r={consts.circleRadius} fill='black' />
      <line
        x1='-100'
        y1='0'
        x2='100'
        y2='0'
        stroke='black'
        style={{ strokeWidth: consts.pathStrokeWidth }}
      />
      <Player1>
        <PlayerModelGroup model={playerDefs[0].model} colour={playerDefs[0].colour} />
      </Player1>
      <Player2>
        <PlayerModelGroup model={playerDefs[1].model} colour={playerDefs[1].colour} />
      </Player2>
      <Player3>
        <PlayerModelGroup model={playerDefs[2].model} colour={playerDefs[2].colour} />
      </Player3>
    </Svg>
  )
}

const Svg = styled('svg')`
  overflow: visible;
  width: 1px;
  height: 1px;
  transform: scale(1.5) translateY(50px);
`

const fall = keyframes`
  0%, 50% {
    opacity: 1;
    transform: translate(100px, 0px) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translate(100px, 200px) rotate(45deg);
  }
`

const Player1 = styled('g')`
  transform: translate(-100px, 0px);
`

const Player2 = styled('g')`
  transform: translate(0px, 0px);
`

const Player3 = styled('g')`
  transform: translate(0px, 0px);
  animation: ${fall} 2s ease-in;
  animation-fill-mode: forwards;
`
