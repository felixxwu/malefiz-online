import { CONSTS } from '../data/consts'
import { store } from '../data/store'
import { currentPlayer } from '../data/userId'
import { getMapPosition } from '../maps/mapUtils'
import { elNS } from '../utils/el'
import { dieGroup } from '../utils/getSvgGroup'

export function drawDie() {
  dieGroup!.innerHTML = ''
  if (store.gameState!.dieRoll) {
    const { x, y, rotation } = randomOffsetAndRotation()
    const group = elNS('g')({
      attributes: {
        style: {
          transform: `rotate(${rotation}deg) translate(${x}px, ${y}px)`,
          cursor: 'pointer',
          transformOrigin: `${x + 50}px ${y + 50}px`,
          transition: '500ms',
          willChange: 'transform',
        },
        onclick: () => {
          group.style.transform = `rotate(0deg) translate(0px, -50px)`
          group.style.transformOrigin = `0 0`
        },
      },
      readonlyAttributes: {
        class: 'dieRoll',
      },
      children: [Square(), ...dotLayouts[store.gameState!.dieRoll].map(Dot)],
    })
    dieGroup!.appendChild(group)
  }
}

function randomOffsetAndRotation() {
  const { mapWidth, mapHeight } = getMapPosition(store.currentMap)
  return {
    x: Math.random() * mapWidth * 100,
    y: Math.random() * mapHeight * 100,
    rotation: Math.random() * 100 - 50,
  }
}

function Square() {
  return elNS('rect')({
    attributes: {
      style: {
        fill: currentPlayer().colour,
        stroke: 'black',
        strokeWidth: `${CONSTS.PATH_STROKE_WIDTH}px`,
        filter: 'drop-shadow(rgba(0, 0, 0, 0.2) 0 0 15px)',
      },
    },
    readonlyAttributes: {
      x: '0',
      y: '0',
      width: '100',
      height: '100',
      rx: '15',
    },
  })
}

// dot positions:
// 1 . 2
// 3 4 5
// 6 . 7

const dotPositions = {
  1: { x: 27, y: 27 },
  2: { x: 73, y: 27 },
  3: { x: 27, y: 50 },
  4: { x: 50, y: 50 },
  5: { x: 73, y: 50 },
  6: { x: 27, y: 73 },
  7: { x: 73, y: 73 },
}

const dotLayouts: { [key: number]: (keyof typeof dotPositions)[] } = {
  1: [4],
  2: [2, 6],
  3: [2, 4, 6],
  4: [1, 2, 6, 7],
  5: [1, 2, 4, 6, 7],
  6: [1, 2, 3, 5, 6, 7],
}

function Dot(position: keyof typeof dotPositions) {
  return elNS('circle')({
    readonlyAttributes: {
      cx: dotPositions[position].x.toString(),
      cy: dotPositions[position].y.toString(),
      r: '10',
      fill: 'black',
    },
  })
}
