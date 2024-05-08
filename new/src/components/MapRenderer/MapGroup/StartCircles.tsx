import { styled } from 'goober'
import { map } from '../../../signals'
import { players } from '../../../maps/parseMap'
import { joinGame } from '../../../utils/joinGame'
import { getMyPlayerId, getUsers } from '../../../utils/getUsers'
import { polygonToXY } from '../../../utils/polygonToXY'

export function StartCircles() {
  const startCircles = map.value.filter(circle => circle.start)
  const myPlayerId = getMyPlayerId()
  const users = getUsers()

  return (
    <>
      {startCircles.map(circle => {
        const player = players.find(p => p.id === circle.start)!
        const userControllingPlayer = users.find(u => u.playerToControl === player.id)

        const joinText = (() => {
          if (player.id === myPlayerId) return `Playing as ${player.name}`
          if (myPlayerId) return `${player.name} (${userControllingPlayer ? 'Human' : 'AI'})`
          if (userControllingPlayer) return `${player.name} (Human)`
          return `Play as ${player.name}`
        })()

        return (
          <>
            <Polygon
              key={circle.id}
              points={[0, 1, 2, 3, 4]
                .map(i => polygonToXY(i, 5, 30))
                .map(({ x, y }) => `${circle.position.x * 100 + x},${circle.position.y * 100 + y}`)
                .join(' ')}
            />
            <JoinButton
              onClick={() => {
                if (!myPlayerId && !userControllingPlayer) joinGame(player.id)
              }}
              style={{
                translate: `${circle.position.x * 100 - 100}px ${circle.position.y * 100 + 70}px`,
                backgroundColor: player.colour,
              }}
            >
              <JoinText>{joinText}</JoinText>
            </JoinButton>
          </>
        )
      })}
    </>
  )
}

const Polygon = styled('polygon')`
  cursor: pointer;
  fill: black;
  stroke-linejoin: round;
  stroke: black;
  stroke-width: 60;
`

const JoinButton = styled('foreignObject')`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  pointer-events: all;
  outline: 3px solid black;
`

const JoinText = styled('div')`
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 20px;
`
