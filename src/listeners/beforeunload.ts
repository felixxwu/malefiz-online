import { leaveGame } from '../game'

export function beforeunload() {
  window.addEventListener('beforeunload', () => {
    leaveGame()
  })
}
