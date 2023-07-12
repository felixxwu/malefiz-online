import { menuOpacity, menuPointerEvents } from '../cssVars'
import { el } from '../el'
import { crossIcon } from '../icons'
import { store } from '../store'
import { zoomIntoCircle } from '../zoom'

const menuButtonStyles: Partial<CSSStyleDeclaration> = {
  width: '200px',
  height: '40px',
  borderRadius: '5px',
  backgroundColor: 'var(--colour1)',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export function createMenu() {
  return el('div')({
    attributes: {
      style: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: `blur(20px)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        opacity: menuOpacity.value,
        pointerEvents: menuPointerEvents.value,
        transition: '500ms',
      },
    },
    children: [
      el('div')({
        attributes: {
          style: menuButtonStyles,
          onclick: () => {
            store.menuOpen = false
            zoomIntoCircle(store.currentMap[0], { transition: 1000 })
            setTimeout(() => {
              document.body.style.backgroundColor = 'black'
              window.location.href = '/'
            }, 1000)
          },
        },
        children: [
          el('div')({ attributes: { innerHTML: 'Leave Game', style: { color: 'black' } } }),
        ],
      }),
      el('div')({
        attributes: {
          style: menuButtonStyles,
        },
        children: [
          el('div')({ attributes: { innerHTML: 'Invite Players', style: { color: 'black' } } }),
        ],
      }),
      el('div')({
        attributes: {
          style: menuButtonStyles,
          onclick: () => {
            store.menuOpen = false
          },
        },
        children: [crossIcon(15, 'black')],
      }),
    ],
  })
}
