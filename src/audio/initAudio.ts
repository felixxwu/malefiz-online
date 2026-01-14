import * as Tone from 'tone'
import { playPluck } from './playPluck'
import { consts } from '../config/consts'
import { audioVolume } from '../signals/signals'

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

// Convert volume percentage (0-100) to decibels and apply to Tone.Destination
// 0% = -Infinity dB (mute), 100% = 0 dB (full volume)
function applyVolume(volumePercent: number) {
  const clampedVolume = Math.max(0, Math.min(100, volumePercent))
  if (clampedVolume === 0) {
    Tone.Destination.volume.value = -Infinity
  } else {
    // Convert percentage to decibels: 0-100% maps to -40dB to 0dB
    // Using linear mapping for simplicity
    const db = (clampedVolume / 100 - 1) * 40
    Tone.Destination.volume.value = db
  }
}

let volumeInitialized = false

function initializeVolume() {
  if (volumeInitialized) return
  volumeInitialized = true

  // Initialize volume from stored signal
  applyVolume(audioVolume.value)

  // Subscribe to volume changes
  audioVolume.subscribe(volume => {
    applyVolume(volume)
  })
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
      voices: 1,
      amp: { attack: 0.001, decay: 2, sustain: 0, gain: 0.15 },
      lowpass: { attack: 0.03, decay: 1, sustain: 1, gain: 20000, q: 1 },
    })
    currentIndex = (currentIndex + 1) % currentChord.length
    scheduleNextNote()
  }, interval)
}

export const setupInitAudio = () => {
  // Initialize volume control
  initializeVolume()

  window.addEventListener('click', initAudio, { once: true })
  window.addEventListener('pointerdown', initAudio, { once: true })
  window.addEventListener('touchstart', initAudio, { once: true })
}

export const initAudio = () => {
  if (isRunning) return

  isRunning = true
  scheduleNextNote()
}
