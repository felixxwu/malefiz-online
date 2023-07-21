import { colour1 } from '../data/cssVars'
import { store } from '../data/store'
import { getLegalMoves, getLegalStonePlacements } from '../game/legalMoves'
import { isMyTurn } from '../game/playerTurns'
import { Move } from '../types/gameTypes'
import { circle, line, polygon } from '../utils/el'
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

function drawLegalMoves(legalMoves: Move[]) {
  const myColour = store.gameState!.players.find(
    player => player.id === store.gameState!.playerTurn
  )!.colour
  for (const legalMove of legalMoves) {
    const x = legalMove.to.position.x * 100
    const y = legalMove.to.position.y * 100
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
        const legalMoves = getLegalMoves(circle!.id)
        if (legalMoves.length === 0) continue
        const x = circle!.position.x * 100
        const y = circle!.position.y * 100 - 50
        hudGroup!.appendChild(HudElement(x, y))
        for (const legalMove of legalMoves) {
          hudGroup!.appendChild(MoveLine(legalMove))
        }
      }
    }
  }
}

function MoveLine(move: Move) {
  const myColour = store.gameState!.players.find(
    player => player.id === store.gameState!.playerTurn
  )!.colour
  const x1 = move.from.position.x * 100
  const y1 = move.from.position.y * 100
  const x2 = move.to.position.x * 100
  const y2 = move.to.position.y * 100
  return line({
    attributes: {
      style: {
        stroke: myColour,
        strokeWidth: '3px',
        strokeLinecap: 'round',
        strokeDasharray: '1,10',
        opacity: '1',
      },
    },
    readonlyAttributes: {
      x1: x1.toString(),
      y1: y1.toString(),
      x2: x2.toString(),
      y2: y2.toString(),
    },
  })
}

function drawIndicatorOverSelectedPiece() {
  const selectedCircle = getCircleFromPiece(store.pieceSelected!)
  const x = selectedCircle!.position.x * 100
  const y = selectedCircle!.position.y * 100 - 50
  const legalMoves = getLegalMoves(selectedCircle!.id)
  hudGroup!.appendChild(HudElement(x, y))
  for (const legalMove of legalMoves) {
    hudGroup!.appendChild(MoveLine(legalMove))
  }
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
