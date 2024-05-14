import { updateGame } from '../dbactions/updateGame'
import { getDeactivatedItems } from '../utils/getDeactivatedItems'
import { Item } from './'
import { ItemAlert } from './ItemAlert'

function Dot({ x, y }: { x: number; y: number }) {
  return (
    <circle
      r={2}
      style={{
        fill: LowRoller.colour,
        transform: `translate(${x}px, ${y}px)`,
      }}
    />
  )
}

export const LowRoller = {
  name: 'Low Roller',
  colour: 'hsl(230, 70%, 75%)',
  icon: () => (
    <g style={{ transform: 'translateY(1px)' }}>
      <rect
        x={-10}
        y={-10}
        rx={3}
        width={20}
        height={20}
        style={{
          fill: 'black',
        }}
      />
      <Dot x={0} y={0} />
    </g>
  ),
  actionWhenActive: {
    onClick: async () => {
      updateGame({ dieRoll: Math.floor(Math.random() * 3) + 1, items: getDeactivatedItems() })
    },
    text: 'Roll a low number! (1-3)',
    showDie: true,
    clickable: true,
  },
  onPickup: () => {},
  alert: () => <ItemAlert item={LowRoller} />,
  onCircleClickWhenActive: null,
  aiAction: () => {
    updateGame({ dieRoll: Math.floor(Math.random() * 3) + 1, items: getDeactivatedItems() })
  },
} as const satisfies Item
