import { ModelProps } from '../types'

export function Square(props: ModelProps) {
  return (
    <rect
      width={50}
      height={50}
      fill={props.colour}
      style={{
        stroke: 'black',
        strokeWidth: 3,
        transform: 'translate(-25px, -25px)',
      }}
    />
  )
}
