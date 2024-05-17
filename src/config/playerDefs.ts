import { eyesList } from '../playermodel/eyes'
import { headList } from '../playermodel/heads'
import { mouthList } from '../playermodel/mouthes'
import { PlayerModel } from '../types/gameTypes'

let today = new Date().setHours(0, 0, 0, 0) / 1000000

function getModelNum(mod: number) {
  today = Math.floor(today * 0.9)
  return today % mod
}

function getModel() {
  return {
    eyes: getModelNum(eyesList.length),
    head: getModelNum(headList.length),
    mouth: getModelNum(mouthList.length),
  }
}

export const playerDefs: PlayerDefs[] = [
  { id: '1', colour: 'hsl(0 55% 65%)', name: 'Red', model: getModel() },
  { id: '2', colour: 'hsl(240 55% 75%)', name: 'Blue', model: getModel() },
  { id: '3', colour: 'hsl(140 55% 60%)', name: 'Green', model: getModel() },
  { id: '4', colour: 'hsl(60 55% 60%)', name: 'Yellow', model: getModel() },
  { id: '5', colour: 'hsl(300 55% 60%)', name: 'Purple', model: getModel() },
  { id: '6', colour: 'hsl(30 55% 60%)', name: 'Orange', model: getModel() },
]

export type PlayerDefs = {
  id: string
  colour: string
  name: string
  model: PlayerModel
}
