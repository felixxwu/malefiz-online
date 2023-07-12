import qrcode from 'qrcode-generator'
import { menuOpacity, menuPointerEvents } from '../data/cssVars'
import { el } from '../utils/el'
import { crossIcon } from '../icons'
import { store } from '../data/store'
import { zoomIntoCircle } from '../utils/zoom'

export function createMenu() {
  const qr = qrcode(0, 'L')
  qr.addData(window.location.href)
  qr.make()

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
        gap: '30px',
        opacity: menuOpacity.value,
        pointerEvents: menuPointerEvents.value,
        transition: '500ms',
      },
    },
    children: [
      el('div')({
        attributes: {
          style: {
            borderRadius: '5px',
            backgroundColor: 'var(--colour1)',
            padding: '20px',
            maxWidth: '280px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          },
        },
        children: [
          el('div')({ attributes: { innerHTML: 'Invite Players:', style: { color: 'black' } } }),
          el('div')({
            attributes: {
              id: 'qrcode',
              innerHTML: qr.createSvgTag({ cellSize: 2, margin: 0, scalable: true }),
            },
          }),
          el('a')({
            attributes: {
              href: window.location.href,
              innerHTML: window.location.href,
              style: { color: 'black', wordBreak: 'break-all' },
            },
          }),
        ],
      }),
      el('div')({
        attributes: {
          style: {
            width: '200px',
            height: '40px',
            borderRadius: '5px',
            backgroundColor: 'var(--colour1)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
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
          style: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--colour1)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          onclick: () => {
            store.menuOpen = false
          },
        },
        children: [crossIcon(15, 'black')],
      }),
    ],
  })
}
