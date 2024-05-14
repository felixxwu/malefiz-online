import { styled } from 'goober'

export function ItemAction(props: { title: string }) {
  return <H1>{props.title}</H1>
}

const H1 = styled('h1')`
  color: white;
  text-align: center;
`
