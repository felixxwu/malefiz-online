import { sleep } from '../utils/sleep'
import { currentChord, currentIndex } from './initAudio'
import { playPluck } from './playPluck'
import * as Tone from 'tone'

export async function playStonePlace() {
  const noteValue1 = currentChord[currentIndex]
  if (noteValue1) {
    playPluck({
      note: Tone.Frequency(noteValue1).transpose(12).toNote(),
      type: 'sawtooth',
      amp: { attack: 0.001, decay: 2, sustain: 0, gain: 0.2 },
      lowpass: { attack: 0.03, decay: 2, sustain: 0, gain: 1500, q: 3 },
    })
  }

  await sleep(100)

  const nextIndex = (currentIndex + 1) % currentChord.length
  const noteValue2 = currentChord[nextIndex]
  if (noteValue2) {
    playPluck({
      note: Tone.Frequency(noteValue2).transpose(12).toNote(),
      type: 'sawtooth',
      amp: { attack: 0.001, decay: 2, sustain: 0, gain: 0.2 },
      lowpass: { attack: 0.03, decay: 2, sustain: 0, gain: 1500, q: 3 },
    })
  }
}
