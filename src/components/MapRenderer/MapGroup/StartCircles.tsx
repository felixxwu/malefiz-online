import { styled } from 'goober'
import { gameState, map, pickEmoji } from '../../../signals/signals'
import { players } from '../../../utils/players'
import { joinGame } from '../../../dbactions/joinGame'
import { getMyPlayerId } from '../../../utils/getUsers'
import { polygonToXY } from '../../../utils/polygonToXY'
import { getUserControllingPlayer } from '../../../utils/getUserControllingPlayer'
import { emojiToShow } from '../../../utils/emojiToShow'

export function StartCircles() {
  const startCircles = map.value.filter(circle => circle.start)
  const myPlayerId = getMyPlayerId()

  return (
    <>
      {startCircles.map(circle => {
        const player = players.find(p => p.id === circle.start)!
        const userControllingPlayer = getUserControllingPlayer(player.id)

        const joinText = (() => {
          if (player.id === myPlayerId) return `Playing as ${player.name}`
          if (myPlayerId) return `${player.name} (${userControllingPlayer ? 'Human' : 'AI'})`
          if (userControllingPlayer) return `${player.name} (Human)`
          return `Play as ${player.name}`
        })()

        const showJoinButton = !gameState.value?.playerTurn || !getMyPlayerId()

        return (
          <>
            <Polygon
              key={circle.id}
              points={[0, 1, 2, 3, 4]
                .map(i => polygonToXY(i, 5, 30))
                .map(({ x, y }) => `${circle.position.x * 100 + x},${circle.position.y * 100 + y}`)
                .join(' ')}
            />
            {showJoinButton ? (
              <>
                <rect
                  onClick={() => {
                    if (!myPlayerId && !userControllingPlayer) joinGame(player.id)
                  }}
                  x={circle.position.x * 100 - 100}
                  y={circle.position.y * 100 + 70}
                  rx={20}
                  width='200'
                  height='40'
                  style={{
                    stroke: 'black',
                    strokeWidth: 3,
                    fill: player.colour,
                    cursor: 'pointer',
                    pointerEvents: !myPlayerId && !userControllingPlayer ? 'all' : 'none',
                  }}
                ></rect>
                <text
                  x={circle.position.x * 100}
                  y={circle.position.y * 100 + 91}
                  font-family={'Lexend Deca'}
                  font-size={18}
                  dominant-baseline='middle'
                  text-anchor='middle'
                >
                  {joinText}
                </text>
              </>
            ) : (
              <>
                <text
                  x={circle.position.x * 100}
                  y={circle.position.y * 100 + 100}
                  dominant-baseline='middle'
                  text-anchor='middle'
                  font-size={60}
                  style={{
                    cursor: 'pointer',
                    pointerEvents: 'all',
                  }}
                  onClick={() => (getMyPlayerId() === player.id ? (pickEmoji.value = true) : {})}
                >
                  {emojiToShow(player.id)}
                </text>
              </>
            )}
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
