import { GameState } from '../types/gameTypes'

export const map1: GameState = {
  map: [
    {
      id: '1',
      position: { x: 1, y: 1 },
      neighbours: ['2', '3'],
    },
    {
      id: '2',
      position: { x: 2, y: 1 },
      neighbours: ['1', '5'],
    },
    {
      id: '5',
      position: { x: 2, y: 2 },
      neighbours: ['2', '3'],
    },
    {
      id: '3',
      position: { x: 1, y: 3 },
      neighbours: ['1', '4'],
    },
    {
      id: '4',
      position: { x: 4, y: 3 },
      neighbours: ['3', '2'],
    },
  ],
  players: [
    {
      id: '1',
      colour: 'red',
      positions: [
        {
          pieceId: '1',
          circleId: '2',
        },
      ],
    },
    {
      id: '2',
      colour: 'blue',
      positions: [
        {
          pieceId: '2',
          circleId: '3',
        },
      ],
    },
  ],
  created: Date.now(),
  users: [],
}
