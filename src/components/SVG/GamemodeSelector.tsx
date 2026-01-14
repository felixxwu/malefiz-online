import { colours } from '../../config/colours'
import { events } from '../../events'
import { itemDefs } from '../../items'
import {
  arcadeEventSelection,
  arcadeItemSelection,
  menuOpen,
  pickArcadeItems,
} from '../../signals/signals'
import { objectToArray } from '../../utils/objectToArray'
import { PencilIconPath } from '../Icons'

export function GamemodeSelector() {
  const classicMode = arcadeItemSelection.value.length === 0

  function handleClick() {
    if (classicMode) {
      arcadeItemSelection.value = objectToArray(itemDefs).map(({ key }) => key)
      arcadeEventSelection.value = events.map(event => event.name)
    } else {
      arcadeItemSelection.value = []
      arcadeEventSelection.value = []
    }
  }

  function handleMenuClick() {
    menuOpen.value = true
  }

  return (
    <>
      <g
        style={{
          transform: 'translate(-20px, 10px)',
        }}
      >
        <circle
          r={10}
          onClick={handleMenuClick}
          fill='black'
          style={{
            cursor: 'pointer',
          }}
        />
        <path
          d='M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z'
          fill={colours.background}
          style={{
            transform: 'scale(0.3) translate(-12px, -12px)',
            pointerEvents: 'none',
          }}
        />
      </g>

      <rect
        onClick={handleClick}
        x={0}
        y={0}
        width={100}
        height={20}
        rx={10}
        fill='black'
        style={{
          cursor: 'pointer',
        }}
      />

      {!classicMode && (
        <g
          style={{
            transform: 'translate(120px, 10px)',
          }}
        >
          <circle
            r={10}
            onClick={() => (pickArcadeItems.value = true)}
            fill='black'
            style={{
              cursor: 'pointer',
            }}
          />
          <PencilIconPath
            fill={colours.background}
            style={{ transform: 'scale(0.3) translate(-11px, -12px)', pointerEvents: 'none' }}
          />
        </g>
      )}

      <text
        x={48}
        y={11}
        font-family={'Lexend Deca'}
        font-size={9}
        dominant-baseline='middle'
        text-anchor='middle'
        style={{
          fill: colours.background,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {classicMode ? 'Classic mode' : 'Arcade mode'}
      </text>
    </>
  )
}
