import { isMyTurn } from '../../../utils/playerTurns'
import {
  customCircleHighlights,
  gameState,
  gameStateHashTable,
  pieceSelected,
  waitingForServer,
} from '../../../signals/signals'
import { getCircleFromPiece } from '../../../utils/getCircleFromPiece'
import { getLegalMoves, getLegalStonePlacements } from '../../../utils/legalMoves'
import { CircleIndicator, PieceIndicator } from './PieceIndicator'
import { MoveLine } from './MoveLine'
import { getMyPlayer } from '../../../utils/getUsers'
import { MoveDestination } from './MoveDestination'
import { StonePlacement } from './StonePlacement'
import { Circle } from '../../../types/mapTypes'
import { fitToScreen } from '../../../utils/fitToScreen'

export function HudGroup() {
  if (!isMyTurn() || waitingForServer.value) return null

  if (customCircleHighlights.value.length > 0) {
    return (
      <>
        {customCircleHighlights.value.map(circleId => {
          const { x, y } = gameStateHashTable.value[circleId].circle?.position!
          return <CircleIndicator x={x} y={y} />
        })}
      </>
    )
  }

  if (pieceSelected.value === null && gameState.value!.dieRoll !== null) {
    const myPieces = getMyPlayer()!.positions
    const myLegalMoves = myPieces.map(position =>
      getLegalMoves(getCircleFromPiece(position.pieceId)!.id)
    )
    const allCircles: Circle[] = []
    for (const legalMoves of myLegalMoves) {
      for (const legalMove of legalMoves) {
        allCircles.push(legalMove.to)
        allCircles.push(legalMove.from)
      }
    }
    fitToScreen(allCircles, {})
    return (
      <>
        {myLegalMoves.map(legalMoves => legalMoves.map(legalMove => <MoveLine move={legalMove} />))}
        {myPieces.map(position => {
          if (allCircles.find(circle => circle.id === position.circleId)) {
            return <PieceIndicator pieceId={position.pieceId} />
          } else {
            return null
          }
        })}
      </>
    )
  }

  const circle = getCircleFromPiece(pieceSelected.value!)
  const legalMoves = circle ? getLegalMoves(circle.id) : []
  if (legalMoves.length > 0) {
    return (
      <>
        {legalMoves.map(legalMove => (
          <>
            <MoveLine move={legalMove} />
            <MoveDestination circle={legalMove.to} />
            <CircleIndicator x={legalMove.to.position.x} y={legalMove.to.position.y} />
          </>
        ))}
      </>
    )
  }

  if (gameState.value!.stones.find(stone => stone.circleId === null)) {
    const legalStonePlacements = getLegalStonePlacements()
    return (
      <>
        {legalStonePlacements.map(circle => {
          return <StonePlacement circle={circle} />
        })}
      </>
    )
  }

  return null
}
