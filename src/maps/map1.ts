import { parseMap } from './parseMap'

/*

O = circle
- = connecting line
F = finish
1/2/3/4 = player start points
Z = zoom in point

*/

export const map1 = parseMap(`
      F
      -
O-O-O-O-O-O-O
-           -
O-O-O-O-O-O-O
      -
    O-Z-O
    -   -
  O-O-O-O-O
  -       -
O-O-O-O-O-O-O
-   -   -   -
O-O-O   O-O-O
  -       -
  1       2
`)
