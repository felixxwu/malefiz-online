import { keyframes, styled } from 'goober'
import { colours } from '../../../config/colours'
import { RandomDie } from '../RandomDie'
import { action } from './action'

export function Action() {
  return (
    <>
      {action.value?.showDie && <RandomDie />}
      <Div
        onClick={action.value?.onClick}
        {...(action.value?.clickable ? { className: 'clickable' } : {})}
      >
        {action.value?.text}
      </Div>
    </>
  )
}

const flash = keyframes`
  0% {
    background-color: black;
  }
  50% {
    background-color: ${colours.highlight};
  }
  100% {
    background-color: black;
  }
`

const Div = styled('div')`
  height: 40px;
  border-radius: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 30px;
  color: black;
  white-space: nowrap;

  &.clickable {
    animation: ${flash} 1s infinite ease-in-out;
    cursor: pointer;
    background-color: black;
    color: ${colours.background};

    &:hover {
      background-color: ${colours.highlight};
      animation: none;
    }
  }
`
