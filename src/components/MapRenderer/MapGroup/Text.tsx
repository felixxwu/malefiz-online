import { map, textOpacity } from '../../../signals/signals'
import { colours } from '../../../config/colours'

export function Text() {
  const circlesWithText = map.value.filter(circle => circle.text !== undefined)

  return (
    <>
      {circlesWithText.map(circle => (
        <g>
          {circle.text!.map(text => (
            <text
              x={circle.position.x * 100 + (text.x ?? 0)}
              y={circle.position.y * 100 + (text.y ?? 0)}
              font-family={'Lexend Deca'}
              font-size={circle.fontSize}
              style={{
                fill: colours.background,
                opacity: textOpacity.value,
                transition: `500ms`,
                userSelect: 'none',
              }}
            >
              {text.content}
            </text>
          ))}
        </g>
      ))}
    </>
  )
}
