import { styled } from 'goober'
import { getMapPosition } from '../../../utils/getMapPosition'
import { CirclePath } from './CirclePath'
import { LinePath } from './LinePath'
import { StartCircles } from './StartCircles'
import { SafeCirclePath } from './SafeCirclePath'
import { FinishCircles } from './FinishCircles'
import { map } from '../../../signals/signals'
import { Text } from './Text'
import { consts } from '../../../config/consts'
import { CustomElements } from './CustomElements'
import { DebugCircleIds } from './DebugCircleIds'

export function MapGroup() {
  const mapPosition = getMapPosition(map.value)

  return (
    <Group>
      <LinePath />
      <CirclePath />
      <SafeCirclePath />
      <StartCircles />
      <FinishCircles />
      <Text />
      <CustomElements />
      <DebugCircleIds />
      <MapPositionRef
        id={consts.mapPositionRef}
        x={mapPosition.mapLeft * 100}
        y={mapPosition.mapTop * 100}
        width={mapPosition.mapWidth * 100}
        height={mapPosition.mapHeight * 100}
      />
    </Group>
  )
}

const Group = styled('g')`
  pointer-events: none;
`

const MapPositionRef = styled('rect')`
  opacity: 0;
  pointer-events: none;
`
