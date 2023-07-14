import { Map } from '../types/mapTypes'
import { createGame } from '../game/createGame'
import { store } from '../data/store'
import { zoomIntoCircle } from '../utils/zoom'
import { startLocalGame } from '../localgame/startLocalGame'
import { sleep } from '../utils/sleep'

export const homePageMap: Map = [
  {
    id: '1',
    position: { x: 1, y: 1 },
    neighbours: ['2'],
    start: false,
    finish: false,
    zoomInPoint: true,
    text: `New Game`,
    fontSize: 13,
    onClick: async () => {
      zoomIntoCircle({ circle: store.currentMap[0], transition: 1000 })
      store.textOpacity = 0
      await sleep(800)
      createGame()
    },
  },
  {
    id: '2',
    position: { x: 1, y: 2 },
    neighbours: ['1'],
    start: false,
    finish: false,
    zoomInPoint: false,
    text: `Play AI`,
    fontSize: 13,
    onClick: async () => {
      zoomIntoCircle({ circle: store.currentMap[1], transition: 1000 })
      store.textOpacity = 0
      await sleep(800)
      startLocalGame()
    },
  },
]
