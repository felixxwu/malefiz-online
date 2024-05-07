import { parseMap } from './parseMap'

export const map3 = parseMap(
  3,
  `
D     1         2         3
       |        -        /
        X-X-X-X-X-X-X-X-X
            -       -
X-X-X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
-                               -
X                               X
-                               -
S-O-O-O-O-O-O-O-S-O-O-O-O-O-O-O-S
                -
O-O-O-O-O-O-O-O-O-O-O-O-O-O-O-O-O
-                               -
O               O               O
-              /-|              -
O   O-O-O-O-O O S O O-O-O-O-O   O
-   -       | / - | /       -   -
S-S-S        S  F  S        S-S-S
-   -       / | - / |       -   -
O   O-O-O-O-O O S O O-O-O-O-O   O
-              |-/              -
O               Z               O
-                               -
O-O-O-O-O-O-O-O-O-O-O-O-O-O-O-O-O
                -
S-O-O-O-O-O-O-O-S-O-O-O-O-O-O-O-S
-                               -
X               P               X
-                               -
X-X-X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
            -       -
        X-X-X-X-X-X-X-X-X
       /        -        |
      4         5         6
`
)
