import { consts } from '../config/consts'
import { sleep } from '../utils/sleep'
import { setInterval } from './initAudio'
import { playChord } from './playChord'
import * as Tone from 'tone'

let applausePlayer: Tone.Player | null = null

async function getApplausePlayer(): Promise<Tone.Player> {
  if (!applausePlayer) {
    applausePlayer = new Tone.Player('/applause.mp3')
    applausePlayer.volume.value = Tone.gainToDb(0.4)
    applausePlayer.toDestination()
    while (!applausePlayer.loaded) {
      await sleep(10)
    }
  }
  return applausePlayer
}

export async function playWin() {
  await sleep(1000)

  const player = await getApplausePlayer()
  player.start()

  playChord(consts.winChords[0], 10, 1)
  setInterval(80)
  await sleep(1000)

  playChord(consts.winChords[1], 10, 1)
  setInterval(80)
  await sleep(1000)

  playChord(consts.winChords[2], 10, 1)
  setInterval(80)
  await sleep(500)

  playChord(consts.winChords[3], 10, 1)
  setInterval(80)
  await sleep(1500)

  playChord([])
}
