import { styled } from 'goober'
import { customisationOpened, gameState, menuOpen } from '../../../signals/signals'
import { MenuIcon } from '../../Icons'
import { colours } from '../../../config/colours'
import { gameId } from '../../../signals/getters/gameId'
import { MenuContent } from './MenuContent'

export function Menu() {
  function openMenu(e: MouseEvent) {
    menuOpen.value = true
    e.stopPropagation()
  }

  function closeMenu(e: MouseEvent) {
    menuOpen.value = false
    e.stopPropagation()
  }

  const text = (() => {
    if (gameState.value?.playerTurn === null) return 'Invite players'
    if (!customisationOpened.value) return 'Customise appearance'
    if (
      gameState.value &&
      gameState.value.turnsUntilEvent < 7 &&
      gameState.value.eventsEnabled.length > 0
    )
      return `Random event in ${gameState.value.turnsUntilEvent} turns`
    return null
  })()

  const content = (() => {
    if (menuOpen.value) return <MenuContent />
    if (gameId)
      return (
        <OpenButton onClick={openMenu}>
          {text && <InviteHint>{text}</InviteHint>}
          <MenuIcon size={12} />
        </OpenButton>
      )
  })()

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
      {content}
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
