import { ModelProps } from '../types'

export function Smile(_: ModelProps) {
  return (
    <g>
      <path
        d='M -5 7 q 5 5 10 0'
        style={{ strokeWidth: 3, stroke: 'black', strokeLinecap: 'round', fill: 'none' }}
      />
    </g>
  )
}
