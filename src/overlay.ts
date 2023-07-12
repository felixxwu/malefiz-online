import { el } from './el'
import { store } from './store'

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
            id: 'zoomIn',
            style: {
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              width: '30px',
              height: '30px',
              pointerEvents: 'all',
              borderRadius: '50%',
              backgroundColor: 'grey',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            },
            onclick: () => {
              store.svgZoom *= 1.1
            },
          },
          children: [el('div')({ attributes: { innerHTML: '+' } })],
        }),
      ],
    })
  )
}
