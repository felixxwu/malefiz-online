import { styled } from 'goober'
import { map } from '../../../signals/signals'
import { colours } from '../../../config/colours'
import { consts } from '../../../config/consts'

export function FinishCircles() {
  const finishCircles = map.value.filter(circle => circle.finish)

  return (
    <>
      {finishCircles.map(circle => (
        <>
          <Circle
            cx={circle.position.x * 100}
            cy={circle.position.y * 100}
            r={consts.circleRadius - 7.5}
          />
          <Circle
            cx={circle.position.x * 100}
            cy={circle.position.y * 100}
            r={consts.circleRadius - 17.5}
          />
        </>
      ))}
    </>
  )
}

const Circle = styled('circle')`
  pointer-events: none;
  stroke: ${colours.background};
  fill: black;
  stroke-width: 5;
`
