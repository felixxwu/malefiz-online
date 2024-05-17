import { keyframes, styled } from 'goober'
import { colours } from '../../../config/colours'
import { updateGame } from '../../../dbactions/updateGame'
import { playerDefs } from '../../../config/playerDefs'
import { rollDie } from '../../../dbactions/rollDie'
import { RandomDie } from '../RandomDie'
import { activeItem } from '../../../signals/getters/activeItem'
import { getAction } from './getAction'
import { playerWhoIsPlaying } from '../../../signals/getters'

export function Action() {
  const action = getAction()

  return {
    itemaction: () => (
      <>
        {activeItem.value!.actionWhenActive.showDie && <RandomDie />}
        <Div
          onClick={activeItem.value!.actionWhenActive.onClick}
          {...(activeItem.value!.actionWhenActive.clickable ? { className: 'clickable' } : {})}
        >
          {activeItem.value!.actionWhenActive.text}
        </Div>
      </>
    ),
    pickedupmessage: () => (
      <Div>
        {playerWhoIsPlaying.value!.name} picked up {activeItem.value!.name}
      </Div>
    ),
    startgame: () => (
      <Div onClick={() => updateGame({ playerTurn: playerDefs[0].id })} className='clickable'>
        Start game
      </Div>
    ),
    placestone: () => <Div>Place stone</Div>,
    rollagain: () => (
      <>
        <RandomDie />
        <Div onClick={rollDie} className='clickable'>
          Roll again
        </Div>
      </>
    ),
    roll: () => (
      <>
        <RandomDie />
        <Div onClick={rollDie} className='clickable'>
          Roll
        </Div>
      </>
    ),
    yourturn: () => <Div>Your turn</Div>,
    rollagainnolegal: () => (
      <>
        <RandomDie />
        <Div onClick={rollDie} className='clickable'>
          Roll again (no legal moves)
        </Div>
      </>
    ),
    playerturn: () => <Div>{playerWhoIsPlaying.value!.name}'s turn</Div>,
    none: () => null,
  }[action]()
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
