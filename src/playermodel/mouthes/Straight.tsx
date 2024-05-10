import { ModelProps } from '../types'

export function Straight(_: ModelProps) {
  return (
    <g>
      <line
        x1={-6}
        x2={6}
        y1={8}
        y2={8}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
    </g>
  )
}
