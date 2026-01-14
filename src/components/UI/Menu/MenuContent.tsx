import { styled } from 'goober'
import { colours } from '../../../config/colours'
import { consts } from '../../../config/consts'
import { leaveGame } from '../../../dbactions/leaveGame'
import { Page, customisationOpened, menuOpen, menuPage } from '../../../signals/signals'
import { InvitePlayers } from './InvitePlayers'
import { CustomiseAppearance } from './CustomiseAppearance'
import { Help } from './Help'
import { gameId } from '../../../signals/getters/gameId'

export function MenuContent() {
  async function handleLeaveGame() {
    await leaveGame()
  }

  function createPageHandler(page: Page) {
    return () => {
      if (page === 'customise') customisationOpened.value = true
      if (!gameId) menuOpen.value = false

      menuPage.value = page
    }
  }

  function handleCloseMenu() {
    menuOpen.value = false
  }

  return (
    <Div onClick={(e: MouseEvent) => e.stopPropagation()}>
      {menuPage.value === 'main' && (
        <>
          <Button onClick={createPageHandler('invite')}>Invite players</Button>
          <Button onClick={createPageHandler('customise')}>Customise appearance</Button>
          <Button onClick={createPageHandler('help')}>Help</Button>
          <Button onClick={handleLeaveGame}>Leave game</Button>
          <Button onClick={handleCloseMenu}>Close</Button>
        </>
      )}
      {menuPage.value === 'customise' && <CustomiseAppearance />}
      {menuPage.value === 'invite' && <InvitePlayers />}
      {menuPage.value === 'help' && <Help />}
      {menuPage.value !== 'main' && <Button onClick={createPageHandler('main')}>Back</Button>}
    </Div>
  )
}

const Div = styled('div')`
  color: white;
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: calc(100vw - 40px);
  max-width: 450px;

  & * {
    touch-action: auto;
  }
`

const Button = styled('div')`
  cursor: pointer;
  padding: 10px;
  border-radius: ${consts.borderRadius};
  background-color: ${colours.background};
  color: black;
  text-align: center;
  width: 100%;
  transition: 0.2s;

  &:hover {
    filter: invert();
  }
`
