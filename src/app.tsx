import { styled } from 'goober'
import './css/lexend.css'
import './css/styles.css'
import { MapRenderer } from './components/MapRenderer'
import { useEffect } from 'preact/hooks'
import { UI } from './components/UI'
import { colours } from './config/colours'
import { gameState, map, screenHeight, screenWidth, debugMode } from './signals/signals'
import { fitToScreen } from './signals/actions/fitToScreen'
import { gameId } from './signals/getters/gameId'
import { doc, onSnapshot } from 'firebase/firestore'
import { GameState } from './types/gameTypes'
import { mapList } from './maps/mapList'
import { playAiIfApplicable } from './signals/actions/playAiIfApplicable'
import { db } from './config/firebase'
import { introSequence } from './signals/actions/introSequence'
import { setupInitAudio } from './audio/initAudio'
import { movePiece } from './dbactions/movePiece'

setupInitAudio()

export function App() {
  useEffect(() => {
    window.document.body.style.opacity = '0'
    window.document.body.style.transition = '1s'

    setTimeout(() => {
      window.document.body.style.backgroundColor = colours.background
      window.document.body.style.opacity = '1'
    })

    // Expose debug function to console
    ;(window as any).debug = () => {
      debugMode.value = !debugMode.value
      console.log(`Debug mode: ${debugMode.value ? 'ON' : 'OFF'}`)
      return debugMode.value
    }

    // Expose moveTo function to console
    ;(window as any).moveTo = async (circleId: string | number) => {
      if (!gameState.value) {
        console.error('No game state available')
        return
      }

      if (!gameState.value.playerTurn) {
        console.error('No player turn set')
        return
      }

      const currentPlayer = gameState.value.players.find(
        player => player.id === gameState.value!.playerTurn
      )

      if (!currentPlayer) {
        console.error('Current player not found')
        return
      }

      if (currentPlayer.positions.length === 0) {
        console.error('Current player has no pieces')
        return
      }

      const firstPieceId = currentPlayer.positions[0].pieceId
      console.log(`Moving piece ${firstPieceId} to circle ${circleId}`)
      await movePiece(firstPieceId, circleId.toString())
    }

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
