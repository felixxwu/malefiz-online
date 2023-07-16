import { CONSTS } from '../data/consts'
import { textOpacity } from '../data/cssVars'
import { getMapPosition } from '../maps/mapUtils'
import { GameState } from '../types/gameTypes'
import { elNS } from '../utils/el'
import { playersGroup } from '../utils/getSvgGroup'
import { polygonToXY } from '../utils/polygon'

export function drawStones(gameState: GameState) {
  for (const stone of gameState.stones) {
    const circle = gameState.map.find(circle => circle.id === stone.circleId)
    const mapPosition = getMapPosition(gameState.map)
    const pos = circle
      ? circle.position
      : { x: mapPosition.mapLeft + mapPosition.mapWidth / 2, y: mapPosition.mapBottom }
    const existingStone = playersGroup!.querySelector<SVGElement>(`#s${stone.stoneId}`)
    if (existingStone) {
      existingStone.style.transform = `translate(${pos!.x * 100}px, ${pos!.y * 100}px)`
    } else {
      const stonePoly = elNS('polygon')({
        attributes: {
          id: 's' + stone.stoneId,
          style: {
            transition: `${CONSTS.PLAYER_TRANSITION}ms`,
            transform: `translate(${pos!.x * 100}px, ${pos!.y * 100}px)`,
            filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))',
            opacity: textOpacity.value,
            willChange: 'transform',
            stroke: 'black',
            strokeWidth: '5',
            strokeLinejoin: 'round',
          },
        },
        readonlyAttributes: {
          points: [0, 1, 2, 3, 4, 5, 6, 7]
            .map(i => polygonToXY(i, 8, 22.5))
            .map(({ x, y }) => `${x},${y}`)
            .join(' '),
          fill: 'white',
        },
      })
      playersGroup!.appendChild(stonePoly)
    }
  }
}
