import * as Tone from 'tone'
import { playPluck } from './playPluck'
import { consts } from '../config/consts'

let interval = 600
export let currentChord = consts.chords[3]
export let currentIndex = 0
let isRunning = false

export function setCurrentChord(chord: string[]) {
  currentChord = chord
}

export function setInterval(newInterval: number) {
  interval = newInterval
}

const scheduleNextNote = () => {
  if (!isRunning) return

  setTimeout(() => {
    const noteValue = currentChord[currentIndex]
    if (!noteValue) {
      console.warn(
        'scheduleNextNote: Invalid note at index',
        currentIndex,
        'in chord',
        currentChord
      )
      currentIndex = (currentIndex + 1) % currentChord.length
      scheduleNextNote()
      return
    }

    playPluck({
      note: Tone.Frequency(noteValue).transpose(12).toNote(),
      type: 'sine',
      amp: { attack: 0.001, decay: 2, sustain: 0, gain: 0.15 },
      lowpass: { attack: 0.03, decay: 1, sustain: 1, gain: 20000, q: 1 },
    })
    currentIndex = (currentIndex + 1) % currentChord.length
    scheduleNextNote()
  }, interval)
}

export const setupInitAudio = () => {
  window.addEventListener('click', initAudio, { once: true })
  window.addEventListener('keydown', initAudio, { once: true })
  window.addEventListener('pointerdown', initAudio, { once: true })
  window.addEventListener('touchstart', initAudio, { once: true })
}

export const initAudio = () => {
  if (isRunning) return

  isRunning = true
  scheduleNextNote()
}
