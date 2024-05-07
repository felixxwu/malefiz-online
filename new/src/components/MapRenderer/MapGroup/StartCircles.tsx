import { styled } from 'goober'
import { map } from '../../../signals'

export function StartCircles() {
  const startCircles = map.value.filter(circle => circle.start)

  function polygonToXY(i: number, spokes: number, spacing: number) {
    return {
      x: spacing * Math.cos(Math.PI * ((i * 2) / spokes) - Math.PI * 0.5),
      y: spacing * Math.sin(Math.PI * ((i * 2) / spokes) - Math.PI * 0.5),
    }
  }

  return (
    <>
      {startCircles.map(circle => (
        <Polygon
          key={circle.id}
          points={[0, 1, 2, 3, 4]
            .map(i => polygonToXY(i, 5, 30))
            .map(({ x, y }) => `${circle.position.x * 100 + x},${circle.position.y * 100 + y}`)
            .join(' ')}
        />
      ))}
    </>
  )
}

const Polygon = styled('polygon')`
  cursor: pointer;
  fill: black;
  stroke-linejoin: round;
  stroke: black;
  stroke-width: 60;
`
