import { styled } from 'goober'
import { JSX } from 'preact/jsx-runtime'

export function IconButton(props: { icon: () => JSX.Element; onClick: () => void }) {
  return (
    <g>
      <props.icon />
      <Rect
        onClick={props.onClick}
        width='24'
        height='24'
        rx='12'
        style={{
          cursor: 'pointer',
          transform: 'scale(2) translate(-6px, -6px)',
        }}
      />
    </g>
  )
}

const Rect = styled('rect')`
  fill: #00000000;

  &:hover {
    fill: #00000011;
  }
`
