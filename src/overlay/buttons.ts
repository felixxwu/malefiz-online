import { colour1, textOpacity } from '../data/cssVars'
import { div } from '../utils/el'
import { fullScreenIcon, menuIcon, minusIcon, plusIcon } from '../icons'
import { store } from '../data/store'
import { fitToScreen, zoomIn, zoomOut } from '../utils/zoom'

const buttonSize = 40

const overlayButtonStyles: Partial<CSSStyleDeclaration> = {
  width: `${buttonSize}px`,
  height: `${buttonSize}px`,
  borderRadius: `${buttonSize / 2}px`,
  backgroundColor: 'black',
  color: colour1.value,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}

const edgeMargin = 20

export function OverlayButtons() {
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
    children: [MenuButton(), ViewControls([ZoomIn(), FitScreen(), ZoomOut()]), ActionButton()],
  })
}

function MenuButton() {
  if (!store.gameState) return div({})
  return div({
    attributes: {
      style: {
        ...overlayButtonStyles,
        position: 'absolute',
        top: `${edgeMargin}px`,
        left: `${edgeMargin}px`,
        pointerEvents: 'all',
        display: 'flex',
      },
      onclick: () => {
        store.menuOpen = true
      },
    },
    children: [menuIcon(15)],
  })
}

function ActionButton() {
  if (store.actionButton === null) return div({})
  return div({
    attributes: {
      style: {
        position: 'absolute',
        bottom: `${edgeMargin}px`,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      },
    },
    children: [
      div({
        attributes: {
          style: {
            ...overlayButtonStyles,
            backgroundColor: store.actionButton.onClick ? 'black' : 'transparent',
            width: '180px',
            pointerEvents: 'all',
          },
          onclick: store.actionButton.onClick,
        },
        children: [
          div({
            attributes: {
              style: {
                color: store.actionButton.onClick ? colour1.value : 'black',
              },
              innerHTML: store.actionButton.text,
              className: store.actionButton.flashing ? 'flashing' : '',
            },
          }),
        ],
      }),
    ],
  })
}

function ViewControls(children: Node[]) {
  return div({
    attributes: {
      style: {
        position: 'absolute',
        bottom: `${edgeMargin}px`,
        right: `${edgeMargin}px`,
        pointerEvents: 'all',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      },
    },
    children,
  })
}

function ZoomIn() {
  return div({
    attributes: {
      style: overlayButtonStyles,
      onclick: zoomIn,
    },
    children: [plusIcon(15)],
  })
}

function FitScreen() {
  return div({
    attributes: {
      style: overlayButtonStyles,
      onclick: () => {
        store.currentMap && fitToScreen(store.currentMap, {})
      },
    },
    children: [fullScreenIcon(15)],
  })
}

function ZoomOut() {
  return div({
    attributes: {
      style: overlayButtonStyles,
      onclick: zoomOut,
    },
    children: [minusIcon(15)],
  })
}
