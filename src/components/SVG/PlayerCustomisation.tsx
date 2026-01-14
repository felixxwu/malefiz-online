import { PlayerModelGroup } from '../MapRenderer/PlayerGroup'
import { playerModel } from '../../signals/signals'
import { ChevronLeftPath, ChevronRightPath } from '../Icons'
import { headList } from '../../playermodel/heads'
import { ModelProps } from '../../playermodel/types'
import { JSX } from 'preact/jsx-runtime'
import { PlayerModel } from '../../types/gameTypes'
import { eyesList } from '../../playermodel/eyes'
import { mouthList } from '../../playermodel/mouthes'
import { IconButton } from './IconButton'
import { useEffect, useState } from 'preact/hooks'
import { playerDefs } from '../../config/playerDefs'
import { keyframes, styled } from 'goober'
import { playChord } from '../../audio/playChord'
import { consts } from '../../config/consts'

export function PlayerCustomisation() {
  const [count, setCount] = useState(0)
  const colour = playerDefs[count % playerDefs.length].colour

  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1)
    }, 2000)
  }, [count])

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
      <Group>
        <PlayerModelGroup colour={colour} model={playerModel.value} />
      </Group>
      <g style={{ transform: `scale(0.4) translate(120px, 0px)` }}>
        <g style={{ transform: `translate(0px, -80px)` }}>
          <IconButton
            icon={ChevronLeftPath}
            onClick={() => {
              playChord(consts.chords[1])
              return changeModel(headList, 'head', -1)
            }}
          />
          <g style={{ transform: `translate(80px, 11px)` }}>
            <Head colour={colour} />
          </g>
          <g style={{ transform: `translate(134px, 0px)` }}>
            <IconButton
              icon={ChevronRightPath}
              onClick={() => {
                playChord(consts.chords[2])
                return changeModel(headList, 'head', 1)
              }}
            />
          </g>
        </g>

        <g style={{ transform: `translate(0px, -10px)` }}>
          <IconButton
            icon={ChevronLeftPath}
            onClick={() => {
              playChord(consts.chords[3])
              return changeModel(eyesList, 'eyes', -1)
            }}
          />
          <g style={{ transform: `translate(80px, 11px)` }}>
            <Eyes colour={colour} />
          </g>
          <g style={{ transform: `translate(134px, 0px)` }}>
            <IconButton
              icon={ChevronRightPath}
              onClick={() => {
                playChord(consts.chords[4])
                return changeModel(eyesList, 'eyes', 1)
              }}
            />
          </g>
        </g>

        <g style={{ transform: `translate(0px, 60px)` }}>
          <IconButton
            icon={ChevronLeftPath}
            onClick={() => {
              playChord(consts.chords[5])
              return changeModel(mouthList, 'mouth', -1)
            }}
          />
          <g style={{ transform: `translate(80px, 11px)` }}>
            <Mouth colour={colour} />
          </g>
          <g style={{ transform: `translate(134px, 0px)` }}>
            <IconButton
              icon={ChevronRightPath}
              onClick={() => {
                playChord(consts.chords[6])
                return changeModel(mouthList, 'mouth', 1)
              }}
            />
          </g>
        </g>
      </g>
    </>
  )
}

const bob = keyframes`
  0% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(10px);
  }
`

const Group = styled('g')`
  animation: ${bob} 3s infinite ease-in-out;
`
