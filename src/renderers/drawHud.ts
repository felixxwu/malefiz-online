import { colour1 } from '../data/cssVars'
import { store } from '../data/store'
import { getLegalMoves, getLegalStonePlacements } from '../game/legalMoves'
import { isMyTurn } from '../game/playerTurns'
import { Circle } from '../types/mapTypes'
import { circle, polygon } from '../utils/el'
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
    if (store.gameState!.stones.find(stone => stone.circleId === null)) {
      drawStonePlacementMoves()
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
      circle({
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
        if (getLegalMoves(circle!.id).length === 0) continue
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
  return polygon({
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

// draws while circles over all empty circles
function drawStonePlacementMoves() {
  const legalStonePlacements = getLegalStonePlacements()
  for (const circleData of legalStonePlacements) {
    const x = circleData!.position.x * 100
    const y = circleData!.position.y * 100
    hudGroup!.appendChild(
      circle({
        attributes: {
          style: {
            fill: 'white',
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
