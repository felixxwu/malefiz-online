import { addDoc, collection } from 'firebase/firestore'
import { Map } from './types/mapTypes'
import { map1 } from './maps/map1'
import { db } from './firebase'

type Player = {
  id: string
  colour: string
  positions: { pieceId: string; circleId: string }[]
}

export type GameState = {
  map: Map
  players: Player[]
  created: number
}

export async function createGame() {
  const newGame: GameState = {
    map: map1,
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
    ],
    created: Date.now(),
  }
  document.body.style.backgroundColor = 'black'
  const gameId = await addDoc(collection(db, 'games'), newGame)
  window.location.search = `?game=${gameId.id}`
}
