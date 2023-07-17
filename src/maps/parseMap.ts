import { GameState } from '../types/gameTypes'
import { Map } from '../types/mapTypes'

/*

O = circle
- = connecting line
F = finish
1/2/3/4 = player start points
Z = zoom in point
S = stone
X = safe zone

*/

type Coordinate = {
  x: number
  y: number
  id: string
  matchedSymbol: string
}

const players = [
  { id: '1', colour: 'hsl(0 70% 65% / 1)', name: 'Red' },
  { id: '2', colour: 'hsl(240 70% 70% / 1)', name: 'Blue' },
  { id: '3', colour: 'hsl(140 70% 60% / 1)', name: 'Green' },
  { id: '4', colour: 'hsl(60 70% 60% / 1)', name: 'Yellow' },
]

export function parseMap(template: string): GameState {
  let pieceId = 0
  const mapGrid = mapStringTo2dArray(template)
  const circleCoordinates = getCoordinates(
    mapGrid,
    ['O', 'F', 'Z', 'S', 'X'].concat(players.map(p => p.id))
  )
  const stoneCoordinates = getCoordinates(mapGrid, ['S'])
  const playerCoordinates = players.map(player => ({
    ...player,
    coords: getCoordinates(mapGrid, [player.id]),
  }))
  const lineCoordinates = getCoordinates(mapGrid, ['-'])
  const surroundingCircles = getSurroundingCircles(lineCoordinates, circleCoordinates)
  const circleNeighbours = getCircleNeighbours(circleCoordinates, surroundingCircles)
  const createdMap: Map = circleNeighbours.map(c => ({
    id: c.circle.id,
    position: { x: Math.floor(c.circle.x / 2), y: Math.floor(c.circle.y / 2) },
    neighbours: c.neighbours,
    start: players.find(p => p.id === c.circle.matchedSymbol)?.id ?? null,
    finish: c.circle.matchedSymbol === 'F',
    zoomInPoint: c.circle.matchedSymbol === 'Z',
    safeZone: c.circle.matchedSymbol === 'X',
  }))
  const gameState: GameState = {
    map: createdMap,
    players: playerCoordinates
      .map(player => ({
        ...player,
        positions: multiplyPieces(player.coords, 5).map(c => ({
          pieceId: `${pieceId++}`,
          circleId: findCircle(c.x, c.y, circleCoordinates)!.id,
        })),
      }))
      .filter(p => p.positions.length > 0),
    stones: stoneCoordinates.map(c => ({
      stoneId: c.id,
      circleId: findCircle(c.x, c.y, circleCoordinates)!.id,
    })),
    created: Date.now(),
    users: [],
    playerTurn: '1',
    dieRoll: null,
    gameStateHash: '',
  }
  return gameState
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

function findCircle(x: number, y: number, circleCoordinates: Coordinate[]) {
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

function getSurroundingCircles(lineCoordinates: Coordinate[], circleCoordinates: Coordinate[]) {
  const surroundingCircles = []
  for (const line of lineCoordinates) {
    const surroundingCircle = getSurroundingCircle(line, circleCoordinates)
    surroundingCircles.push(surroundingCircle)
  }
  return surroundingCircles
}

function getSurroundingCircle(line: Coordinate, circleCoordinates: Coordinate[]) {
  const surroundingCircles = []
  for (const circle of circleCoordinates) {
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
