import { isMyTurn } from '../../../utils/playerTurns'
import { gameState, pieceSelected, waitingForServer } from '../../../signals/signals'
import { getCircleFromPiece } from '../../../utils/getCircleFromPiece'
import { getLegalMoves, getLegalStonePlacements } from '../../../utils/legalMoves'
import { PieceIndicator } from './PieceIndicator'
import { MoveLine } from './MoveLine'
import { getMyPlayer } from '../../../utils/getUsers'
import { MoveDestination } from './MoveDestination'
import { StonePlacement } from './StonePlacement'

export function HudGroup() {
  if (!isMyTurn() || waitingForServer.value) return null

  if (pieceSelected.value === null && gameState.value!.dieRoll !== null) {
    const myPieces = getMyPlayer()!.positions
    const myLegalMoves = myPieces.map(position =>
      getLegalMoves(getCircleFromPiece(position.pieceId)!.id)
    )
    return (
      <>
        {myLegalMoves.map(legalMoves => legalMoves.map(legalMove => <MoveLine move={legalMove} />))}
        {myPieces.map(position => {
          return <PieceIndicator pieceId={position.pieceId} />
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
