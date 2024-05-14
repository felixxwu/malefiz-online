import { styled } from 'goober'
import { PlayerModelGroup } from '../components/MapRenderer/PlayerGroup'
import { consts } from '../config/consts'
import { gameState, lastDieRoll, map } from '../signals/signals'
import { Player } from '../types/gameTypes'
import { getUserControllingPlayer } from '../utils/getUserControllingPlayer'
import { players } from '../utils/players'
import { displayAlert } from './displayAlert'
import { updateGame } from './updateGame'
import { getNextTurnGameState } from '../utils/getNextTurnGameState'

let lastKill: { killer: Player | null; victim: Player | null } = { killer: null, victim: null }

export async function takePiece(pieceId: string, circleId: string, opponentPieceId: string) {
  await updateGame({
    players: gameState.value!.players.map(player => {
      if (gameState.value!.playerTurn === player.id) {
        lastKill.killer = player

        // move current player piece
        return {
          ...player,
          positions: player.positions
            .filter(pos => pos.pieceId !== pieceId)
            .concat({ pieceId, circleId }),
          aiTemper: Math.max(0, player.aiTemper - consts.temperDecrease),
        }
      } else if (player.positions.some(pos => pos.pieceId === opponentPieceId)) {
        lastKill.victim = player

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

    ...getNextTurnGameState(lastDieRoll.value !== 6, [circleId]),
  })

  // another alert could be set, in which case ignore this one
  if (!gameState.value!.alert) {
    await displayAlert({ id: 'takePieceAlert', meta: lastKill })
  }
}

export function takePieceAlert() {
  const gameStateLastKill = gameState.value?.alert?.meta as typeof lastKill
  if (gameStateLastKill.killer === null || gameStateLastKill.victim === null) return null
  const userForKiller = getUserControllingPlayer(gameStateLastKill.killer.id)
  const userForVictim = getUserControllingPlayer(gameStateLastKill.victim.id)

  const killerModel =
    userForKiller?.playerModel ??
    players.find(player => player.id === gameStateLastKill.killer?.id)?.model
  const victimModel =
    userForVictim?.playerModel ??
    players.find(player => player.id === gameStateLastKill.victim?.id)?.model

  if (!killerModel || !victimModel) return null

  return (
    <div>
      <Svg>
        <circle cx='0' cy='0' r={consts.circleRadius} fill='black' />
        <VictimGroup>
          <PlayerModelGroup
            x={0}
            y={0}
            id='1'
            colour={gameStateLastKill.victim.colour}
            model={victimModel}
          />
        </VictimGroup>
        <KillerGroup>
          <PlayerModelGroup
            x={0}
            y={0}
            id='2'
            colour={gameStateLastKill.killer.colour}
            model={killerModel}
          />
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

const KillerGroup = styled('g')`
  animation: jumpIn 2s cubic-bezier(1, 0, 0.8, -0.5);
  animation-fill-mode: forwards;

  @keyframes jumpIn {
    0% {
      opacity: 1;
      transform: translate(-100px, -50px);
    }
    40% {
      opacity: 1;
      transform: translate(0px, 0px);
    }
  }
`

const VictimGroup = styled('g')`
  animation: jumpOut 2s cubic-bezier(0, 0.5, 0.25, 0.75);
  animation-fill-mode: forwards;

  @keyframes jumpOut {
    40% {
      opacity: 1;
      transform: translate(0px, 0px) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: translate(150px, 57px) rotate(700deg);
    }
  }
`
