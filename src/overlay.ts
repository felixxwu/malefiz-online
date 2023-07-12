import { el } from './el'
import { menuMap } from './menu'
import { store } from './store'
import { fitToScreen, zoomIntoCircle } from './zoom'

//style="width: 50px; height: 50px; pointer-events: all;"

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
                id: 'zoomIn',
                style: {
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'black',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                },
                onclick: () => {
                  store.currentMap && zoomIntoCircle(store.currentMap[0], {})
                },
              },
              children: [el('div')({ attributes: { innerHTML: 'x' } })],
            }),
            el('div')({
              attributes: {
                id: 'zoomIn',
                style: {
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'black',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                },
                onclick: () => {
                  store.currentMap && fitToScreen(store.currentMap, { translateDelay: 500 })
                },
              },
              children: [el('div')({ attributes: { innerHTML: '+' } })],
            }),
          ],
        }),
      ],
    })
  )
}
