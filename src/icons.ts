import { colour1 } from './data/cssVars'
import { path, svg } from './utils/el'

function createIcon(pathString: string) {
  return (size: number = 24, colour: string = colour1.value) =>
    svg({
      readonlyAttributes: { viewBox: `0 0 24 24`, width: `${size}`, height: `${size}` },
      children: [
        path({
          readonlyAttributes: { d: pathString, fill: colour },
        }),
      ],
    })
}

export const plusIcon = createIcon('M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z')
export const minusIcon = createIcon('M0 10h24v4h-24z')
export const menuIcon = createIcon('M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z')
export const fullScreenIcon = createIcon(
  'M24 9h-4v-5h-5v-4h9v9zm-9 15v-4h5v-5h4v9h-9zm-15-9h4v5h5v4h-9v-9zm9-15v4h-5v5h-4v-9h9z'
)
export const crossIcon = createIcon(
  'M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z'
)
export const chevronLeft = createIcon(
  'M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z'
)
export const chevronRight = createIcon(
  'M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z'
)
export const refreshIcon = createIcon(
  'M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z'
)
