import { styled } from 'goober'
import {
  circleHovered,
  gameState,
  screenHeight,
  screenWidth,
  svgTransition,
  svgTranslation,
  svgZoom,
} from '../../signals'
import { MapGroup } from './MapGroup'
import { handleClick } from './handlers/handleClick'
import { PlayerGroup } from './PlayerGroup'
import { StoneGroup } from './StoneGroup'
import { HudGroup } from './HudGroup'
import { DieGroup } from './DieGroup'
import { handleMouseMove } from './handlers/handleMouseMove'
import { HoverGroup } from './HoverGroup'

export function MapRenderer() {
  return (
    <Svg
      width={screenWidth.value}
      height={screenHeight.value}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      style={{ cursor: circleHovered.value ? 'pointer' : 'default' }}
    >
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
          <HudGroup />
          <HoverGroup />
          {gameState.value?.dieRoll && <DieGroup />}
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
