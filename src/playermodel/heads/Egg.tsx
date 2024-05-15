import { ModelProps } from '../types'

export function Egg(props: ModelProps) {
  return (
    <path
      d='M 0 -27.5 C 22 -27.5 38.5 27.5 0 27.5 C -38.5 27.5 -22 -27.5 0 -27.5'
      style={{
        stroke: 'black',
        strokeWidth: 3,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: props.colour,
        transform: 'translate(0px, -2px)',
      }}
    />
  )
}
