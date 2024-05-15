import { styled } from 'goober'
import { colours } from '../../../config/colours'
import { consts } from '../../../config/consts'
import { itemDefs } from '../../../items'
import { objectToArray } from '../../../utils/objectToArray'
import { ItemSvg } from '../../MapRenderer/ItemGroup/ItemSvg'
import { events } from '../../../events'

export function Help() {
  return (
    <Div>
      <h2>RULES</h2>
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

      <h2>ITEMS (ARCADE MODE)</h2>
      <div>
        Landing on an item will give you a random power-up which is used immediately. A new item
        appears randomly on the board once every {consts.itemInterval} turns on average.
      </div>
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

      <h2>EVENTS (ARCADE MODE)</h2>
      <div>A random event happens once every {consts.eventInterval} turns.</div>
      {events.map(event => (
        <div>
          <b>{event.name}</b>
          <div>{event.description}</div>
        </div>
      ))}

      <h2>KEYBOARD SHORTCUTS</h2>
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
  transform: translate(25px, -8px);
`

const keyboardShortcuts = [
  ['W', 'Pan up'],
  ['A', 'Pan left'],
  ['S', 'Pan down'],
  ['D', 'Pan right'],
  ['R', 'Roll'],
  ['Q', 'Zoom out'],
  ['E', 'Zoom in'],
  ['F', 'Fit to screen'],
  ['Esc', 'Open/close Menu'],
  ['Scroll', 'Pan up/down'],
  ['Shift + Scroll', 'Pan left/right'],
  ['Ctrl + Scroll', 'Zoom in/out'],
]
