import { textOpacity } from '../../../signals/signals'
import { polygonToXY } from '../../../utils/polygonToXY'
import { JSX } from 'preact/jsx-runtime'

export function ItemSvg({ colour, Icon }: { colour: string; Icon: () => JSX.Element }) {
  return (
    <>
      <polygon
        style={{
          filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.3))',
          willChange: 'transform',
          transition: '500ms',
          fill: colour,
          opacity: textOpacity.value,
          strokeLinejoin: 'round',
          stroke: 'black',
          strokeWidth: 2,
        }}
        points={[0, 1, 2, 3, 4]
          .map(i => polygonToXY(i, 5, 20))
          .map(({ x, y }) => `${x},${y}`)
          .join(' ')}
      />
      <Icon />
    </>
  )
}
