import { gameOver, gameState, lastDieRoll } from '../signals/signals'
import { getActiveItem } from './getActiveItem'
import { getCircleFromPiece } from './getCircleFromPiece'
import { getMyPlayer, getMyPlayerId } from './getUsers'
import { getLegalMoves } from './legalMoves'

export function getAction() {
  if (gameOver.value) return 'none' as const
  if (!gameState.value) return 'none' as const

  const myTurn = gameState.value.playerTurn === getMyPlayerId()
  const stoneInPit = gameState.value.stones.find(stone => stone.circleId === null)
  const gameNotStarted = gameState.value.playerTurn === null
  const dieNotRolled = gameState.value.dieRoll === null
  const playerWhoIsPlaying = gameState.value.players.find(
    player => player.id === gameState.value!.playerTurn
  )
  const activeItem = getActiveItem()

  // if (waitingForServer.value)
  //   return (
  //     <Div>
  //       <WaitingForServer />
  //     </Div>
  //   )

  if (myTurn && activeItem) return 'itemaction' as const
  if (!myTurn && activeItem && playerWhoIsPlaying) return 'pickedupmessage' as const
  if (getMyPlayerId() && gameNotStarted) return 'startgame' as const
  if (stoneInPit && myTurn) return 'placestone' as const
  if (myTurn && dieNotRolled && lastDieRoll.value === 6) return 'rollagain' as const
  if (myTurn && dieNotRolled) return 'roll' as const

  if (myTurn && gameState.value && !dieNotRolled) {
    const myPieces = getMyPlayer()!.positions
    const myLegalMoves = myPieces
      .map(position => getLegalMoves(getCircleFromPiece(position.pieceId)!.id))
      .reduce((acc, val) => acc.concat(val), [])
    if (myLegalMoves.length > 0) {
      return 'yourturn' as const
    } else {
      return 'rollagainnolegal' as const
    }
  }

  if (!myTurn && gameState.value && playerWhoIsPlaying) return 'playerturn' as const

  return 'none' as const
}
