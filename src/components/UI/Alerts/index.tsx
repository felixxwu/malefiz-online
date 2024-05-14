import { styled } from 'goober'
import { gameState } from '../../../signals/signals'
import { ItemName, itemDefs } from '../../../items'
import { takePieceAlert } from '../../../dbactions/takePiece'
import { useEffect, useState } from 'preact/hooks'

const alerts = { takePieceAlert }

export function Alerts() {
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (gameState.value?.alert) {
      setTimeout(() => {
        setShowAlert(true)
      }, 500)
    } else {
      setShowAlert(false)
    }
  }, [gameState.value?.alert])

  if (!gameState.value) return null
  if (gameState.value.alert === null) return null
  if (!showAlert) return null

  const ItemComponent = itemDefs[gameState.value?.alert as ItemName]?.alert ?? null
  const OtherComponent = alerts[gameState.value.alert as keyof typeof alerts] ?? null
  const Component = ItemComponent ?? OtherComponent

  return (
    <Div
      style={
        gameState.value?.alert
          ? {
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              pointerEvents: 'all',
              opacity: 1,
            }
          : {
              backdropFilter: 'blur(0px)',
              backgroundColor: 'rgba(0,0,0,0)',
              pointerEvents: 'none',
              opacity: 0,
            }
      }
    >
      <Component />
    </Div>
  )
}

const Div = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
`
