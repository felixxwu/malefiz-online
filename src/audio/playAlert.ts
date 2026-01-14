import { sleep } from '../utils/sleep'
import { currentChord } from './initAudio'
import { playChord } from './playChord'
import { playMovePiece } from './playMovePiece'

export async function playAlert() {
  playMovePiece()

  await sleep(1000)
  for (let i = 0; i < 3; i++) {
    playChord(currentChord)
    await sleep(100)
  }
}
