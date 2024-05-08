import { styled } from 'goober'
import { colours } from '../../config/colours'
import { gameState, lastDieRoll } from '../../signals'
import { updateGame } from '../../utils/updateGame'
import { players } from '../../utils/parseMap'
import { rollDie } from '../../utils/rollDie'
import { getMyPlayerId } from '../../utils/getUsers'

export function Action() {
  const myTurn = gameState.value?.playerTurn === getMyPlayerId()
  const stoneInPit = gameState.value?.stones.find(stone => stone.circleId === null)
  const gameNotStarted = gameState.value?.playerTurn === null
  const dieNotRolled = gameState.value?.dieRoll === null
  const playerWhoIsPlaying = gameState.value?.players.find(
    player => player.id === gameState.value!.playerTurn
  )

  if (getMyPlayerId() && gameNotStarted) {
    return (
      <Div onClick={() => updateGame({ playerTurn: players[0].id })} className='clickable'>
        Start game
      </Div>
    )
  }

  if (stoneInPit && myTurn) {
    return <Div>Place stone</Div>
  }

  if (myTurn && dieNotRolled && lastDieRoll.value === 6) {
    return (
      <Div onClick={rollDie} className='clickable'>
        Roll again
      </Div>
    )
  }

  if (myTurn && dieNotRolled) {
    return (
      <Div onClick={rollDie} className='clickable'>
        Roll
      </Div>
    )
  }

  if (myTurn && gameState.value && !dieNotRolled) {
    return <Div>Your turn</Div>
  }

  if (!myTurn && gameState.value && playerWhoIsPlaying) {
    return <Div>{playerWhoIsPlaying.name}'s turn</Div>
  }

  return null
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
