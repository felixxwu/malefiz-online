import { sleep } from '../utils/sleep'
import { currentChord, currentIndex } from './initAudio'
import { playPluck } from './playPluck'
import * as Tone from 'tone'

export async function playStonePlace() {
  playPluck({
    note: Tone.Frequency(currentChord[currentIndex]).transpose(12).toNote(),
    type: 'sawtooth',
    amp: { attack: 0.001, decay: 2, sustain: 0, gain: 0.2 },
    lowpass: { attack: 0.03, decay: 2, sustain: 0, gain: 1500, q: 3 },
  })

  await sleep(100)

  playPluck({
    note: Tone.Frequency(currentChord[currentIndex + (1 % currentChord.length)])
      .transpose(12)
      .toNote(),
    type: 'sawtooth',
    amp: { attack: 0.001, decay: 2, sustain: 0, gain: 0.2 },
    lowpass: { attack: 0.03, decay: 2, sustain: 0, gain: 1500, q: 3 },
  })
}
