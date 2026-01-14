import * as Tone from 'tone'
import { playPluck } from './playPluck'

let interval = 600
export let currentChord = ['A3', 'C3', 'E3', 'G3']
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
    console.log(`• interval`, interval)
    playPluck({
      note: Tone.Frequency(currentChord[currentIndex]).transpose(12).toNote(),
      type: 'sine',
      amp: { attack: 0.001, decay: 2, sustain: 0, gain: 0.1 },
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
