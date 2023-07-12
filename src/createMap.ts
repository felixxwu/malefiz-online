import { doc, updateDoc } from 'firebase/firestore'
import { CONSTS } from './consts'
import { GameState } from './game'
import { mapGroup } from './getSVG'
import { db } from './firebase'
import { store } from './store'

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
    const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circleElement.setAttribute('id', circle.id)
    circleElement.setAttribute('cx', (circle.position.x * 100).toString())
    circleElement.setAttribute('cy', (circle.position.y * 100).toString())
    circleElement.setAttribute('r', `${CONSTS.CIRCLE_RADIUS}`)
    circleElement.style.cursor = 'pointer'
    if (circle.onClick) {
      circleElement.onclick = circle.onClick
    } else if (store.gameId) {
      circleElement.onclick = () => handleOnClick(circle.id)
    }
    mapGroup!.appendChild(circleElement)
  }
}

function drawText(map: Map) {
  for (const circle of map) {
    if (circle.text) {
      const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
      foreignObject.setAttribute('x', (circle.position.x * 100 - CONSTS.CIRCLE_RADIUS).toString())
      foreignObject.setAttribute('y', (circle.position.y * 100 - CONSTS.CIRCLE_RADIUS).toString())
      foreignObject.setAttribute('width', `${CONSTS.CIRCLE_RADIUS * 2}px`)
      foreignObject.setAttribute('height', `${CONSTS.CIRCLE_RADIUS * 2}px`)
      foreignObject.style.pointerEvents = 'none'

      const textElement = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
      textElement.style.width = `${CONSTS.CIRCLE_RADIUS * 2}px`
      textElement.style.height = `${CONSTS.CIRCLE_RADIUS * 2}px`
      textElement.style.fontSize = `${circle.fontSize}px`
      textElement.style.color = 'white'
      textElement.style.display = 'flex'
      textElement.style.alignItems = 'center'
      textElement.style.justifyContent = 'center'

      const text = document.createElement('div')
      text.style.width = 'min-content'
      text.style.textAlign = 'center'
      text.innerHTML = circle.text

      textElement.appendChild(text)
      foreignObject.appendChild(textElement)
      mapGroup!.appendChild(foreignObject)
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
