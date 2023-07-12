import { Map } from '../types/mapTypes'

export const map1: Map = [
  {
    id: '1',
    position: { x: 1, y: 1 },
    neighbours: ['2', '3'],
  },
  {
    id: '2',
    position: { x: 2, y: 1 },
    neighbours: ['1', '3'],
  },
  {
    id: '3',
    position: { x: 1, y: 3 },
    neighbours: ['1', '2'],
  },
  {
    id: '4',
    position: { x: 4, y: 3 },
    neighbours: ['3', '2'],
  },
]
