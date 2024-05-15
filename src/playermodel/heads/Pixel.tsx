import { ModelProps } from '../types'

export function Pixel(props: ModelProps) {
  return (
    <path
      d='m -24 0 l 0 -12 l 6 0 l 0 -6 l 0 0 l 6 0 l 0 -6 l 24 0 l 0 6 l 6 0 l 0 6 l 6 0 l 0 24 l -6 0 l 0 6 l -6 0 l 0 6 l -24 0 l 0 -6 l -6 0 l 0 -6 l -6 0 l 0 -12'
      style={{
        stroke: 'black',
        strokeWidth: 3,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: props.colour,
        transform: 'translate(0px, 0px)',
      }}
    />
  )
}
