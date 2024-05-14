import { styled } from 'goober'
import { gameState } from '../../../signals/signals'
import { ItemName, itemDefs } from '../../../items'

export function Alerts() {
  if (!gameState.value) return null

  const Component = itemDefs[gameState.value?.alert as ItemName]?.alert ?? null

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
