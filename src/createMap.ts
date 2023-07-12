import { doc, updateDoc } from 'firebase/firestore'
import { CONSTS } from './consts'
import { GameState } from './game'
import { mapGroup } from './getSVG'
import { db } from './firebase'
import { store } from './store'
import { el, elNS } from './el'

type Circle = {
  id: string
  position: {
    x: number
    y: number
  }
  neighbours: string[]
  text?: string
  fontSize?: number
  onClick?: () => void
}

export type Map = Circle[]

async function handleOnClick(id: string) {
  if (store.gameId === null) return

  const newGame: Partial<GameState> = {
    players: [
      {
        id: '1',
        colour: 'red',
        positions: [{ pieceId: '1', circleId: id }],
      },
    ],
  }
  await updateDoc(doc(db, 'games', store.gameId), newGame)
}

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

export function drawMap(map: Map) {
  mapGroup!.innerHTML = ''
  drawLinesBetweenCircles(map)
  drawCircles(map)
  drawText(map)
}

function drawCircles(map: Map) {
  for (const circle of map) {
    mapGroup!.appendChild(
      elNS('circle')({
        attributes: {
          id: circle.id,
          style: { cursor: 'pointer' },
          onclick: circle.onClick ?? (() => handleOnClick(circle.id)),
        },
        readonlyAttributes: {
          cx: `${circle.position.x * 100}`,
          cy: `${circle.position.y * 100}`,
          r: `${CONSTS.CIRCLE_RADIUS}`,
        },
      })
    )
  }
}

function drawText(map: Map) {
  for (const circle of map) {
    if (circle.text) {
      mapGroup!.appendChild(
        elNS('foreignObject')({
          attributes: { style: { pointerEvents: 'none' } },
          readonlyAttributes: {
            x: `${circle.position.x * 100 - CONSTS.CIRCLE_RADIUS}px`,
            y: `${circle.position.y * 100 - CONSTS.CIRCLE_RADIUS}px`,
            width: `${CONSTS.CIRCLE_RADIUS * 2}px`,
            height: `${CONSTS.CIRCLE_RADIUS * 2}px`,
          },
          children: [
            el('div')({
              attributes: {
                style: {
                  width: `${CONSTS.CIRCLE_RADIUS * 2}px`,
                  height: `${CONSTS.CIRCLE_RADIUS * 2}px`,
                  fontSize: `${circle.fontSize}px`,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
              children: [
                el('div')({
                  attributes: {
                    style: {
                      width: 'min-content',
                      textAlign: 'center',
                    },
                    innerHTML: circle.text,
                  },
                }),
              ],
            }),
          ],
        })
      )
    }
  }
}

function drawLinesBetweenCircles(map: Map) {
  for (const circle of map) {
    for (const neighbourId of circle.neighbours) {
      const neighbour = map.find(c => c.id === neighbourId)
      if (!neighbour) {
        continue
      }
      mapGroup!.appendChild(
        elNS('line')({
          readonlyAttributes: {
            x1: `${circle.position.x * 100}`,
            y1: `${circle.position.y * 100}`,
            x2: `${neighbour.position.x * 100}`,
            y2: `${neighbour.position.y * 100}`,
            stroke: 'grey',
            'stroke-width': `${CONSTS.PATH_STROKE_WIDTH + 2}`,
          },
        })
      )
    }
  }
}
