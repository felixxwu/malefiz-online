import { keyframes, styled } from 'goober'
import { emojiOverlay, gameState, textOpacity } from '../../../signals/signals'
import { mapList } from '../../../maps/mapList'
import { polygonToXY } from '../../../utils/polygonToXY'
import { useEffect } from 'preact/hooks'
import { getUsers } from '../../../signals/queries/getUsers'
import { getUserControllingPlayer } from '../../../signals/queries/getUserControllingPlayer'
import { consts } from '../../../config/consts'
import { PlayerID } from '../../../types/gameTypes'

const spacing = 0.3
const spokes = 5
const DISPLAY_DURATION = 10000 // 2 seconds

const temperGradient = ['🙂', '🙁', '😠', '😡', '🤬']

// Track previous emoji states to detect changes
let previousEmojis = new Map<PlayerID, string | null>()
// Track previous aiTemper emoji indices to detect when AI temper increases
let previousAiTemperIndices = new Map<PlayerID, number>()

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-30px);
  }
`

export function EmojiOverlayGroup() {
  // Watch for emoji changes in gameState
  useEffect(() => {
    const gameStateValue = gameState.value
    if (!gameStateValue) return

    const users = getUsers()

    // Check each user's emoji for changes (human players)
    for (const user of users) {
      const playerId = user.playerToControl
      const currentEmoji = user.emoji
      const previousEmoji = previousEmojis.get(playerId)

      // If emoji changed from placeholder/null to a real emoji, trigger overlay
      if (
        currentEmoji &&
        currentEmoji !== consts.placeholderEmoji &&
        currentEmoji !== previousEmoji &&
        (previousEmoji === null || previousEmoji === consts.placeholderEmoji)
      ) {
        emojiOverlay.value = {
          emoji: currentEmoji,
          playerId,
          timestamp: Date.now(),
        }
      }

      // Update previous emoji state
      previousEmojis.set(playerId, currentEmoji)
    }

    // Check AI players' temper changes
    for (const player of gameStateValue.players) {
      const user = getUserControllingPlayer(player.id)
      // Skip if this player is controlled by a human
      if (user) continue

      const currentTemperIndex = Math.min(
        Math.floor(player.aiTemper / 2),
        temperGradient.length - 1
      )
      const previousTemperIndex = previousAiTemperIndices.get(player.id) ?? -1

      // If temper index increased (crossed a threshold), trigger overlay
      // Don't show emoji if temper index is 0
      if (currentTemperIndex > previousTemperIndex && currentTemperIndex > 0) {
        const emoji = temperGradient[currentTemperIndex]
        emojiOverlay.value = {
          emoji,
          playerId: player.id,
          timestamp: Date.now(),
        }
      }

      // Update previous temper index
      previousAiTemperIndices.set(player.id, currentTemperIndex)
    }
  })

  const overlay = emojiOverlay.value
  const gameStateValue = gameState.value
  if (!overlay || !gameStateValue) return null

  const gameStatePlayers = gameStateValue.players
  if (!gameStatePlayers) return null

  const pieces: {
    pieceID: string
    x: number
    y: number
  }[] = []

  // Only show emojis over pieces belonging to the player who reacted
  const reactingPlayer = gameStatePlayers.find(p => p.id === overlay.playerId)
  if (!reactingPlayer) return null

  let startCirclePlayersIndex = 1
  for (const position of reactingPlayer.positions) {
    const circleData = mapList[gameStateValue.mapNum].map.find(
      circle => circle.id === position.circleId
    )!
    const pos = circleData.start
      ? (() => {
          const index = startCirclePlayersIndex++
          return {
            x: circleData.position.x + polygonToXY(index, spokes, spacing).x,
            y: circleData.position.y + polygonToXY(index, spokes, spacing).y,
          }
        })()
      : circleData.position
    pieces.push({
      pieceID: position.pieceId,
      x: pos.x,
      y: pos.y,
    })
  }

  // Auto-clear overlay after duration
  useEffect(() => {
    const timeout = setTimeout(() => {
      emojiOverlay.value = null
    }, DISPLAY_DURATION)
    return () => clearTimeout(timeout)
  }, [overlay.timestamp])

  return (
    <Group opacity={textOpacity.value}>
      {pieces.map(piece => (
        <EmojiText
          key={piece.pieceID}
          x={piece.x * 100}
          y={piece.y * 100 - 60}
          dominantBaseline='middle'
        >
          {overlay.emoji}
        </EmojiText>
      ))}
    </Group>
  )
}

const Group = styled('g')`
  pointer-events: none;
`

const EmojiText = styled('text')`
  font-size: 40px;
  text-anchor: middle;
  animation: ${fadeOut} ${DISPLAY_DURATION}ms ease-out forwards;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`
