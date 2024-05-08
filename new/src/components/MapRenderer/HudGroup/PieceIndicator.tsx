import { styled } from 'goober'
import { getCircleFromPiece } from '../../../utils/getCircleFromPiece'
import { colours } from '../../../config/colours'

export function PieceIndicator(props: { pieceId: string }) {
  if (!props.pieceId) return null

  const circle = getCircleFromPiece(props.pieceId)
  const { x, y } = { x: circle!.position.x * 100, y: circle!.position.y * 100 - 50 }

  return (
    <Polygon
      points={`${x - 15},${y} ${x + 15},${y} ${x},${y + 30}`}
      style={{
        fill: colours.background,
        stroke: 'black',
        strokeWidth: '5px',
        strokeLinejoin: 'round',
      }}
    />
  )
}

const Polygon = styled('polygon')`
  animation: upAndDown 1s infinite;

  @keyframes upAndDown {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`
