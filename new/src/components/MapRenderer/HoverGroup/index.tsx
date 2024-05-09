import { styled } from 'goober'
import { circleHovered, gameState } from '../../../signals/signals'
import { consts } from '../../../config/consts'
import { getMyPlayer } from '../../../utils/getUsers'
import { colours } from '../../../config/colours'

export function HoverGroup() {
  const circleHoveredValue = circleHovered.value
  if (!circleHoveredValue) return null
  if (circleHoveredValue.start) return null
  if (gameState.value && gameState.value.playerTurn !== getMyPlayer()?.id) return null
  if (gameState.value && gameState.value.dieRoll === null) return null

  const { x, y } = {
    x: circleHoveredValue.position.x * 100,
    y: circleHoveredValue.position.y * 100,
  }

  return (
    <Group>
      <circle
        style={{
          transform: `translate(${x}px, ${y}px)`,
          strokeWidth: '5px',
        }}
        cx='0'
        cy='0'
        r={consts.circleRadius - 2}
        fill='none'
        stroke={getMyPlayer()?.colour ?? colours.highlight}
      />
    </Group>
  )
}

const Group = styled('g')`
  pointer-events: none;
`
