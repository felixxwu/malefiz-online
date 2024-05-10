import { ModelProps } from '../types'

export function Circle(props: ModelProps) {
  return (
    <circle
      r={25}
      fill={props.colour}
      style={{
        stroke: 'black',
        strokeWidth: 3,
      }}
    />
  )
}
