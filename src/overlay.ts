import { el } from './el'
import { fullScreenIcon, minusIcon, plusIcon } from './icons'
import { store } from './store'
import { fitToScreen } from './zoom'

const zoomButtonAttributes: Partial<CSSStyleDeclaration> = {
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
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              pointerEvents: 'all',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            },
          },
          children: [
            el('div')({
              attributes: {
                style: zoomButtonAttributes,
                onclick: () => {
                  store.svgTransition = 200
                  store.svgZoom *= 1.2
                },
              },
              children: [plusIcon(15)],
            }),
            el('div')({
              attributes: {
                style: zoomButtonAttributes,
                onclick: () => {
                  store.currentMap && fitToScreen(store.currentMap, {})
                },
              },
              children: [fullScreenIcon(15)],
            }),
            el('div')({
              attributes: {
                style: zoomButtonAttributes,
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
}
