import { leaveGame } from '../game/leaveGame'

export function beforeunload() {
  window.addEventListener('beforeunload', () => {
    leaveGame()
  })
}
