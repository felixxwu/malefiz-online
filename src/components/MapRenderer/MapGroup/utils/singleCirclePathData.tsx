import { Circle } from '../../../../types/mapTypes'
import { consts } from '../../../../config/consts'

export function singleCirclePathData(circleData: Circle) {
  return `M ${circleData.position.x * 100}, ${circleData.position.y * 100} m ${
    consts.circleRadius
  }, 0 a ${consts.circleRadius},${consts.circleRadius} 0 1,0 ${consts.circleRadius * -2},0 a ${
    consts.circleRadius
  },${consts.circleRadius} 0 1,0 ${consts.circleRadius * 2},0`
}
