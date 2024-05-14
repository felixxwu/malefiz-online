import { styled } from 'goober'
import { colours } from '../../../config/colours'
import { consts } from '../../../config/consts'
import { leaveGame } from '../../../dbactions/leaveGame'
import { customisationOpened } from '../../../signals/signals'
import { InvitePlayers } from './InvitePlayers'
import { CustomiseAppearance } from './CustomiseAppearance'
import { useState } from 'preact/hooks'

type Page = 'main' | 'customise' | 'invite'

export function MenuContent() {
  const [page, setPage] = useState<Page>('main')

  async function handleLeaveGame() {
    await leaveGame()
    window.location.href = '/'
  }

  function createPageHandler(page: Page) {
    return (e: MouseEvent) => {
      if (page === 'customise') customisationOpened.value = true

      e.stopPropagation()
      setPage(page)
    }
  }

  return (
    <Div>
      {page === 'main' && (
        <>
          <Button onClick={createPageHandler('invite')}>Invite players</Button>
          <Button onClick={createPageHandler('customise')}>Customise appearance</Button>
          <Button onClick={handleLeaveGame}>Leave game</Button>
        </>
      )}
      {page === 'customise' && <CustomiseAppearance />}
      {page === 'invite' && <InvitePlayers />}
      {page !== 'main' && <Button onClick={createPageHandler('main')}>Back</Button>}
    </Div>
  )
}

const Div = styled('div')`
  color: white;
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
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
