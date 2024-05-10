import { ModelProps } from '../types'

export function Angry(_: ModelProps) {
  return (
    <g>
      <circle cx={7} cy={-4} r={3} fill={'black'} />
      <circle cx={-7} cy={-4} r={3} fill={'black'} />
      <line
        x1={14}
        x2={5}
        y1={-8}
        y2={-6}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
      <line
        x1={-14}
        x2={-5}
        y1={-8}
        y2={-6}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
    </g>
  )
}
