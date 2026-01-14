import { sleep } from '../utils/sleep'
import { currentChord } from './initAudio'
import { playPluck } from './playPluck'
import * as Tone from 'tone'

export async function playStonePickup() {
  for (const note of currentChord) {
    if (!note) {
      console.warn('playStonePickup: Invalid note in chord', currentChord)
      continue
    }
    playPluck({
      note: Tone.Frequency(note).transpose(12).toNote(),
      type: 'sawtooth',
      amp: { attack: 0.001, decay: 2, sustain: 0, gain: 0.2 },
      lowpass: { attack: 0.03, decay: 2, sustain: 0, gain: 1500, q: 3 },
    })
    await sleep(100)
  }
}
