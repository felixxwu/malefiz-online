import { styled } from 'goober'
import { gameState } from '../../../signals/signals'
import { ItemName, itemDefs } from '../../../items'
import { takePieceAlert } from '../../../dbactions/takePiece'
import { useEffect, useState } from 'preact/hooks'
import { events } from '../../../events'
import { updateGame } from '../../../dbactions/updateGame'
import { playEvent } from '../../../audio/playEvent'

function eventWarningAlert() {
  return (
    <EventWarningDiv>
      <div>⁉️</div>
      <h1>Event incoming</h1>
      <div>A random event will occur in the next round</div>
    </EventWarningDiv>
  )
}

const alerts = { takePieceAlert, eventWarningAlert }

export function Alerts() {
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (!gameState.value || gameState.value.alerts.length === 0) {
      setShowAlert(false)
      return
    }

    // Show the first alert in the queue
    const showCurrentAlert = async () => {
      if (!gameState.value) return

      const currentAlert = gameState.value.alerts[0]
      const alertId = currentAlert.id

      // Check if this is an event alert
      const EventComponent = events.find(event => event.name === alertId)
      if (EventComponent) {
        playEvent()
      }

      setTimeout(() => {
        setShowAlert(true)
      }, 500)

      setTimeout(async () => {
        setShowAlert(false)
        // Remove the first alert from the queue after it's shown
        if (gameState.value && gameState.value.alerts.length > 0) {
          await updateGame({
            alerts: gameState.value.alerts.slice(1),
          })
        }
      }, 3000)
    }

    showCurrentAlert()
  }, [gameState.value?.alerts])

  if (!gameState.value) return null
  if (gameState.value.alerts.length === 0) return null
  if (!showAlert) return null

  const currentAlert = gameState.value.alerts[0]
  const alertId = currentAlert.id

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

  return (
    <Div
      style={
        currentAlert
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

const EventWarningDiv = styled('div')`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  font-size: 24px;

  h1 {
    margin: 0;
    font-size: 48px;
  }

  div:first-child {
    font-size: 64px;
  }
`
