export function Dot(props: { position: keyof typeof dotPositions }) {
  return (
    <circle
      cx={dotPositions[props.position].x}
      cy={dotPositions[props.position].y}
      r={10}
      fill='black'
    ></circle>
  )
}

// dot positions:
// 1 . 2
// 3 4 5
// 6 . 7

export const dotPositions = {
  1: { x: 27, y: 27 },
  2: { x: 73, y: 27 },
  3: { x: 27, y: 50 },
  4: { x: 50, y: 50 },
  5: { x: 73, y: 50 },
  6: { x: 27, y: 73 },
  7: { x: 73, y: 73 },
}

export const dotLayouts: { [key: number]: (keyof typeof dotPositions)[] } = {
  1: [4],
  2: [2, 6],
  3: [2, 4, 6],
  4: [1, 2, 6, 7],
  5: [1, 2, 4, 6, 7],
  6: [1, 2, 3, 5, 6, 7],
}
