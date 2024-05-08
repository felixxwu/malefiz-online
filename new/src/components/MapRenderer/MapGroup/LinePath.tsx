import { styled } from 'goober'
import { Circle } from '../../../types/mapTypes'
import { map } from '../../../signals'
import { consts } from '../../../config/consts'
import { colours } from '../../../config/colours'

export function LinePath() {
  function getLinePathData() {
    const linesHashTable: { [key: string]: Circle[] } = {}
    for (const circle of map.value) {
      for (const neighbourId of circle.neighbours) {
        const neighbour = map.value.find(c => c.id === neighbourId)
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

    return lines
      .map(
        ([circle1, circle2]) =>
          `M ${circle1.position.x * 100} ${circle1.position.y * 100} L ${
            circle2.position.x * 100
          } ${circle2.position.y * 100}`
      )
      .join(' ')
  }

  return <Path d={getLinePathData()}></Path>
}

const Path = styled('path')`
  stroke: ${colours.safeCircle};
  stroke-width: ${consts.pathStrokeWidth};
`
