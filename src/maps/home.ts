import { Map } from '../types/mapTypes'
import { createGame } from '../utils/createGame'
import { PlayerCustomisation } from '../components/SVG/PlayerCustomisation'
// import { GamemodeSelector } from '../components/SVG/GamemodeSelector'

export const homePageMap: Map = [
  {
    id: '1',
    position: { x: 1, y: 1 },
    neighbours: ['2'],
    start: null,
    finish: false,
    zoomInPoint: true,
    safeZone: false,
    text: [
      { content: `2`, x: -3, y: -5 },
      { content: `Players`, x: -22, y: 7 },
    ],
    fontSize: 12,
    onClick: async () => {
      createGame(0)
    },
  },
  {
    id: '2',
    position: { x: 2, y: 0.5 },
    neighbours: ['3'],
    start: null,
    finish: false,
    zoomInPoint: false,
    safeZone: false,
    text: [
      { content: `3`, x: -3, y: -5 },
      { content: `Players`, x: -22, y: 7 },
    ],
    fontSize: 12,
    onClick: async () => {
      createGame(1)
    },
  },
  {
    id: '3',
    position: { x: 3, y: 0.5 },
    neighbours: ['4'],
    start: null,
    finish: false,
    zoomInPoint: false,
    safeZone: false,
    text: [
      { content: `4`, x: -3, y: -5 },
      { content: `Players`, x: -22, y: 7 },
    ],
    fontSize: 12,
    onClick: async () => {
      createGame(2)
    },
  },
  {
    id: '4',
    position: { x: 4, y: 1 },
    neighbours: ['3'],
    start: null,
    finish: false,
    zoomInPoint: false,
    safeZone: false,
    text: [
      { content: `6`, x: -3, y: -5 },
      { content: `Players`, x: -22, y: 7 },
    ],
    fontSize: 12,
    onClick: async () => {
      createGame(3)
    },
  },
  {
    id: '5',
    position: { x: 2.1, y: 1.5 },
    neighbours: [],
    start: null,
    finish: false,
    zoomInPoint: false,
    safeZone: false,
    custom: PlayerCustomisation,
  },
  // {
  //   id: '6',
  //   position: { x: 2, y: -0.3 },
  //   neighbours: [],
  //   start: null,
  //   finish: false,
  //   zoomInPoint: false,
  //   safeZone: false,
  //   custom: GamemodeSelector,
  // },
]
