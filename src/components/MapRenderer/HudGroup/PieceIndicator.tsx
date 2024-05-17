import { keyframes, styled } from 'goober'
import { getCircleFromPiece } from '../../../signals/queries/getCircleFromPiece'
import { colours } from '../../../config/colours'

export function PieceIndicator(props: { pieceId: string }) {
  if (!props.pieceId) return null

  const circle = getCircleFromPiece(props.pieceId)

  return <CircleIndicator x={circle!.position.x} y={circle!.position.y} />
}

export function CircleIndicator(props: { x: number; y: number }) {
  const { x, y } = { x: props.x * 100, y: props.y * 100 - 50 }

  return (
    <Polygon
      points={`${x - 10},${y} ${x + 10},${y} ${x},${y + 20}`}
      style={{
        fill: colours.background,
        stroke: 'black',
        strokeWidth: '4px',
        strokeLinejoin: 'round',
      }}
    />
  )
}

const upAndDown = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

const Polygon = styled('polygon')`
  animation: ${upAndDown} 1s infinite ease-in-out;
`
