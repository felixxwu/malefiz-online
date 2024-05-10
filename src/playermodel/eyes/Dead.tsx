import { ModelProps } from '../types'

export function Dead(_: ModelProps) {
  return (
    <g>
      <line
        x1={10}
        x2={5}
        y1={-2}
        y2={-6}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
      <line
        x1={10}
        x2={5}
        y1={-6}
        y2={-2}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
      <line
        x1={-10}
        x2={-5}
        y1={-2}
        y2={-6}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
      <line
        x1={-10}
        x2={-5}
        y1={-6}
        y2={-2}
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round' }}
      />
    </g>
  )
}
