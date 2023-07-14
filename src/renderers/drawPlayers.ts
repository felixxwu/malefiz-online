import { CONSTS } from '../data/consts'
import { textOpacity } from '../data/cssVars'
import { GameState } from '../types/gameTypes'
import { elNS } from '../utils/el'
import { playersGroup } from '../utils/getSvgGroup'
import { polygonToXY } from '../utils/polygon'

const spacing = 0.3
const spokes = 5

export function drawPlayers(gameState: GameState) {
  for (const player of gameState.players) {
    for (const [i, position] of player.positions.entries()) {
      const circle = gameState.map.find(circle => circle.id === position.circleId)!
      const pos = circle.start
        ? {
            x: circle.position.x + polygonToXY(i, spokes, spacing).x,
            y: circle.position.y + polygonToXY(i, spokes, spacing).y,
          }
        : circle.position
      const existingPiece = playersGroup!.querySelector(`#p${position.pieceId}`)
      if (existingPiece) {
        existingPiece.setAttribute('cx', (pos!.x * 100).toString())
        existingPiece.setAttribute('cy', (pos!.y * 100).toString())
      } else {
        const positionCircle = elNS('circle')({
          attributes: {
            id: 'p' + position.pieceId,
            style: {
              transition: `${CONSTS.PLAYER_TRANSITION}ms`,
              filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))',
              opacity: textOpacity.value,
            },
          },
          readonlyAttributes: {
            cx: (pos!.x * 100).toString(),
            cy: (pos!.y * 100).toString(),
            r: '20',
            fill: player.colour,
          },
        })
        playersGroup!.appendChild(positionCircle)
      }
    }
  }
}
