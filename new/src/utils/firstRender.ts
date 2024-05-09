import { doc, onSnapshot } from 'firebase/firestore'
import { colours } from '../config/colours'
import { gameState, map, screenHeight, screenWidth, textOpacity } from '../signals/signals'
import { fitToScreen } from './fitToScreen'
import { gameId } from './gameId'
import { sleep } from './sleep'
import { zoomIntoCircle } from './zoomIntoCircle'
import { db } from '../config/firebase'
import { GameState } from '../types/gameTypes'
import { mapList } from '../maps/mapList'
import { playAiIfApplicable } from './playAiIfApplicable'

export async function firstRender() {
  window.document.body.style.backgroundColor = colours.background

  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth
    screenHeight.value = window.innerHeight
    fitToScreen(map.value, { transition: 0 })
  })

  if (gameId) {
    let firstDataLoad = true
    onSnapshot(doc(db, 'games', gameId), doc => {
      const docData = doc.data() as GameState
      gameState.value = docData
      if (firstDataLoad) {
        firstDataLoad = false
        map.value = mapList[docData.mapNum].map
        introSequence()

        // keep user online
        // setInterval(async () => {
        //   updateLastOnline(Date.now())
        // }, 5000)

        // // check for offline players
        // setInterval(() => {
        //   checkForOnlinePlayers()
        // }, 2000)
      }
    })

    setInterval(() => {
      playAiIfApplicable()
    }, 2000)
  } else {
    introSequence()
  }
}

async function introSequence() {
  zoomIntoCircle({ transition: 0 })
  await sleep(100)
  fitToScreen(map.value, { transition: 1300, translateDelay: 600 })
  await sleep(1000)
  textOpacity.value = 1
}
