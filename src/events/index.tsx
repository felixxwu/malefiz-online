import { JSX } from 'preact/jsx-runtime'
import { Dethrone } from './Dethrone'
import { Earthquake } from './Earthquake'
import { ItemShower } from './ItemShower'

export type Event = {
  name: string
  description: string
  alert: () => JSX.Element
  onActivate: () => void
}

export const events = [Dethrone, Earthquake, ItemShower] as const satisfies Event[]
export type EventName = (typeof events)[number]['name']
