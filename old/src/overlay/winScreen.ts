import { colour1 } from '../data/cssVars'
import { store } from '../data/store'
import { crossIcon } from '../icons'
import { div } from '../utils/el'

export function WinScreen() {
  for (const key in store.gameStateHashTable) {
    const pos = store.gameStateHashTable[key]
    if (pos.circle?.finish && pos.pieces) {
      store.gameOver = true

      const playerName = store.gameState!.players.find(
        player => player.id === pos.pieces![0].playerId
      )!.name
      const winScreen = div({
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
            gap: '20px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
        children: [
          div({
            attributes: {
              style: {
                fontSize: '50px',
              },
              innerHTML: `${playerName} wins!`,
            },
          }),
          div({
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
              onclick: () => {
                winScreen.style.display = 'none'
              },
            },
            children: [crossIcon(15, 'black')],
          }),
        ],
      })
      return winScreen
    }
  }
  return div({}) // empty div
}
