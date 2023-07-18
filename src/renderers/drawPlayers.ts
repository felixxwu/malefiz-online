import { CONSTS } from '../data/consts'
import { textOpacity } from '../data/cssVars'
import { GameState } from '../types/gameTypes'
import { circle } from '../utils/el'
import { playersGroup } from '../utils/getSvgGroup'
import { polygonToXY } from '../utils/polygon'

const spacing = 0.3
const spokes = 5
const playerSize = 25

export function drawPlayers(gameState: GameState) {
  for (const player of gameState.players) {
    for (const [i, position] of player.positions.entries()) {
      const circleData = gameState.map.find(circle => circle.id === position.circleId)!
      const pos = circleData.start
        ? {
            x: circleData.position.x + polygonToXY(i, spokes, spacing).x,
            y: circleData.position.y + polygonToXY(i, spokes, spacing).y,
          }
        : circleData.position
      const existingPiece = playersGroup!.querySelector<SVGElement>(`#p${position.pieceId}`)
      if (existingPiece) {
        existingPiece.style.transform = `translate(${pos!.x * 100}px, ${pos!.y * 100}px)`
      } else {
        const positionCircle = circle({
          attributes: {
            id: 'p' + position.pieceId,
            style: {
              stroke: 'black',
              strokeWidth: '2',
              transition: `${CONSTS.PLAYER_TRANSITION}ms`,
              transform: `translate(${pos!.x * 100}px, ${pos!.y * 100}px)`,
              filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))',
              opacity: textOpacity.value,
              willChange: 'transform',
            },
          },
          readonlyAttributes: {
            cx: '0',
            cy: '0',
            r: `${playerSize}`,
            fill: player.colour,
          },
        })
        playersGroup!.appendChild(positionCircle)
      }
    }
  }
}

export function clearPlayersAndStones() {
  playersGroup!.innerHTML = ''
}
