import { styled } from 'goober'
import { colours } from '../../config/colours'
import { gameOver, gameState } from '../../signals/signals'
import { updateGame } from '../../dbactions/updateGame'
import { players } from '../../utils/players'
import { rollDie } from '../../dbactions/rollDie'
import { RandomDie } from './RandomDie'
import { getActiveItem } from '../../utils/getActiveItem'
import { getAction } from '../../utils/getAction'

export function Action() {
  if (gameOver.value) return null
  if (!gameState.value) return null

  const playerWhoIsPlaying = gameState.value.players.find(
    player => player.id === gameState.value!.playerTurn
  )
  const activeItem = getActiveItem()

  const action = getAction()

  return {
    itemaction: () => (
      <>
        {activeItem!.actionWhenActive.showDie && <RandomDie />}
        <Div
          onClick={activeItem!.actionWhenActive.onClick}
          {...(activeItem!.actionWhenActive.clickable ? { className: 'clickable' } : {})}
        >
          {activeItem!.actionWhenActive.text}
        </Div>
      </>
    ),
    pickedupmessage: () => (
      <Div>
        {playerWhoIsPlaying!.name} picked up {activeItem!.name}
      </Div>
    ),
    startgame: () => (
      <Div onClick={() => updateGame({ playerTurn: players[0].id })} className='clickable'>
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
    playerturn: () => <Div>{playerWhoIsPlaying!.name}'s turn</Div>,
    none: () => null,
  }[action]()
}

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
    animation: flash 1s infinite ease-in-out;
    cursor: pointer;
    background-color: black;
    color: ${colours.background};

    &:hover {
      background-color: ${colours.highlight};
      animation: none;
    }
  }

  @keyframes flash {
    0% {
      background-color: black;
    }
    50% {
      background-color: ${colours.highlight};
    }
    100% {
      background-color: black;
    }
  }
`
