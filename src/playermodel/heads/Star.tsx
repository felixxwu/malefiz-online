import { ModelProps } from '../types'

export function Star(props: ModelProps) {
  return (
    <path
      d='m -16.3042 22.88 l -2.4468 -17.7981 l -7.4636 -14.479 l 16.1709 -7.827 l 11.464 -11.5725 l 12.441 12.9607 l 14.5487 7.3268 l -8.4819 15.8372 l -2.4724 16.1007 l -17.6831 -3.1728 z'
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
