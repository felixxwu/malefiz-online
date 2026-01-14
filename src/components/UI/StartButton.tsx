import { styled } from 'goober'
import { started } from '../../signals/signals'
import { gameId } from '../../signals/getters/gameId'
import { PlayIcon } from '../Icons'

export function StartButton() {
  if (started.value || gameId) return null

  return (
    <Div onClick={() => (started.value = true)}>
      Start
      <div style={{ marginTop: '4px' }}>
        <PlayIcon opacity={1} size={16} />
      </div>
    </Div>
  )
}

const Div = styled('div')`
  font-size: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  pointer-events: all;
  color: white;
`
