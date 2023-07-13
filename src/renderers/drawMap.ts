import { doc, updateDoc } from 'firebase/firestore'
import { CONSTS } from '../data/consts'
import { GameState } from '../types/gameTypes'
import { mapGroup } from '../utils/getSvgGroup'
import { db } from '../config/firebase'
import { store } from '../data/store'
import { el, elNS } from '../utils/el'
import { textOpacity } from '../data/cssVars'
import { Map } from '../types/mapTypes'
import { getUserData } from '../data/userId'

async function handleOnClick(id: string) {
  if (store.gameId === null) return

  const newGame: Partial<GameState> = {
    players: store.gameState!.players.map(player => {
      if (getUserData().playerToControl === player.id) {
        return {
          ...player,
          positions: [{ pieceId: player.positions[0].pieceId, circleId: id }],
        }
      } else {
        return player
      }
    }),
  }

  await updateDoc(doc(db, 'games', store.gameId), newGame)
}

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
                      opacity: textOpacity.value,
                      transition: '1000ms',
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
            stroke: 'black',
            'stroke-width': `${CONSTS.PATH_STROKE_WIDTH}`,
          },
        })
      )
    }
  }
}
