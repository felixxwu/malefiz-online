import { consts } from '../../config/consts'
import { gameState } from '../signals'
import { getUserControllingPlayer } from './getUserControllingPlayer'
import { getMyPlayerId } from './getUsers'

const temperGradient = ['🙂', '🙁', '😠', '😡', '🤬']

export function emojiToShow(playerId: string) {
  if (!gameState.value) return null

  const isMe = getMyPlayerId() === playerId
  const user = getUserControllingPlayer(playerId)
  const player = gameState.value.players.find(p => p.id === playerId)!
  // show only my own placeholder
  if (!isMe && user && user.emoji === consts.placeholderEmoji) return null

  return user
    ? user.emoji
    : temperGradient[Math.min(Math.floor(player.aiTemper / 2), temperGradient.length - 1)]
}
