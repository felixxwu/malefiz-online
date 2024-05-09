import { Map } from '../types/mapTypes'
import { createGame } from '../utils/createGame'

export const homePageMap: Map = [
  {
    id: '1',
    position: { x: 1, y: 1 },
    neighbours: ['2'],
    start: null,
    finish: false,
    zoomInPoint: true,
    safeZone: false,
    text: `2 Players`,
    fontSize: 10,
    onClick: async () => {
      createGame(0)
    },
  },
  {
    id: '2',
    position: { x: 2, y: 1.2 },
    neighbours: ['3'],
    start: null,
    finish: false,
    zoomInPoint: false,
    safeZone: false,
    text: `3 Players`,
    fontSize: 10,
    onClick: async () => {
      createGame(1)
    },
  },
  {
    id: '3',
    position: { x: 3, y: 1 },
    neighbours: ['4'],
    start: null,
    finish: false,
    zoomInPoint: false,
    safeZone: false,
    text: `4 Players`,
    fontSize: 10,
    onClick: async () => {
      createGame(2)
    },
  },
  {
    id: '4',
    position: { x: 4, y: 1.2 },
    neighbours: ['3'],
    start: null,
    finish: false,
    zoomInPoint: false,
    safeZone: false,
    text: `6 Players`,
    fontSize: 10,
    onClick: async () => {
      createGame(3)
    },
  },
]
