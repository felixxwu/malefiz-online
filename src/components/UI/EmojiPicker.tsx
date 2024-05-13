import { styled } from 'goober'
import { colours } from '../../config/colours'
import { consts } from '../../config/consts'
import { gameState, pickEmoji, userId } from '../../signals/signals'
import { updateGameNested } from '../../dbactions/updateGame'
import { UserID } from '../../types/gameTypes'
import { emojis } from './emojis'

let timeoutId: NodeJS.Timeout

export function EmojiPicker() {
  async function handlePickEmoji(emoji: string) {
    if (!gameState.value) return
    pickEmoji.value = false
    const userKey: UserID = `user${userId.value}`
    await updateGameNested({
      [`${userKey}.emoji`]: emoji,
    })
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      updateGameNested({
        [`${userKey}.emoji`]: consts.placeholderEmoji,
      })
    }, 5000)
  }

  return (
    <Div
      onClick={() => (pickEmoji.value = false)}
      style={
        pickEmoji.value
          ? {
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              pointerEvents: 'all',
              opacity: 1,
            }
          : {
              pointerEvents: 'none',
              opacity: 0,
            }
      }
    >
      <Content>
        {emojis.map(emoji => (
          <Emoji onClick={() => handlePickEmoji(emoji)}>{emoji}</Emoji>
        ))}
      </Content>
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

const Content = styled('div')`
  width: 300px;
  background-color: ${colours.background};
  border-radius: ${consts.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
`

const Emoji = styled('div')`
  font-size: 32px;
  cursor: pointer;
  padding: 10px;
  display: inline-block;
  border-radius: ${consts.borderRadius};

  &:hover {
    background-color: ${colours.highlight};
  }
`
