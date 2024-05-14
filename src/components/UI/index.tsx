import { Action } from './Action'
import { Alerts } from './Alerts'
import { EmojiPicker } from './EmojiPicker'
import { ItemPicker } from './ItemPicker'
import { Menu } from './Menu'
import { Navigation } from './Navigation'
import { WinScreen } from './WinScreen'

export function UI() {
  return (
    <>
      <Action />
      <Navigation />
      <Alerts />
      <WinScreen />
      <Menu />
      <EmojiPicker />
      <ItemPicker />
    </>
  )
}
