import { rollDie } from '../dbactions/rollDie'
import { getDeactivatedItems } from '../utils/getDeactivatedItems'
import { Item } from './'
import { ItemAction } from './ItemAction'

function Dot({ x, y }: { x: number; y: number }) {
  return (
    <circle
      r={2}
      style={{
        fill: DoubleDice.colour,
        transform: `translate(${x}px, ${y}px)`,
      }}
    />
  )
}

export const DoubleDice = {
  name: 'Extra Roll',
  colour: 'hsl(60, 70%, 50%)',
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
    text: 'Roll again',
    showDie: true,
    clickable: true,
  },
  onPickup: () => {},
  alert: () => <ItemAction title='Extra roll: roll again!' />,
  onCircleClickWhenActive: null,
  aiAction: () => {
    rollDie({ items: getDeactivatedItems() })
  },
} as const satisfies Item
