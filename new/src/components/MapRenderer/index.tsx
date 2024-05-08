import { styled } from 'goober'
import { screenHeight, screenWidth, svgTransition, svgTranslation, svgZoom } from '../../signals'
import { MapGroup } from './MapGroup'
import { handleClick } from './utils/handleClick'
import { PlayerGroup } from './PlayerGroup'
import { StoneGroup } from './StoneGroup'

export function MapRenderer() {
  return (
    <Svg width={screenWidth.value} height={screenHeight.value} onClick={handleClick}>
      <ZoomGroup
        style={{
          transform: `scale(${svgZoom.value})`,
          transition: `all ${svgTransition.value}ms cubic-bezier(0.65, 0, 0.35, 1)`,
        }}
      >
        <TranslateGroup
          style={{
            transform: `translate(${svgTranslation.value.x}px, ${svgTranslation.value.y}px)`,
            transition: `all ${svgTransition.value}ms cubic-bezier(0.65, 0, 0.35, 1)`,
          }}
        >
          <MapGroup />
          <PlayerGroup />
          <StoneGroup />
          <HudGroup></HudGroup>
          <DieGroup></DieGroup>
        </TranslateGroup>
      </ZoomGroup>
    </Svg>
  )
}

const Svg = styled('svg')``
const ZoomGroup = styled('g')`
  transform-origin: 50% 50%;
`
const TranslateGroup = styled('g')``
const HudGroup = styled('g')`
  pointer-events: none;
`
const DieGroup = styled('g')``
