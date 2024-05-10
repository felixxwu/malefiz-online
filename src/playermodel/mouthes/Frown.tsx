import { ModelProps } from '../types'

export function Frown(_: ModelProps) {
  return (
    <g>
      <path
        d='M -5 8 q 5 -5 10 0'
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round', fill: 'none' }}
      />
    </g>
  )
}
