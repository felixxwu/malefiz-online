import { ModelProps } from '../types'

export function SideEye(_: ModelProps) {
  return (
    <g>
      <circle cx={10} cy={-4} r={3} fill={'black'} />
      <circle cx={-5} cy={-4} r={3} fill={'black'} />
      <line
        x1={12}
        x2={3}
        y1={-6}
        y2={-6}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
      <line
        x1={-12}
        x2={-3}
        y1={-6}
        y2={-6}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
    </g>
  )
}
