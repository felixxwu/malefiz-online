import { rollDie } from '../dbactions/rollDie'
import { getDeactivatedItems } from '../utils/getDeactivatedItems'
import { Item } from './'

function Dot({ x, y }: { x: number; y: number }) {
  return (
    <circle
      r={2}
      style={{
        fill: 'yellow',
        transform: `translate(${x}px, ${y}px)`,
      }}
    />
  )
}

export const DoubleDice = {
  name: 'Double Dice',
  colour: 'yellow',
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
      <Dot x={-3.5} y={-5} />
      <Dot x={-3.5} y={0} />
      <Dot x={-3.5} y={5} />
      <Dot x={3.5} y={-5} />
      <Dot x={3.5} y={0} />
      <Dot x={3.5} y={5} />
    </g>
  ),
  actionWhenActive: {
    onClick: async () => {
      await rollDie({ items: getDeactivatedItems() })
    },
    text: 'Double dice, roll again!',
    showDie: true,
    clickable: true,
  },
  onPickup: () => {
    console.log('Double Dice picked up')
  },
  onCircleClickWhenActive: null,
  aiAction: () => {
    console.log('Double Dice AI action')
    rollDie({ items: getDeactivatedItems() })
  },
} as const satisfies Item
