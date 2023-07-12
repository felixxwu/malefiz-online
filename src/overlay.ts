import { menuButtonEnabled, menuOpacity, menuPointerEvents } from './cssVars'
import { el } from './el'
import { crossIcon, fullScreenIcon, menuIcon, minusIcon, plusIcon } from './icons'
import { store } from './store'
import { fitToScreen, zoomIntoCircle } from './zoom'

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

const edgeMargin = 20

export function renderOverlay() {
  document.body.appendChild(
    el('div')({
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
  )

  document.body.appendChild(
    el('div')({
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
  )
}
