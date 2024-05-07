import { styled } from 'goober'
import { map } from '../../../signals'
import { players } from '../../../maps/parseMap'
import { joinGame } from '../../../utils/joinGame'

export function StartCircles() {
  const startCircles = map.value.filter(circle => circle.start)

  function polygonToXY(i: number, spokes: number, spacing: number) {
    return {
      x: spacing * Math.cos(Math.PI * ((i * 2) / spokes) - Math.PI * 0.5),
      y: spacing * Math.sin(Math.PI * ((i * 2) / spokes) - Math.PI * 0.5),
    }
  }

  return (
    <>
      {startCircles.map(circle => (
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
              joinGame(players.find(p => p.id === circle.start)?.id!)
            }}
            style={{
              translate: `${circle.position.x * 100 - 100}px ${circle.position.y * 100 + 70}px`,
              backgroundColor: players.find(p => p.id === circle.start)?.colour,
            }}
          >
            <JoinText>Play as {players.find(p => p.id === circle.start)?.name}</JoinText>
          </JoinButton>
        </>
      ))}
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
