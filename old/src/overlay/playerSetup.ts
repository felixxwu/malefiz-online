import { drawOverlay } from '.'
import { colour1 } from '../data/cssVars'
import { store } from '../data/store'
import { createGame } from '../game/createGame'
import { refreshIcon } from '../icons'
import { startLocalGame } from '../localgame/startLocalGame'
import { Player } from '../types/gameTypes'
import { div } from '../utils/el'

export function PlayerSetupMenu() {
  if (!store.playerSetupMenu) return div({})

  const setOpacity = (opacity: string) => {
    setTimeout(() => {
      menu.style.opacity = opacity
    })
  }

  const menu = div({
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
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: '0',
        transition: '500ms',
      },
    },
    children: store.mapSelectionScreen?.players
      .map(player => {
        return PlayerSlot(player)
      })
      .concat(OK(setOpacity)),
  })

  setOpacity('1')

  return menu
}

function OK(setOpacity: (opacity: string) => void) {
  return div({
    attributes: {
      style: {
        color: 'black',
        backgroundColor: colour1.value,
        padding: '5px 40px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
      },
      onclick: async () => {
        const allAIPlayers = store.mapSelectionScreen?.players
          .filter(p => p.id !== '1')
          .every(player => player.isAI)
        setOpacity('0')
        if (allAIPlayers) {
          store.playerSetupMenu = false
          await startLocalGame()
          store.mapSelectionScreen = null
        } else {
          createGame()
        }
      },
      innerHTML: 'Start',
    },
  })
}

function PlayerSlot(player: Player) {
  return div({
    attributes: {
      style: {
        display: 'flex',
      },
    },
    children: [PlayerName(player), PlayerRole(player), ChangeRoleButton(player)],
  })
}

function PlayerName(player: Player) {
  return div({
    attributes: {
      style: { width: '80px', color: colour1.value },
      innerHTML: player.name + ':',
    },
  })
}

function PlayerRole(player: Player) {
  let text = ''
  if (player.isAI) {
    text = 'AI'
  } else {
    text = 'Human'
  }
  if (player.id === '1') text = 'You'
  return div({
    attributes: {
      style: { width: '80px', color: colour1.value },
      innerHTML: text,
    },
  })
}

function ChangeRoleButton(player: Player) {
  const playerIsMe = player.id === '1'
  return div({
    attributes: {
      style: {
        cursor: 'pointer',
        width: '20px',
        display: 'flex',
        justifyContent: 'flex-end',
        pointerEvents: playerIsMe ? 'none' : 'all',
      },
      onclick: () => {
        // store.mapSelectionScreen = {
        //   ...store.mapSelectionScreen!,
        //   players: store.mapSelectionScreen!.players.map(p => {
        //     if (p.id === player.id) {
        //       return {
        //         ...p,
        //         isAI: !p.isAI,
        //       }
        //     }
        //     return p
        //   }),
        // }
        const players = store.mapSelectionScreen!.players
        players[players.indexOf(player)].isAI = !player.isAI
        drawOverlay()
      },
    },
    children: playerIsMe ? [] : [refreshIcon(20)],
  })
}
