import { colour1 } from '../data/cssVars'
import { store } from '../data/store'
import { getLegalMoves } from '../game/legalMoves'
import { isMyTurn } from '../game/playerTurns'
import { Circle } from '../types/mapTypes'
import { elNS } from '../utils/el'
import { getCircleFromPiece } from '../utils/getCircleFromPiece'
import { hudGroup } from '../utils/getSvgGroup'

export function drawHud() {
  hudGroup!.innerHTML = ''
  if (isMyTurn() && !store.waitingForServer) {
    if (store.pieceSelected === null) {
      if (store.gameState!.dieRoll !== null) {
        drawIndicatorOverMyPieces()
      }
    } else {
      const circle = getCircleFromPiece(store.pieceSelected!)!
      const legalMoves = getLegalMoves(circle.id)
      drawIndicatorOverSelectedPiece()
      drawLegalMoves(legalMoves)
    }
  }
}

function drawLegalMoves(legalMoves: Circle[]) {
  const myColour = store.gameState!.players.find(
    player => player.id === store.gameState!.playerTurn
  )!.colour
  for (const legalMove of legalMoves) {
    const x = legalMove.position.x * 100
    const y = legalMove.position.y * 100
    hudGroup!.appendChild(
      elNS('circle')({
        attributes: {
          style: {
            fill: myColour,
          },
        },
        readonlyAttributes: {
          cx: x.toString(),
          cy: y.toString(),
          r: '10',
          class: 'flashing',
        },
      })
    )
  }
}

function drawIndicatorOverMyPieces() {
  for (const player of store.gameState!.players) {
    if (player.id === store.gameState!.playerTurn) {
      for (const position of player.positions) {
        const circle = getCircleFromPiece(position.pieceId)
        const x = circle!.position.x * 100
        const y = circle!.position.y * 100 - 50
        hudGroup!.appendChild(HudElement(x, y))
      }
    }
  }
}

function drawIndicatorOverSelectedPiece() {
  const selectedCircle = getCircleFromPiece(store.pieceSelected!)
  const x = selectedCircle!.position.x * 100
  const y = selectedCircle!.position.y * 100 - 50
  hudGroup!.appendChild(HudElement(x, y))
}

function HudElement(x: number, y: number) {
  return elNS('polygon')({
    attributes: {
      style: {
        fill: colour1.value,
        stroke: 'black',
        strokeWidth: '5px',
        strokeLinejoin: 'round',
      },
    },
    readonlyAttributes: {
      points: `${x - 10},${y} ${x + 10},${y} ${x},${y + 20}`,
      class: 'upAndDown',
    },
  })
}
