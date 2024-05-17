import { styled } from 'goober'
import { Event } from '.'
import { updateGame } from '../dbactions/updateGame'
import { EventAlert } from './EventAlert'
import { consts } from '../config/consts'
import { PlayerModelGroup } from '../components/MapRenderer/PlayerGroup'
import { playerDefs } from '../config/playerDefs'
import { getNewItems } from '../signals/queries/getNewItems'
import { ItemSvg } from '../components/MapRenderer/ItemGroup/ItemSvg'
import { itemDefs } from '../items'

export const ItemShower = {
  name: 'Item Shower',
  description: 'Place a bunch of new items on the board.',
  alert: () => (
    <EventAlert event={ItemShower}>
      <ItemShowerGraphic />
    </EventAlert>
  ),
  onActivate: async () => {
    for (let i = 0; i < consts.itemInterval * 5; i++) {
      await updateGame({ items: getNewItems([]) })
    }
  },
} as const satisfies Event

function ItemShowerGraphic() {
  return (
    <Svg>
      <circle cx='-100' cy='0' r={consts.circleRadius} fill='black' />
      <circle cx='0' cy='0' r={consts.circleRadius} fill='black' />
      <circle cx='100' cy='0' r={consts.circleRadius} fill='black' />
      <line
        x1='-100'
        y1='0'
        x2='100'
        y2='0'
        stroke='black'
        style={{ strokeWidth: consts.pathStrokeWidth }}
      />
      <Item1Group>
        <ItemSvg colour={itemDefs['Position Swap'].colour} Icon={itemDefs['Position Swap'].icon} />
      </Item1Group>
      <Player2>
        <PlayerModelGroup model={playerDefs[1].model} colour={playerDefs[1].colour} />
      </Player2>
      <Item2Group>
        <ItemSvg
          colour={itemDefs['Roll Again'].colour}
          Icon={itemDefs['Roll Again'].icon}
          style={{ animationDelay: 1000 + 'ms' }}
        />
      </Item2Group>
    </Svg>
  )
}

const Svg = styled('svg')`
  overflow: visible;
  width: 1px;
  height: 1px;
  transform: scale(1.5) translateY(50px);
`

const Player2 = styled('g')`
  transform: translate(0px, 0px);
`

const Item1Group = styled('g')`
  transform: translate(-100px, 0px);
`

const Item2Group = styled('g')`
  transform: translate(100px, 0px);
`
