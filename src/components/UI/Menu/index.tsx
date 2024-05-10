import { styled } from 'goober'
import { gameState, menuOpen } from '../../../signals/signals'
import { MenuIcon } from '../../Icons'
import { colours } from '../../../config/colours'
import { gameId } from '../../../utils/gameId'
import { MenuContent } from './MenuContent'

export function Menu() {
  if (!gameId) return null

  function openMenu(e: MouseEvent) {
    menuOpen.value = true
    e.stopPropagation()
  }

  function closeMenu(e: MouseEvent) {
    menuOpen.value = false
    e.stopPropagation()
  }

  const showInviteHint = gameState.value?.playerTurn === null

  return (
    <Div
      onClick={closeMenu}
      style={
        menuOpen.value
          ? {
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }
          : {
              pointerEvents: 'none',
            }
      }
    >
      {menuOpen.value ? (
        <MenuContent />
      ) : (
        <OpenButton onClick={openMenu}>
          {showInviteHint && <InviteHint>Invite players here</InviteHint>}
          <MenuIcon size={12} />
        </OpenButton>
      )}
    </Div>
  )
}

const Div = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
`

const OpenButton = styled('div')`
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 100vw;
  background-color: black;
  left: 10px;
  top: 10px;
  pointer-events: all;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${colours.highlight};
  }
`

const InviteHint = styled('div')`
  position: fixed;
  white-space: nowrap;
  left: 60px;
`
