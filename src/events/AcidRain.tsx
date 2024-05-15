import { keyframes, styled } from 'goober'
import { Event } from '.'
import { updateGame } from '../dbactions/updateGame'
import { gameState, gameStateHashTable, map } from '../signals/signals'
import { EventAlert } from './EventAlert'
import { consts } from '../config/consts'
import { PlayerModelGroup } from '../components/MapRenderer/PlayerGroup'
import { players } from '../utils/players'

export const AcidRain = {
  name: 'Acid Rain',
  description: 'Send one piece back to the start for each player.',
  alert: () => (
    <EventAlert event={AcidRain}>
      <AcidRainGraphic />
    </EventAlert>
  ),
  onActivate: async () => {
    const pieces = gameState.value!.players.map(player => {
      const eligiblePieces = player.positions.filter(
        pos => !gameStateHashTable.value[pos.circleId].circle?.start
      )
      return eligiblePieces[Math.floor(Math.random() * eligiblePieces.length)]
    })
    await updateGame({
      players: gameState.value!.players.map(player => {
        return {
          ...player,
          positions: player.positions.map(pos => {
            if (pieces.find(piece => piece.pieceId === pos.pieceId)) {
              return {
                ...pos,
                circleId: map.value.find(circle => circle.start === player.id)!.id,
              }
            } else {
              return pos
            }
          }),
        }
      }),
    })
  },
} as const satisfies Event

function AcidRainGraphic() {
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
        <PlayerModelGroup model={players[0].model} colour={players[0].colour} />
      </Player1>
      <Player2>
        <PlayerModelGroup model={players[1].model} colour={players[1].colour} />
      </Player2>
      <Player3>
        <PlayerModelGroup model={players[2].model} colour={players[2].colour} />
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

const fall1 = keyframes`
  0%, 50% {
    opacity: 1;
    transform: translate(-100px, 0px) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translate(-100px, 200px) rotate(-45deg);
  }
`

const fall3 = keyframes`
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
  animation: ${fall1} 2s ease-in;
  animation-fill-mode: forwards;
`

const Player2 = styled('g')`
  transform: translate(0px, 0px);
`

const Player3 = styled('g')`
  animation: ${fall3} 2s ease-in;
  animation-fill-mode: forwards;
`
