import { styled } from 'goober'
import { gameState, menuOpen } from '../../signals/signals'
import qrcode from 'qrcode-generator'
import { MenuIcon } from '../Icons'
import { colours } from '../../config/colours'
import { consts } from '../../config/consts'
import { gameId } from '../../utils/gameId'
import { leaveGame } from '../../utils/leaveGame'

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

  async function handleLeaveGame() {
    await leaveGame()
    window.location.href = '/'
  }

  const qr = qrcode(0, 'L')
  qr.addData(window.location.href)
  qr.make()
  const svgString = qr.createSvgTag({ cellSize: 2, margin: 0, scalable: true })

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
        <MenuContent>
          <Share>
            Invite players:
            <QRCode dangerouslySetInnerHTML={{ __html: svgString }}></QRCode>
            <Link href={window.location.href}>{window.location.href}</Link>
          </Share>
          <Button onClick={handleLeaveGame}>Leave game</Button>
        </MenuContent>
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

const MenuContent = styled('div')`
  color: white;
  display: flex;
  gap: 20px;
  flex-direction: column;
  max-width: 350px;
`

const Share = styled('div')`
  background-color: ${colours.background};
  padding: 30px;
  border-radius: ${consts.borderRadius};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  color: black;
`

const QRCode = styled('div')`
  width: 100%;

  & rect {
    fill: ${colours.background};
  }
`

const Link = styled('a')`
  color: black;
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
  word-break: break-all;
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
    opacity: 0.8;
  }
`
