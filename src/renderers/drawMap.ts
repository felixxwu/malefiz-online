import { CONSTS } from '../data/consts'
import { mapGroup, svg } from '../utils/getSvgGroup'
import { circle, div, foreignObject, path, polygon, rect } from '../utils/el'
import { colour1, textOpacity } from '../data/cssVars'
import { Circle, Map } from '../types/mapTypes'
import { handleCircleClick } from '../game/handleCircleClick'
import { polygonToXY } from '../utils/polygon'
import { getMapPosition } from '../maps/mapUtils'
import { store } from '../data/store'

export function drawMap(map: Map) {
  mapGroup!.innerHTML = ''
  drawLinesBetweenCircles(map)
  drawCircles(map)
  drawText(map)

  const mapPosition = getMapPosition(map)
  mapGroup!.appendChild(
    rect({
      attributes: {
        id: 'mapPositionRef',
        style: {
          opacity: '0',
          pointerEvents: 'none',
        },
      },
      readonlyAttributes: {
        x: `${mapPosition.mapLeft * 100}`,
        y: `${mapPosition.mapTop * 100}`,
        width: `${mapPosition.mapWidth * 100}`,
        height: `${mapPosition.mapHeight * 100}`,
      },
    })
  )
}

function drawCircles(map: Map) {
  let pathData = ''
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
              strokeWidth: '60',
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
      pathData += `M ${circleData.position.x * 100}, ${circleData.position.y * 100} m ${
        CONSTS.CIRCLE_RADIUS
      }, 0 a ${CONSTS.CIRCLE_RADIUS},${CONSTS.CIRCLE_RADIUS} 0 1,0 ${
        CONSTS.CIRCLE_RADIUS * -2
      },0 a ${CONSTS.CIRCLE_RADIUS},${CONSTS.CIRCLE_RADIUS} 0 1,0 ${CONSTS.CIRCLE_RADIUS * 2},0`
    }
  }
  mapGroup!.appendChild(path({ readonlyAttributes: { d: pathData } }))
  mapGroup!.style.pointerEvents = 'none'
  svg!.onclick = (event: MouseEvent) => {
    const rect = document.getElementById('mapPositionRef')!.getBoundingClientRect()
    const mapSize = getMapPosition(map)
    const circleSize = rect.width / mapSize.mapWidth || rect.height / mapSize.mapHeight
    const mapCoords = circleSize
      ? {
          x: (event.clientX - rect.left) / circleSize + mapSize.mapLeft,
          y: (event.clientY - rect.top) / circleSize + mapSize.mapTop,
        }
      : {
          x: mapSize.mapLeft,
          y: mapSize.mapTop,
        }
    for (const circle of map) {
      if (
        Math.abs(circle.position.x - mapCoords.x) < 0.5 &&
        Math.abs(circle.position.y - mapCoords.y) < 0.5
      ) {
        if (circle.onClick) {
          circle.onClick()
          return
        } else {
          handleCircleClick(circle.id)
          return
        }
      }
    }
    store.pieceSelected = null
  }

  const finish = map.find(circle => circle.finish)
  if (finish) {
    mapGroup!.appendChild(FinishCircle(finish, CONSTS.CIRCLE_RADIUS - 5))
    mapGroup!.appendChild(FinishCircle(finish, CONSTS.CIRCLE_RADIUS - 15))
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
  const linesHashTable: { [key: string]: Circle[] } = {}
  for (const circle of map) {
    for (const neighbourId of circle.neighbours) {
      const neighbour = map.find(c => c.id === neighbourId)
      if (!neighbour) {
        continue
      }
      linesHashTable[[circle.id, neighbour.id].sort().join('-')] = [circle, neighbour]
    }
  }
  const lines: Circle[][] = []
  for (const key in linesHashTable) {
    lines.push(linesHashTable[key])
  }
  const svgPath = path({
    attributes: {
      style: {
        stroke: 'black',
        strokeWidth: `${CONSTS.PATH_STROKE_WIDTH}`,
      },
    },
    readonlyAttributes: {
      d: lines
        .map(
          ([circle1, circle2]) =>
            `M ${circle1.position.x * 100} ${circle1.position.y * 100} L ${
              circle2.position.x * 100
            } ${circle2.position.y * 100}`
        )
        .join(' '),
    },
  })
  mapGroup!.appendChild(svgPath)
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
