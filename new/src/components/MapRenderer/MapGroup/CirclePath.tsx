import { map } from '../../../signals/signals'
import { singleCirclePathData } from './utils/singleCirclePathData'

export function CirclePath() {
  function getCirclePathData() {
    let pathData = ''
    for (const circleData of map.value.filter(
      circle => !circle.start && !circle.safeZone && !circle.custom
    )) {
      pathData += singleCirclePathData(circleData)
    }
    return pathData
  }

  return <path d={getCirclePathData()} />
}
