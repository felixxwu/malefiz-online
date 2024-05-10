import { map } from '../../../signals/signals'
import { consts } from '../../../config/consts'

export function CustomElements() {
  const customElements = map.value.filter(circle => circle.custom)

  return (
    <>
      {customElements.map(circle => {
        const Custom = circle.custom!
        return (
          <foreignObject
            x={circle.position.x * 100 - consts.circleRadius}
            y={circle.position.y * 100 - consts.circleRadius}
            style={{ overflow: 'visible', pointerEvents: 'all' }}
          >
            <Custom />
          </foreignObject>
        )
      })}
    </>
  )
}
