import { CONSTS } from '../data/consts'
import { textOpacity } from '../data/cssVars'
import { GameState } from '../types/gameTypes'
import { elNS } from '../utils/el'
import { playersGroup } from '../utils/getSvgGroup'
import { polygonToXY } from '../utils/polygon'
// import { polygonToXY } from '../utils/polygon'

export function drawStones(gameState: GameState) {
  for (const stone of gameState.stones) {
    const circle = gameState.map.find(circle => circle.id === stone.circleId)!
    const pos = circle.position
    const existingStone = playersGroup!.querySelector(`#s${stone.id}`)
    if (existingStone) {
      existingStone.setAttribute('cx', (pos!.x * 100).toString())
      existingStone.setAttribute('cy', (pos!.y * 100).toString())
    } else {
      const stonePoly = elNS('polygon')({
        attributes: {
          id: 's' + stone.stoneId,
          style: {
            transition: `${CONSTS.PLAYER_TRANSITION}ms`,
            filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))',
            opacity: textOpacity.value,
            willChange: 'transition',
          },
        },
        readonlyAttributes: {
          points: [0, 1, 2, 3, 4, 5, 6, 7]
            .map(i => polygonToXY(i, 8, 20))
            .map(({ x, y }) => `${pos!.x * 100 + x},${pos!.y * 100 + y}`)
            .join(' '),
          fill: 'white',
        },
      })
      playersGroup!.appendChild(stonePoly)
    }
  }
}
