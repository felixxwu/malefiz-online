import { styled } from 'goober'
import { PlayerModelGroup } from '../components/MapRenderer/PlayerGroup'
import { playerModel } from '../signals/signals'
import { players } from '../utils/parseMap'
import { ChevronLeft, ChevronRight } from '../components/Icons'
import { headList } from '../playermodel/heads'
import { ModelProps } from '../playermodel/types'
import { JSX } from 'preact/jsx-runtime'
import { PlayerModel } from '../types/gameTypes'
import { eyesList } from '../playermodel/eyes'
import { mouthList } from '../playermodel/mouthes'

export function PlayerCustomisation() {
  const Eyes = eyesList[playerModel.value.eyes]
  const Head = headList[playerModel.value.head]
  const Mouth = mouthList[playerModel.value.mouth]

  function changeModel(
    list: ((props: ModelProps) => JSX.Element)[],
    modelKey: keyof PlayerModel,
    advance: number
  ) {
    playerModel.value = {
      ...playerModel.value,
      [modelKey]: (playerModel.value[modelKey] + advance + list.length) % list.length,
    }
  }

  return (
    <Div>
      <svg viewBox={'-25 -25 50 50'} style={{ overflow: 'visible' }} width={50} height={50}>
        <PlayerModelGroup x={0} y={0} id='1' colour={players[0].colour} model={playerModel.value} />
      </svg>

      <Rows>
        <Row>
          <Chevron onClick={() => changeModel(headList, 'head', 1)}>
            <ChevronLeft colour='black' />
          </Chevron>
          <svg
            viewBox={'-25 -25 50 50'}
            style={{ overflow: 'visible', transform: 'scale(0.4)' }}
            width={50}
            height={50}
          >
            <Head colour={players[0].colour} />
          </svg>
          <Chevron onClick={() => changeModel(headList, 'head', 1)}>
            <ChevronRight colour='black' />
          </Chevron>
        </Row>

        <Row>
          <Chevron onClick={() => changeModel(eyesList, 'eyes', -1)}>
            <ChevronLeft colour='black' />
          </Chevron>
          <svg
            viewBox={'-25 -25 50 50'}
            style={{ overflow: 'visible', transform: 'scale(0.4)' }}
            width={50}
            height={50}
          >
            <Eyes colour={players[0].colour} />
          </svg>
          <Chevron onClick={() => changeModel(eyesList, 'eyes', 1)}>
            <ChevronRight colour='black' />
          </Chevron>
        </Row>

        <Row>
          <Chevron onClick={() => changeModel(mouthList, 'mouth', -1)}>
            <ChevronLeft colour='black' />
          </Chevron>
          <svg
            viewBox={'-25 -25 50 50'}
            style={{ overflow: 'visible', transform: 'scale(0.4)' }}
            width={50}
            height={50}
          >
            <Mouth colour={players[0].colour} />
          </svg>
          <Chevron onClick={() => changeModel(mouthList, 'mouth', 1)}>
            <ChevronRight colour='black' />
          </Chevron>
        </Row>
      </Rows>
    </Div>
  )
}

const Div = styled('div')`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const Rows = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

const Row = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
`

const Chevron = styled('div')`
  cursor: pointer;
`
