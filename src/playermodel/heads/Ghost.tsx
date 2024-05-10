import { ModelProps } from '../types'

export function Ghost(props: ModelProps) {
  return (
    <path
      d='M 24 -8 A 1 1 0 0 0 -24 -8 L -24 18 L -15 12 L -8 18 L 0 12 L 8 18 L 15 12 L 24 18 L 24 -8'
      style={{
        stroke: 'black',
        strokeWidth: 3,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: props.colour,
        transform: 'translate(0, 7px)',
      }}
    />
  )
}
