import { map } from '../../../signals/signals'

export function CustomElements() {
  const customElements = map.value.filter(circle => circle.custom)

  return (
    <>
      {customElements.map(circle => {
        const Custom = circle.custom!
        return (
          <g
            style={{
              pointerEvents: 'all',
              transform: `translate(${circle.position.x * 100}px, ${circle.position.y * 100}px)`,
            }}
          >
            <Custom />
          </g>
        )
      })}
    </>
  )
}
