import { styled } from 'goober'
import { colours } from '../../config/colours'
import { gameState } from '../../signals'
import { updateGame } from '../../utils/updateGame'
import { players } from '../../maps/parseMap'
import { rollDie } from '../../utils/rollDie'
import { getMyPlayerId } from '../../utils/getUsers'

export function Action() {
  if (getMyPlayerId() && gameState.value?.playerTurn === null) {
    return <Div onClick={() => updateGame({ playerTurn: players[0].id })}>Start Game</Div>
  }
  if (gameState.value?.playerTurn === getMyPlayerId() && gameState.value?.dieRoll === null) {
    return <Div onClick={rollDie}>Roll</Div>
  }
  return null
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
  animation: flash 1s infinite ease-in-out;

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

  &:hover {
    background-color: ${colours.highlight};
    animation: none;
  }
`
