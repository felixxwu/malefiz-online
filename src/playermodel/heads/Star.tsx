import { ModelProps } from '../types'

export function Star(props: ModelProps) {
  return (
    <path
      d='m -17.9346 25.168 l -2.6915 -19.5779 l -8.21 -15.9269 l 17.788 -8.6097 l 12.6104 -12.7298 l 13.6851 14.2568 l 16.0036 8.0595 l -9.3301 17.4209 l -2.7196 17.7108 l -19.4514 -3.4901 z'
      style={{
        stroke: 'black',
        strokeWidth: 3,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: props.colour,
        transform: 'translate(-1px, 0px)',
      }}
    />
  )
}
