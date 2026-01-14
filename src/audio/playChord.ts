import { setCurrentChord, setInterval } from './initAudio'
import { playPluck } from './playPluck'
import { gameState } from '../signals/signals'
import { gameStateHashTable } from '../signals/getters/gameStateHashTable'

export function playChord(chord: string[]) {
  for (const note of chord) {
    if (!note) {
      console.warn('playChord: Invalid note in chord', chord)
      continue
    }
    playPluck({
      note: note,
      type: 'sawtooth',
      amp: { attack: 0.001, decay: 2, sustain: 0, gain: 0.3 },
      lowpass: { attack: 0.03, decay: 2, sustain: 0, gain: 1500, q: 3 },
    })
  }
  setCurrentChord(chord)

  // Check game state and find closest piece to finish
  if (gameState.value && gameStateHashTable.value) {
    const hashTable = gameStateHashTable.value
    let closestDistance: number | null = null

    // Iterate through all players and their pieces
    for (const player of gameState.value.players) {
      for (const position of player.positions) {
        const circleData = hashTable[position.circleId]
        if (circleData && circleData.distanceToFinish !== undefined) {
          const distance = circleData.distanceToFinish
          if (closestDistance === null || distance < closestDistance) {
            closestDistance = distance
          }
        }
      }
    }

    if (closestDistance !== null) {
      setInterval(150 + closestDistance * 5)
    }
  }
}
