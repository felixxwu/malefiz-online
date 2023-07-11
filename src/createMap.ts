import { CONSTS } from './consts'
import { mapGroup } from './getSVG'

type Circle = {
  id: string
  position: {
    x: number
    y: number
  }
  neighbours: string[]
}

export type Map = Circle[]

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
]

export function createMap(map: Map) {
  mapGroup!.innerHTML = ''
  createLinesBetweenCircles(map)
  createCircles(map)
}

function createCircles(map: Map) {
  for (const circle of map) {
    const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circleElement.setAttribute('id', circle.id)
    circleElement.setAttribute('cx', (circle.position.x * 100).toString())
    circleElement.setAttribute('cy', (circle.position.y * 100).toString())
    circleElement.setAttribute('r', `${CONSTS.CIRCLE_RADIUS}`)
    circleElement.style.cursor = 'pointer'
    circleElement.onclick = () => {
      console.log(circle.id)
    }
    mapGroup!.appendChild(circleElement)
  }
}

function createLinesBetweenCircles(map: Map) {
  for (const circle of map) {
    for (const neighbourId of circle.neighbours) {
      const neighbour = map.find(c => c.id === neighbourId)
      if (!neighbour) {
        continue
      }
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', (circle.position.x * 100).toString())
      line.setAttribute('y1', (circle.position.y * 100).toString())
      line.setAttribute('x2', (neighbour.position.x * 100).toString())
      line.setAttribute('y2', (neighbour.position.y * 100).toString())
      line.setAttribute('stroke', 'grey')
      line.setAttribute('stroke-width', `${CONSTS.PATH_STROKE_WIDTH}`)
      mapGroup!.appendChild(line)
    }
  }
}
