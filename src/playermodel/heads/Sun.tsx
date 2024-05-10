import { ModelProps } from '../types'

export function Sun(props: ModelProps) {
  return (
    <path
      d='m 8.1419 -29.0781 l 2.3996 10.4373 l 10.1811 -3.3229 l -2.7257 10.357 l 10.5591 1.7891 l -7.2266 7.9039 L 29.8475 4.5775 L 19.7755 8.2177 L 24.3014 17.924 L 13.6914 16.4666 L 13.1881 27.1644 L 4.4707 20.9431 l -5.4172 9.2385 l -4.8277 -9.5598 l -9.09 5.6628 l 0.168 -10.7083 l -10.6805 0.7898 l 5.1251 -9.4037 l -9.8241 -4.2641 l 8.9082 -5.9448 l -6.7172 -8.3412 l 10.6505 -1.124 l -2.0715 -10.5074 l 9.9529 3.9543 l 3.0488 -10.2665 l 6.9752 8.1267 z'
      style={{
        stroke: 'black',
        strokeWidth: 3,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: props.colour,
      }}
    />
  )
}
