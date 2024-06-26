import { styled } from 'goober'
import { gameState, gameStateHashTable, map, pickEmoji } from '../../../signals/signals'
import { playerDefs } from '../../../config/playerDefs'
import { joinGame } from '../../../dbactions/joinGame'
import { myPlayerId } from '../../../signals/getters/myPlayerId'
import { polygonToXY } from '../../../utils/polygonToXY'
import { getUserControllingPlayer } from '../../../signals/queries/getUserControllingPlayer'
import { emojiToShow } from '../../../signals/queries/emojiToShow'

export function StartCircles() {
  const startCircles = map.value.filter(circle => circle.start)

  return (
    <>
      {startCircles.map(circle => {
        const player = playerDefs.find(p => p.id === circle.start)!
        const userControllingPlayer = getUserControllingPlayer(player.id)

        const joinText = (() => {
          if (player.id === myPlayerId.value) return `Playing as ${player.name}`
          if (myPlayerId.value) return `${player.name} (${userControllingPlayer ? 'Human' : 'AI'})`
          if (userControllingPlayer) return `${player.name} (Human)`
          return `Play as ${player.name}`
        })()

        const showJoinButton = !gameState.value?.playerTurn || !myPlayerId.value
        const neightbourPos = gameStateHashTable.value[circle.neighbours[0]].circle!.position
        const posDiff = {
          x: circle.position.x - neightbourPos.x,
          y: circle.position.y - neightbourPos.y,
        }
        const joinButtonPos = {
          x: (circle.position.x + posDiff.x) * 100,
          y: (circle.position.y + posDiff.y) * 100,
        }

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
                    if (!myPlayerId.value && !userControllingPlayer) joinGame(player.id)
                  }}
                  x={joinButtonPos.x - 100}
                  y={joinButtonPos.y - 22}
                  rx={20}
                  width='200'
                  height='40'
                  style={{
                    stroke: 'black',
                    strokeWidth: 3,
                    fill: player.colour,
                    cursor: 'pointer',
                    pointerEvents: !myPlayerId.value && !userControllingPlayer ? 'all' : 'none',
                  }}
                ></rect>
                <text
                  x={joinButtonPos.x}
                  y={joinButtonPos.y}
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
                  x={joinButtonPos.x}
                  y={joinButtonPos.y}
                  dominant-baseline='middle'
                  text-anchor='middle'
                  font-size={60}
                  style={{
                    cursor: 'pointer',
                    pointerEvents: 'all',
                  }}
                  onClick={() => (myPlayerId.value === player.id ? (pickEmoji.value = true) : {})}
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
