import { map, debugMode } from '../../../signals/signals'

export function DebugCircleIds() {
  if (!debugMode.value) return null

  return (
    <>
      {map.value.map(circle => (
        <text
          key={circle.id}
          x={circle.position.x * 100}
          y={circle.position.y * 100}
          font-family={'Lexend Deca'}
          font-size={14}
          dominant-baseline='middle'
          text-anchor='middle'
          style={{
            fill: 'white',
            opacity: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            fontWeight: 'bold',
          }}
        >
          {circle.id}
        </text>
      ))}
    </>
  )
}
