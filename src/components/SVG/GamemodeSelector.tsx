import { colours } from '../../config/colours'
import { itemDefs } from '../../items'
import { arcadeItemSelection, pickArcadeItems } from '../../signals/signals'
import { objectToArray } from '../../utils/objectToArray'
import { PencilIconPath } from '../Icons'

export function GamemodeSelector() {
  const classicMode = arcadeItemSelection.value.length === 0

  function handleClick() {
    if (classicMode) {
      arcadeItemSelection.value = objectToArray(itemDefs).map(({ key }) => key)
    } else {
      arcadeItemSelection.value = []
    }
  }

  return (
    <>
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
