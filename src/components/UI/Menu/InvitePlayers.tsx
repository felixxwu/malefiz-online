import { styled } from 'goober'
import { colours } from '../../../config/colours'
import { consts } from '../../../config/consts'
import qrcode from 'qrcode-generator'

export function InvitePlayers() {
  const qr = qrcode(0, 'L')
  qr.addData(window.location.href)
  qr.make()
  const svgString = qr.createSvgTag({ cellSize: 2, margin: 0, scalable: true })

  return (
    <>
      <Share>
        Invite players:
        <QRCode dangerouslySetInnerHTML={{ __html: svgString }}></QRCode>
        <Link href={window.location.href}>{window.location.href}</Link>
      </Share>
    </>
  )
}

const Share = styled('div')`
  background-color: ${colours.background};
  padding: 30px;
  border-radius: ${consts.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
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
