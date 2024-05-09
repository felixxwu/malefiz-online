import { gameState } from '../signals'
import { AI1, selectedBestPieceToMove } from './ai'
import { getMyPlayerId, getUsers } from './getUsers'
import { getLegalStonePlacements } from './legalMoves'
import { placeStone } from './placeStone'
import { playerPiecesWithMoves } from './playerPiecesWithMoves'
import { rollDie } from './rollDie'
import { submitMove } from './submitMove'

export async function playAiIfApplicable() {
  if (!canAiPlay()) return

  // place stone if taken
  if (gameState.value!.stones.some(stone => stone.circleId === null)) {
    const legalStonePlacements = getLegalStonePlacements()
    const placement = AI1.getBestStonePlacement(legalStonePlacements)
    placeStone(placement.id)
    return
  }

  if (gameState.value!.dieRoll === null) {
    rollDie()
    return
  }

  const currentPlayer = gameState.value!.playerTurn
  const player = gameState.value!.players.find(player => player.id === currentPlayer)!
  const piecesWithLegalMoves = playerPiecesWithMoves(player)

  // re-roll if no legal moves
  if (piecesWithLegalMoves.length === 0) {
    rollDie()
    return
  }

  const bestMove = selectedBestPieceToMove(piecesWithLegalMoves)
  await submitMove(bestMove)
}

function canAiPlay() {
  if (!gameState.value) return false

  if (!isUserHost()) return false

  const playerTurn = gameState.value.playerTurn
  const playerPlaying = gameState.value.players.find(player => player.id === playerTurn)
  if (isPlayerAi(playerPlaying?.id)) return true

  return false
}

function isUserHost() {
  const users = getUsers()
  users.sort((a, b) => a.playerToControl.localeCompare(b.playerToControl))
  const humanPlayers = users.map(u =>
    gameState.value!.players.find(p => p.id === u.playerToControl)
  )
  const myIndex = humanPlayers.findIndex(p => p?.id === getMyPlayerId())
  return myIndex === 0
}

function isPlayerAi(playerId?: string) {
  if (!playerId) return false
  const users = getUsers()
  return !users.find(u => u.playerToControl === playerId)
}
