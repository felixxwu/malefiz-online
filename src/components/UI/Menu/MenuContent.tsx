import { styled } from 'goober'
import { colours } from '../../../config/colours'
import { consts } from '../../../config/consts'
import { leaveGame } from '../../../utils/leaveGame'
import qrcode from 'qrcode-generator'
import { customiseInMenu } from '../../../signals/signals'
import { PlayerCustomisation } from '../../../maps/PlayerCustomisation'

export function MenuContent() {
  const qr = qrcode(0, 'L')
  qr.addData(window.location.href)
  qr.make()
  const svgString = qr.createSvgTag({ cellSize: 2, margin: 0, scalable: true })

  async function handleLeaveGame() {
    await leaveGame()
    window.location.href = '/'
  }

  function handleCustomise(e: MouseEvent) {
    e.stopPropagation()
    customiseInMenu.value = true
  }

  function handleInvite(e: MouseEvent) {
    e.stopPropagation()
    customiseInMenu.value = false
  }

  return (
    <Div>
      {customiseInMenu.value ? (
        <>
          <Customise onClick={(e: MouseEvent) => e.stopPropagation()}>
            <div style={{ transform: 'scale(2)' }}>
              <PlayerCustomisation />
            </div>
          </Customise>
          <Button onClick={handleInvite}>Invite players</Button>
        </>
      ) : (
        <>
          <Share>
            Invite players:
            <QRCode dangerouslySetInnerHTML={{ __html: svgString }}></QRCode>
            <Link href={window.location.href}>{window.location.href}</Link>
          </Share>
          <Button onClick={handleCustomise}>Customise model</Button>
        </>
      )}
      <Button onClick={handleLeaveGame}>Leave game</Button>
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

const Customise = styled('div')`
  background-color: ${colours.background};
  padding: 50px;
  border-radius: ${consts.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Share = styled('div')`
  background-color: ${colours.background};
  padding: 30px;
  border-radius: ${consts.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
