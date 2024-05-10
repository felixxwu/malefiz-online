import { ModelProps } from '../types'

export function OFace(_: ModelProps) {
  return (
    <g>
      <ellipse
        cx={0}
        cy={9}
        rx={3}
        ry={4}
        fill={'none'}
        style={{
          stroke: 'black',
          strokeWidth: 3,
        }}
      />
    </g>
  )
}
