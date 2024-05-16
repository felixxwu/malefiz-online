import { keyframes, styled } from 'goober'
import { textOpacity } from '../../../signals/signals'
import { polygonToXY } from '../../../utils/polygonToXY'
import { JSX } from 'preact/jsx-runtime'
import { consts } from '../../../config/consts'
import { CSSProperties } from 'preact/compat'

export function ItemSvg({
  colour,
  Icon,
  style,
}: {
  colour: string
  Icon: () => JSX.Element
  style?: CSSProperties
}) {
  return (
    <ItemGroup style={style}>
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
    </ItemGroup>
  )
}

const popIn = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }

`

const ItemGroup = styled('g')`
  transform: scale(0);
  animation: ${popIn} 1s ${consts.customEaseOut};
  animation-fill-mode: forwards;
`
