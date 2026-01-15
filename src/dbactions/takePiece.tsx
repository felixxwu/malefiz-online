import { keyframes, styled } from 'goober'
import { PlayerModelGroup } from '../components/MapRenderer/PlayerGroup'
import { consts } from '../config/consts'
import { gameState, lastDieRoll, map } from '../signals/signals'
import { Player } from '../types/gameTypes'
import { getUserControllingPlayer } from '../signals/queries/getUserControllingPlayer'
import { playerDefs } from '../config/playerDefs'
import { updateGame } from './updateGame'
import { getNextTurnGameState } from '../signals/queries/getNextTurnGameState'
import { getPathDistance } from '../utils/getPathDistance'
import { playTakePiece } from '../audio/playTakePiece'

let lastKill: { killer: Player | null; victim: Player | null } = { killer: null, victim: null }

export async function takePiece(pieceId: string, circleId: string, opponentPieceId: string) {
  // Get current position of the piece
  const currentPlayer = gameState.value!.players.find(p => p.id === gameState.value!.playerTurn)!
  const currentPosition = currentPlayer.positions.find(pos => pos.pieceId === pieceId)!
  const distance = getPathDistance(currentPosition.circleId, circleId)

  // Set lastKill
  const killer = gameState.value!.players.find(p => p.id === gameState.value!.playerTurn)!
  const victim = gameState.value!.players.find(p =>
    p.positions.some(pos => pos.pieceId === opponentPieceId)
  )!
  lastKill.killer = killer
  lastKill.victim = victim

  // Play audio for piece-taking
  playTakePiece()

  const nextTurn = lastDieRoll.value !== 6
  const nextTurnState = getNextTurnGameState(nextTurn, [circleId])

  // Add piece-taking alert to the beginning of the queue (before any event alert)
  const alertsWithPieceAlert = [
    { id: 'takePieceAlert', meta: lastKill },
    ...(nextTurnState.alerts || []),
  ]

  await updateGame({
    players: gameState.value!.players.map(player => {
      if (gameState.value!.playerTurn === player.id) {
        // move current player piece
        return {
          ...player,
          positions: player.positions
            .filter(pos => pos.pieceId !== pieceId)
            .concat({ pieceId, circleId }),
          aiTemper: Math.max(0, player.aiTemper - consts.temperDecrease),
          stats: {
            ...player.stats,
            distanceMoved: player.stats.distanceMoved + distance,
            piecesTaken: player.stats.piecesTaken + 1,
          },
        }
      } else if (player.positions.some(pos => pos.pieceId === opponentPieceId)) {
        // move opponent piece to start
        return {
          ...player,
          positions: player.positions
            .filter(pos => pos.pieceId !== opponentPieceId)
            .concat({
              pieceId: opponentPieceId,
              circleId: map.value.find(circle => circle.start === player.id)!.id,
            }),
          aiTemper: player.aiTemper + consts.temperIncrease,
        }
      } else {
        return player
      }
    }),

    ...nextTurnState,
    alerts: alertsWithPieceAlert,
  })
}

export function takePieceAlert() {
  const currentAlert = gameState.value?.alerts?.[0]
  const gameStateLastKill = currentAlert?.meta as typeof lastKill
  if (gameStateLastKill.killer === null || gameStateLastKill.victim === null) return null
  const userForKiller = getUserControllingPlayer(gameStateLastKill.killer.id)
  const userForVictim = getUserControllingPlayer(gameStateLastKill.victim.id)

  const killerModel =
    userForKiller?.playerModel ??
    playerDefs.find(player => player.id === gameStateLastKill.killer?.id)?.model
  const victimModel =
    userForVictim?.playerModel ??
    playerDefs.find(player => player.id === gameStateLastKill.victim?.id)?.model

  if (!killerModel || !victimModel) return null

  return (
    <div>
      <Svg>
        <circle cx='0' cy='0' r={consts.circleRadius} fill='black' />
        <VictimGroup>
          <PlayerModelGroup colour={gameStateLastKill.victim.colour} model={victimModel} />
        </VictimGroup>
        <KillerGroup>
          <PlayerModelGroup colour={gameStateLastKill.killer.colour} model={killerModel} />
        </KillerGroup>
      </Svg>
    </div>
  )
}

const Svg = styled('svg')`
  overflow: visible;
  width: 1px;
  height: 1px;
  transform: scale(2);
`

const jumpIn = keyframes`
  0% {
    opacity: 1;
    transform: translate(-100px, -50px);
  }
  40% {
    opacity: 1;
    transform: translate(0px, 0px);
  }
`

const KillerGroup = styled('g')`
  animation: ${jumpIn} 2s cubic-bezier(1, 0, 0.8, -0.5);
  animation-fill-mode: forwards;
`

const jumpOut = keyframes`
  40% {
    opacity: 1;
    transform: translate(0px, 0px) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translate(150px, 57px) rotate(700deg);
  }

`

const VictimGroup = styled('g')`
  animation: ${jumpOut} 2s cubic-bezier(0, 0.5, 0.25, 0.75);
  animation-fill-mode: forwards;
`
