import { PlayerModel } from '../types/gameTypes'

export const players: PlayerDefs[] = [
  { id: '1', colour: 'hsl(0 55% 65%)', name: 'Red', model: { eyes: 0, mouth: 0, head: 0 } },
  { id: '2', colour: 'hsl(240 55% 75%)', name: 'Blue', model: { eyes: 0, mouth: 0, head: 0 } },
  { id: '3', colour: 'hsl(140 55% 60%)', name: 'Green', model: { eyes: 0, mouth: 0, head: 0 } },
  { id: '4', colour: 'hsl(60 55% 60%)', name: 'Yellow', model: { eyes: 0, mouth: 0, head: 0 } },
  { id: '5', colour: 'hsl(300 55% 60%)', name: 'Purple', model: { eyes: 0, mouth: 0, head: 0 } },
  { id: '6', colour: 'hsl(30 55% 60%)', name: 'Orange', model: { eyes: 0, mouth: 0, head: 0 } },
]

export type PlayerDefs = {
  id: string
  colour: string
  name: string
  model: PlayerModel
}
