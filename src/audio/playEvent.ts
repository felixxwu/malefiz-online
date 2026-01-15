import * as Tone from 'tone'
import { playPluck } from './playPluck'
import { currentChord } from './initAudio'
import { sleep } from '../utils/sleep'

export async function playEvent() {
  // Play all notes in the current chord as single notes, then transpose up and play again
  const playChordAtOctave = async (octaveOffset: number) => {
    for (const note of currentChord) {
      if (!note) continue

      const transposedNote = Tone.Frequency(note).transpose(octaveOffset).toNote()
      playPluck({
        note: transposedNote,
        type: 'sine',
        voices: 1,
        amp: { attack: 0.01, decay: 1.5, sustain: 0, gain: 0.3 },
        lowpass: { attack: 0.01, decay: 1.5, sustain: 1, gain: 20000, q: 1 },
      })

      // Small delay between notes
      await sleep(100)
    }
  }

  // Play at original octave
  await playChordAtOctave(12)

  // Play at +1 octave (12 semitones)
  await sleep(100)
  await playChordAtOctave(24)

  // Play at +2 octaves (24 semitones)
  await sleep(100)
  await playChordAtOctave(36)
}
