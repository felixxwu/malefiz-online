import { styled } from 'goober'
import { Item } from '.'
import { ComponentChildren } from 'preact'
import { ItemSvg } from '../components/MapRenderer/ItemGroup/ItemSvg'

export function ItemAlert(props: { item: Item; children?: ComponentChildren }) {
  return (
    <Div>
      <Svg>
        <ItemSvg colour={props.item.colour} Icon={props.item.icon} />
      </Svg>
      <H1>{props.item.name}</H1>
      {props.children}
    </Div>
  )
}

const Div = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`

const Svg = styled('svg')`
  overflow: visible;
  width: 1px;
  height: 1px;
  margin-bottom: 40px;
  animation: spinonce 1s cubic-bezier(0, 0.9, 0.1, 1);
  animation-fill-mode: forwards;

  @keyframes spinonce {
    0% {
      transform: scale(3) rotate(-1000deg);
    }
    100% {
      transform: scale(3) rotate(0deg);
    }
  }
`

const H1 = styled('h1')`
  color: white;
  text-align: center;
`
