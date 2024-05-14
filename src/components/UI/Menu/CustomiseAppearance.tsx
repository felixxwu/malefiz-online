import { styled } from 'goober'
import { colours } from '../../../config/colours'
import { consts } from '../../../config/consts'
import { PlayerCustomisation } from '../../SVG/PlayerCustomisation'

export function CustomiseAppearance() {
  return (
    <>
      <Customise onClick={(e: MouseEvent) => e.stopPropagation()}>
        <svg style={{ overflow: 'visible', width: '100%' }}>
          <g style={{ transform: 'scale(1.8) translate(55px, 40px)' }}>
            <PlayerCustomisation />
          </g>
        </svg>
      </Customise>
    </>
  )
}

const Customise = styled('div')`
  background-color: ${colours.background};
  border-radius: ${consts.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`
