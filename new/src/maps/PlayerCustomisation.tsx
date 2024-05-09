import { test } from '../signals/signals'

export function PlayerCustomisation() {
  return (
    <div
      onClick={() => {
        test.value++
        console.log('fesfesf')
      }}
    >
      customisation {test.value}
    </div>
  )
}
