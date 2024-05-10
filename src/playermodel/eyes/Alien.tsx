import { ModelProps } from '../types'

export function Alien(_: ModelProps) {
  return (
    <g>
      <ellipse
        cx={0}
        cy={0}
        rx={3}
        ry={7}
        fill={'black'}
        style={{ transform: 'translate(8px, -4px) rotate(55deg)' }}
      />
      <ellipse
        cx={0}
        cy={0}
        rx={3}
        ry={7}
        fill={'black'}
        style={{ transform: 'translate(-8px, -4px) rotate(-55deg)' }}
      />
    </g>
  )
}
