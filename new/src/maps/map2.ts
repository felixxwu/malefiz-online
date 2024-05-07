import { parseMap } from './parseMap'

export const map2 = parseMap(
  2,
  `
                F
                -
O-O-O-O-O-O-O-O-S-O-O-O-O-O-O-O-O
-                               -
O                               O
-                               -
O-O-O-O-O-O-O-O-S-O-O-O-O-O-O-O-O
                -
D               S
                -
            O-O-S-O-O
            -       -
            O       O
            -       -
        O-O-S-O-O-O-S-O-O
        -               -
        O               O
        -               -
    O-O-O-O-O-O-Z-O-O-O-O-O-O
    -       -       -       -
    O       O       O       O 
    -       -       -       -
S-O-O-O-S-O-O-O-S-O-O-O-S-O-O-O-S
-       -       -       -       -
X       X       X       X       X
-       -       -       -       -
X-X-X-X-X-X-X-X-X-X-X-X-X-X-X-X-X
    -       -       -       -
    1       2   P   3       4
`
)
