import { ModelProps } from '../types'

export function Blob(props: ModelProps) {
  return (
    <path
      d='m -21.9709 -10.6503 c 0 0 -1.0095 -0.6907 -1.1157 -4.7816 C -23.1929 -19.5229 -18.4644 -20.6386 -14.8516 -20.2136 C -11.2388 -19.7885 -10.3888 -19.6291 -7.7323 -21.9668 C -5.0759 -24.3045 -3.2776 -24.7826 -1.6 -24.1982 c 1.6776 0.5844 3.3246 2.4971 6.4061 1.7533 c 3.0815 -0.7438 6.0567 -0.5313 7.5443 1.3814 c 1.4876 1.9126 1.8064 4.6753 3.5596 7.3849 c 1.7533 2.7096 6.5349 3.6128 8.66 6.2161 c 2.1252 2.6033 1.9126 4.3034 -0.2125 6.2161 c -2.1252 1.9126 -3.6128 4.941 -1.4876 8.66 c 2.1252 3.719 7.7568 7.0662 6.163 12.751 c -1.5939 5.6848 -5.366 3.1346 -13.6541 3.4003 c -8.2881 0.2656 -12.751 4.6222 -20.0827 2.9752 c -7.3318 -1.647 -6.588 -4.3566 -13.2291 -5.0473 c -6.6411 -0.6907 -11.2633 0 -13.0697 -3.5065 c -1.8064 -3.5065 3.3471 -9.432 7.4381 -16.4575 c 4.0909 -7.0255 3.4534 -8.5131 1.5939 -12.179 z'
      style={{
        stroke: 'black',
        strokeWidth: 3,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: props.colour,
        transform: 'translate(0px, -1px)',
      }}
    />
  )
}