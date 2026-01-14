import { styled } from 'goober'
import { started } from '../../signals/signals'
import { gameId } from '../../signals/getters/gameId'

export function StartButton() {
  if (started.value || gameId) return null

  return <Div onClick={() => (started.value = true)}>Start</Div>
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
  cursor: pointer;
  pointer-events: all;
  color: white;
`
