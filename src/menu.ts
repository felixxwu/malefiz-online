import { drawMap } from './createMap'
import { createGame } from './game'

export function drawMenu() {
  drawMap([
    {
      id: '1',
      position: { x: 1, y: 1 },
      neighbours: ['2', '3'],
      text: `Create Game`,
      fontSize: 15,
      onClick: () => {
        createGame()
      },
    },
    {
      id: '2',
      position: { x: 2, y: 1 },
      neighbours: ['1', '3'],
    },
    {
      id: '3',
      position: { x: 3, y: 1 },
      neighbours: ['1', '2'],
    },
  ])
}
