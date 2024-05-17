import { styled } from 'goober'
import './css/lexend.css'
import './css/styles.css'
import { MapRenderer } from './components/MapRenderer'
import { useEffect } from 'preact/hooks'
import { UI } from './components/UI'
import { colours } from './config/colours'
import { gameState, map, screenHeight, screenWidth, textOpacity } from './signals/signals'
import { fitToScreen } from './signals/actions/fitToScreen'
import { gameId } from './signals/getters/gameId'
import { doc, onSnapshot } from 'firebase/firestore'
import { GameState } from './types/gameTypes'
import { mapList } from './maps/mapList'
import { playAiIfApplicable } from './signals/actions/playAiIfApplicable'
import { db } from './config/firebase'
import { zoomIntoCircle } from './signals/actions/zoomIntoCircle'
import { sleep } from './utils/sleep'

export function App() {
  useEffect(() => {
    window.document.body.style.opacity = '0'
    window.document.body.style.transition = '1s'

    setTimeout(() => {
      window.document.body.style.backgroundColor = colours.background
      window.document.body.style.opacity = '1'
    })

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
        }
      })

      setInterval(playAiIfApplicable, 2000)
    } else {
      introSequence()
    }
  }, [])

  return (
    <Div>
      <MapRenderer />
      <UI />
    </Div>
  )
}

const Div = styled('div')`
  height: 100vh;
  overflow: hidden;
`

export async function introSequence() {
  await zoomIntoCircle({ transition: 0 })
  fitToScreen(map.value, { transition: 1300, translateDelay: 600 })
  await sleep(700)
  textOpacity.value = 1
}
