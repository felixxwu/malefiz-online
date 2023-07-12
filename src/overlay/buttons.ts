import { menuButtonEnabled } from '../data/cssVars'
import { el } from '../utils/el'
import { fullScreenIcon, menuIcon, minusIcon, plusIcon } from '../icons'
import { store } from '../data/store'
import { fitToScreen } from '../utils/zoom'

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

export function createButtons() {
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
      },
    },
    children: [
      el('div')({
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
      }),
      el('div')({
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
        children: [
          el('div')({
            attributes: {
              style: overlayButtonStyles,
              onclick: () => {
                store.svgTransition = 200
                store.svgZoom *= 1.2
              },
            },
            children: [plusIcon(15)],
          }),
          el('div')({
            attributes: {
              style: overlayButtonStyles,
              onclick: () => {
                store.currentMap && fitToScreen(store.currentMap, {})
              },
            },
            children: [fullScreenIcon(15)],
          }),
          el('div')({
            attributes: {
              style: overlayButtonStyles,
              onclick: () => {
                store.svgTransition = 200
                store.svgZoom *= 0.8
              },
            },
            children: [minusIcon(15)],
          }),
        ],
      }),
    ],
  })
}
