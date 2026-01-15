import { consts } from '../config/consts'
import { GameState, Player } from '../types/gameTypes'
import { Map } from '../types/mapTypes'
import { playerDefs } from '../config/playerDefs'

/*

O = circle
- = connecting line
F = finish
1/2/3/4 = player start points
Z = zoom in point
S = stone
X = safe zone
P = stone pit
D = die pit

*/

type Coordinate = {
  x: number
  y: number
  id: string
  matchedSymbol: string
}

export function parseMap(
  mapNum: number,
  template: string
): { map: Map; gameState: Omit<GameState, 'items' | 'eventsEnabled'> } {
  let pieceId = 0
  const mapGrid = mapStringTo2dArray(template)
  const stonePit = getCoordinates(mapGrid, ['P'])[0]
  const diePit = getCoordinates(mapGrid, ['D'])[0]
  const circleCoordinates = getCoordinates(
    mapGrid,
    ['O', 'F', 'Z', 'S', 'X'].concat(playerDefs.map(p => p.id))
  )
  const stoneCoordinates = getCoordinates(mapGrid, ['S'])
  const playerCoordinates = playerDefs.map(player => ({
    ...player,
    coords: getCoordinates(mapGrid, [player.id]),
  }))
  const lineCoordinates = getCoordinates(mapGrid, ['-', '|', '/'])
  const surroundingCircles = getSurroundingCirclesForAllLines(lineCoordinates, circleCoordinates)
  const circleNeighbours = getCircleNeighbours(circleCoordinates, surroundingCircles)
  const createdMap: Map = circleNeighbours.map(c => ({
    id: c.circle.id,
    position: { x: c.circle.x / 2, y: c.circle.y / 2 },
    neighbours: c.neighbours,
    start: playerDefs.find(p => p.id === c.circle.matchedSymbol)?.id ?? null,
    finish: c.circle.matchedSymbol === 'F',
    zoomInPoint: c.circle.matchedSymbol === 'Z',
    safeZone: c.circle.matchedSymbol === 'X',
  }))

  return {
    map: createdMap,
    gameState: {
      mapNum,
      stones: stoneCoordinates.map(c => ({
        stoneId: c.id,
        circleId: findCircle(c.x, c.y, circleCoordinates)!.id,
      })),
      players: playerCoordinates
        .map(player => ({
          ...player,
          positions: multiplyPieces(player.coords, 5).map(c => ({
            pieceId: `${pieceId++}`,
            circleId: findCircle(c.x, c.y, circleCoordinates)!.id,
          })),
          aiTemper: 0,
          stats: {
            distanceMoved: 0,
            sixesRolled: 0,
            piecesTaken: 0,
            stonesTaken: 0,
            itemsTaken: 0,
          },
        }))
        .filter(p => p.positions.length > 0) as Player[],
      created: Date.now(),
      playerTurn: null,
      dieRoll: null,
      stonePit: { x: stonePit.x / 2, y: stonePit.y / 2 },
      diePit: { x: diePit.x / 2, y: diePit.y / 2 },
      alerts: [],
      turnsUntilEvent: consts.eventInterval,
    },
  }
}

function multiplyPieces(coords: Coordinate[], multiplier: number) {
  const multipliedCoords = []
  for (const coord of coords) {
    for (let i = 0; i < multiplier; i++) {
      multipliedCoords.push(coord)
    }
  }
  return multipliedCoords
}

export function findCircle(x: number, y: number, circleCoordinates: Coordinate[]) {
  return circleCoordinates.find(c => c.x === x && c.y === y)
}

function getCircleNeighbours(circleCoordinates: Coordinate[], surroundingCircles: Coordinate[][]) {
  const circleNeighbours = []
  for (const circle of circleCoordinates) {
    const neighbours = []
    for (const connectedCircles of surroundingCircles) {
      if (connectedCircles.length !== 2) continue
      if (connectedCircles.find(c => c.id === circle.id)) {
        neighbours.push(connectedCircles.find(c => c.id !== circle.id)!)
      }
    }
    circleNeighbours.push({ neighbours: neighbours.map(n => n.id), circle })
  }
  return circleNeighbours
}

function getSurroundingCirclesForAllLines(
  lineCoordinates: Coordinate[],
  circleCoordinates: Coordinate[]
) {
  const surroundingCircles = []
  for (const line of lineCoordinates) {
    const surroundingCirclesForThisLine = getSurroundingCirclesForOneLine(line, circleCoordinates)
    surroundingCircles.push(surroundingCirclesForThisLine)
  }
  return surroundingCircles
}

function getSurroundingCirclesForOneLine(line: Coordinate, circleCoordinates: Coordinate[]) {
  const surroundingCircles = []
  for (const circle of circleCoordinates) {
    // horizontals / verticals
    if (circle.x === line.x - 1 && circle.y === line.y) {
      surroundingCircles.push(circle)
    }
    if (circle.x === line.x + 1 && circle.y === line.y) {
      surroundingCircles.push(circle)
    }
    if (circle.x === line.x && circle.y === line.y - 1) {
      surroundingCircles.push(circle)
    }
    if (circle.x === line.x && circle.y === line.y + 1) {
      surroundingCircles.push(circle)
    }

    if (line.matchedSymbol === '/') {
      // diagonals
      if (circle.x === line.x - 1 && circle.y === line.y + 1) {
        surroundingCircles.push(circle)
      }
      if (circle.x === line.x + 1 && circle.y === line.y - 1) {
        surroundingCircles.push(circle)
      }
    }

    if (line.matchedSymbol === '|') {
      // diagonals
      if (circle.x === line.x - 1 && circle.y === line.y - 1) {
        surroundingCircles.push(circle)
      }
      if (circle.x === line.x + 1 && circle.y === line.y + 1) {
        surroundingCircles.push(circle)
      }
    }
  }
  return surroundingCircles
}

function mapStringTo2dArray(template: string) {
  const longestRow = getLongestRow(template)
  const rows = template.split('\n')
  const grid = []
  for (const row of rows) {
    const cells = row.split('')
    const paddedCells = cells.concat(Array(longestRow - cells.length).fill(' '))
    grid.push(paddedCells)
  }
  return grid
}

function getLongestRow(template: string) {
  const rows = template.split('\n')
  const longestRow = rows.reduce((longest, current) => {
    return current.length > longest.length ? current : longest
  })
  return longestRow.length
}

function getCoordinates(mapGrid: string[][], symbols: string[]): Coordinate[] {
  const coordinates: Coordinate[] = []
  for (let y = 0; y < mapGrid.length; y++) {
    for (let x = 0; x < mapGrid[y].length; x++) {
      if (symbols.includes(mapGrid[y][x])) {
        coordinates.push({ x, y, id: coordinates.length.toString(), matchedSymbol: mapGrid[y][x] })
      }
    }
  }
  return coordinates
}
