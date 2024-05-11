import { PlayerModelGroup } from '../MapRenderer/PlayerGroup'
import { playerModel } from '../../signals/signals'
import { ChevronLeftPath, ChevronRightPath } from '../Icons'
import { headList } from '../../playermodel/heads'
import { ModelProps } from '../../playermodel/types'
import { JSX } from 'preact/jsx-runtime'
import { PlayerModel } from '../../types/gameTypes'
import { eyesList } from '../../playermodel/eyes'
import { mouthList } from '../../playermodel/mouthes'
import { colours } from '../../config/colours'
import { IconButton } from './IconButton'

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
    <>
      <PlayerModelGroup
        x={0}
        y={0}
        id='1'
        colour={colours.neutralPlayer}
        model={playerModel.value}
      />
      <g style={{ transform: `scale(0.4) translate(120px, 0px)` }}>
        <g style={{ transform: `translate(0px, -80px)` }}>
          <IconButton icon={ChevronLeftPath} onClick={() => changeModel(headList, 'head', -1)} />
          <g style={{ transform: `translate(80px, 11px)` }}>
            <Head colour={colours.neutralPlayer} />
          </g>
          <g style={{ transform: `translate(134px, 0px)` }}>
            <IconButton icon={ChevronRightPath} onClick={() => changeModel(headList, 'head', 1)} />
          </g>
        </g>

        <g style={{ transform: `translate(0px, -10px)` }}>
          <IconButton icon={ChevronLeftPath} onClick={() => changeModel(eyesList, 'eyes', -1)} />
          <g style={{ transform: `translate(80px, 11px)` }}>
            <Eyes colour={colours.neutralPlayer} />
          </g>
          <g style={{ transform: `translate(134px, 0px)` }}>
            <IconButton icon={ChevronRightPath} onClick={() => changeModel(eyesList, 'eyes', 1)} />
          </g>
        </g>

        <g style={{ transform: `translate(0px, 60px)` }}>
          <IconButton icon={ChevronLeftPath} onClick={() => changeModel(mouthList, 'mouth', -1)} />
          <g style={{ transform: `translate(80px, 11px)` }}>
            <Mouth colour={colours.neutralPlayer} />
          </g>
          <g style={{ transform: `translate(134px, 0px)` }}>
            <IconButton
              icon={ChevronRightPath}
              onClick={() => changeModel(mouthList, 'mouth', 1)}
            />
          </g>
        </g>
      </g>
    </>
  )
}
