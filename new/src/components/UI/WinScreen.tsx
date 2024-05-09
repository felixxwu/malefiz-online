import { styled } from 'goober'
import { gameOver } from '../../signals'

export function WinScreen() {
  if (!gameOver.value) return null

  return (
    <Div>
      {gameOver.value} wins
      <Button onClick={() => (window.location.href = '/')}>Leave game</Button>
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
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  color: white;
  pointer-events: none;
`

const Button = styled('div')`
  height: 40px;
  padding: 0 30px;
  border-radius: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: black;
  pointer-events: all;
`
