import { styled } from 'goober'
import { map, textOpacity } from '../../../signals/signals'
import { consts } from '../../../config/consts'
import { colours } from '../../../config/colours'

export function Text() {
  const circlesWithText = map.value.filter(
    circle => circle.text !== undefined && circle.text !== ''
  )

  return (
    <>
      {circlesWithText.map(circle => (
        <ForeignObject
          x={circle.position.x * 100 - consts.circleRadius}
          y={circle.position.y * 100 - consts.circleRadius}
          width={`${consts.circleRadius * 2}px`}
          height={`${consts.circleRadius * 2}px`}
        >
          <FlexDiv style={{ fontSize: `${circle.fontSize}px` }}>
            <TextDiv style={{ ...circle.textStyles, opacity: textOpacity.value }}>
              {circle.text}
            </TextDiv>
          </FlexDiv>
        </ForeignObject>
      ))}
    </>
  )
}

const ForeignObject = styled('foreignObject')`
  pointer-events: none;
`

const FlexDiv = styled('div')`
  width: ${consts.circleRadius * 2}px;
  height: ${consts.circleRadius * 2}px;
  color: ${colours.background};
  display: flex;
  align-items: center;
  justify-content: center;
`

const TextDiv = styled('div')`
  text-align: center;
  transition: 1000ms;
  width: min-content;
`
