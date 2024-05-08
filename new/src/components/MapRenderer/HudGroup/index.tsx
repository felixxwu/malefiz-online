import { isMyTurn } from '../../../utils/playerTurns'
import { gameState, pieceSelected, waitingForServer } from '../../../signals'
import { getCircleFromPiece } from '../../../utils/getCircleFromPiece'
import { getLegalMoves } from '../../../utils/legalMoves'
import { PieceIndicator } from './PieceIndicator'
import { MoveLine } from './MoveLine'
import { getMyPlayer } from '../../../utils/getUsers'
import { MoveDestination } from './MoveDestination'

export function HudGroup() {
  if (!isMyTurn() || waitingForServer.value) return null
  if (pieceSelected.value === null && gameState.value!.dieRoll !== null) {
    const myPieces = getMyPlayer()!.positions
    const myLegalMoves = myPieces.map(position =>
      getLegalMoves(getCircleFromPiece(position.pieceId)!.id)
    )
    return (
      <>
        {myPieces.map(position => {
          return <PieceIndicator pieceId={position.pieceId} />
        })}
        {myLegalMoves.map(legalMoves => legalMoves.map(legalMove => <MoveLine move={legalMove} />))}
      </>
    )
  }
  const circle = getCircleFromPiece(pieceSelected.value!)!
  const legalMoves = getLegalMoves(circle.id)
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
  if (gameState.value!.stones.find(stone => stone.circleId === null)) {
    console.log(`drawStonePlacementMoves`)
    // drawStonePlacementMoves()
  }

  return null
}
