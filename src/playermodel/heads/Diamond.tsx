import { ModelProps } from '../types'

export function Diamond(props: ModelProps) {
  return (
    <rect
      width={46}
      height={46}
      rx={10}
      ry={10}
      fill={props.colour}
      style={{
        stroke: 'black',
        strokeWidth: 3,
        transform: 'translate(0px, -32px) rotate(45deg)',
      }}
    />
  )
}
