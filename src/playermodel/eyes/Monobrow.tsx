import { ModelProps } from '../types'

export function Monobrow(_: ModelProps) {
  return (
    <g>
      <circle cx={7} cy={-4} r={3} fill={'black'} />
      <circle cx={-7} cy={-4} r={3} fill={'black'} />
      <line
        x1={12}
        x2={-12}
        y1={-6}
        y2={-6}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
    </g>
  )
}
