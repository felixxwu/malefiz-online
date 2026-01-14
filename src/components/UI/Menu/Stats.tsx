import { styled } from 'goober'
import { colours } from '../../../config/colours'
import { consts } from '../../../config/consts'
import { gameState } from '../../../signals/signals'
import { PlayerModelGroup } from '../../MapRenderer/PlayerGroup'
import { getUserControllingPlayer } from '../../../signals/queries/getUserControllingPlayer'
import { playerDefs } from '../../../config/playerDefs'

export function Stats() {
  if (!gameState.value) return null

  return (
    <Div>
      {gameState.value.players.map(player => {
        const userForPlayer = getUserControllingPlayer(player.id)
        const model = userForPlayer?.playerModel ?? playerDefs.find(p => p.id === player.id)?.model!

        return (
          <PlayerStats key={player.id}>
            <PlayerHeader>
              <ModelSvg>
                <PlayerModelGroup colour={player.colour} model={model} />
              </ModelSvg>
            </PlayerHeader>
            <StatRow>
              <StatLabel>Distance Travelled</StatLabel>
              <StatLine />
              <StatValue>{player.stats.distanceMoved}</StatValue>
            </StatRow>
            <StatRow>
              <StatLabel>Sixes Rolled</StatLabel>
              <StatLine />
              <StatValue>{player.stats.sixesRolled}</StatValue>
            </StatRow>
            <StatRow>
              <StatLabel>Pieces Taken</StatLabel>
              <StatLine />
              <StatValue>{player.stats.piecesTaken}</StatValue>
            </StatRow>
            <StatRow>
              <StatLabel>Stones Taken</StatLabel>
              <StatLine />
              <StatValue>{player.stats.stonesTaken}</StatValue>
            </StatRow>
            <StatRow>
              <StatLabel>Items Taken</StatLabel>
              <StatLine />
              <StatValue>{player.stats.itemsTaken}</StatValue>
            </StatRow>
          </PlayerStats>
        )
      })}
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

const PlayerStats = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: ${consts.borderRadius};
`

const PlayerHeader = styled('div')`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 5px;
  justify-content: center;
`

const ModelSvg = styled('svg')`
  width: 1px;
  height: 40px;
  overflow: visible;
  transform: scale(1.2);
  translate: 0 20px;
`

const StatRow = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`

const StatLabel = styled('div')`
  font-size: 14px;
  white-space: nowrap;
`

const StatLine = styled('div')`
  flex: 1;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
  min-width: 20px;
`

const StatValue = styled('div')`
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
`
