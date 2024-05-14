import { styled } from 'goober'
import { colours } from '../../../config/colours'
import { consts } from '../../../config/consts'
import { itemDefs } from '../../../items'
import { objectToArray } from '../../../utils/objectToArray'
import { ItemSvg } from '../../MapRenderer/ItemGroup/ItemSvg'

export function Help() {
  return (
    <Div>
      <b>RULES</b>
      <div>
        <b>Objective</b>
        <div>The first to land a piece on the finish wins.</div>
      </div>
      <div>
        <b>Stones</b>
        <div>
          Stones cannot be passed unless landed on, place a stone in front of your opponents to
          block them!
        </div>
      </div>
      <div>
        <b>Picking up stones</b>
        <div>
          If your piece lands on a stone, you can move it to any empty space on the board. (Except
          for safe spaces)
        </div>
      </div>
      <div>
        <b>Safe spaces</b>
        <div>
          The first 1-2 rows are safe spaces, where stones cannot be placed and pieces cannot be
          taken.
        </div>
      </div>
      <div>
        <b>Taking opponent pieces</b>
        <div>
          Landing on an opponent's piece will send it back to the start. Unlike stones, you may jump
          over pieces.
        </div>
      </div>

      <b>ITEMS (ARCADE MODE)</b>
      <Table>
        {objectToArray(itemDefs).map(({ value }) => (
          <tr>
            <td style={{ paddingBottom: '10px' }}>
              <b>{value.name}</b>
              <br />
              {value.description}
            </td>
            <td>
              <Svg>
                <ItemSvg colour={value.colour} Icon={value.icon} />
              </Svg>
            </td>
          </tr>
        ))}
      </Table>

      <b>KEYBOARD SHORTCUTS</b>
      <Table>
        {keyboardShortcuts.map(([key, description]) => (
          <tr>
            <td>
              <b>{key}</b>
            </td>
            <td>{description}</td>
          </tr>
        ))}
      </Table>
    </Div>
  )
}

const Div = styled('div')`
  background-color: ${colours.background};
  padding: 20px;
  border-radius: ${consts.borderRadius};
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: black;
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
`

const Table = styled('table')`
  width: 100%;
  border-collapse: collapse;
  padding: 0;
  margin: 0;
`

const Svg = styled('svg')`
  width: 50px;
  height: 1px;
  overflow: visible;
  transform: translate(25px, -10px);
`

const keyboardShortcuts = [
  ['W', 'Pan up'],
  ['A', 'Pan left'],
  ['S', 'Pan down'],
  ['D', 'Pan right'],
  ['R', 'Roll'],
  ['Q', 'Zoom out'],
  ['E', 'Zoom in'],
  ['Scroll', 'Pan up/down'],
  ['Shift + Scroll', 'Pan left/right'],
  ['Ctrl + Scroll', 'Zoom in/out'],
]
