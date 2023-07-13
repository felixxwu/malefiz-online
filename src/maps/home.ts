import { Map } from '../types/mapTypes'
import { createGame } from '../game'
import { store } from '../data/store'
import { zoomIntoCircle } from '../utils/zoom'

export const homePageMap: Map = [
  {
    id: '1',
    position: { x: 1, y: 1 },
    neighbours: ['2'],
    text: `New Game`,
    fontSize: 13,
    onClick: () => {
      zoomIntoCircle(store.currentMap[0], { transition: 1000 })
      store.textOpacity = 0
      setTimeout(() => {
        createGame()
      }, 800)
    },
  },
  {
    id: '2',
    position: { x: 2, y: 1 },
    neighbours: ['1'],
    text: `Play AI`,
    fontSize: 13,
  },
  // {
  //   id: '3',
  //   position: { x: 6, y: 2 },
  //   neighbours: ['1', '2'],
  // },
]
