import { styled } from 'goober'
import { Item } from '.'
import { updateGame } from '../dbactions/updateGame'
import { gameState, gameStateHashTable, lastDieRoll, playerModel } from '../signals/signals'
import { getNewItems } from '../utils/getNewItems'
import { getMyPlayerId } from '../utils/getUsers'
import { getNextPlayer } from '../utils/playerTurns'
import { sleep } from '../utils/sleep'
import { ItemAlert } from './ItemAlert'
import { PlayerModelGroup } from '../components/MapRenderer/PlayerGroup'
import { consts } from '../config/consts'
import { players } from '../utils/players'
import { currentPlayer } from '../utils/currentPlayer'
import { useEffect, useState } from 'preact/hooks'

export const PositionSwap = {
  name: 'Position Swap',
  description: 'Swap positions with a random opponent piece.',
  colour: 'hsl(100, 70%, 60%)',
  icon: () => (
    <path
      d='M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z'
      style={{
        fill: 'black',
        transform: 'translate(-12px, -12px) ',
      }}
    />
  ),
  actionWhenActive: {
    onClick: () => {},
    text: 'Swapping positions',
    showDie: false,
    clickable: false,
  },
  onCircleClickWhenActive: null,
  alert: () => (
    <ItemAlert item={PositionSwap}>
      <SwapGraphic />
    </ItemAlert>
  ),
  onPickup: async (_, circleId) => {
    await sleep(500)

    const opponents = gameState.value!.players.filter(player => player.id !== currentPlayer().id)
    const validPieces: { circleId: string; playerId: string }[] = []
    for (const opponent of opponents) {
      for (const position of opponent.positions) {
        if (!gameStateHashTable.value[position.circleId].circle?.start) {
          validPieces.push({ circleId: position.circleId, playerId: opponent.id })
        }
      }
    }

    if (validPieces.length === 0) {
      updateGame({
        ...(lastDieRoll.value === 6 ? {} : { playerTurn: getNextPlayer() }),
        items: getNewItems([circleId]),
        dieRoll: null,
      })
      return
    }

    const randomPiece = validPieces[Math.floor(Math.random() * validPieces.length)]
    updateGame({
      players: gameState.value!.players.map(player => {
        if (player.id === currentPlayer().id) {
          return {
            ...player,
            positions: player.positions.map(position =>
              position.circleId === circleId
                ? {
                    ...position,
                    circleId: randomPiece.circleId,
                  }
                : position
            ),
          }
        } else if (player.id === randomPiece.playerId) {
          return {
            ...player,
            positions: player.positions.map(position =>
              position.circleId === randomPiece.circleId ? { ...position, circleId } : position
            ),
          }
        } else {
          return player
        }
      }),

      ...(lastDieRoll.value === 6 ? {} : { playerTurn: getNextPlayer() }),
      items: getNewItems([circleId]),
      dieRoll: null,
    })
  },
  aiAction: () => {},
} as const satisfies Item

function SwapGraphic() {
  const [randomPlayer, setRandomPlayer] = useState(players[0])

  const playerAColour = players.find(player => player.id === getMyPlayerId())?.colour
  const myModel = playerModel.value

  useEffect(() => {
    ;(async () => {
      for (let i = 1; i < 6; i++) {
        await sleep(300)
        setRandomPlayer(players[i])
      }
    })()
  }, [])

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
      <PlayerA>
        <PlayerModelGroup colour={playerAColour!} model={myModel} />
      </PlayerA>
      <PlayerB>
        <PlayerModelGroup colour={randomPlayer.colour} model={randomPlayer.model} />
      </PlayerB>
    </Svg>
  )
}

const Svg = styled('svg')`
  overflow: visible;
  width: 1px;
  height: 1px;
  transform: scale(1.5) translateY(50px);
`

const PlayerA = styled('g')`
  animation: positionSwapTo 2s cubic-bezier(0.8, 0, 0.2, 1);
  animation-fill-mode: forwards;

  @keyframes positionSwapTo {
    0% {
      transform: translate(-100px, 0px);
    }
    50% {
      transform: translate(0px, -30px);
    }
    100% {
      transform: translate(100px, 0px);
    }
  }
`

const PlayerB = styled('g')`
  animation: positionSwapFrom 2s cubic-bezier(0.8, 0, 0.2, 1);
  animation-fill-mode: forwards;

  @keyframes positionSwapFrom {
    0% {
      transform: translate(100px, 0px);
    }
    50% {
      transform: translate(0px, 30px);
    }
    100% {
      transform: translate(-100px, 0px);
    }
  }
`
