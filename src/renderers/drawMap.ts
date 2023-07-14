import { CONSTS } from '../data/consts'
import { mapGroup } from '../utils/getSvgGroup'
import { el, elNS } from '../utils/el'
import { textOpacity } from '../data/cssVars'
import { Map } from '../types/mapTypes'
import { handleCircleClick } from '../game/handleCircleClick'
import { polygonToXY } from '../utils/polygon'

export function drawMap(map: Map) {
  mapGroup!.innerHTML = ''
  drawLinesBetweenCircles(map)
  drawCircles(map)
  drawText(map)
}

function drawCircles(map: Map) {
  for (const circle of map) {
    if (circle.start) {
      mapGroup!.appendChild(
        elNS('polygon')({
          attributes: {
            id: circle.id,
            style: {
              cursor: 'pointer',
              fill: 'black',
              strokeLinejoin: 'round',
              stroke: 'black',
              strokeWidth: '50',
            },
            onclick: circle.onClick ?? (() => handleCircleClick(circle.id)),
          },
          readonlyAttributes: {
            points: [0, 1, 2, 3, 4]
              .map(i => polygonToXY(i, 5, 30))
              .map(({ x, y }) => `${circle.position.x * 100 + x},${circle.position.y * 100 + y}`)
              .join(' '),
          },
        })
      )
    } else {
      mapGroup!.appendChild(
        elNS('circle')({
          attributes: {
            id: circle.id,
            style: { cursor: 'pointer' },
            onclick: circle.onClick ?? (() => handleCircleClick(circle.id)),
          },
          readonlyAttributes: {
            cx: `${circle.position.x * 100}`,
            cy: `${circle.position.y * 100}`,
            r: `${CONSTS.CIRCLE_RADIUS * (circle.start ? 1.7 : 1)}`,
          },
        })
      )
    }
  }
}

function drawText(map: Map) {
  for (const circle of map) {
    // circle.text = circle.id
    if (circle.finish) {
      circle.text = 'F'
    }
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
