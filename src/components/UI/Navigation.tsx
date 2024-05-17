import { styled } from 'goober'
import { FullScreenIcon, MinusIcon, PlusIcon } from '../Icons'
import { zoomIn, zoomOut } from '../../signals/actions/zoom'
import { fitToScreen } from '../../signals/actions/fitToScreen'
import { map } from '../../signals/signals'

export function Navigation() {
  return (
    <Div>
      <Button onClick={zoomIn}>
        <PlusIcon />
      </Button>
      <Button onClick={() => fitToScreen(map.value, {})}>
        <FullScreenIcon />
      </Button>
      <Button onClick={zoomOut}>
        <MinusIcon />
      </Button>
    </Div>
  )
}

const Div = styled('div')`
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
`

const Button = styled('div')`
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
