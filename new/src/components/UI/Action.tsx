import { styled } from 'goober'
import { colours } from '../../config/colours'
import { action } from '../../signals'

export function Action() {
  const actionValue = action.value
  if (!actionValue) return null

  return <Div onClick={actionValue.onClick}>{actionValue.text}</Div>
}

const Div = styled('div')`
  height: 40px;
  border-radius: 100vw;
  background-color: black;
  color: ${colours.background};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 30px;
  cursor: pointer;

  &:hover {
    background-color: ${colours.highlight};
  }
`
