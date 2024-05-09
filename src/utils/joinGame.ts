import { playerModel, userId } from '../signals/signals'
import { PlayerID, UserID } from '../types/gameTypes'
import { updateGame } from './updateGame'

export async function joinGame(playerId: PlayerID) {
  const userKey: UserID = `user${userId}`
  await updateGame({
    [userKey]: {
      playerToControl: playerId,
      timeJoined: Date.now(),
      playerModel: playerModel.value,
    },
  })
  // TODO: check if place is already taken
}