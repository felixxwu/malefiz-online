import { rollDie } from '../dbactions/rollDie'
import { getDeactivatedItems } from '../signals/getters/getDeactivatedItems'
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
  description: 'Get another chance at rolling numbers 1 to 3.',
  colour: 'hsl(190, 70%, 75%)',
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
      rollDie({ items: getDeactivatedItems() }, 3)
    },
    text: 'Roll 1 to 3',
    showDie: true,
    clickable: true,
  },
  onPickup: () => {},
  alert: () => <ItemAlert item={LowRoller} />,
  onCircleClickWhenActive: null,
  aiAction: () => {
    rollDie({ items: getDeactivatedItems() }, 3)
  },
} as const satisfies Item
