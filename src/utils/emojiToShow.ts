import { consts } from '../config/consts'
import { getUserControllingPlayer } from './getUserControllingPlayer'
import { getMyPlayerId } from './getUsers'

export function emojiToShow(playerId: string) {
  const isMe = getMyPlayerId() === playerId
  const user = getUserControllingPlayer(playerId)
  // show only my own placeholder
  if (!isMe && user && user.emoji === consts.placeholderEmoji) return null

  return user ? user.emoji : null
}
