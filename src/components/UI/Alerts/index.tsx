import { styled } from 'goober'
import { gameState } from '../../../signals/signals'
import { ItemName, itemDefs } from '../../../items'
import { takePieceAlert } from '../../../dbactions/takePiece'
import { useEffect, useState } from 'preact/hooks'
import { isMyTurn } from '../../../utils/playerTurns'
import { events } from '../../../events'

const alerts = { takePieceAlert }

export function Alerts() {
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (gameState.value?.alert?.id) {
      setTimeout(() => {
        setShowAlert(true)
      }, 500)
    } else {
      setShowAlert(false)
    }
  }, [gameState.value?.alert, gameState.value?.alert?.id])

  if (!gameState.value) return null
  if (gameState.value.alert === null) return null
  if (!showAlert) return null

  const alertId = gameState.value.alert.id

  const OtherComponent = alerts[alertId as keyof typeof alerts] ?? null
  const ItemComponent = itemDefs[alertId as ItemName]?.alert ?? null
  const EventComponent = events.find(event => event.name === alertId)?.alert ?? null
  const Component = (() => {
    if (ItemComponent !== null) return ItemComponent
    if (OtherComponent !== null) return OtherComponent
    if (EventComponent !== null) return EventComponent
    return null
  })()

  if (Component === null) return null
  if (ItemComponent !== null && OtherComponent === null && !isMyTurn()) return null

  return (
    <Div
      style={
        gameState.value?.alert?.id
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
