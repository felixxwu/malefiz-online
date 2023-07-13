import { colour1 } from './data/cssVars'
import { elNS } from './utils/el'

function createIcon(path: string) {
  return (size: number = 24, colour: string = colour1.value) =>
    elNS('svg')({
      readonlyAttributes: { viewBox: `0 0 24 24`, width: `${size}`, height: `${size}` },
      children: [
        elNS('path')({
          readonlyAttributes: { d: path, fill: colour },
        }),
      ],
    })
}

export const fullScreenIcon = createIcon(
  'M24 9h-4v-5h-5v-4h9v9zm-9 15v-4h5v-5h4v9h-9zm-15-9h4v5h5v4h-9v-9zm9-15v4h-5v5h-4v-9h9z'
)
export const plusIcon = createIcon('M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z')
export const minusIcon = createIcon('M0 10h24v4h-24z')
export const menuIcon = createIcon('M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z')
export const crossIcon = createIcon(
  'M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z'
)
