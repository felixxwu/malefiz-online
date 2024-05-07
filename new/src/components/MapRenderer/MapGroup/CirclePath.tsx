import { map } from '../../../signals'
import { singleCirclePathData } from './utils/singleCirclePathData'

export function CirclePath() {
  function getCirclePathData() {
    let pathData = ''
    for (const circleData of map.value.filter(circle => !circle.start && !circle.safeZone)) {
      pathData += singleCirclePathData(circleData)
    }
    return pathData
  }

  return <path d={getCirclePathData()} />
}
