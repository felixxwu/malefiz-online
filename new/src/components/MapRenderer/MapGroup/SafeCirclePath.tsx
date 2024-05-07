import { colours } from '../../../config/colours'
import { map } from '../../../signals'
import { singleCirclePathData } from './utils/singleCirclePathData'

export function SafeCirclePath() {
  function getCirclePathData() {
    let pathData = ''
    for (const circleData of map.value.filter(circle => circle.safeZone)) {
      pathData += singleCirclePathData(circleData)
    }
    return pathData
  }

  return <path d={getCirclePathData()} fill={colours.safeCircle} />
}
