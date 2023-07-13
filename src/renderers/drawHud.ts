import { colour1 } from '../data/cssVars'
import { store } from '../data/store'
import { isMyTurn } from '../game/playerTurns'
import { elNS } from '../utils/el'
import { getCircleFromPiece } from '../utils/getCircleFromPiece'
import { hudGroup } from '../utils/getSvgGroup'

export function drawHud() {
  hudGroup!.innerHTML = ''
  if (store.pieceSelected !== null && isMyTurn()) {
    drawIndicatorOverSelectedPiece()
  }
  if (store.pieceSelected === null && isMyTurn()) {
    drawIndicatorOverMyPieces()
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
