import { ModelProps } from '../types'

export function Points(_: ModelProps) {
  return (
    <g>
      <circle cx={7} cy={-4} r={3} fill={'black'} />
      <circle cx={-7} cy={-4} r={3} fill={'black'} />
    </g>
  )
}
