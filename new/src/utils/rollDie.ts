import { updateGame } from './updateGame'

//@ts-ignore
window.roll = (number: number) => {
  updateGame({ dieRoll: number })
}

export async function rollDie() {
  const dieRoll = Math.floor(Math.random() * 6) + 1
  updateGame({ dieRoll })
}
