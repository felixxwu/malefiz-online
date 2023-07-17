import { textOpacity } from '../data/cssVars'
import { store } from '../data/store'
import { chevronLeft, chevronRight } from '../icons'
import { mapList } from '../maps/mapList'
import { div } from '../utils/el'
import { edgeMargin, overlayButtonStyles } from './buttons'
import { startPlayerSetup } from '../game/createGame'

export function MapSelectionButtons() {
  if (!store.mapSelectionScreen) return div({})
  return div({
    attributes: {
      id: 'overlay',
      style: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        transition: '1000ms',
        opacity: textOpacity.value,
      },
    },
    children: [ButtonWrapper()],
  })
}

function ButtonWrapper() {
  return div({
    attributes: {
      style: {
        position: 'absolute',
        bottom: `${edgeMargin}px`,
        width: '100%',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        pointerEvents: 'all',
      },
    },
    children: [PrevMap(), StartGameButton(), NextMap()],
  })
}

function StartGameButton() {
  return div({
    attributes: {
      style: {
        ...overlayButtonStyles,
        width: '150px',
        pointerEvents: 'all',
      },
      innerHTML: 'Start Game',
      onclick: startPlayerSetup,
    },
  })
}

function PrevMap() {
  return div({
    attributes: {
      style: overlayButtonStyles,
      onclick: () => {
        const prevMapInMapList = mapList.findIndex(m => m === store.mapSelectionScreen)
        store.mapSelectionScreen = mapList[prevMapInMapList - 1] || mapList[mapList.length - 1]
      },
    },
    children: [chevronLeft(16)],
  })
}

function NextMap() {
  return div({
    attributes: {
      style: overlayButtonStyles,
      onclick: () => {
        const nextMapInMapList = mapList.findIndex(m => m === store.mapSelectionScreen)
        store.mapSelectionScreen = mapList[nextMapInMapList + 1] || mapList[0]
      },
    },
    children: [chevronRight(16)],
  })
}
