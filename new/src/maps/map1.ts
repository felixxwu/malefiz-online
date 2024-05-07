import { parseMap } from './parseMap'

export const map1 = parseMap(
  1,
  `
            F
            -
O-O-O-O-O-O-S-O-O-O-O-O-O
-                       -
O                       O
-                       -
O-O-O-O-O-O-S-O-O-O-O-O-O
            -
D           S
            -
        O-O-S-O-O   P
        -       -
        O       O
        -       -
    O-O-S-O-Z-O-S-O-O
    -               -
    O               O
    -               -
S-O-O-O-S-O-O-O-S-O-O-O-S
-       -       -       -
X       X       X       X 
-       -       -       -
X-X-X-X-X-X-X-X-X-X-X-X-X
    -       -       -
    1       2       3
`
)
