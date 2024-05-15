import { polygonToXY } from '../../../utils/polygonToXY'

export function Stone() {
  return (
    <polygon
      style={{
        stroke: 'black',
        strokeWidth: '5',
        filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))',
        fill: 'white',
        strokeLinejoin: 'round',
      }}
      points={[0, 1, 2, 3, 4, 5, 6, 7]
        .map(i => polygonToXY(i, 8, 22))
        .map(({ x, y }) => `${x},${y}`)
        .join(' ')}
    />
  )
}
