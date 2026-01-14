import { setCurrentChord, setInterval } from './initAudio'
import { playPluck } from './playPluck'
import { gameState } from '../signals/signals'
import { gameStateHashTable } from '../signals/getters/gameStateHashTable'

export function playChord(chord: string[], decay: number = 2, sustain: number = 0) {
  for (const note of chord) {
    if (!note) {
      console.warn('playChord: Invalid note in chord', chord)
      continue
    }
    playPluck({
      note: note,
      type: 'sawtooth',
      amp: { attack: 0.03, decay, sustain, gain: 0.3 },
      lowpass: { attack: 0.03, decay, sustain, gain: 1500, q: 3 },
    })
  }
  setCurrentChord(chord)

  if (gameState.value && gameStateHashTable.value) {
    const hashTable = gameStateHashTable.value
    const distances: number[] = []

    for (const player of gameState.value.players) {
      for (const position of player.positions) {
        const circleData = hashTable[position.circleId]
        if (circleData && circleData.distanceToFinish !== undefined) {
          distances.push(circleData.distanceToFinish)
        }
      }
    }

    if (distances.length > 0) {
      const averageDistance = distances.reduce((sum, dist) => sum + dist, 0) / distances.length
      setInterval(50 + averageDistance * 6)
    }
  }
}
