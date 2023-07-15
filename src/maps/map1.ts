import { parseMap } from './parseMap'

/*

O = circle
- = connecting line
F = finish
1/2/3/4 = player start points
Z = zoom in point
S = stone

*/

export const map1 = parseMap(`
      F
      -
O-O-O-S-O-O-O
-           -
O-O-S-S-S-O-O
      -
    O-S-O
    -   -
  S-S-Z-S-S
  -       -
O-O-O-O-O-O-O
-   -   -   -
O-O-O   O-O-O
  -       -
  1       2
`)
