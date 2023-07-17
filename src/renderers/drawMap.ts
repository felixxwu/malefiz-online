import { CONSTS } from '../data/consts'
import { mapGroup } from '../utils/getSvgGroup'
import { circle, div, foreignObject, line, polygon } from '../utils/el'
import { colour1, textOpacity } from '../data/cssVars'
import { Circle, Map } from '../types/mapTypes'
import { handleCircleClick } from '../game/handleCircleClick'
import { polygonToXY } from '../utils/polygon'

export function drawMap(map: Map) {
  mapGroup!.innerHTML = ''
  drawLinesBetweenCircles(map)
  drawCircles(map)
  drawText(map)
}

function drawCircles(map: Map) {
  for (const circleData of map) {
    if (circleData.start) {
      mapGroup!.appendChild(
        polygon({
          attributes: {
            id: circleData.id,
            style: {
              cursor: 'pointer',
              fill: 'black',
              strokeLinejoin: 'round',
              stroke: 'black',
              strokeWidth: '50',
            },
            onclick: circleData.onClick ?? (() => handleCircleClick(circleData.id)),
          },
          readonlyAttributes: {
            points: [0, 1, 2, 3, 4]
              .map(i => polygonToXY(i, 5, 30))
              .map(
                ({ x, y }) =>
                  `${circleData.position.x * 100 + x},${circleData.position.y * 100 + y}`
              )
              .join(' '),
          },
        })
      )
    } else {
      mapGroup!.appendChild(
        circle({
          attributes: {
            id: circleData.id,
            style: {
              cursor: 'pointer',
              stroke: 'transparent',
              strokeWidth: `${100 - CONSTS.CIRCLE_RADIUS * 2}`,
            },
            onclick: circleData.onClick ?? (() => handleCircleClick(circleData.id)),
          },
          readonlyAttributes: {
            cx: `${circleData.position.x * 100}`,
            cy: `${circleData.position.y * 100}`,
            r: `${CONSTS.CIRCLE_RADIUS}`,
          },
        })
      )
      if (circleData.finish) {
        mapGroup!.appendChild(FinishCircle(circleData, CONSTS.CIRCLE_RADIUS - 5))
        mapGroup!.appendChild(FinishCircle(circleData, CONSTS.CIRCLE_RADIUS - 15))
      }
    }
  }
}

function drawText(map: Map) {
  for (const circle of map) {
    // circle.text = circle.id
    if (circle.text) {
      mapGroup!.appendChild(
        foreignObject({
          attributes: { style: { pointerEvents: 'none' } },
          readonlyAttributes: {
            x: `${circle.position.x * 100 - CONSTS.CIRCLE_RADIUS}px`,
            y: `${circle.position.y * 100 - CONSTS.CIRCLE_RADIUS}px`,
            width: `${CONSTS.CIRCLE_RADIUS * 2}px`,
            height: `${CONSTS.CIRCLE_RADIUS * 2}px`,
          },
          children: [
            div({
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
                div({
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
        line({
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

function FinishCircle(circleData: Circle, radius: number) {
  return circle({
    attributes: {
      style: {
        pointerEvents: 'none',
        stroke: colour1.value,
        fill: 'black',
        strokeWidth: '5',
      },
    },
    readonlyAttributes: {
      cx: `${circleData.position.x * 100}`,
      cy: `${circleData.position.y * 100}`,
      r: `${radius - 2.5}`,
    },
  })
}
