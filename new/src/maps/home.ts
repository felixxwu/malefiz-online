import { Map } from '../types/mapTypes'

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
    fontSize: 12,
    onClick: async () => {
      console.log('clicked 2')
    },
  },
  {
    id: '2',
    position: { x: 2, y: 1 },
    neighbours: ['4'],
    start: null,
    finish: false,
    zoomInPoint: false,
    safeZone: false,
    text: `3 Players`,
    fontSize: 12,
    onClick: async () => {
      console.log('clicked 3')
    },
  },
  {
    id: '3',
    position: { x: 1, y: 2 },
    neighbours: ['1'],
    start: null,
    finish: false,
    zoomInPoint: false,
    safeZone: false,
    text: `4 Players`,
    fontSize: 12,
    onClick: async () => {
      console.log('clicked 4')
    },
  },
  {
    id: '4',
    position: { x: 2, y: 2 },
    neighbours: ['3'],
    start: null,
    finish: false,
    zoomInPoint: false,
    safeZone: false,
    text: `6 Players`,
    fontSize: 12,
    onClick: async () => {
      console.log('clicked 6')
    },
  },
]
