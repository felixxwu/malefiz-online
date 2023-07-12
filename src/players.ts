import { GameState } from './game'
import { playersGroup } from './getSVG'

export function updatePlayers(gameState: GameState) {
  for (const player of gameState.players) {
    for (const position of player.positions) {
      const pos = gameState.map.find(circle => circle.id === position.circleId)!.position
      const existingPiece = playersGroup!.querySelector(`#p${position.pieceId}`)
      if (existingPiece) {
        existingPiece.setAttribute('cx', (pos!.x * 100).toString())
        existingPiece.setAttribute('cy', (pos!.y * 100).toString())
      } else {
        const positionCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        positionCircle.setAttribute('id', 'p' + position.pieceId)
        positionCircle.setAttribute('cx', (pos!.x * 100).toString())
        positionCircle.setAttribute('cy', (pos!.y * 100).toString())
        positionCircle.setAttribute('r', '32')
        positionCircle.setAttribute('fill', player.colour)
        positionCircle.style.transition = 'all 0.5s'
        positionCircle.style.filter = 'drop-shadow(0 0 3px rgba(0,0,0,0.3))'
        playersGroup!.appendChild(positionCircle)
      }
    }
  }
}
