import { parseMap } from './parseMap'

/*

O = circle
- = connecting line
F = finish
1/2/3/4 = player start points
Z = zoom in point
S = stone
X = safe zone

*/

export const map1 = parseMap(`
      F
      -
O-O-O-S-O-O-O
-           -
O-O-O-S-O-O-O
      -
    S-S-S
    -   -
  S-O-Z-O-S
  -       -
O-S-O-O-O-S-O
-   -   -   -
X   X   X   X
-   -   -   -
X-X-X   X-X-X
  -       -
  1       2
`)
