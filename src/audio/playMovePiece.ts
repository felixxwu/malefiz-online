import { currentChord, currentIndex } from './initAudio'
import { playPluck } from './playPluck'
import * as Tone from 'tone'

export async function playMovePiece() {
  const noteValue = currentChord[currentIndex]
  if (!noteValue) {
    console.warn('playMovePiece: Invalid note at index', currentIndex, 'in chord', currentChord)
    return
  }

  playPluck({
    note: Tone.Frequency(noteValue).transpose(12).toNote(),
    type: 'sawtooth',
    amp: { attack: 0.001, decay: 2, sustain: 0, gain: 0.2 },
    lowpass: { attack: 0.03, decay: 2, sustain: 0, gain: 1500, q: 3 },
  })
}
