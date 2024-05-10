import { ModelProps } from '../types'

export function Closed(_: ModelProps) {
  return (
    <g>
      <line
        x1={10}
        x2={5}
        y1={-4}
        y2={-4}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
      <line
        x1={-10}
        x2={-5}
        y1={-4}
        y2={-4}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
    </g>
  )
}
