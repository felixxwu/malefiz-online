import { menuButtonEnabled, textOpacity } from '../data/cssVars'
import { el } from '../utils/el'
import { fullScreenIcon, menuIcon, minusIcon, plusIcon } from '../icons'
import { store } from '../data/store'
import { fitToScreen, zoomIn, zoomOut } from '../utils/zoom'

const overlayButtonStyles: Partial<CSSStyleDeclaration> = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'black',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}

const edgeMargin = 20

export function OverlayButtons() {
  return el('div')({
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
    children: [MenuButton(), ViewControls([ZoomIn(), FitScreen(), ZoomOut()])],
  })
}

function MenuButton() {
  return el('div')({
    attributes: {
      style: {
        ...overlayButtonStyles,
        position: 'absolute',
        top: `${edgeMargin}px`,
        left: `${edgeMargin}px`,
        pointerEvents: 'all',
        display: menuButtonEnabled.value,
      },
      onclick: () => {
        store.menuOpen = true
      },
    },
    children: [menuIcon(15)],
  })
}

function ViewControls(children: Node[]) {
  return el('div')({
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
  return el('div')({
    attributes: {
      style: overlayButtonStyles,
      onclick: zoomIn,
    },
    children: [plusIcon(15)],
  })
}

function FitScreen() {
  return el('div')({
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
  return el('div')({
    attributes: {
      style: overlayButtonStyles,
      onclick: zoomOut,
    },
    children: [minusIcon(15)],
  })
}
