import { styled } from 'goober'
import { Action } from './Action'
import { Alerts } from './Alerts'
import { EmojiPicker } from './EmojiPicker'
import { ItemPicker } from './ItemPicker'
import { Menu } from './Menu'
import { Navigation } from './Navigation'
import { WinScreen } from './WinScreen'
import { useEffect, useState } from 'preact/hooks'

export function UI() {
  const [showLCPFix, setShowLCPFix] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowLCPFix(false)
    }, 1000)
  }, [])

  return (
    <>
      <Action />
      <Navigation />
      <Alerts />
      <WinScreen />
      <Menu />
      <EmojiPicker />
      <ItemPicker />
      {showLCPFix && <LCPFix>Malefiz (Barricade)</LCPFix>}
    </>
  )
}

const LCPFix = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: black;
  opacity: 0.000001;
`
