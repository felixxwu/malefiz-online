import qrcode from 'qrcode-generator'
import { colour1, menuOpacity, menuPointerEvents } from '../data/cssVars'
import { a, div } from '../utils/el'
import { crossIcon } from '../icons'
import { store } from '../data/store'
import { leaveGame } from '../game/leaveGame'

const menuTransition = 300

export function Menu() {
  const qr = qrcode(0, 'L')
  qr.addData(window.location.href)
  qr.make()

  const closeMenu = () => (store.menuOpen = false)

  return div({
    attributes: {
      style: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: `blur(20px)`,
        opacity: menuOpacity.value,
        pointerEvents: menuPointerEvents.value,
        transition: `${menuTransition}ms`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      onclick: closeMenu,
    },
    children: [
      StopPropagationWrapper([
        InvitePlayers([
          div({ attributes: { innerHTML: 'Invite Players:', style: { color: 'black' } } }),
          div({
            attributes: {
              id: 'qrcode',
              innerHTML: qr.createSvgTag({ cellSize: 2, margin: 0, scalable: true }),
            },
          }),
          a({
            attributes: {
              href: window.location.href,
              innerHTML: window.location.href,
              style: { color: 'black', wordBreak: 'break-all' },
            },
          }),
        ]),
        ToggleZoomInOnLegalMoves([
          div({
            attributes: {
              innerHTML: `Auto Zoom: ${store.zoomInOnLegalMoves ? 'On' : 'Off'}`,
              style: { color: 'black' },
            },
          }),
        ]),
        LeaveGame([div({ attributes: { innerHTML: 'Leave Game', style: { color: 'black' } } })]),
        CloseMenu([crossIcon(15, 'black')]),
      ]),
    ],
  })
}

function StopPropagationWrapper(children: Node[]) {
  return div({
    attributes: {
      onclick: (e: Event) => e.stopPropagation(),
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
      },
    },
    children,
  })
}

function InvitePlayers(children: Node[]) {
  if (store.localGame) return div({})

  return div({
    attributes: {
      style: {
        borderRadius: '5px',
        backgroundColor: colour1.value,
        padding: '20px',
        maxWidth: '280px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      },
    },
    children,
  })
}

function LeaveGame(children: Node[]) {
  return div({
    attributes: {
      style: {
        width: '200px',
        height: '40px',
        borderRadius: '5px',
        backgroundColor: colour1.value,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      onclick: leaveGame,
    },
    children,
  })
}

function ToggleZoomInOnLegalMoves(children: Node[]) {
  return div({
    attributes: {
      style: {
        width: '200px',
        height: '40px',
        borderRadius: '5px',
        backgroundColor: colour1.value,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      onclick: () => {
        store.zoomInOnLegalMoves = !store.zoomInOnLegalMoves
      },
    },
    children,
  })
}

function CloseMenu(children: Node[]) {
  const closeMenu = () => (store.menuOpen = false)

  return div({
    attributes: {
      style: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: colour1.value,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      onclick: closeMenu,
    },
    children,
  })
}
